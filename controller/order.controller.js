import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.model.js";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import ProductModel from "../models/Product.model.js";
import { invoiceTemplate, sendMail } from "../utils/nodeMailerConfig.js";

export const createOrder = async (req, res) => {
  const {
    items: cartItems,
    totalAmount,
    totalItems,
    user,
    paymentMethod,
    selectedAddress,
  } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }
  const items = [];
  for (const item of cartItems) {
    const dbCart = await ProductModel.findOne({ _id: item.product.id });
    if (!dbCart) {
      throw new NotFoundError(`No product with id : ${item.product.id}`);
    }
    const product = dbCart;
    const quantity = item.quantity;
    const color = item.color;
    const size = item.size;
    if (product.stock < quantity) {
      throw new BadRequestError("Insufficient stock for the selected product");
    }
    product.stock -= quantity; // Reduce the stock
    items.push({ product, quantity, color, size });
    await product.save();
  }
  const order = new Order();
  order.items = items;
  order.totalAmount = totalAmount;
  order.totalItems = totalItems;
  order.user = user.id;
  order.paymentMethod = paymentMethod;
  order.selectedAddress = selectedAddress;
  if (order.paymentMethod === "cash") order.status = "dispatched";
  const data = await order.save();
  const populatedOrder = await Order.findById(data._id)
    .populate("items.product")
    .populate("user", "email")
    .populate("selectedAddress");
  const {
    user: { email },
  } = populatedOrder;
  const subject = "E-commerce Order Placed";
  const html = invoiceTemplate(populatedOrder);
  //!don't want to block the code execution so no await
  if (order.paymentMethod === "cash") sendMail({ to: email, subject, html });
  res.status(StatusCodes.CREATED).json(data);
};

export const fetchAllOrders = async (req, res) => {
  const { _sort, _order } = req.query;

  const query = { deleted: { $ne: true } };

  const sortKey = { [_sort]: _order };

  const pageSize = Number(req.query._limit) || 10;
  const page = Number(req.query._page) || 1;
  const skip = pageSize * (page - 1);

  const products = await Order.find(query)
    .sort(sortKey)
    .skip(skip)
    .limit(pageSize)
    .populate("items.product")
    .populate("selectedAddress");

  const totalItems = await Order.count(query);

  res.set("X-Total-Count", totalItems);
  res.status(StatusCodes.OK).json(products);
};

export const fetchUserOrder = async (req, res) => {
  const { id: userId } = req.user;
  const orders = await Order.find({ user: userId })
    .populate("items.product")
    .populate("selectedAddress");
  res.status(StatusCodes.OK).json(orders);
};

export const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { status, paymentStatus } = req.body;
  const order = await Order.findById(orderId)
    .populate("items.product")
    .populate("selectedAddress");
  if (!order) {
    throw new BadRequestError(`No such order ${orderId}`);
  }
  order.status = status;
  order.paymentStatus = paymentStatus;
  await order.save();
  res.status(StatusCodes.OK).json(order);
};

//INFO:not on frontend yet or we can just add delete flag:)

export const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;
  if (!orderId) {
    throw new BadRequestError(`No such order ${orderId}`);
  }
  await Order.findOneAndDelete({ _id: orderId });
  res.status(StatusCodes.OK).json({ msg: "Order deleted successfully" });
};

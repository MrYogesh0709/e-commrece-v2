import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import Cart from "../models/Cart.model.js";
import UserModel from "../models/User.model.js";
import checkPermissions from "../utils/checkPermission.js";

export const addToCart = async (req, res) => {
  const { id: userId } = req.user;
  const { product: productID, color, size } = req.body;
  if (!productID || !userId) {
    throw new BadRequestError("Provide all values of product to add cart ");
  }
  const cart = new Cart();
  cart.product = productID;
  cart.user = userId;
  cart.size = size;
  cart.color = color;
  cart.user = userId;
  const doc = await cart.save();
  const result = await doc.populate("product");
  res.status(StatusCodes.CREATED).json(result);
};

export const fetchSingleCartByUser = async (req, res) => {
  const { id: user } = req.user;
  const userData = await UserModel.findById(user);
  if (!userData) {
    throw new BadRequestError("User not found");
  }
  const cart = await Cart.find({ user: user }).populate("product");
  res.status(StatusCodes.OK).json(cart);
};

export const updateCartItem = async (req, res) => {
  const { id: cartId } = req.params;
  const cart = await Cart.findById(cartId);
  checkPermissions(req.user, cart.user);
  const cartUpdated = await Cart.findOneAndUpdate({ _id: cartId }, req.body, {
    new: true,
    runValidators: true,
  }).populate("product");

  if (!cartUpdated) {
    throw new NotFoundError(`No item with id : ${cartId}`);
  }
  res.status(StatusCodes.OK).json(cartUpdated);
};

export const DeleteItCartItem = async (req, res) => {
  const { id: cartId } = req.params;
  const cart = await Cart.findById(cartId);
  checkPermissions(req.user, cart.user);
  const cartDeleted = await Cart.findOneAndDelete({ _id: cartId });
  if (!cartDeleted) {
    throw new NotFoundError(`No item with id : ${cartId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Item removed", id: cartId });
};

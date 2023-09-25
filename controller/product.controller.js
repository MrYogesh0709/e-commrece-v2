import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.model.js";
import { NotFoundError } from "../errors/customError.js";

export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const discountedPrice = Number(
    product.price * (1 - product.discountPercentage / 100)
  );
  product.discountPrice = Math.round(discountedPrice);
  product.price = Math.round(req.body.price);
  await product.save();
  res.status(StatusCodes.CREATED).json({ msg: "product created successfully" });
};

export const fetchAllProducts = async (req, res) => {
  //filter = {"category":["smartphones","laptop"]}
  //sort = {_sort:"price",_order:"desc"}
  //pagination ={_page=1,limit=10}
  const { category, brand, _sort, _order, admin, search } = req.query;

  const query = !admin ? { deleted: { $ne: true } } : {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }
  if (category) {
    query.category = { $in: category.split(",") };
  }
  if (brand) {
    query.brand = { $in: brand.split(",") };
  }
  const sortKey = { [_sort]: _order };
  const pageSize = Number(req.query._limit) || 10;
  const page = Number(req.query._page) || 1;
  const skip = pageSize * (page - 1);
  const products = await Product.find(query)
    .sort(sortKey)
    .skip(skip)
    .limit(pageSize);

  const totalItems = await Product.count(query);

  res.set("X-Total-Count", totalItems);
  res.status(StatusCodes.OK).json(products);
};

export const fetchSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  //we cant do this because in review modal we take product but we didn't take reviews in product modal this connection never exists;
  //this is virtual property so can't query it
  const product = await Product.findOne({ _id: productId }).populate({
    path: "reviews",
  });
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json(product);
};

export const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  const discountedPrice = Number(
    product.price * (1 - product.discountPercentage / 100)
  );
  product.discountPrice = Math.round(discountedPrice);
  product.price = Math.round(req.body.price);
  await product.save();
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json(product);
};

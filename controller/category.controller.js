import { StatusCodes } from "http-status-codes";
import Category from "../models/Category.model.js";

export const fetchAllCategory = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json(categories);
};

export const createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Category created successfully" });
};

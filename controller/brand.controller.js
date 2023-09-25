import { StatusCodes } from "http-status-codes";
import Brand from "../models/Brand.model.js";

export const fetchAllBrands = async (req, res) => {
  const brands = await Brand.find({});
  res.status(StatusCodes.OK).json(brands);
};

export const createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  await brand.save();
  res.status(StatusCodes.CREATED).json({ msg: "Brand created successfully" });
};

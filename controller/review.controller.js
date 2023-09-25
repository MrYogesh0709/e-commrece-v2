import { BadRequestError, NotFoundError } from "../errors/customError.js";
import Product from "../models/Product.model.js";
import Review from "../models/Review.model.js";
import { StatusCodes } from "http-status-codes";
import checkPermissions from "../utils/checkPermission.js";

export const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.id,
  });

  if (alreadySubmitted) {
    throw new BadRequestError("Already submitted review for this product");
  }

  req.body.user = req.user.id;
  const review = await Review.create(req.body);
  const populatedReview = await review.populate({
    path: "user",
    select: "name profileImage",
  });

  res.status(StatusCodes.CREATED).json({ review: populatedReview });
};

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "title category discountPrice",
  });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

export const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

export const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  const populatedReview = await review.populate({
    path: "user",
    select: "name profileImage",
  });
  res.status(StatusCodes.OK).json({ review: populatedReview });
};

export const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res.status(StatusCodes.OK).json({ review });
};

export const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId }).populate({
    path: "user",
    select: "name profileImage",
  });

  if (!reviews) {
    throw new BadRequestError("no reviews found");
  }
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

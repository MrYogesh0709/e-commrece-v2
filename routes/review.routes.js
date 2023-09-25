import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleProductReviews,
  getSingleReview,
  updateReview,
} from "../controller/review.controller.js";
import { isAuth } from "../middleware/customMiddleware.js";
const router = express.Router();

router.route("/").post(isAuth, createReview).get(getAllReviews);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(isAuth, updateReview)
  .delete(isAuth, deleteReview);

router.route("/product/:id").get(getSingleProductReviews);
export default router;

import express from "express";
import {
  DeleteItCartItem,
  addToCart,
  fetchSingleCartByUser,
  updateCartItem,
} from "../controller/cart.controller.js";
const router = express.Router();

router.route("/").post(addToCart).get(fetchSingleCartByUser);
router.route("/:id").delete(DeleteItCartItem).patch(updateCartItem);

export default router;

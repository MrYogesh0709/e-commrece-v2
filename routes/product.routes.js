import express from "express";
import {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  updateProduct,
} from "../controller/product.controller.js";
import verifyRoles from "../middleware/verifyRoles.js";
import { isAuth } from "../middleware/customMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(fetchAllProducts)
  .post([isAuth, verifyRoles("admin")], createProduct);
router
  .route("/:id")
  .get(fetchSingleProduct)
  .patch([isAuth, verifyRoles("admin")], updateProduct);

export default router;

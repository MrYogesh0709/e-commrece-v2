import express from "express";
import {
  createCategory,
  fetchAllCategory,
} from "../controller/category.controller.js";
import verifyRoles from "../middleware/verifyRoles.js";
import { isAuth } from "../middleware/customMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(fetchAllCategory)
  .post([isAuth, verifyRoles("admin")], createCategory);

export default router;

import express from "express";
import {
  createOrder,
  deleteOrder,
  fetchAllOrders,
  fetchUserOrder,
  updateOrder,
} from "../controller/order.controller.js";
import verifyRoles from "../middleware/verifyRoles.js";
const router = express.Router();

router.route("/").post(createOrder);
router.route("/user").get(fetchUserOrder);
router
  .route("/:id")
  .patch(verifyRoles("admin"), updateOrder)
  .delete(verifyRoles("admin"), deleteOrder);
router.route("/admin").get(fetchAllOrders);

export default router;

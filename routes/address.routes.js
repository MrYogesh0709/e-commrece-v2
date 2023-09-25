import express from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
} from "../controller/address.controller.js";

const router = express.Router();

router.route("/add").post(addAddress);
router.route("/edit/:id").patch(editAddress);
router.route("/remove/:id").delete(deleteAddress);

export default router;

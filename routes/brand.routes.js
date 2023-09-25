import express from "express";
import { createBrand, fetchAllBrands } from "../controller/brand.controller.js";
import verifyRoles from "../middleware/verifyRoles.js";
const router = express.Router();

router.route("/").get(fetchAllBrands).post(verifyRoles("admin"), createBrand);

export default router;

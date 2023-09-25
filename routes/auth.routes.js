import express from "express";
import {
  checkUser,
  createUser,
  forgotPasswordRequest,
  loginUser,
  resetPassword,
  sendVerifyMailUser,
  signOut,
  verifyEmail,
} from "../controller/auth.controller.js";
import { isAuth } from "../middleware/customMiddleware.js";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/check").get(checkUser);
router.route("/logout").get(isAuth, signOut);
router.route("/verify-email").post(verifyEmail);
router.route("/request-verification-email").post(sendVerifyMailUser);
router.route("/forgot-password").post(forgotPasswordRequest);
router.route("/reset-password").post(resetPassword);
// router.route("/login").post(passport.authenticate("local"), loginUser);

export default router;

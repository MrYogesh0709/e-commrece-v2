import express from "express";
import {
  fetchUserById,
  updateProfilePicture,
  updateUser,
  updateUserPassword,
} from "../controller/user.controller.js";
import uploadMiddleware from "../middleware/multer.js";
const router = express.Router();

router.route("/me").get(fetchUserById);
router.route("/update").patch(updateUser);
router.route("/update-password").patch(updateUserPassword);
router
  .route("/upload-profile-image")
  .patch(uploadMiddleware("image"), updateProfilePicture);

export default router;

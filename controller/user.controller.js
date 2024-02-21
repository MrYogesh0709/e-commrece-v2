import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import User from "../models/User.model.js";
import crypto from "crypto";
import { sendMail } from "../utils/nodeMailerConfig.js";
import { v2 as cloudinary } from "cloudinary";

export const fetchUserById = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id)
    .select("-password -salt")
    .populate("addresses");
  if (!user) {
    throw new NotFoundError(`No user with id ${id}`);
  }
  const { email, addresses, role, name, profileImage, phone } = user;
  res
    .status(StatusCodes.OK)
    .json({ id, email, addresses, role, name, profileImage, phone });
};

export const updateUser = async (req, res) => {
  const { id: userId } = req.user;
  const { firstName, lastName, email, phone } = req.body;

  const user = await User.findById(userId)
    .select("-password -salt")
    .populate("addresses");
  if (!user) {
    throw new NotFoundError(`No user with id : ${userId}`);
  }

  if (email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new BadRequestError("Email already exists");
    }
  }

  user.name.firstName = firstName;
  user.name.lastName = lastName;
  user.phone = phone;
  user.email = email;
  await user.save();
  res.status(StatusCodes.OK).json(user);
};

async function validatePassword(currentPassword, user) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      currentPassword,
      user.salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          reject(err);
        } else {
          resolve(
            hashedPassword.toString("hex") === user.password.toString("hex")
          );
        }
      }
    );
  });
}

export const updateUserPassword = async (req, res) => {
  const { id: userId } = req.user;
  const { currentPassword, password: newPassword } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError(`No user with id: ${userId}`);
  }

  // Verify the current password
  const isValidPassword = await validatePassword(currentPassword, user);
  if (!isValidPassword) {
    throw new BadRequestError("Invalid current password");
  }

  // Update the password
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    newPassword,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      user.password = hashedPassword;
      user.salt = salt;
      await user.save();
      const subject = "Password Changed for E-commerce";
      const html = `<p>Your Password has been changed</p>`;
      sendMail({ to: user.email, subject, html });
      res.status(StatusCodes.OK).json({ msg: "Password Changed Successfully" });
    }
  );
};

//DON'T USE EXPRESS FILE UPLOAD NOT WORKING IN VERCEL ONLY READ-FILE!!!
export const updateProfilePicture = async (req, res) => {
  const { id: userId } = req.user;

  const file = req.file;

  if (
    !file ||
    !["image/jpeg", "image/png"].includes(file.mimetype) ||
    file.size > 5 * 1024 * 1024
  ) {
    throw new BadRequestError("Invalid file");
  }

  const user = await User.findById(userId)
    .select("-password -salt")
    .populate("addresses");
  if (!user) {
    throw new NotFoundError(`No user with id : ${userId}`);
  }

  // Upload the file to Cloudinary
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "E-Commerce",
    use_filename: true,
  });

  // Access the uploaded image URL from the result object
  const imageUrl = result.secure_url;

  // Update the user's profile image
  user.profileImage = imageUrl;
  await user.save();

  return res.status(StatusCodes.OK).json(user);
};

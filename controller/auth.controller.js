import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customError.js";
import User from "../models/User.model.js";
import crypto from "crypto";
import { sanitizeUser } from "../middleware/customMiddleware.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/nodeMailerConfig.js";
import { origin } from "../utils/origin.js";

export const createUser = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({ email: email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists.");
  }
  const verificationToken = crypto.randomBytes(48).toString("hex");

  //?:-> confirm it
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const subject = "Email Confirmation";
  const html = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  await sendMail({ to: email, subject, html });
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      const user = new User({ ...req.body });
      user.password = hashedPassword;
      user.salt = salt;
      user.verificationToken = verificationToken;
      await user.save();
      //TODO:ADD STRONG MAIL WILL GIVE ERROR IF MAIL IS NOT VALID MAIL
      return res
        .status(200)
        .json({ msg: "Mail is sent,please verify your mail and login" });
    }
  );
};

export const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw UnauthenticatedError("Verification Failed");
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Verification Failed");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();
  //TODO:WE STILL NEED TO HAVE LOGIN MAKE IT SIMPLE ADD COOKIES SO AFTER SUCCESS VERIFY USE CAN LOGIN WITHOUT LOGIN DETAIL WITH COOKIES

  req.login(sanitizeUser(user), (err) => {
    const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY);
    //this also calls serialize like in login otherwise error in check
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });
    return res.status(StatusCodes.OK).json(sanitizeUser(user));
  });
};

export const sendVerifyMailUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (user.isVerified) {
      throw new BadRequestError(
        "Email already exists and is already verified."
      );
    } else {
      const verificationToken = crypto.randomBytes(48).toString("hex");

      const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
      const subject = "Email Confirmation";
      const html = `<p>Please confirm your email by clicking on the following link : 
          <a href="${verifyEmail}">Verify Email</a> </p>`;

      await sendMail({ to: email, subject, html });
      user.verificationToken = verificationToken;
      await user.save();
    }
  }
  return res.status(200).json({
    msg: "User registered. Verification email sent. Please check your email and verify your account.",
  });
};

// used middleware here for handle errors
export const loginUser = async (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      // Handle internal server error
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Internal server error",
      });
    }
    if (!user) {
      // Handle authentication failure
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Invalid email or password",
      });
    }
    // Authentication successful, log in the user
    req.login(user, function (err) {
      const { id, token, role, isVerified } = req.user;
      if (err) {
        // Handle internal server error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "Internal server error",
        });
      }
      // Return the logged-in user
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });
      return res.status(StatusCodes.OK).json({ id, role, isVerified });
    });
  })(req, res, next);
};

export const checkUser = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      // Handle error during authentication
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Internal server error",
      });
    }
    if (!user) {
      // User is not authenticated
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Not authorized" });
    }
    // User is authenticated, proceed with the route handler
    return res.status(StatusCodes.OK).json(user);
  })(req, res, next);
};

export const signOut = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
  });
  return res.status(StatusCodes.OK).json({ msg: "Logged out" });
};

export const forgotPasswordRequest = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please enter email");
  }
  const user = await User.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    //TODO:CHANGE THIS
    const resetURL = `${origin}/reset-password?token=${token}&email=${email}`;
    const subject = "reset password for E-commerce";
    const html = `<p>Please reset password by clicking on the following link : <a href="${resetURL}">Reset Password</a></p>`;

    await sendMail({ to: email, subject, html });
    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.resetPasswordToken = token;
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your Email for Reset Password " });
};

export const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  if (!token || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email: email, resetPasswordToken: token });
  const currentDate = new Date();
  if (user.passwordTokenExpirationDate < currentDate) {
    throw new BadRequestError("Invalid Request try again...");
  }
  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        user.resetPasswordToken = "";
        user.passwordTokenExpirationDate = null;
        await user.save();
        const subject = "Password Changed for E-commerce";
        const html = `<p>Your Password has been changed</p>`;
        await sendMail({ to: email, subject, html });
        return res
          .status(StatusCodes.OK)
          .json({ msg: "Password Reset Successful" });
      }
    );
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Request" });
  }
};

// * use this first as per local then jwt for this pass this to route
// export const loginUser = async (req, res, next) => {
//   res.json(req.user);
// };
// export const checkUser = async (req, res, next) => {
//   res.json(req.user);
// };

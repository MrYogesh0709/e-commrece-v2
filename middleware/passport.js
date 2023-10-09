import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import UserModel from "../models/User.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { jwtOptions, sanitizeUser } from "./customMiddleware.js";

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        //first means no error false user not found third message
        return done(null, false, { message: "Invalid email or password" });
      }
      if (!user.isVerified) {
        return done(null, false, { message: "User not verified" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (err) return done(err);
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid email or password" });
          }
          //todo:add options
          const token = jwt.sign(
            sanitizeUser(user),
            process.env.JWT_SECRET_KEY
          );
          return done(null, {
            id: user.id,
            role: user.role,
            token,
          }); //this line send to serializer in login route
        }
      );
    } catch (error) {
      done(error, false);
    }
  })
);

//Jwt strategy
passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
    try {
      const user = await UserModel.findById(jwt_payload.id);
      if (!user) {
        return done(null, false);
      }
      if (!user.isVerified) {
        return done(null, false, "Not Verified");
      }
      return done(null, sanitizeUser(user)); //this call serializer
    } catch (error) {
      done(error, false);
    }
  })
);

//this create session variable req.user on being on called from callbacks
passport.serializeUser(function (user, cb) {
  //serialUser will get whatever passed to in serializer like login route
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  //here will get after serialization like check route
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default passport;

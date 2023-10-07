import "dotenv/config";
import "express-async-errors";
import express from "express";
const server = express();
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./middleware/passport.js";
import * as Config from "./config/index.js";
import { v2 as cloudinary } from "cloudinary";
import {
  errorHandlerMiddleware,
  notFoundMiddleware,
} from "./middleware/error-handler.js";
import { corsMiddleware, isAuth } from "./middleware/customMiddleware.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//:-> routers
import productRouter from "./routes/product.routes.js";
import brandsRouter from "./routes/brand.routes.js";
import categoryRouter from "./routes/category.routes.js";
import userRouter from "./routes/user.routes.js";
import addressRouter from "./routes/address.routes.js";
import authRouter from "./routes/auth.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/Order.routes.js";
import reviewRouter from "./routes/review.routes.js";
import {
  stripeController,
  stripeWebhookController,
} from "./controller/stripe.controller.js";
import helmet from "helmet";

//*security
// server.use(helmet());

// only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url));
server.use(express.static(path.resolve(__dirname, "./client/dist")));

//:-> Webhook
//*: we can capture order after deploying out server live on public URL before test local as per docs
//!: this is on top because of type express.raw and express.json is collapsing each other
server.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookController
);

//:-> middleware
server.use(express.json());
// Handle options credentials check - before CORS! and fetch cookies credentials requirement
server.use(corsMiddleware);
// Cross Origin Resource Sharing:not need on same platform
server.use(cors(Config.corsOptions));
server.use(cookieParser());
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.initialize()); // Initialize Passport middleware
server.use(passport.authenticate("session"));

//v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

server.post("/api/v1/create-payment-intent", stripeController);
server.use("/api/v1/products", productRouter);
server.use("/api/v1/brands", brandsRouter);
server.use("/api/v1/categories", categoryRouter);
server.use("/api/v1/user", isAuth, userRouter);
server.use("/api/v1/address", isAuth, addressRouter);
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/cart", isAuth, cartRouter);
server.use("/api/v1/order", isAuth, orderRouter);
server.use("/api/v1/review", reviewRouter);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

server.use("*", notFoundMiddleware);
server.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await Config.connectDB(process.env.MONGO_URL);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

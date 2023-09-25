import { Schema, model } from "mongoose";
import { addressSchema } from "./Address.model.js";

const ordersProductsSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, "Quantity should be more then one"],
  },
  color: {
    type: Schema.Types.Mixed,
  },
  size: {
    type: Schema.Types.Mixed,
  },
});

const orderSchema = new Schema(
  {
    items: [ordersProductsSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: [1, "Minimum amount should be bigger than one"],
    },
    totalItems: {
      type: Number,
      required: true,
      min: [1, "Select minimum one item"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: {
        values: ["card", "cash"],
        message: "enum validator failed for payment Methods",
      },
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "succeeded", "failed", "canceled"],
        message: "enum validator failed for payment Status",
      },
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: {
        values: ["pending", "dispatched", "delivered", "cancelled"],
        message: "enum validator failed for payment Status",
      },
    },
    selectedAddress: { type: addressSchema },
  },
  { timestamps: true }
);

const virtual = orderSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model("Order", orderSchema);

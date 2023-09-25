import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export const addressSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [2, "Name can not be less than 2 characters"],
    maxLength: [50, "Name can not be less than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: isEmail,
      message: "Please provide valid email",
    },
  },
  //TODO: add complexity for phone
  phone: {
    type: String,
    required: [true, "Please provide Phone Number"],
  },
  street: {
    type: String,
    required: [true, "Please provide street"],
    maxLength: [100, "street can not be more than 100 characters"],
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
    maxLength: [50, "city can not be more than 50 characters"],
  },
  state: {
    type: String,
    required: [true, "Please provide state"],
    maxLength: [30, "state can not be more than 30 characters"],
  },
  //TODO: add complexity for pinCode
  pinCode: {
    type: String,
    required: [true, "Please provide pinCode"],
    maxLength: [30, "PinCode can not be more than 30 characters"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const virtual = addressSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

addressSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model("Address", addressSchema);

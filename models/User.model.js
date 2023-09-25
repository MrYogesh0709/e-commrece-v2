import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const NameSchema = {
  firstName: {
    type: String,
    minLength: [2, "Name can not be less than 2 characters"],
    maxLength: [50, "Name can not be less than 50 characters"],
  },
  lastName: {
    type: String,
    maxLength: [50, "Name can not be less than 50 characters"],
  },
};

const userSchema = new Schema(
  {
    name: NameSchema,
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: isEmail,
        message: "Please provide valid email",
      },
    },
    //TODO: add complexity for phone
    phone: {
      type: String,
    },
    password: {
      type: Buffer,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    profileImage: { type: String },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    addresses: {
      type: [{ type: Schema.Types.ObjectId, ref: "Address" }],
      default: [],
    },
    salt: Buffer,
    resetPasswordToken: { type: String, default: "" },
    passwordTokenExpirationDate: {
      type: Date,
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
  },
  { timestamps: true }
);

//* Virtual create virtual database
//* We are using id in frontend so converting _id into id:in database it's still _id
//* with get we get id and with setter id is created and set to response json:work at runtime
const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
export default model("User", userSchema);

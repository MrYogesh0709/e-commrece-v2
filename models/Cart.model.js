import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, "Quantity should be more then one"],
    },
    color: {
      type: mongoose.Schema.Types.Mixed,
    },
    size: {
      type: mongoose.Schema.Types.Mixed,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

//* Virtual create virtual database
//* We are using id in frontend so converting _id into id:in database it's still _id
//* with get we get id and with setter id is created and set to response json:work at runtime
const virtual = CartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
export default mongoose.model("Cart", CartSchema);

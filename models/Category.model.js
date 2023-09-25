import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    label: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please provide label"],
      maxLength: [50, "Name can not be more than 50 characters"],
    },
    value: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please provide value"],
      maxLength: [50, "Value can not be more than 50 characters"],
    },
  },
  { timestamps: true }
);

const virtual = categorySchema.virtual("id");
virtual.get(function () {
  return this._id;
});
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
export default model("Category", categorySchema);

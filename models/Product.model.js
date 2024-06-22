import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please provide product name"],
      maxLength: [100, "Name can not be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxLength: [1000, "Description can not be more than 1000 characters"],
    },
    sku: {
      type: String,
      maxLength: [10, "Sku can not be more than 10 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [0, "price must be bigger than zero"],
      max: [10000, "wrong max price"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [0, "Wrong discount percentage"],
      max: [99, "Wrong discount percentage"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Please provide product discount price"],
      min: [0, "Wrong discount price"],
      max: [10000, "Wrong discount price"],
    },
    minimumOrderQuantity: {
      type: Number,
      min: [0, "Wrong min order quantity"],
    },
    returnPolicy: {
      type: String,
      maxLength: [500, "limit exceed"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Wrong min stock"],
    },
    tags: {
      type: [String],
    },
    weight: {
      type: Number,
    },
    warrantyInformation: {
      type: String,
      max: [200, "Information limit exceed"],
    },
    shippingInformation: {
      type: String,
      max: [200, "Information limit exceed"],
    },
    //todo:can we add category & brand as per category model.
    category: {
      type: String,
      max: [50, "category limit exceed"],
    },
    brand: {
      type: String,
      max: [50, "brand limit exceed"],
    },
    thumbnail: {
      type: String,
      required: true,
      default: "/uploads/example.jpeg",
    },
    images: {
      type: [String],
      required: [true, "Please provide images"],
    },
    colors: {
      type: [Schema.Types.Mixed],
    },
    sizes: {
      type: [Schema.Types.Mixed],
    },
    highlights: {
      type: [String],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//* Virtual create virtual database
//* We are using id in frontend so converting _id into id:in database it's still _id
//* with get we get id and with setter id is created and set to response json:work at runtime
const virtualId = ProductSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});

//! we use short on discountPrice but this will not work as virtual can't be sorting we can use pipeline
// const virtualDiscountPrice = ProductSchema.virtual("discountPrice");
// virtualDiscountPrice.get(function () {
//   const discountedPrice = this.price * (1 - this.discountPercentage / 100);
//   return discountedPrice.toFixed(2);
// });
ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

//whatever we used in controllers
ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match: { rating: 5 },
});

//this will remove reviews before removing the product so we don't have reviews in database if product is deleted;
ProductSchema.pre("remove", async function () {
  await this.model("Review").deleteMany({ product: this._id });
});

export default model("Product", ProductSchema);

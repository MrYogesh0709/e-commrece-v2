import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
  clearSelectedProduct,
  createProductAsync,
  selectAllProducts,
} from "../../product/productSlice";
import { colors, sizes } from "../../../app/constants";

export default function AddProduct() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectAllProducts);
  const { brands, categories } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      const product = {
        ...data,
        stock: +data.stock,
        discountPercentage: +data.discountPercentage,
        price: +data.price,
        rating: 0,
        images: [
          data.image1,
          data.image2,
          data.image3,
          data.image4,
          data.thumbnail,
        ],
        highlights: [
          data.highlight1,
          data.highlight2,
          data.highlight3,
          data.highlight4,
        ],
        colors:
          data.colors?.map((color) => colors.find((clr) => clr.id === color)) ||
          [],
        sizes:
          data.sizes?.map((size) => sizes.find((sz) => sz.id === size)) || [],
      };
      delete product.image1;
      delete product.image2;
      delete product.image3;
      delete product.image4;
      delete product.highlight1;
      delete product.highlight2;
      delete product.highlight3;
      delete product.highlight4;
      dispatch(createProductAsync(product));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    reset();
    dispatch(clearSelectedProduct());
    navigate("/admin");
  };

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-0  sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-bold leading-7 text-gray-900 dark:text-slate-200">
                {location.pathname
                  .split("/")
                  .filter(Boolean) // Remove empty strings from the array
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" / ")}
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Product Name */}
                <div className="sm:col-span-full">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:bg-slate-600  focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("title", {
                          required: "Product name is required",
                          maxLength: {
                            value: 50,
                            message: "Name must be less than 50 characters",
                          },
                        })}
                        id="title"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1  text-gray-900 dark:text-slate-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.title && errors.title?.message}
                    </p>
                  </div>
                </div>
                {/* Description */}
                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                        maxLength: {
                          value: 300,
                          message:
                            "Description must be at under 300 characters",
                        },
                      })}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-600 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">
                      {errors.description && errors.description?.message}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-400">
                    Write a few sentences about product
                  </p>
                </div>
                {/* Price */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:bg-slate-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="number"
                        {...register("price", {
                          required: "Product price is required",
                          min: {
                            value: 1,
                            message: "Price must be More than 0",
                          },
                          max: {
                            value: 100000,
                            message: "Price must be less than 100000",
                          },
                        })}
                        id="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-slate-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.price && errors.price?.message}
                    </p>
                  </div>
                </div>
                {/* Discount Percentage */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="discountPercentage"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Discount Percentage
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm dark:bg-slate-600 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="number"
                        {...register("discountPercentage", {
                          required: "Discount-Percentage is required",
                          min: {
                            value: 0,
                            message: "Discount must be Positive number",
                          },
                          max: {
                            value: 100,
                            message: "Discount must be less than 100",
                          },
                        })}
                        id="discountPercentage"
                        className="appearance-none block flex-1 border-0 bg-transparent dark:text-slate-200 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.discountPercentage &&
                        errors.discountPercentage?.message}
                    </p>
                  </div>
                </div>
                {/* Stock */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md dark:bg-slate-600 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="number"
                        {...register("stock", {
                          required: "Product stock is required",
                          min: {
                            value: 0,
                            message: "Stock be Positive number",
                          },
                        })}
                        id="stock"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 dark:text-slate-200 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.stock && errors.stock?.message}
                    </p>
                  </div>
                </div>
                {/* HeighLight */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="highlight1"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Highlight-1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 dark:bg-slate-600 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("highlight1", {
                          required: "highlight1 is required",
                        })}
                        id="highlight1"
                        className="block flex-1 border-0 bg-transparent dark:text-slate-200 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.highlight1 && errors.highlight1?.message}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="highlight2"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Highlight-2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 dark:bg-slate-600 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("highlight2", {
                          required: "highlight2 is required",
                        })}
                        id="highlight2"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 dark:text-slate-200 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.highlight2 && errors.highlight2?.message}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="highlight3"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Highlight-3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  dark:bg-slate-600 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("highlight3", {
                          required: "highlight3 is required",
                        })}
                        id="highlight3"
                        className="block flex-1 border-0 bg-transparent dark:text-slate-200 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.highlight3 && errors.highlight3?.message}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="highlight4"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Highlight-4
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md dark:bg-slate-600  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("highlight4", {
                          required: "highlight4 is required",
                        })}
                        id="highlight4"
                        className="block flex-1 border-0 bg-transparent dark:text-slate-200 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.highlight4 && errors.highlight4?.message}
                    </p>
                  </div>
                </div>
                {/* Colors */}
                <div className="sm:col-span-full">
                  <label
                    htmlFor="colors"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Colors
                  </label>
                  <div className="mt-2">
                    {colors?.length > 0 &&
                      colors.map((color) => (
                        <label
                          className="inline-flex items-center mr-4 mb-2"
                          key={color.id}
                        >
                          <input
                            type="checkbox"
                            value={color.id}
                            {...register("colors")}
                            className="h-4 w-4 rounded border-gray-300   text-indigo-600 focus:ring-indigo-600"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-slate-200">
                            {color.name}
                          </span>
                        </label>
                      ))}
                    <p className="text-red-500">
                      {errors.colors && errors.colors?.message}
                    </p>
                  </div>
                </div>
                {/* CheckBox */}
                <div className="sm:col-span-full">
                  <label
                    htmlFor="sizes"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Sizes
                  </label>
                  <div className="mt-2">
                    {sizes?.length > 0 &&
                      sizes.map((size) => (
                        <label
                          className="inline-flex items-center mr-4 mb-2"
                          key={size.id}
                        >
                          <input
                            type="checkbox"
                            value={size.id}
                            {...register("sizes")}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-slate-200">
                            {size.name}
                          </span>
                        </label>
                      ))}
                    <p className="text-red-500">
                      {errors.sizes && errors.sizes?.message}
                    </p>
                  </div>
                </div>
                {/* Thumbnail */}
                <div className="sm:col-span-full">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:bg-slate-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("thumbnail", {
                          required: "Product Thumbnail is required",
                        })}
                        id="thumbnail"
                        className="block flex-1 border-0 dark:text-slate-200 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.thumbnail && errors.thumbnail?.message}
                    </p>
                  </div>
                </div>
                {/* images */}
                <div className="sm:col-span-full">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Image-1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:bg-slate-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("image1", {
                          required: "Image-1 is required",
                        })}
                        id="image1"
                        className="block flex-1 border-0 dark:text-slate-200 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.image1 && errors.image1?.message}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Image-2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:bg-slate-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("image2", {
                          required: "Image-2 is required",
                        })}
                        id="image2"
                        className="block flex-1 border-0 dark:text-slate-200 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.image2 && errors.image2?.message}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="image3"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Image-3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:bg-slate-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("image3", {
                          required: "Image-3 is required",
                        })}
                        id="image3"
                        className="block flex-1  dark:text-slate-200 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.image3 && errors.image3?.message}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor="image4"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Image-4
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:bg-slate-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        {...register("image4", {
                          required: "Image-4 is required",
                        })}
                        id="image4"
                        className="block flex-1 dark:text-slate-200 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.image4 && errors.image4?.message}
                    </p>
                  </div>
                </div>
                {/* Brand */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset  dark:bg-slate-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <select
                        id="brand"
                        {...register("brand", {
                          required: "Brand is required",
                        })}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 dark:text-slate-200 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      >
                        <option value="" className="dark:bg-slate-600">
                          --Choose Brand--
                        </option>
                        {brands?.length > 0 &&
                          brands.map((brand, index) => (
                            <option
                              value={brand.value}
                              key={index}
                              className="dark:bg-slate-600"
                            >
                              {brand.label}
                            </option>
                          ))}
                      </select>
                    </div>
                    <p className="text-red-500">
                      {errors.brand && errors.brand?.message}
                    </p>
                  </div>
                </div>
                {/* Category */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  dark:bg-slate-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <select
                        id="category"
                        {...register("category", {
                          required: "Category is required",
                        })}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-slate-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      >
                        <option value="" className="dark:bg-slate-600">
                          --Choose Category--
                        </option>
                        {categories?.length > 0 &&
                          categories.map((category, index) => (
                            <option
                              value={category.value}
                              key={index}
                              className="dark:bg-slate-600"
                            >
                              {category.label}
                            </option>
                          ))}
                      </select>
                    </div>
                    <p className="text-red-500">
                      {errors.category && errors.category?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {/* {singleProduct && !singleProduct?.deleted && (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Delete
              </button>
            )} */}
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

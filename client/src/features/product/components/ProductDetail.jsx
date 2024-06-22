import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync, selectCart } from "../../cart/cartSlice";
import { toast } from "react-toastify";
import { selectAuth } from "../../auth/authSlice";
import { classNames, formatPrice } from "../../../app/constants";
import { singleProductReview } from "../../../pages/ProductDetailPage";
import { useQuery } from "@tanstack/react-query";
import { StarIcon } from "@heroicons/react/20/solid";
import { scrollToReviewSection } from "../../common/SmoothScroll";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { product } = useLoaderData();
  const { cartItems } = useSelector(selectCart);
  const { user } = useSelector(selectAuth);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const {
    data: { count: totalReviews, averageRating },
  } = useQuery(singleProductReview(product.id));
  const handleCart = (e) => {
    e.preventDefault();
    if (product.deleted) {
      return toast.error("Product not Available Can not add to cart");
    }
    if (product.stock === 0) {
      return toast.error("Item out of stock ");
    }
    if (cartItems.findIndex((item) => item.product.id === product.id) < 0) {
      if (product?.colors?.length > 0 && !selectedColor) {
        return toast.error("Please select a Color of Product");
      } else if (product?.sizes?.length > 0 && !selectedSize) {
        return toast.error("Please select a Size of Product");
      }
      const newItem = {
        product: product.id,
        color: selectedColor,
        size: selectedSize,
      };
      dispatch(addToCartAsync(newItem));
    } else {
      toast.info("Already added to Cart");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium text-gray-900 dark:text-slate-200">
                {product?.brand}
              </div>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
            <li className="text-sm">
              <a
                href={product?.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600 dark:hover:text-slate-300"
              >
                {product?.title}
              </a>
            </li>
          </ol>
        </nav>
        {product?.images.length > 0 && (
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {product?.images[0] && (
              <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center sm:block"
                />
              </div>
            )}
            <div className="lg:grid lg:grid-cols-1 lg:gap-y-8">
              {product?.images[1] && (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center sm:block"
                  />
                </div>
              )}
              {product?.images[2] && (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.images[2]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center sm:block"
                  />
                </div>
              )}
            </div>
            {product.images[3] && (
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product.images[3]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center sm:block"
                />
              </div>
            )}
          </div>
        )}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-slate-200">
              {product?.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className="flex  items-center">
              <p className="text-3xl tracking-tight text-gray-900 dark:text-slate-200">
                {formatPrice(product?.discountPrice)}
              </p>
              &nbsp;&nbsp;
              <p className="text-sm line-through tracking-tight text-gray-400">
                {formatPrice(product?.price)}
              </p>
              &nbsp;&nbsp;
              <span className="text-sm font-medium text-green-400">
                {product?.discountPercentage}% off
              </span>
            </div>

            {/* Rating-Star */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        averageRating > rating
                          ? "text-yellow-500"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="ml-2">{averageRating} out of 5 stars</span>
              </div>
              <a
                href="#review"
                className="underline text-blue-500 mt-1"
                onClick={(e) => scrollToReviewSection(e, "review")}
              >
                {totalReviews} reviews
              </a>
              <div className="flex justify-end flex-col">
                <div className="text-xs mt-1 text-gray-500">
                  {"*"} {product?.shippingInformation}
                </div>
                <div className="text-xs mt-1 text-gray-500">
                  {"*"} {product?.returnPolicy}
                </div>
              </div>
            </div>
            <form className="mt-10">
              {/* Colors */}
              {product?.colors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200">
                    Color
                  </h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.id}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10 dark:border-slate-100"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}
              {/* Sizes */}
              {product?.sizes?.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200">
                      Size
                    </h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.id}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {/* Todo: Haven't Used Yet */}
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {user ? (
                <button
                  type="submit"
                  onClick={handleCart}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              ) : (
                <Link
                  to="/login"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Login / Sign Up
                </Link>
              )}
              {product?.stock === 0 && (
                <div className="text-end mt-2 text-red-500">
                  item Out of stock..
                </div>
              )}
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900 dark:text-slate-200">
                  {product?.description}
                </p>
              </div>
            </div>

            {product?.highlights.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product?.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-400">
                        <span className="text-gray-600 dark:text-slate-400">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900 dark:text-slate-200">
                Details
              </h2>

              <div className="mt-4 space-y-6">
                {/* <p className="text-sm text-gray-600">{product.details}</p> */}
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

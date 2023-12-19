import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import {
  PRODUCT_TITLE_LENGTH,
  classNames,
  formatPrice,
} from "../../../app/constants";
import notFound from ".././../../assets/no-product.svg";

export default function ProductGrid() {
  const { products } = useLoaderData();

  if (products.length === 0) {
    return (
      <div className="lg:col-span-3 flex justify-start flex-col">
        <h2 className="text-center text-lg font-medium text-gray-900 dark:text-slate-200">
          No Product Found
        </h2>
        <img src={notFound} alt="no-product" />
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4 py-0  sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map((product) => (
              <Link
                to={`/product-detail/${product.id}`}
                key={product.id}
                onClick={scrollTo({ top: 0 })}
              >
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60 min-h-60">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm text-gray-700 dark:text-slate-200">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.title?.length > PRODUCT_TITLE_LENGTH
                          ? product.title.substring(0, PRODUCT_TITLE_LENGTH) +
                            "..."
                          : product.title}
                      </h3>
                      <div className="mt-1 text-sm text-gray-500 flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                product?.averageRating > rating
                                  ? "text-yellow-500"
                                  : "text-gray-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-slate-200">
                        {formatPrice(product?.discountPrice)}
                      </p>
                      <div className="inline">
                        <p className="text-sm font-medium text-gray-400 line-through">
                          {formatPrice(product?.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {product?.stock === 0 && (
                    <p className="text-sm text-red-400">Product Out of Stock</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array,
};

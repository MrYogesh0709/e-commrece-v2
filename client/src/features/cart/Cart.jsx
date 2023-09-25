import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";
import {
  openCart,
  removeCartItemAsync,
  selectCart,
  updateCartItemAsync,
} from "./cartSlice";
import { formatPrice } from "../../app/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems: products, isLoading } = useSelector(selectCart);
  const [openModal, setOpenModal] = useState(null);
  const totalAmount = Math.round(
    products.reduce(
      (totalAmount, item) =>
        item.product.discountPrice * item.quantity + totalAmount,
      0
    )
  );

  const totalItems = products.reduce(
    (totalItems, item) => item.quantity + totalItems,
    0
  );

  const handleQuantity = (e, item) => {
    dispatch(updateCartItemAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, itemId) => {
    dispatch(removeCartItemAsync(itemId));
  };

  return isLoading ? (
    <div className="h-screen">
      <CartSkeleton />
    </div>
  ) : (
    <>
      <div className="mx-auto  bg-white max-w-7xl px-4 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {products.length > 0 ? (
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.length > 0 &&
                  products.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-slate-200">
                            <h3>{item.product.title}</h3>
                            <p className="ml-4">
                              {formatPrice(
                                item?.quantity * item?.product?.discountPrice
                              )}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item?.product?.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex gap-2 items-center flex-wrap">
                            <div className="text-gray-500">
                              <label
                                htmlFor={`quantity-${item.product.id}`}
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                              >
                                Qty
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                className="rounded cursor-pointer py-1 px-8 dark:bg-slate-700 dark:text-slate-200"
                                value={item.quantity}
                                id={`quantity-${item.product.id}`}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </div>
                            {/* Color */}
                            {item?.color && (
                              <div className="flex  items-center gap-3">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200">
                                  Color
                                </h3>
                                <div
                                  className={
                                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                  }
                                >
                                  <span className="sr-only">
                                    {item.color.name}
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      item?.color.class,
                                      "h-8 w-8 rounded-full border border-black  dark:border-slate-200 border-opacity-10"
                                    )}
                                  />
                                </div>
                              </div>
                            )}
                            {/* Size */}
                            {item?.size && (
                              <div className="flex  items-center gap-3">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200">
                                  Size
                                </h3>
                                <div
                                  className={
                                    "group relative flex items-center justify-center rounded-md border py-1 px-4 text-sm font-medium uppercase hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none sm:flex-1 sm:py-1"
                                  }
                                >
                                  <span>{item?.size?.name}</span>
                                  <span
                                    className={
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    }
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex">
                            <Modal
                              title={`Remove ${item.product.title}`}
                              message={`Are you sure you want to Remove ${item.product.title} ?`}
                              dangerOption="Remove"
                              cancelOption="Cancel"
                              dangerAction={(e) => handleRemove(e, item.id)}
                              cancelAction={() => setOpenModal(-1)}
                              // ! See here don't pass true or false it will open lots of modal its in loop
                              showModal={openModal === item.id}
                            />
                            <button
                              type="button"
                              onClick={() => setOpenModal(item.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-medium text-center my-10">
                Your Cart is Empty
              </h2>
              <img
                src="https://res.cloudinary.com/dwyn6xk6f/image/upload/v1689182720/emptyCart_kstswg.png"
                alt="emptyCart"
                className="mx-auto max-w-full h-auto sm:max-w-md md:max-w-lg lg:max-w-xl"
              />
            </div>
          )}
        </div>

        {products.length > 0 ? (
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-slate-200">
              <p>Subtotal</p>
              <p>{formatPrice(totalAmount)}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-slate-200">
              <p>Total items in Cart</p>
              <p>
                {totalItems} {`${totalItems > 1 ? "Items" : "Item"}`}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link
                  to="/"
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => dispatch(openCart)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <Link
            to="/"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        )}
      </div>
    </>
  );
};

export default Cart;

function CartSkeleton() {
  return (
    <div className="mx-auto mt-12 bg-white animate-pulse dark:bg-slate-900 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
        <div className="skeleton-loader text-4xl my-5 font-bold tracking-tight text-gray-900 bg-slate-200 dark:text-slate-200 h-10 w-80 dark:bg-slate-700"></div>
        <div className="flow-root">
          <div role="list" className="-my-6 divide-y divide-gray-200">
            <div className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-900">
                <div className="skeleton-loader h-full dark:bg-slate-700 bg-slate-200"></div>
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div className="skeleton-loader h-4 w-40 mb-2 dark:bg-slate-700 bg-slate-200"></div>
                <div className="skeleton-loader h-3 w-20 dark:bg-slate-700 bg-slate-200"></div>
                <div className="skeleton-loader h-3 w-32 mt-2 dark:bg-slate-700 bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:dark:bg-slate-700  bg-slate-200 px-4 py-6 sm:px-6">
        <div className="skeleton-loader h-6 w-24 mb-4 dark:bg-slate-700 bg-slate-200"></div>
        <div className="skeleton-loader h-3 w-40 mb-2 dark:bg-slate-700 bg-slate-200"></div>
        <div className="skeleton-loader flex items-center justify-center px-6 py-3 h-6 w-40 dark:bg-slate-700 bg-slate-200"></div>
      </div>
    </div>
  );
}

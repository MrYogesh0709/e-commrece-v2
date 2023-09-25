import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  openCart,
  removeCartItemAsync,
  selectCart,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { createOrderAsync, selectOrder } from "../features/order/orderSlice";
import { addAddressAsync, selectUser } from "../features/user/userSlice";
import Modal from "../features/common/Modal";
import { toast } from "react-toastify";
import { formatPrice } from "../app/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Checkout = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(null);
  const { cartItems: products } = useSelector(selectCart);
  const { userInfo: user } = useSelector(selectUser);
  const { currentOrder } = useSelector(selectOrder);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const totalAmount = Math.round(
    products.reduce(
      (totalAmount, item) =>
        item.product.discountPrice * item.quantity + totalAmount,
      0
    )
  );

  const totalItems = products.reduce(
    (totalItems, product) => product.quantity + totalItems,
    0
  );

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const onSubmit = (data) => {
    try {
      dispatch(addAddressAsync({ ...data }));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (e, itemId) => {
    dispatch(removeCartItemAsync(itemId));
  };

  const handleOrder = () => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items: products,
        totalAmount,
        totalItems,
        user,
        paymentMethod,
        selectedAddress,
      };
      dispatch(createOrderAsync(order));
    } else {
      toast.error("Select a payment method and Address");
    }
  };

  if (products.length === 0) return <Navigate to={"/"} replace={true} />;
  if (currentOrder && currentOrder.paymentMethod === "cash")
    return <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />;
  if (currentOrder && currentOrder.paymentMethod === "card")
    return <Navigate to={`/stripe-pay`} replace={true} />;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3 mt-12">
          <form
            noValidate
            className="bg-white dark:bg-slate-900"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-3xl font-semibold leading-7 text-gray-900 dark:text-slate-200">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-400">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                          maxLength: {
                            value: 20,
                            message: "Name must be less than 20 characters",
                          },
                        })}
                        id="name"
                        autoComplete="given-name"
                        className="block w-full  dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.name && errors.name?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-5">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "Email Address is required",
                          pattern: {
                            // eslint-disable-next-line no-useless-escape
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: "Email not valid",
                          },
                        })}
                        type="email"
                        autoComplete="email"
                        className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.email && errors.email?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                        type="tel"
                        autoComplete="phone"
                        className="block w-full  dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.phone && errors.phone?.message}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street", {
                          required: "Street Address is required",
                          maxLength: {
                            value: 200,
                            message: "Street address must be under 200 words",
                          },
                        })}
                        id="street"
                        autoComplete="street-address"
                        className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.street && errors.street?.message}
                    </p>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="city"
                        {...register("city", {
                          required: "City is required",
                          maxLength: {
                            value: 20,
                            message: "City be under 30 characters",
                          },
                        })}
                        autoComplete="address-level2"
                        className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.city && errors.city?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state", {
                          required: "State is required",
                          maxLength: {
                            value: 20,
                            message: "State be under 20 characters",
                          },
                        })}
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.state && errors.state?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block dark:text-slate-200 text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("pinCode", {
                          required: "Pin-code is required",
                        })}
                        id="pinCode"
                        autoComplete="postal-code"
                        className="block w-full rounded-md dark:bg-slate-600 dark:text-slate-200 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.pinCode && errors.pinCode?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add address
                </button>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">
                  Address
                </h2>
                {user?.addresses?.length > 0 ? (
                  <>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-400">
                      Choose from Existing address
                    </p>

                    <ul
                      role="list"
                      className="divide-y divide-gray-100 dark:divide-gray-700"
                    >
                      {user.addresses.map((address) => (
                        <li
                          key={address.id}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex gap-x-4 items-center">
                            <input
                              name="address"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              onChange={() => setSelectedAddress(address)}
                              value={address}
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-400">
                                {address.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-400">
                                {address.pinCode}
                              </p>
                            </div>
                          </div>
                          <div className="sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900 dark:text-slate-200">
                              Phone : {address.phone}
                            </p>
                            <p className="text-sm leading-6 text-gray-900 dark:text-slate-200">
                              {address.city}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-1 leading-6 text-gray-600 dark:text-slate-400">
                    Add a new address
                  </p>
                )}

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">
                      Payments Method
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-400">
                      Choose One
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          type="radio"
                          onChange={(e) => handlePayment(e)}
                          value="cash"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={paymentMethod === "cash"}
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                        >
                          Cash Payment
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payments"
                          onChange={(e) => handlePayment(e)}
                          type="radio"
                          value="card"
                          checked={paymentMethod === "card"}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 dark:bg-slate-600 rounded-lg">
            <div className="border-gray-200 px-0 py-6 sm:px-0">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 dark:text-slate-200">
                Cart
              </h1>

              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products?.length > 0 &&
                    products.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item?.product?.thumbnail}
                            alt={item?.product?.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-slate-300">
                              <h3>{item?.product?.title}</h3>
                              <p className="ml-4">
                                {formatPrice(
                                  item?.quantity * item?.product?.discountPrice
                                )}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                              {item?.product?.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex gap-2 items-center flex-wrap">
                              <div className="text-gray-500">
                                <span className="inline  text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
                                  Qty :
                                </span>
                                <span className="dark:text-slate-300">
                                  {" "}
                                  {item?.quantity}
                                </span>
                              </div>
                              {/* Color */}
                              {item?.color && (
                                <div className="flex  items-center gap-3">
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-slate-300">
                                    Color
                                  </h3>
                                  <div
                                    className={
                                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                    }
                                  >
                                    <span className="sr-only">
                                      {item?.color.name}
                                    </span>
                                    <span
                                      aria-hidden="true"
                                      className={classNames(
                                        item?.color.class,
                                        "h-8 w-8 rounded-full border border-black dark:border-slate-200 border-opacity-10"
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
                                      "group relative flex items-center justify-center rounded-md border py-1 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-1 dark:hover:bg-gray-400 dark:text-slate-200"
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
                                className="font-medium text-red-400 hover:text-red-500"
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
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-slate-200">
                <p>Subtotal</p>
                <p>{formatPrice(totalAmount)}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-slate-200">
                <p>Total items in Cart</p>
                <p>
                  {totalItems} Item{`${totalItems > 1 ? "s" : ""}`}
                </p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <div
                  onClick={handleOrder}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../common/Modal";
import {
  addAddressAsync,
  editAddressAsync,
  removeAddressAsync,
  selectUser,
} from "../userSlice";
import { useDispatch, useSelector } from "react-redux";

const UserProfileAddress = () => {
  const dispatch = useDispatch();
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const { userInfo: user, isLoading } = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("address", address.address);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  const handleEdit = (data, address) => {
    try {
      dispatch(editAddressAsync({ data, addressId: address.id }));
      setSelectedEditIndex(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const addAddress = () => {
    setShowAddAddressForm(true);
    setSelectedEditIndex(-1);
  };

  const handleAdd = (address) => {
    try {
      dispatch(addAddressAsync({ ...address }));
      setShowAddAddressForm(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (e, addressId) => {
    dispatch(removeAddressAsync(addressId));
  };

  return (
    <div className="mx-auto  bg-white dark:bg-slate-900 max-w-7xl px-4 sm:px-6 lg:px-8">
      <hr className="my-2" />
      <button
        onClick={addAddress}
        className="rounded-md bg-green-600 my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add Address
      </button>
      <p className="my-1 text-xl text-gray-900 font-semibold dark:text-slate-200">
        Your Address :
      </p>
      {/* Add Address */}
      {showAddAddressForm ? (
        <form
          noValidate
          className="bg-white dark:bg-slate-900"
          onSubmit={handleSubmit(handleAdd)}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
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
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Name must be at least 20 characters",
                        },
                      })}
                      id="name"
                      autoComplete="given-name"
                      className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          message:
                            "Street address must be at least 200 characters",
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
                          value: 50,
                          message: "City be at least 50 characters",
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
                          value: 50,
                          message: "State be at least 50 characters",
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
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
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
                      className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                onClick={() => {
                  setShowAddAddressForm(false);
                  reset();
                }}
                className="rounded-md  px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-gray-500   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add address
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {/* Edit Address */}
      {user?.addresses?.length > 0 &&
        user.addresses.map((address, index) => (
          <div key={address.id}>
            {selectedEditIndex === index ? (
              <form
                noValidate
                className="bg-white dark:bg-slate-900"
                // !Look at it how it was passed!
                onSubmit={handleSubmit((data) =>
                  handleEdit({ ...data }, address)
                )}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
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
                                value: 50,
                                message: "Name must be at least 50 characters",
                              },
                            })}
                            id="name"
                            autoComplete="given-name"
                            className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              required: "Phone number  is required",
                            })}
                            type="tel"
                            autoComplete="phone"
                            className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                message:
                                  "Street address must be in 200 characters",
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
                                value: 50,
                                message: "City be at least 50 characters",
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
                                value: 50,
                                message: "State must be in 20 characters",
                              },
                            })}
                            id="state"
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
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
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
                            className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      type="submit"
                      onClick={() => setSelectedEditIndex(-1)}
                      className="rounded-md  px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-gray-500   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit address
                    </button>
                  </div>
                </div>
              </form>
            ) : null}

            <div className="flex justify-between gap-x-6 py-5 px-5">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">
                    {address?.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-400">
                    {address?.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-400">
                    {address?.pinCode}
                  </p>
                </div>
              </div>
              <div className="sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900 dark:text-slate-200">
                  Phone : {address?.phone}
                </p>
                <p className="text-sm leading-6 text-gray-900 dark:text-slate-200">
                  {address?.city}
                </p>
              </div>
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => handleEditForm(index)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Edit
                </button>
                <Modal
                  title={`Remove Address`}
                  message={`Are you sure you want to Remove the Address ?`}
                  dangerOption="Remove"
                  cancelOption="Cancel"
                  showModal={openModal === address.id}
                  cancelAction={() => setOpenModal(-1)}
                  dangerAction={(e) => handleRemove(e, address.id)}
                />
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setOpenModal(address.id)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserProfileAddress;

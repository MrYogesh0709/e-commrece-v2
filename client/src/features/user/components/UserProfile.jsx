import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import UserProfileImage from "./UserProfileImage";
import { firstLatterCapital } from "../../../app/constants";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const { userInfo: user, isLoading } = useSelector(selectUser);
  console.log(user);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const handleEditForm = () => {
    setValue("firstName", user.name.firstName);
    setValue("lastName", user.name.lastName);
    setValue("email", user.email);
    setValue("phone", user.phone);
  };

  const handleForm = () => {
    handleEditForm();
    setShowAddAddressForm((state) => !state);
  };

  const handleEdit = (data) => {
    try {
      dispatch(updateUserAsync({ ...data }));
      setShowAddAddressForm(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto mt-12 bg-white dark:bg-slate-900 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex sm:flex-row  items-center justify-between  mb-4 flex-col-reverse ">
          <div className="flex flex-col">
            <h1 className="text-xl my-2 font-bold tracking-tight text-gray-900 dark:text-slate-200">
              Name : {user?.name?.firstName || "New User"}{" "}
              {user?.name?.lastName}
            </h1>
            <h3 className="my-2 font-bold tracking-tight text-gray-900 dark:text-slate-200">
              Email Address : {user?.email}
            </h3>
            {user?.phone && (
              <h3 className="my-2 font-bold tracking-tight text-gray-900 dark:text-slate-200">
                Phone : {user?.phone}
              </h3>
            )}
            {user?.role === "admin" && (
              <h3 className="text-xl my-2 font-bold tracking-tight text-gray-900 dark:text-slate-200">
                Role: {firstLatterCapital(user?.role)}
              </h3>
            )}
            <button
              onClick={handleForm}
              className="rounded-md bg-green-600 my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit Profile
            </button>
          </div>
          <div>
            <div className="flex flex-center flex-col">
              <UserProfileImage />
            </div>
          </div>
        </div>
        <hr className="mb-2" />
        {/* Edit User Profile */}
        {showAddAddressForm && (
          <form
            noValidate
            className="bg-white dark:bg-slate-900"
            onSubmit={handleSubmit(handleEdit)}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="FirstName"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      FirstName
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("firstName", {
                          required: "FirstName is required",
                          maxLength: {
                            value: 25,
                            message: "FirstName must be under 25 characters",
                          },
                        })}
                        id="FirstName"
                        autoComplete="given-name"
                        className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.firstName && errors.firstName?.message}
                      </p>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="LastName"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      LastName
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("lastName", {
                          maxLength: {
                            value: 25,
                            message: "LastName must be under 25 characters",
                          },
                        })}
                        id="LastName"
                        autoComplete="given-name"
                        className="block w-full  dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.lastName && errors.lastName?.message}
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
                        {...register("phone")}
                        type="tel"
                        autoComplete="phone"
                        className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-500">
                        {errors.phone && errors.phone?.message}
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
                  disabled={isLoading}
                  className="rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { selectUser, updatePasswordAsync } from "../userSlice";

const UserPasswordUpdate = () => {
  const dispatch = useDispatch();
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const { isLoading } = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const openForm = () => {
    setShowAddAddressForm((state) => !state);
  };

  const handlePassword = (data) => {
    try {
      dispatch(
        updatePasswordAsync({
          currentPassword: data.currentPassword,
          password: data.password,
        })
      );
      setShowAddAddressForm(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto  bg-white dark:bg-slate-900 max-w-7xl px-4 sm:px-6 lg:px-8">
      <button
        onClick={openForm}
        className="rounded-md bg-green-600 my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Change Password
      </button>
      {showAddAddressForm && (
        <form
          noValidate
          className="bg-white dark:bg-slate-900 px-5"
          onSubmit={handleSubmit(handlePassword)}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* current password */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium leading-6 dark:text-slate-200 text-gray-900"
                  >
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    {...register("currentPassword", {
                      required: "CurrentPassword is required",
                    })}
                    type="password"
                    className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500">
                    {errors?.currentPassword?.message}
                  </p>
                </div>
                {/* Password */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 dark:text-slate-200 text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        // eslint-disable-next-line no-useless-escape
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: (
                          <span>
                            - At least 8 characters
                            <br />
                            - Must contain at least 1 uppercase letter, 1
                            lowercase letter, and 1 number
                            <br />- Can contain special characters
                          </span>
                        ),
                      },
                    })}
                    type="password"
                    className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500">
                    {errors.password && errors.password?.message}
                  </p>
                </div>
                {/* Confirm-Password */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Confirm Password
                  </label>
                  <div>
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirm-Password is required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password does not match",
                      })}
                      type="password"
                      required
                      className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">
                      {errors.confirmPassword &&
                        errors.confirmPassword?.message}
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
                className="rounded-md  px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-gray-500 dark:hover:bg-gray-400 dark:text-slate-200  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserPasswordUpdate;

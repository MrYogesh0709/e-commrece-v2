import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  selectAuth,
  verifyMailAgainAsync,
} from "../authSlice";
import logo from "../../../assets/logo.png";
import { toast } from "react-toastify";
import { EyeIcon } from "@heroicons/react/24/outline";

const SignUp = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, errorSignUp, status, msg } = useSelector(selectAuth);

  const [emailValue, setEmailValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const onSubmit = (data) => {
    setEmailValue(data.email);
    try {
      dispatch(
        createUserAsync({
          email: data.email,
          password: data.password,
        })
      );
      setShowButton(true);
    } catch (error) {
      console.log(error);
    }
  };

  const sendVerificationMail = async () => {
    if (!emailValue) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await dispatch(verifyMailAgainAsync({ email: emailValue }));
      setShowButton(false);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="E-commerce" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-200">
            Create a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
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
                  className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
                <p className="text-red-500">
                  {errors.email && errors.email?.message}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={"/forgot-password"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 "
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative flex items-center">
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
                  type={showPassword ? "password" : "text"}
                  autoComplete="current-password"
                  className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute right-2">
                  <EyeIcon
                    className="w-6 h-6 hover:text-gray-100 text-gray-300"
                    onClick={handleShowPassword}
                  />
                </div>
              </div>
              <p className="text-red-500">
                {errors.password && errors.password?.message}
              </p>
            </div>

            <div className="">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2 relative flex items-center">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm-Password is required",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Password does not match",
                  })}
                  type={showConfirmPassword ? "password" : "text"}
                  required
                  className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute right-2">
                  <EyeIcon
                    className="w-6 h-6 hover:text-gray-100 text-gray-300"
                    onClick={handleShowConfirmPassword}
                  />
                </div>
              </div>
              <p className="text-red-500">
                {errors.confirmPassword && errors.confirmPassword?.message}
              </p>

              <div className="text-sm"></div>
              {errorSignUp && <p className="text-red-500">{errorSignUp}</p>}
              {msg && (
                <p className="text-indigo-600 dark:text-indigo-300">{msg}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {status === "loading" ? "Loading" : "Sign Up"}
              </button>
              {showButton && (
                <button
                  type="button"
                  onClick={sendVerificationMail}
                  className="font-semibold text-indigo-600 hover:text-indigo-500  dark:text-indigo-300"
                >
                  Didn&lsquo;t receive mail? try again..
                </button>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;

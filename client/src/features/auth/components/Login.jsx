import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, selectAuth } from "../authSlice";
import logo from "../../../assets/logo.png";
import { EyeIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, errorLogin, status } = useSelector(selectAuth);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    try {
      dispatch(loginUserAsync({ email: data.email, password: data.password }));
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return <Navigate to="/admin" replace={true} />;
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-white dark:bg-slate-900 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="E-commerce" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-200">
          Sign in to your account
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
                })}
                type="email"
                autoComplete="email"
                required
                className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block text-sm font-medium leading-6 dark:text-slate-200 text-slate-900 "
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to={"/forgot-password"}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
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
                })}
                type={showPassword ? "password" : "text"}
                autoComplete="current-password"
                required
                className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute right-2">
                <EyeIcon
                  className="w-6 h-6 hover:text-gray-100 text-gray-300"
                  onClick={handleShowPassword}
                />
              </div>
              <p className="text-red-500">
                {errors.password && errors.password?.message}
              </p>
            </div>
            {errorLogin && <p className="text-red-500">{errorLogin}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                status === "loading"
                  ? "dark:bg-indigo-500"
                  : "dark:bg-indigo-700"
              }`}
            >
              {status === "loading" ? "Loading" : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member ?&nbsp;
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

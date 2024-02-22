import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { resetCartAsync } from "../features/cart/cartSlice";

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(resetCartAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  if (!orderId) return <Navigate to="/" replace={true} />;

  return (
    <main className="grid min-h-full place-items-center bg-white dark:bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-5xl  text-indigo-600 font-bold">
          Order Successfully Placed
        </p>
        <h1 className="mt-4 text-basefont-semibold tracking-tight text-gray-900 dark:text-slate-200 sm:text-3xl">
          Your Order ID #{orderId}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-slate-400">
          You can check your order in My Account {">"}{" "}
          <Link className="font-bold text-blue-500" to="/orders">
            My Orders
          </Link>
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={"/"}
            replace={true}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

OrderSuccessPage.propTypes = {
  order: PropTypes.any,
};
export default OrderSuccessPage;

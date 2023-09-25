import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, verifyMailAsync } from "../authSlice";
import Loader from "../../common/Loader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyMail = () => {
  const dispatch = useDispatch();
  const { mailError, verifyMailStatus: status } = useSelector(selectAuth);
  const query = useQuery();

  useEffect(() => {
    dispatch(
      verifyMailAsync({
        verificationToken: query.get("token"),
        email: query.get("email"),
      })
    );
  }, []);

  if (status) {
    return <Loader />;
  }

  if (mailError) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h4>There was an error, please double check your verification link </h4>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-200">
        Account Confirmed
      </h2>
      <Link
        to="/"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 text-center"
      >
        Home
      </Link>
    </div>
  );
};

export default VerifyMail;

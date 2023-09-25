import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../../common/Loader";
import { selectAuth } from "../authSlice";

const ProtectedAdmin = ({ children }) => {
  const { user, status } = useSelector(selectAuth);
  if (status === "loading") return <Loader />;
  if (!user) return <Navigate to={"/login"} replace={true} />;
  if (user && user.role !== "admin") return <Navigate to="/" replace={true} />;
  return children;
};

ProtectedAdmin.propTypes = {
  children: PropTypes.element,
};
export default ProtectedAdmin;

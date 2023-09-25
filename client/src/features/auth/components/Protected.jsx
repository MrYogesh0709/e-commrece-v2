import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { selectAuth } from "../authSlice";
import Loader from "../../common/Loader";

const Protected = ({ children }) => {
  const { user, status } = useSelector(selectAuth);
  if (status === "loading") return <Loader />;
  if (!user) return <Navigate to={"/login"} replace={true} />;
  return children;
};

Protected.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Protected;

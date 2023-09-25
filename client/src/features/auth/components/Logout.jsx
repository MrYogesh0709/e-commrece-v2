import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signOutUserAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOutUserAsync());
  }, []);
  return <>{!user && <Navigate to="/login" />}</>;
};

export default Logout;

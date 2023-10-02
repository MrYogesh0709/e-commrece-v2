import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Loader from "../features/common/Loader";

const HomeLayout = () => {
  const { pathname } = useLocation();
  const { state } = useNavigation();
  const titleMap = {
    "/": "Products",
    "/cart": "Cart",
    "/orders": "Orders",
    "/profile": "Profile",
    "/admin/orders": "All Orders",
  };

  const title = titleMap[pathname] || null;

  return (
    <>
      <Navbar title={title}>
        {state === "loading" ? <Loader /> : <Outlet />}
      </Navbar>
      <Footer />
    </>
  );
};

export default HomeLayout;

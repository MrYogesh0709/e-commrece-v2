import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import { Outlet, useLocation } from "react-router-dom";

const HomeLayout = () => {
  const { pathname } = useLocation();

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
        <Outlet />
      </Navbar>
      <Footer />
    </>
  );
};

export default HomeLayout;

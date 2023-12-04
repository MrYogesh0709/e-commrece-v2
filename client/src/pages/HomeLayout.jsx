import React, { Suspense } from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../features/common/Loader";

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
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Navbar>
      <Footer />
    </>
  );
};

export default HomeLayout;

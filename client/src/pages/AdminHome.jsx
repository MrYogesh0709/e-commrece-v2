import React from "react";
import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

const AdminHome = () => {
  return (
    <>
      <Navbar title={"Products"}>
        <AdminProductList />
      </Navbar>
      <Footer />
    </>
  );
};

export default AdminHome;

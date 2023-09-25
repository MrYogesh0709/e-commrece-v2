import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminOrder from "../features/admin/components/AdminOrder";
import Footer from "../features/common/Footer";

const AdminOrderPage = () => {
  return (
    <>
      <Navbar title="All Orders">
        <AdminOrder />
      </Navbar>
      <Footer></Footer>
    </>
  );
};

export default AdminOrderPage;

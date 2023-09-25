import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductDetail from "../features/admin/components/AdminProductDetail";
import Review from "../features/Review/component/Review";

const AdminProductDetailPage = () => {
  return (
    <Navbar>
      <AdminProductDetail />
      <Review />
    </Navbar>
  );
};

export default AdminProductDetailPage;

import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductForm from "../features/admin/components/ProductForm";
import Footer from "../features/common/Footer";

const AdminProductFormPage = () => {
  return (
    <>
      <Navbar>
        <ProductForm />
      </Navbar>
      <Footer />
    </>
  );
};

export default AdminProductFormPage;

import React from "react";
import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import axios from "axios";

export const loader = async () => {
  try {
    const brands = await axios("/api/v1/brands");
    const categories = await axios("/api/v1/categories");
    return { brands, categories };
  } catch (error) {
    console.error(error);
  }
  return null;
};

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

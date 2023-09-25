import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";

const Home = () => {
  return (
    <>
      <Navbar title="Products">
        <ProductList />
      </Navbar>
      <Footer />
    </>
  );
};

export default Home;

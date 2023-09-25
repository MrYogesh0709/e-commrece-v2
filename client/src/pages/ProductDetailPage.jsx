import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";
import Footer from "../features/common/Footer";
import Review from "../features/Review/component/Review";

const ProductDetailPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetail />
        <Review />
      </Navbar>
      <Footer />
    </>
  );
};

export default ProductDetailPage;

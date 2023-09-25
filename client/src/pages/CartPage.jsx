import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import Cart from "../features/cart/Cart";

const CartPage = () => {
  return (
    <>
      <Navbar title="Cart">
        <Cart />
      </Navbar>
      <Footer />
    </>
  );
};

export default CartPage;

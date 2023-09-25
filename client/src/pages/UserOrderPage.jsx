import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrder from "../features/user/components/UserOrder";
import Footer from "../features/common/Footer";

const UserOrderPage = () => {
  return (
    <>
      <Navbar title="Order">
        <UserOrder />
      </Navbar>
      <Footer />
    </>
  );
};

export default UserOrderPage;

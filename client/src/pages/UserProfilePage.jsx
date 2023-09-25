import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";
import UserProfileAddress from "../features/user/components/UserProfileAddress";
import UserPasswordUpdate from "../features/user/components/UserPasswordUpdate";

const UserProfilePage = () => {
  return (
    <Navbar title="Profile">
      <UserProfile />
      <UserPasswordUpdate />
      <UserProfileAddress />
    </Navbar>
  );
};

export default UserProfilePage;

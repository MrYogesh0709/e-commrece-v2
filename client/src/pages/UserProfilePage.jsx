import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import UserProfileAddress from "../features/user/components/UserProfileAddress";
import UserPasswordUpdate from "../features/user/components/UserPasswordUpdate";

const UserProfilePage = () => {
  return (
    <>
      <UserProfile />
      <UserPasswordUpdate />
      <UserProfileAddress />
    </>
  );
};

export default UserProfilePage;

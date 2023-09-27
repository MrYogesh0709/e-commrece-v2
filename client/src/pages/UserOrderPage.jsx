import React from "react";
import UserOrder from "../features/user/components/UserOrder";
import axios from "axios";

const userOrderQuery = () => {
  return {
    queryKey: ["user_order"],
    queryFn: () => axios("/api/v1/order/user"),
  };
};

export const loader = (queryClient) => async () => {
  const { data: orders } = await queryClient.ensureQueryData(userOrderQuery());
  return { orders };
};

const UserOrderPage = () => {
  return <UserOrder />;
};

export default UserOrderPage;

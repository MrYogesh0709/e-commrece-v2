import React from "react";
import AdminOrder from "../features/admin/components/AdminOrder";
import axios from "axios";
import { ITEMS_PER_PAGE } from "../app/constants";

export const AllOrdersQuery = (queryParams) => {
  const { _page, _sort, _order } = queryParams;
  return {
    queryKey: ["allOrders", _page ?? 1, _order ?? "", _sort ?? ""],
    queryFn: () =>
      axios(`/api/v1/order/admin?_limit=${ITEMS_PER_PAGE}`, {
        params: queryParams,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      const response = await queryClient.ensureQueryData(
        AllOrdersQuery(params)
      );
      const totalItems = response.headers.get("X-Total-Count");
      const orders = response.data;
      return { orders, totalItems };
    } catch (error) {
      console.log(error);
    }
    return null;
  };

const AdminOrderPage = () => {
  return <AdminOrder />;
};

export default AdminOrderPage;

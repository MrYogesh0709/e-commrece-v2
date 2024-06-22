import axios from "axios";
import { redirectDocument } from "react-router-dom";

export const updateOrderAction =
  () =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await axios.patch(`/api/v1/order/${params.id}`, data);
    } catch (error) {
      return error;
    }
    return redirectDocument("/admin/orders");
  };

export const checkoutAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post("/api/v1/order", data);
    return response.data;
  } catch (error) {
    return {
      error: error?.response?.data?.msg || "An error occurred",
    };
  }
};

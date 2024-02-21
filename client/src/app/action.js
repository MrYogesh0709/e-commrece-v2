import axios from "axios";
import { redirectDocument } from "react-router-dom";

export const action =
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

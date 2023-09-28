import React from "react";
import ProductForm from "../features/admin/components/ProductForm";
import axios from "axios";

const singleProductEditForm = (id) => {
  return {
    queryKey: ["singleProductEditForm", id],
    queryFn: () => axios(`/api/v1/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { data: singleProduct } = await queryClient.ensureQueryData(
        singleProductEditForm(params.id)
      );
      return { singleProduct };
    } catch (error) {
      console.log(error);
    }
    return null;
  };

const AdminProductFormPage = () => {
  return <ProductForm />;
};

export default AdminProductFormPage;

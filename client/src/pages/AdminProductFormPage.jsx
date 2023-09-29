import React from "react";
import ProductForm from "../features/admin/components/ProductForm";
import { allBrands, allCategory } from "./HomeLayout";
import { singleProductQuery } from "./ProductDetailPage";

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { data: brands } = await queryClient.ensureQueryData(allBrands());
      const { data: categories } = await queryClient.ensureQueryData(
        allCategory()
      );
      const { data: singleProduct } = await queryClient.ensureQueryData(
        singleProductQuery(params.id)
      );
      return { singleProduct, brands, categories };
    } catch (error) {
      console.log(error);
    }
    return null;
  };

const AdminProductFormPage = () => {
  return <ProductForm />;
};

export default AdminProductFormPage;

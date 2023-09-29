import React from "react";
import ProductDetail from "../features/product/components/ProductDetail";
import Review from "../features/Review/component/Review";
import axios from "axios";

export const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => axios(`/api/v1/products/${id}`),
  };
};

const singleProductReview = (id) => {
  return {
    queryKey: ["review", id],
    queryFn: () => axios(`/api/v1/review/product/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { data: product } = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    const {
      data: { reviews, count },
    } = await queryClient.ensureQueryData(singleProductReview(params.id));
    return { product, reviews, count };
  };

const ProductDetailPage = () => {
  return (
    <>
      <ProductDetail />
      <Review />
    </>
  );
};

export default ProductDetailPage;

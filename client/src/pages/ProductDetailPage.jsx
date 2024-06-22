import React, { Suspense } from "react";
import ProductDetail from "../features/product/components/ProductDetail";
import axios from "axios";
import { singleProductQuery } from "../app/reactQuery";
const ReviewComponent = React.lazy(() =>
  import("../features/Review/component/ReviewComponent")
);

export const singleProductReview = (id) => {
  return {
    queryKey: ["review", id],
    queryFn: async () => {
      const {
        data: { reviews, count, averageRating },
      } = await axios(`/api/v1/review/product/${id}`);
      return { reviews, count, averageRating };
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { data: product } = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    await queryClient.ensureQueryData(singleProductReview(params.id));
    return { product };
  };

const ProductDetailPage = () => {
  return (
    <>
      <ProductDetail />
      <Suspense fallback={<div>Loading Reviews...</div>}>
        <ReviewComponent />
      </Suspense>
    </>
  );
};

export default ProductDetailPage;

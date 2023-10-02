import React, { useEffect, useState } from "react";
import ProductDetail from "../features/product/components/ProductDetail";
import axios from "axios";
import { singleProductQuery } from "../app/reactQuery";

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
  const [ReviewComponent, setReviewComponent] = useState(null);
  useEffect(() => {
    // Dynamic import this is because of promise :->Standard Way -> instead use React.lazy
    import("../features/Review/component/Review").then((module) => {
      const Review = module.default;
      setReviewComponent(<Review />);
    });
  }, []);
  return (
    <>
      <ProductDetail />
      {/* <Review /> */}
      {/* Dynamically import ReviewComponent */}
      {ReviewComponent}
    </>
  );
};

export default ProductDetailPage;

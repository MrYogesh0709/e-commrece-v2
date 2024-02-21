import {
  AllOrdersQuery,
  allBrands,
  allCategory,
  allProductsQuery,
  singleProductQuery,
} from "./reactQuery";
import axios from "axios";

export const UserOrderLoader = async () => {
  const { data: orders } = await axios("/api/v1/order/user");
  return { orders };
};

export const AdminHomeLoader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const { data: brands } = await queryClient.ensureQueryData(allBrands());
      const { data: categories } = await queryClient.ensureQueryData(
        allCategory()
      );
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      const response = await queryClient.ensureQueryData(
        allProductsQuery(params)
      );
      const totalItems = await response.headers.get("X-Total-Count");
      const products = response.data;
      return { brands, categories, products, totalItems };
    } catch (error) {
      console.error(error);
    }
    return null;
  };

export const AdminOrderLoader =
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

export const AdminProductAddLoader = (queryClient) => async () => {
  try {
    const { data: brands } = await queryClient.ensureQueryData(allBrands());
    const { data: categories } = await queryClient.ensureQueryData(
      allCategory()
    );
    return { brands, categories };
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const AdminProductEditLoader =
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

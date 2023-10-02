import axios from "axios";
import { ITEMS_PER_PAGE } from "./constants";

export const allBrands = () => {
  return {
    queryKey: ["brands"],
    queryFn: () => axios(`/api/v1/brands`),
  };
};

export const allCategory = () => {
  return {
    queryKey: ["category"],
    queryFn: () => axios(`/api/v1/categories`),
  };
};

export const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => axios(`/api/v1/products/${id}`),
  };
};

export const userOrderQuery = () => {
  return {
    queryKey: ["user_order"],
    queryFn: () => axios("/api/v1/order/user"),
  };
};

export const allProductsQuery = (queryParams) => {
  const { search, _page, category, _sort, _order, brand } = queryParams;
  return {
    queryKey: [
      "all_products",
      search ?? "",
      category ?? "",
      brand ?? "",
      _sort ?? "",
      _page ?? 1,
      _order ?? "",
    ],
    queryFn: () =>
      axios(`/api/v1/products?_limit=${ITEMS_PER_PAGE}&admin=true`, {
        params: queryParams,
      }),
  };
};

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

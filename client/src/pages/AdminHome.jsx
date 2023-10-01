import React, { useState } from "react";
import axios from "axios";
import { ITEMS_PER_PAGE } from "../app/constants";
import MobileFilter from "../features/product/components/MobileFilter";
import SearchBar from "../features/product/components/SearchBar";
import AdminProductGrid from "../features/admin/components/AdminProductGrid";
import { allBrands, allCategory } from "./HomeLayout";

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

export const loader =
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

const AdminHome = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <>
      <div className="bg-white dark:bg-slate-900">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
          {/* SearchBar */}
          <SearchBar />
          {/* Big screen */}
          <AdminProductGrid setMobileFiltersOpen={setMobileFiltersOpen} />
        </div>
      </div>
    </>
  );
};

export default AdminHome;

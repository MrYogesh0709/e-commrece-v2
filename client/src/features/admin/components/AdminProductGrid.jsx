import React from "react";
import { Form } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { ProductGrid } from "./ProductGrid";
import { Filter } from "../../product/components/Filter";
import PropTypes from "prop-types";
import Sort from "../../product/components/Sort";

const AdminProductGrid = ({ setMobileFiltersOpen }) => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Sorting */}
      <Sort setMobileFiltersOpen={setMobileFiltersOpen} />
      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/*Desktop Filters */}
          <Form className="hidden lg:block">
            <Filter />
          </Form>
          {/* Product grid */}
          <ProductGrid />
        </div>
      </section>
      {/* pagination start */}
      <Pagination />
    </main>
  );
};

export default AdminProductGrid;
AdminProductGrid.propTypes = {
  setMobileFiltersOpen: PropTypes.func,
};

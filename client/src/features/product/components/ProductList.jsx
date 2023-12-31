import React from "react";
import { Form } from "react-router-dom";
import PropTypes from "prop-types";
import { Filter } from "./Filter";
import ProductGrid from "./ProductGrid";
import Pagination from "../../common/Pagination";
import Sort from "./Sort";

const ProductList = ({ setMobileFiltersOpen }) => {
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

      <Pagination />
    </main>
  );
};

export default ProductList;

ProductList.propTypes = {
  setMobileFiltersOpen: PropTypes.func,
};

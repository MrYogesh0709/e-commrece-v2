import React, {
  useEffect,
  Fragment,
  useState,
  useCallback,
  useRef,
} from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  StarIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ITEMS_PER_PAGE,
  PRODUCT_TITLE_LENGTH,
  formatPrice,
} from "../../../app/constants";
import {
  fetchProductsByFiltersAsync,
  selectAllProducts,
} from "../../product/productSlice";
import Pagination from "../../common/Pagination";
import notFound from ".././../../assets/no-product.svg";
import { SkeletonProductGrid } from "../../product/components/ProductGrid";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  // { name: "Newest",sort:"rating", current: false },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminProductList = () => {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { products, totalItems, productLoading } =
    useSelector(selectAllProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const searchRef = useRef("");
  const { brands, categories } = useLoaderData();
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const handleFilter = useCallback(
    (e, section, option) => {
      setFilter((prevFilter) => {
        const newFilter = { ...prevFilter };
        if (e.target.checked) {
          if (newFilter[section.id]) {
            newFilter[section.id].push(option.value);
          } else {
            newFilter[section.id] = [option.value];
          }
        } else {
          const index = newFilter[section.id].findIndex(
            (el) => el === option.value
          );
          newFilter[section.id].splice(index, 1);
        }
        return newFilter;
      });
    },
    [setFilter]
  );

  const handleSort = useCallback(
    (e, option) => {
      e.preventDefault();
      const newSort = {
        ...sort,
        _sort: option["sort"],
        _order: option["order"],
      };
      setSort(newSort);
    },
    [sort]
  );

  const handlePage = useCallback(
    (page) => {
      setPage(page);
    },
    [setPage]
  );

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(
      fetchProductsByFiltersAsync({ filter, sort, pagination, admin: true })
    );
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(
      fetchProductsByFiltersAsync({
        filter,
        sort,
        pagination,
        search: searchRef.current.value,
      })
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
          filters={filters}
        />
        {/* SearchBar */}
        <form onSubmit={handleSearch}>
          <div className="pt-2  text-gray-600 flex items-center  dark:text-slate-300">
            <input
              className="border-2 border-gray-300 dark:text-slate-200 dark:bg-slate-600 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-full"
              type="search"
              name="search"
              ref={searchRef}
              placeholder="Search"
            />
            <button type="submit" className="ml-4">
              <svg
                className="text-gray-600 dark:text-gray-300 h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </form>
        {/* Big screen */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-200">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-slate-200 dark:hover:text-slate-100">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-200"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900 dark:text-slate-100"
                                  : "text-gray-500 dark:text-slate-200",
                                active ? "bg-gray-100 dark:bg-gray-700" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/*Desktop Filters */}
              <DesktopFilter handleFilter={handleFilter} filters={filters} />
              {/* Product grid */}
              <ProductGrid
                products={products}
                productLoading={productLoading}
              />
            </div>
          </section>

          {/* pagination start */}
          <Pagination
            handlePage={handlePage}
            page={page}
            setPage={setPage}
            totalItems={totalItems}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminProductList;

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl dark:bg-slate-900">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-slate-200">
                  Filters
                </h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 dark:bg-slate-900"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 dark:bg-slate-900">
                            <span className="font-medium text-gray-900 dark:text-slate-200">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section?.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

MobileFilter.propTypes = {
  mobileFiltersOpen: PropTypes.bool,
  setMobileFiltersOpen: PropTypes.func,
  handleFilter: PropTypes.func,
  filters: PropTypes.array,
};
function DesktopFilter({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 dark:bg-slate-900">
                  <span className="font-medium text-gray-900 dark:text-slate-200">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        onChange={(e) => handleFilter(e, section, option)}
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600 dark:text-slate-200"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}
DesktopFilter.propTypes = {
  handleFilter: PropTypes.func,
  filters: PropTypes.array,
};

function ProductGrid({ products, productLoading }) {
  if (productLoading) {
    return (
      <div className="lg:col-span-3">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {Array.from({ length: 10 }, (_, index) => (
              <SkeletonProductGrid key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (!productLoading && products.length === 0) {
    return (
      <div className="lg:col-span-3 flex justify-start flex-col">
        <h2 className="text-center text-lg font-medium text-gray-900 dark:text-slate-200">
          No Product Found
        </h2>
        <img src={notFound} alt="no-product" />
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4 py-0  sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="flex justify-end">
            <Link
              to="/admin/product-form"
              className="rounded-md bg-green-600 my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Product
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <Link to={`/admin/product-detail/${product.id}`}>
                  <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60 min-h-60">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-sm text-gray-700 dark:text-slate-200">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product?.title?.length > PRODUCT_TITLE_LENGTH
                            ? product.title.substring(0, PRODUCT_TITLE_LENGTH) +
                              "..."
                            : product.title}
                        </h3>
                        <div className="mt-1 text-sm text-gray-500 flex items-center">
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  product?.averageRating > rating
                                    ? "text-yellow-500"
                                    : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-slate-200">
                          {formatPrice(product?.discountPrice)}
                        </p>
                        <div className="inline">
                          <p className="text-sm font-medium text-gray-400 line-through">
                            {formatPrice(product?.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-between">
                  <Link
                    to={`/admin/product-form/edit/${product.id}`}
                    className="rounded-md bg-indigo-600 my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit Product
                  </Link>
                </div>
                {product.deleted && (
                  <div>
                    <p className="text-sm text-red-500">Product Deleted</p>
                  </div>
                )}
                {product.stock === 0 && (
                  <div>
                    <p className="text-sm text-red-500">Out of Stock</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array,
  productLoading: PropTypes.bool,
};

import React from "react";
import PropTypes from "prop-types";
import { ITEMS_PER_PAGE } from "../../app/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function Pagination() {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const { totalItems } = useLoaderData();
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const searchParams = new URLSearchParams(search);

  const handlePageChange = (pageNumber) => {
    searchParams.set("_page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  let page = parseInt(searchParams.get("_page")) || 1;

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = totalPages;
    }
    handlePageChange(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > totalPages) {
      newPage = 1;
    }
    handlePageChange(newPage);
  };

  return (
    totalItems > 0 && (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:bg-slate-900">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={prevPage}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50  dark:bg-slate-900 dark:text-slate-200"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-slate-900 dark:text-slate-200"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-slate-200">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {page * ITEMS_PER_PAGE > totalItems
                  ? totalItems
                  : page * ITEMS_PER_PAGE}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {totalPages > 1 && (
                <>
                  <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 d dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                      onClick={prevPage}
                    />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => {
                    return (
                      <button
                        onClick={() => handlePageChange(index + 1)}
                        key={index}
                        aria-current="page"
                        className={`relative z-10 inline-flex items-center ${
                          index + 1 === page
                            ? "bg-indigo-600  text-white dark:bg-indigo-500"
                            : "text-gray-400"
                        } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                  <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset dark:hover:bg-gray-800  dark:ring-gray-500 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                      onClick={nextPage}
                    />
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    )
  );
}

Pagination.propTypes = {
  handlePage: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalItems: PropTypes.any,
};

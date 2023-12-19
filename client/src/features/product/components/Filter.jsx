import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  function handleFilterChange(e) {
    const { name, value, checked } = e.target;
    setSearchParams((prevParams) => {
      let values = prevParams.get(name)?.split(",") || [];
      console.log(checked);
      if (checked) {
        // append value to array
        values.push(value);
      } else {
        // remove value from array
        values = values.filter((currentValue) => currentValue !== value);
      }
      if (values.length) {
        // set new name-value if values are still populated
        prevParams.set(name, values);
      } else {
        // delete name if values array is empty
        prevParams.delete(name);
      }
      prevParams.set("_page", "1");
      return prevParams;
    });
  }

  return (
    <>
      <Link
        to="/"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex justify-center"
      >
        Clear Filters
      </Link>
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6 px-4 sm:border-t mt-10"
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
                  {section.options.map((option, optionIdx) => {
                    return (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}`}
                          value={option.value}
                          type="checkbox"
                          onChange={(e) => handleFilterChange(e)}
                          checked={searchParams
                            .get(section.id)
                            ?.split(",")
                            .includes(option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600 dark:text-slate-200"
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};
Filter.propTypes = {
  handleFilter: PropTypes.func,
  filters: PropTypes.array,
};

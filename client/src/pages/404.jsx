import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white dark:bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-slate-200">
          Page not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-slate-200">
          Sorry, we couldn&#8217;t find the page you&#x2019;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={"/"}
            replace={true}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}

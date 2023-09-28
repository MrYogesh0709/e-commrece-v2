import React, { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MoonIcon,
  ShoppingCartIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectCart } from "../cart/cartSlice";
import logo from "../../assets/logo.png";
import { selectUser } from "../user/userSlice";
import { selectAuth } from "../auth/authSlice";

const navigation = [
  { name: "Products", link: "/", user: true },
  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/order", admin: true },
];

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

const userNavigationLogin = [{ name: "Sign In", link: "/login" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = ({ title, children }) => {
  const { cartItems } = useSelector(selectCart);
  const { userInfo } = useSelector(selectUser);
  const { user } = useSelector(selectAuth);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  function toggleDarkMode() {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
      localStorage.theme = "dark";
    }
  }

  const navigationItems = user ? userNavigation : userNavigationLogin;

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800 ">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link
                      className="group flex w-12 h-12"
                      to={`${userInfo?.role === "admin" ? "/admin" : "/"}`}
                    >
                      <img id="logo" src={logo} alt="logo" />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) =>
                        item[userInfo?.role || "user"] ? (
                          <Link
                            key={item.name}
                            to={item.link}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      onClick={toggleDarkMode}
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                    >
                      {isDarkMode ? (
                        <MoonIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <SunIcon
                          className="h-6 w-6 text-yellow-400 "
                          aria-hidden="true"
                        />
                      )}
                    </button>

                    {user && (
                      <Link
                        to="/cart"
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                      >
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                    {cartItems?.length > 0 && (
                      <span className="inline-flex items-center rounded-md mb-6 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {cartItems?.length}
                      </span>
                    )}
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              userInfo?.profileImage ||
                              "https://img.freepik.com/free-icon/userInfo_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.503580097.1688107904&semt=ais"
                            }
                            alt={userInfo?.name?.firstName || "ProfilePicture"}
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600 ">
                          {navigationItems.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.link}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 dark:bg-slate-700"
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-700 dark:text-slate-200"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                {/* Mobile menu button */}
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex items-center">
                {navigation.map((item, index) => (
                  <Disclosure.Button key={index}>
                    {item[userInfo?.role || "user"] ? (
                      <Link
                        key={item.name}
                        to={item.link}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ) : null}
                  </Disclosure.Button>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                >
                  {isDarkMode ? (
                    <MoonIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <SunIcon
                      className="h-6 w-6 text-yellow-400 "
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>

              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  {user && (
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          userInfo?.profileImage ||
                          "https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.503580097.1688107904&semt=ais"
                        }
                        alt={userInfo?.name?.firstName || "ProfileUser"}
                      />
                    </div>
                  )}
                  {user && (
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {userInfo?.name?.firstName || "New User"}{" "}
                        {userInfo?.name?.lastName}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userInfo?.email}
                      </div>
                    </div>
                  )}
                  {user && (
                    <Link
                      to="/cart"
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                  {cartItems?.length > 0 && (
                    <span className="inline-flex items-center rounded-md mb-6 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      {cartItems?.length}
                    </span>
                  )}
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {navigationItems.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <Link to={item.link}>{item.name}</Link>
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Title */}
      <header className="">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-6"
          >
            <div className="flex items-center">
              <NavLink
                to={`${userInfo?.role === "admin" ? "/admin" : "/"}`}
                className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-200"
              >
                E-commerce
              </NavLink>
              {title && (
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-12 w-12 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              )}
            </div>
            {title && (
              <li className="text-sm">
                <div
                  aria-current="page"
                  className="font-medium text-xl text-gray-500 hover:text-gray-600 dark:text-slate-200 dark:hover:text-slate-100"
                >
                  {title}
                </div>
              </li>
            )}
          </ol>
        </nav>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};
Navbar.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default Navbar;

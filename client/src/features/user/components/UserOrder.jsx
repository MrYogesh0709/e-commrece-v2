import React from "react";
import {
  firstLatterCapital,
  formatPrice,
  getStatusColorUserOrder,
} from "../../../app/constants";
import { Link, useLoaderData } from "react-router-dom";

const UserOrder = () => {
  const { orders } = useLoaderData();
  return (
    <div className="mx-auto mt-12 bg-white dark:bg-slate-900 max-w-7xl px-4 sm:px-6 lg:px-8 ">
      {orders?.length > 0 ? (
        orders.reverse().map((order) => (
          <div
            className="border-t border-gray-200  px-4 py-6 sm:px-6"
            key={order.id}
          >
            <h1 className="text-2xl my-5 font-bold tracking-tight text-gray-900 dark:text-slate-200">
              Order ID : #{order.id}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900 dark:text-slate-200">
              Order Status :
              <span
                className={`my-5 font-bold  tracking-tight py-1 px-3 rounded-full text-lg ${getStatusColorUserOrder(
                  order.status
                )}`}
              >
                {firstLatterCapital(order.status)}
              </span>
            </h3>
            <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900 dark:text-slate-200">
              Payment Status :
              <span
                className={`my-5 font-bold  tracking-tight py-1 px-3 rounded-full text-lg ${getStatusColorUserOrder(
                  order.paymentStatus
                )}`}
              >
                {firstLatterCapital(order.paymentStatus)}
              </span>
            </h3>
            <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900 dark:text-slate-200">
              Payment Method :
              <span
                className={`my-5 font-bold  tracking-tight py-1 px-3 rounded-full text-lg `}
              >
                {firstLatterCapital(order.paymentMethod)}
              </span>
            </h3>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order?.items?.length > 0 &&
                  order.items.map((item) => (
                    <li key={item.product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item?.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-slate-200">
                            <h3 className="dark">{item?.product?.title}</h3>
                            <p className="ml-4">
                              {formatPrice(item?.product?.discountPrice)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                            {item?.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <div className="inline mr-5 text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                              Qty : {item?.quantity}
                            </div>
                            {item?.color && (
                              <div className="inline mr-5 text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                Color : {item?.color?.name}
                              </div>
                            )}
                            {item?.size && (
                              <div className="inline mr-5 text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                Size : {item?.size?.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-slate-200">
              <p>Subtotal</p>
              <p>{formatPrice(order?.totalAmount)}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900 dark:text-slate-200">
              <p>Total Items</p>
              <p>
                {order?.totalItems}{" "}
                {`${order?.totalItems > 1 ? "Items" : "Item"}`}
              </p>
            </div>
            <p className="my-1 text-sm text-gray-900 dark:text-slate-200 font-semibold">
              Shipping Address :{" "}
            </p>
            <div className="flex justify-between gap-x-6 py-1">
              <div className="flex gap-x-4 items-center">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">
                    {order?.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-400">
                    {order?.selectedAddress.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-400">
                    {order?.selectedAddress.pinCode}
                  </p>
                </div>
              </div>
              <div className="sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900 dark:text-slate-200">
                  Phone : {order?.selectedAddress.phone}
                </p>
                <p className="text-sm leading-6 text-gray-900 dark:text-slate-200">
                  {order?.selectedAddress.city}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <main className="grid min-h-full place-items-center bg-white dark:bg-slate-900 px-6 py-2 sm:py-2 lg:px-8">
          <div className="text-center">
            <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-200 sm:text-5xl">
              No Order Yet.
            </div>
            <img
              src="https://res.cloudinary.com/dwyn6xk6f/image/upload/v1689182720/emptyCart_kstswg.png"
              alt="emptyCart"
              className="mx-auto max-w-full h-auto sm:max-w-md md:max-w-lg lg:max-w-xl"
            />
            <div className="flex items-center justify-center gap-x-2">
              <Link
                to={"/"}
                replace={true}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buy Something
              </Link>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default UserOrder;

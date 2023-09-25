import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrder,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  ITEMS_PER_PAGE,
  firstLatterCapital,
  formatPrice,
  getStatusColor,
} from "../../../app/constants";
import Pagination from "../../common/Pagination";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import Modal from "../../common/Modal";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [editOrderId, setEditOrderId] = useState(-1);
  const [openModal, setOpenModal] = useState(null);
  const [status, setStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { orders, isLoading, totalOrders } = useSelector(selectOrder);
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handleShow = (e, order) => {
    //TODO:DO SOMETHING HERE
    // console.log(order);
  };

  const handleEdit = (e, order) => {
    setEditOrderId(order.id);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (option) => {
    const newSort = {
      ...sort,
      _sort: option["sort"],
      _order: option["order"],
    };
    setSort(newSort);
  };

  const handleOrderChange = (e, order) => {
    setOpenModal(order.id);
    setStatus(e.target.value);
  };

  const handleOrderPaymentChange = (e, order) => {
    setOpenModal(order.id);
    setPaymentStatus(e.target.value);
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = {
      ...order,
      status: status ?? order.status, //nullish operator if left is null only then right will be executed
      paymentStatus: paymentStatus ?? order.paymentStatus,
    };
    dispatch(updateOrderAsync(updatedOrder));
    setEditOrderId(-1);
    setStatus(null);
  };

  return (
    <div className="overflow-x-auto min-h-screen">
      <div className="flex items-center justify-center font-sans overflow-x-auto">
        <div className="w-full">
          {/* <AdminOrderSkeleton /> */}
          {isLoading ? (
            <AdminOrderSkeleton />
          ) : orders.length > 0 ? (
            <div className="bg-white dark:bg-slate-900 shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={() =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order# &nbsp;
                      {sort?._sort === "id" && sort?._order === "asc" ? (
                        <ArrowUpIcon className="w-6 h-6 inline" />
                      ) : (
                        <ArrowDownIcon className="w-6 h-6 inline" />
                      )}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-center"
                      onClick={() =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount &nbsp;
                      {sort?._sort === "totalAmount" &&
                      sort?._order === "asc" ? (
                        <ArrowUpIcon className="w-6 h-6 inline" />
                      ) : (
                        <ArrowDownIcon className="w-6 h-6 inline" />
                      )}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Order Status</th>
                    <th className="py-3 px-6 text-center">Payment Method</th>
                    <th className="py-3 px-6 text-center">Payment Status</th>
                    <th
                      className="py-3 px-6 text-center"
                      onClick={() =>
                        handleSort({
                          sort: "createdAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order Time &nbsp;
                      {sort?._sort === "createdAt" && sort?._order === "asc" ? (
                        <ArrowUpIcon className="w-6 h-6 inline" />
                      ) : (
                        <ArrowDownIcon className="w-6 h-6 inline" />
                      )}
                    </th>
                    <th
                      className="py-3 px-6 text-center"
                      onClick={() =>
                        handleSort({
                          sort: "updatedAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Last Update &nbsp;
                      {sort?._sort === "updatedAt" && sort?._order === "asc" ? (
                        <ArrowUpIcon className="w-6 h-6 inline" />
                      ) : (
                        <ArrowDownIcon className="w-6 h-6 inline" />
                      )}
                    </th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-slate-300 text-sm font-light">
                  {orders.map((order) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600"
                      key={order.id}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id} </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order?.items?.length > 0 &&
                          order.items.map((item) => (
                            <div
                              className="flex items-center"
                              key={item.product.id}
                            >
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item?.product?.thumbnail}
                                />
                              </div>
                              <span>
                                {item?.product.title} - #{item?.quantity} -
                                {formatPrice(item?.product.discountPrice)}
                              </span>
                            </div>
                          ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {formatPrice(order.totalAmount)}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center flex-col">
                          <strong>Name:{order.selectedAddress.name}</strong>
                          <div>Email:{order.selectedAddress.email}</div>
                          <div>Phone:{order.selectedAddress.phone}</div>
                          <div>Street:{order.selectedAddress.street}</div>
                          <div>City:{order.selectedAddress.city}</div>
                          <div>State:{order.selectedAddress.state}</div>
                          <div>PinCode:{order.selectedAddress.pinCode}</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editOrderId ? (
                          <>
                            <Modal
                              title="Update Status"
                              message={`Are you sure you want to Update Order Status?`}
                              dangerOption="Update"
                              cancelOption="Cancel"
                              dangerAction={(e) => handleOrderStatus(e, order)}
                              cancelAction={() => setOpenModal(-1)}
                              // ! See here don't pass true or false it will open lots of modal its in loop
                              showModal={openModal === editOrderId}
                            />
                            <select
                              name="status"
                              className="mt-2 block w-full py-1 px-4 border border-gray-300 bg-white dark:bg-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                              onChange={(e) => handleOrderChange(e, order)}
                            >
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </>
                        ) : (
                          <span
                            className={`${getStatusColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {firstLatterCapital(order.status)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {order.paymentMethod}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editOrderId ? (
                          <>
                            <select
                              name="paymentStatus"
                              className="mt-2 block w-full py-1 px-4 border border-gray-300 bg-white dark:bg-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                              onChange={(e) =>
                                handleOrderPaymentChange(e, order)
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="succeeded">Succeeded</option>
                              <option value="failed">Failed</option>
                              <option value="canceled">Canceled</option>
                            </select>
                          </>
                        ) : (
                          <span
                            className={`${getStatusColor(
                              order.paymentStatus
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {firstLatterCapital(order.paymentStatus)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {new Date(order.createdAt).toLocaleString("en-IN")}
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {new Date(order.updatedAt).toLocaleString("en-IN")}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <button
                            onClick={(e) => handleShow(e, order)}
                            className="w-4 mr-2 transform  hover:text-green-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              style={{ width: "24px", height: "24px" }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => handleEdit(e, order)}
                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              style={{ width: "24px", height: "24px" }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-2xl font-medium text-center my-10">
              No Order Yet...!
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="skeleton-loader px-4 py-3 sm-px-6 dark:bg-slate-700 animate-pulse"></div>
      ) : (
        orders.length > 0 && (
          <Pagination
            handlePage={handlePage}
            page={page}
            setPage={setPage}
            totalItems={totalOrders}
          />
        )
      )}
    </div>
  );
};

export default AdminOrder;

export function AdminOrderSkeleton() {
  return (
    <div className="flex items-center justify-center font-sans ">
      <div className="w-full">
        <div className="bg-white animate-pulse dark:bg-slate-900  shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto ">
            <thead>
              <tr className="bg-gray-200 dark:bg-slate-700 text-gray-600 uppercase  text-sm leading-normal">
                <th className="py-3 px-6 text-left cursor-pointer">
                  <div className="skeleton-loader bg-slate-200 w-20 h-6 dark:bg-slate-700"></div>
                </th>
                <th className="py-3 px-6 text-left">
                  <div className="skeleton-loader w-20 h-6 bg-slate-200 dark:bg-slate-700"></div>
                </th>
                <th className="py-3 px-6 text-center">
                  <div className="skeleton-loader w-20 h-6 bg-slate-200 dark:bg-slate-700"></div>
                </th>
                <th className="py-3 px-6 text-center">
                  <div className="skeleton-loader w-20 h-6 bg-slate-200 dark:bg-slate-700"></div>
                </th>
                <th className="py-3 px-6 text-center">
                  <div className="skeleton-loader w-20 h-6 bg-slate-200 dark:bg-slate-700"></div>
                </th>
                <th className="py-3 px-6 text-center">
                  <div className="skeleton-loader w-20 h-6 bg-slate-200 dark:bg-slate-700"></div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:bg-slate-900 dark:text-slate-500 text-sm font-light">
              {Array.from({ length: 7 }, (_, index) => ({ id: index })).map(
                (_, index) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    key={index}
                  >
                    <td className="py-3 px-6">
                      <div className="skeleton-loader w-16 h-4 bg-slate-200 dark:bg-slate-700"></div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="skeleton-loader w-16 h-4 bg-slate-200 dark:bg-slate-700"></div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="skeleton-loader w-16 h-4 bg-slate-200 dark:bg-slate-700"></div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="skeleton-loader w-16 h-4 bg-slate-200 dark:bg-slate-700"></div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="skeleton-loader w-16 h-4 bg-slate-200 dark:bg-slate-700"></div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="skeleton-loader w-16 h-4 bg-slate-200 dark:bg-slate-700"></div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

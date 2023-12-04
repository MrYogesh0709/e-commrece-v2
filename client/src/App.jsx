import React, { Suspense, useCallback, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { checkUserAsync, selectAuth } from "./features/auth/authSlice";
import { fetchCartItemsByUserIdAsync } from "./features/cart/cartSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import Protected from "./features/auth/components/Protected";
import Logout from "./features/auth/components/Logout";
import AddProduct from "./features/admin/components/AddProduct";
import {
  LoginPage,
  SignUpPage,
  SinglePageError,
  PageNotFound,
  HomeLayout,
  Home,
  ProductDetailPage,
} from "./pages";

//* lazy load
const StripePay = React.lazy(() => import("./pages/StripePay"));
const UserProfilePage = React.lazy(() => import("./pages/UserProfilePage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const VerifyMailPage = React.lazy(() => import("./pages/VerifyMailPage"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const UserOrderPage = React.lazy(() => import("./pages/UserOrderPage"));
const AdminHome = React.lazy(() => import("./pages/AdminHome"));
const AdminProductFormPage = React.lazy(() =>
  import("./pages/AdminProductFormPage")
);
const AdminOrderPage = React.lazy(() => import("./pages/AdminOrderPage"));
const ForgotPasswordPage = React.lazy(() =>
  import("./pages/ForgotPasswordPage")
);
const OrderSuccessPage = React.lazy(() => import("./pages/OrderSuccessPage"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));

import { loader as HomeLoader } from "./pages/Home";
import { loader as SingleProductLoader } from "./pages/ProductDetailPage";
import Loader from "./features/common/Loader";
import {
  AdminHomeLoader,
  AdminOrderLoader,
  AdminProductAddLoader,
  AdminProductEditLoader,
  UserOrderLoader,
} from "./app/loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <SinglePageError />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: HomeLoader(queryClient),
      },
      {
        path: "product-detail/:id",
        element: <ProductDetailPage />,
        errorElement: <SinglePageError />,
        loader: SingleProductLoader(queryClient),
      },
      {
        path: "cart",
        element: (
          <Protected>
            <CartPage />
          </Protected>
        ),
        errorElement: <SinglePageError />,
      },
      {
        path: "checkout",
        element: (
          <Protected>
            <Checkout />
          </Protected>
        ),
        errorElement: <SinglePageError />,
      },
      {
        path: "orders",
        element: (
          <Protected>
            <UserOrderPage />
          </Protected>
        ),
        errorElement: <SinglePageError />,
        loader: UserOrderLoader(queryClient),
      },
      {
        path: "profile",
        element: (
          <Protected>
            <UserProfilePage />
          </Protected>
        ),
        errorElement: <SinglePageError />,
      },
      {
        path: "admin",
        loader: AdminHomeLoader(queryClient),
        element: (
          <ProtectedAdmin>
            <AdminHome />
          </ProtectedAdmin>
        ),
        errorElement: <SinglePageError />,
      },
      {
        path: "admin/product-form",
        element: (
          <ProtectedAdmin>
            <AddProduct />
          </ProtectedAdmin>
        ),
        loader: AdminProductAddLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: "/admin/product-form/edit/:id",
        element: (
          <ProtectedAdmin>
            <AdminProductFormPage />
          </ProtectedAdmin>
        ),
        loader: AdminProductEditLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: "admin/order",
        element: (
          <ProtectedAdmin>
            <AdminOrderPage />
          </ProtectedAdmin>
        ),
        loader: AdminOrderLoader(queryClient),
        errorElement: <SinglePageError />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <SinglePageError />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <SinglePageError />,
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/stripe-pay",
    element: (
      <Protected>
        <StripePay />
      </Protected>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout />
      </Protected>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/user/verify-email",
    element: <VerifyMailPage />,
    errorElement: <SinglePageError />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    errorElement: <SinglePageError />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
    errorElement: <SinglePageError />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);

  const memoizedFetchData = useCallback(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  useEffect(() => {
    dispatch(checkUserAsync());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app dark:bg-slate-900">
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer autoClose={2000} theme="dark" position="bottom-left" />
      </div>
    </QueryClientProvider>
  );
}

export default App;

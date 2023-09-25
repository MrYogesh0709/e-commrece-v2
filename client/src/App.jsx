import React, { Suspense, useCallback, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { checkUserAsync, selectAuth } from "./features/auth/authSlice";
import { fetchCartItemsByUserIdAsync } from "./features/cart/cartSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./features/common/Loader";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const PageNotFound = React.lazy(() => import("./pages/404"));
const Logout = React.lazy(() => import("./features/auth/components/Logout"));
const SinglePageError = React.lazy(() => import("./pages/SinglePageError"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Home = React.lazy(() => import("./pages/Home"));
const AdminHome = React.lazy(() => import("./pages/AdminHome"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const AdminOrderPage = React.lazy(() => import("./pages/AdminOrderPage"));
const UserOrderPage = React.lazy(() => import("./pages/UserOrderPage"));
const UserProfilePage = React.lazy(() => import("./pages/UserProfilePage"));
const OrderSuccessPage = React.lazy(() => import("./pages/OrderSuccessPage"));
const StripePay = React.lazy(() => import("./pages/StripePay"));
const VerifyMailPage = React.lazy(() => import("./pages/VerifyMailPage"));
const Protected = React.lazy(() =>
  import("./features/auth/components/Protected")
);
const ProtectedAdmin = React.lazy(() =>
  import("./features/auth/components/ProtectedAdmin")
);
const AdminProductDetailPage = React.lazy(() =>
  import("./pages/AdminProductDetailPage")
);
const AdminProductFormPage = React.lazy(() =>
  import("./pages/AdminProductFormPage")
);
const ForgotPasswordPage = React.lazy(() =>
  import("./pages/ForgotPasswordPage")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <SinglePageError />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
    errorElement: <SinglePageError />,
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
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage />,
    errorElement: <SinglePageError />,
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage />
      </ProtectedAdmin>
    ),
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
    path: "/orders",
    element: (
      <Protected>
        <UserOrderPage />
      </Protected>
    ),
    errorElement: <SinglePageError />,
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
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
    <div className="app dark:bg-slate-900">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
      <ToastContainer autoClose={2000} theme="dark" position="bottom-left" />
    </div>
  );
}

export default App;

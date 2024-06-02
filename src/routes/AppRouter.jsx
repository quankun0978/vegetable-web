import { Navigate, useRoutes } from "react-router-dom";
import { PATH } from "./path";
import { lazy } from "react";

import PrivateRoute from "@/Auth/PrivateRoute";

const Main = lazy(() => import("@/pages/Main"));
const DetailProduct = lazy(() => import("@/pages/product/DetailProduct"));
const Home = lazy(() => import("@/pages/home/Home"));
const InfoUser = lazy(() => import("@/pages/InfoUser/InfoUser.jsx"));
const Introduce = lazy(() => import("@/pages/home/Introduce/Introduce"));
const ChangePassword = lazy(() =>
  import("@/pages/ChangePassword/ChangePassword")
);
const Cart = lazy(() => import("@/pages/Cart/Cart"));
const Product = lazy(() => import("@/pages/product/Product"));
const Payment = lazy(() => import("@/pages/Payment/Payment"));
const Order = lazy(() => import("@/pages/Order/Order"));
const Login = lazy(() => import("@/Auth/Login"));
const MyVoucher = lazy(() => import("@/pages/voucher/MyVoucher"));

const Voucher = lazy(() => import("@/pages/voucher/Voucher"));

const DetailNews = lazy(() => import("@/pages/News/DetailNews"));

const News = lazy(() => import("@/pages/News/News"));

const Register = lazy(() => import("@/Auth/Register"));
const ForgotPassword = lazy(() => import("@/Auth/ForgotPassword"));

const ResetPassword = lazy(() => import("@/Auth/ResetPassword"));

const Contact = lazy(() => import("@/pages/Contact/Contact"));

const About = lazy(() => import("@/pages/About/About"));

const Advise = lazy(() => import("@/pages/Advise/Advise"));
const Healthy = lazy(() => import("@/pages/healthy/Healthy"));

const AppRouter = () => {
  return useRoutes([
    {
      element: <Main />,

      children: [
        {
          path: PATH.TRANG_CHU,
          element: <Home />,
          children: [
            {
              index: true,
              element: <Introduce />,
            },
            {
              path: `${PATH.CHI_TIET_SAN_PHAM}/:id`,
              element: <DetailProduct />,
            },
            {
              path: `${PATH.SAN_PHAM}`,
              element: <Product />,
            },
            {
              path: `${PATH.GIOI_THIEU}`,
              element: <About />,
            },
            {
              path: `${PATH.LIEN_HE}`,
              element: <Contact />,
            },
            {
              path: `${PATH.CHUYEN_MUC_SUC_KHOE}`,
              element: <Healthy />,
            },
            {
              path: `${PATH.TU_VAN}`,
              element: <Advise />,
            },
          ],
        },
        {
          index: true,
          element: <Home />,
        },
        {
          path: `${PATH.THONG_TIN_CA_NHAN}/:user_id`,
          element: <PrivateRoute component={<InfoUser />} isLogin={true} />,
        },
        {
          path: `${PATH.TIN_TUC}/:news_id`,
          element: <DetailNews />,
        },

        {
          path: `${PATH.TIN_TUC}`,
          element: <News />,
        },

        {
          path: `${PATH.GIO_HANG}`,
          element: (
            <PrivateRoute isShow={true} component={<Cart />} isLogin={true} />
          ),
        },
        {
          path: `${PATH.DOI_MAT_KHAU}`,
          element: (
            <PrivateRoute component={<ChangePassword />} isLogin={true} />
          ),
        },
        {
          path: `${PATH.THANH_TOAN}`,
          element: <PrivateRoute component={<Payment />} isLogin={true} />,
        },
        {
          path: `${PATH.LICH_SU_MUA_HANG}`,
          element: (
            <PrivateRoute component={<Order />} isLogin={true} isShow={true} />
          ),
        },
        {
          path: `${PATH.MA_GIAM_GIA_CUA_TOI}`,
          element: (
            <PrivateRoute
              component={<MyVoucher />}
              isLogin={true}
              isShow={true}
            />
          ),
        },
        {
          path: `${PATH.MA_GIAM_GIA}`,
          element: (
            <PrivateRoute
              component={<Voucher />}
              isLogin={true}
              isShow={true}
            />
          ),
        },
      ],
    },

    {
      path: "*",
      element: <Navigate to={PATH.TRANG_CHU} replace />,
    },

    {
      path: PATH.DANG_NHAP,
      element: <PrivateRoute component={<Login />} />,
    },
    {
      path: PATH.DANG_KY,
      element: <PrivateRoute component={<Register />} />,
    },
    {
      path: PATH.QUEN_MAT_KHAU,
      element: <PrivateRoute component={<ForgotPassword />} />,
    },
    {
      path: PATH.LAM_MOI_MAT_KHAU,
      element: <PrivateRoute component={<ResetPassword />} />,
    },
  ]);
};
export default AppRouter;

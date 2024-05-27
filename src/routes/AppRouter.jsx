import { Navigate, useRoutes } from "react-router-dom";

import Main from "@/pages/Main";
import Login from "@/Auth/Login";
import Register from "@/Auth/Register";
import PrivateRoute from "@/Auth/PrivateRoute";
import DetailProduct from "@/pages/product/DetailProduct";
import Home from "@/pages/home/Home";
import InfoUser from "@/pages/InfoUser/InfoUser.jsx";
import Introduce from "@/pages/home/Introduce/Introduce";
import ChangePassword from "@/pages/ChangePassword/ChangePassword";
import Cart from "@/pages/Cart/Cart";
import Product from "@/pages/product/Product";
import Payment from "@/pages/Payment/Payment";
import Order from "@/pages/Order/Order";
import MyVoucher from "@/pages/voucher/MyVoucher";
import Voucher from "@/pages/voucher/Voucher";
import DetailNews from "@/pages/News/DetailNews";
import News from "@/pages/News/News";
import ForgotPassword from "@/Auth/ForgotPassword";
import ResetPassword from "@/Auth/ResetPassword";

import { PATH } from "./path";
import Contact from "@/pages/Contact/Contact";
import About from "@/pages/About/About";
import Advise from "@/pages/Advise/Advise";
import Healthy from "@/pages/healthy/Healthy";

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
        // { index: true, element: <Dashboard /> },
        // {
        //   path: ROUTES.THU_THAP_TTKH,
        //   element: <ThuThap />,
        //   children: [
        //     { index: true, element: <TiemNang /> },
        //     { path: ROUTES.NEW_THU_THAP_KH_MOI, element: <KhachHangThemMoi /> },
        //     {
        //       path: ROUTES.DETAIL_KH + "/:id",
        //       element: <KhachHangXemChiTiet />,
        //     },
        //     { path: ROUTES.UPDATE_KH, element: <KhachHangThemMoi /> },
        //   ],
        // },
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

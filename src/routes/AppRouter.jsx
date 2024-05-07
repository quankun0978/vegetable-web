import { Navigate, useRoutes } from "react-router-dom";
import Main from "@/pages/Main";
import Login from "@/Auth/Login";
import Register from "@/Auth/Register";
import PrivateRoute from "@/Auth/PrivateRoute";
import DetailProduct from "@/pages/product/DetailProduct";
import Home from "@/pages/home/Home";
import InfoUser from "@/pages/InfoUser/InfoUser.jsx";
import { PATH } from "./path";
import Introduce from "@/pages/home/Introduce/Introduce";
import ChangePassword from "@/pages/ChangePassword/ChangePassword";
import Cart from "@/pages/Cart/Cart";
import Product from "@/pages/product/Product";
import Payment from "@/pages/Payment/Payment";
import Order from "@/pages/Order/Order";

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
              path: PATH.SAN_PHAM,
              element: <Product />,
            },
          ],
        },
        {
          index: true,
          element: <Home />,
        },
        {
          path: `${PATH.THONG_TIN_CA_NHAN}/:user_id`,
          element: <InfoUser />,
        },
        {
          path: `${PATH.GIO_HANG}`,
          element: <Cart />,
        },
        {
          path: `${PATH.DOI_MAT_KHAU}`,
          element: <ChangePassword />,
        },
        {
          path: `${PATH.THANH_TOAN}`,
          element: <Payment />,
        },
        {
          path: `${PATH.LICH_SU_MUA_HANG}`,
          element: <Order />,
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
  ]);
};
export default AppRouter;

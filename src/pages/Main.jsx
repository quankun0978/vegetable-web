import { useEffect, useCallback, lazy, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { Layout } from "antd";
import Header from "@/common/header/Header.jsx";
import Footer from "@/common/footer/Footer.jsx";

import { setCurrentUser } from "@/redux/Reducer/userSlice.js";
import { handleGetAllProduct } from "@/redux/Action/productAction";

import {
  handleGetListMyVoucher,
  handleGetListVoucher,
} from "@/redux/Action/voucherAction";
import { handleGetUserById } from "@/redux/Action/userAction";
import { handleGetListAllCodes } from "@/redux/Action/appAction";
import { handleGetListNews } from "@/redux/Action/newsAction";

const Chatbot = lazy(() => import("@/common/chatbot/Chatbot"));

const { Content } = Layout;

import "@/styles/style.scss";
import "./main.scss";
import { handleRefreshToken } from "@/api/axios";
import Floatbutton from "@/common/floatbutton/Floatbutton";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.auth.isSuccess);
  const isLogout = useSelector((state) => state.auth.isLogout);

  handleRefreshToken(dispatch, navigate);

  let CurrentUser = JSON.parse(localStorage.getItem("c_user"));

  useEffect(() => {
    dispatch(handleGetAllProduct());
    dispatch(handleGetListVoucher());
    dispatch(handleGetListAllCodes());
    dispatch(handleGetListNews());
  }, []);

  const fetchData = useCallback(() => {
    if (CurrentUser && CurrentUser.user_id) {
      dispatch(handleGetUserById(CurrentUser.user_id));
      dispatch(handleGetListMyVoucher(CurrentUser.user_id));
      dispatch(setCurrentUser(CurrentUser));
    } else {
      dispatch(handleGetAllProduct());
      dispatch(handleGetListVoucher());
      dispatch(handleGetListAllCodes());
      dispatch(handleGetListNews());
    }
  }, [CurrentUser, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <Layout className=" bg-white  overflow-hidden h-full  lg:px-0  relative">
      <Header currentUser={CurrentUser} />
      <div className="h-40"></div>

      <Content className="  md:ms-4 xl:ms-0" style={{ height: "100%" }}>
        <Layout className=" xl:mx-56 bg-white xl:max-w-6xl ">
          <div className="px-2 md:-mx-2 md:py-4 md:my-4 my-2">
            <Outlet />
          </div>
        </Layout>
      </Content>
      <Footer />

      <Floatbutton />
      {CurrentUser && CurrentUser.user_id && !isLogout ? (
        <Chatbot />
      ) : (
        <div></div>
      )}
    </Layout>
  );
};
export default Main;

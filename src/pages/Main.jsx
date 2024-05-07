import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { Layout } from "antd";
import Cookies from "js-cookie";

import Header from "@/common/Header/Header.jsx";
import Footer from "@/common/Footer/Footer.jsx";

import { setCurrentUser } from "@/redux/Reducer/userSlice.js";
import { handleRefreshToken } from "@/redux/Action/authAction.js";
import { handleGetAllProduct } from "@/redux/Action/productAction";

import "@/styles/style.scss";

const { Content } = Layout;

const Main = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  let refresh_token = localStorage.getItem("rf_token");
  let CurrentUser = JSON.parse(localStorage.getItem("c_user"));
  let access_token = Cookies.get("a_token");
  const isSuccess = useSelector((state) => state.auth.isSuccess);

  useEffect(() => {
    dispath(handleGetAllProduct());
  }, []);
  useEffect(() => {
    if (CurrentUser && Object.keys(CurrentUser).length > 0) {
      dispath(setCurrentUser(CurrentUser));
    }
  }, [CurrentUser]);
  useEffect(() => {
    if (refresh_token && !access_token && CurrentUser && CurrentUser.user_id) {
      dispath(
        handleRefreshToken({
          refresh_token: refresh_token,
          user_id: CurrentUser.user_id,
        })
      );
    }
  }, [refresh_token]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <Layout className=" bg-white  ">
      <Header currentUser={CurrentUser} />

      <Content>
        <Layout className=" mx-56 bg-white max-w-6xl">
          <Outlet />
        </Layout>
      </Content>
      <Footer />
    </Layout>
  );
};
export default Main;

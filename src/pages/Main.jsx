import { useEffect, useState, useCallback, lazy } from "react";
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

import { IoIosArrowUp } from "react-icons/io";

const Chatbot = lazy(() => import("@/common/chatbot/Chatbot"));

const { Content } = Layout;

import "@/styles/style.scss";
import "./main.scss";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.auth.isSuccess);

  let CurrentUser = JSON.parse(localStorage.getItem("c_user"));

  const [isShowButton, setIsShowButton] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 700) {
      setIsShowButton(true);
    } else {
      setIsShowButton(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    dispatch(handleGetAllProduct());
    dispatch(handleGetListVoucher());
    dispatch(handleGetListAllCodes());
    dispatch(handleGetListNews());
  }, [dispatch]);
  const fetchData = useCallback(() => {
    if (CurrentUser && CurrentUser.user_id) {
      dispatch(handleGetUserById(CurrentUser.user_id));
      dispatch(handleGetListMyVoucher(CurrentUser.user_id));
      dispatch(setCurrentUser(CurrentUser));
    }
  }, [CurrentUser, dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
      <div
        onClick={handleScrollToTop}
        className={`float-btn ${
          isShowButton ? "end" : "start"
        }  hover:cursor-pointer hover:bg-lime-500  rounded-full fixed bottom-6 right-24  bg-lime-600 w-12 h-12 flex items-center justify-center`}
      >
        <IoIosArrowUp size={24} color="#fff" />
      </div>
      {CurrentUser && CurrentUser.user_id ? <Chatbot /> : <div></div>}
    </Layout>
  );
};
export default Main;

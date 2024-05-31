import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { Layout } from "antd";
import Header from "@/common/header/Header.jsx";
import Footer from "@/common/footer/Footer.jsx";
import Chatbot from "@/common/chatbot/Chatbot";

import { setCurrentUser } from "@/redux/Reducer/userSlice.js";
import { handleRefreshToken } from "@/redux/Action/authAction.js";
import { handleGetAllProduct } from "@/redux/Action/productAction";

import {
  handleGetListMyVoucher,
  handleGetListVoucher,
} from "@/redux/Action/voucherAction";
import { handleGetUserById } from "@/redux/Action/userAction";
import { handleGetListAllCodes } from "@/redux/Action/appAction";
import { handleGetListNews } from "@/redux/Action/newsAction";

import { IoIosArrowUp } from "react-icons/io";

const { Content } = Layout;

import "@/styles/style.scss";
import "./main.scss";
import Floatbutton from "@/common/floatbutton/Floatbutton";

const Main = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.auth.isSuccess);

  let refresh_token = localStorage.getItem("rf_token");
  let CurrentUser = JSON.parse(localStorage.getItem("c_user"));
  let access_token = Cookies.get("a_token");

  const [isShowButton, setIsShơwButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispath(handleGetAllProduct());
    dispath(handleGetListVoucher());
    dispath(handleGetListAllCodes());
    dispath(handleGetListNews());
    if (CurrentUser && CurrentUser.user_id) {
      dispath(handleGetUserById(CurrentUser.user_id));
      dispath(handleGetListMyVoucher(CurrentUser.user_id));
      dispath(setCurrentUser(CurrentUser));
    }
  }, [CurrentUser]);

  // useEffect(() => {
  //   if (refresh_token && !access_token && CurrentUser && CurrentUser.user_id) {
  //     dispath(
  //       handleRefreshToken({
  //         refresh_token: refresh_token,
  //         user_id: CurrentUser.user_id,
  //       })
  //     );
  //   }
  // }, [refresh_token]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {}, []);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 700) {
      setIsShơwButton(true);
    } else {
      setIsShơwButton(false);
    }
  };

  return (
    <Layout className=" bg-white  overflow-hidden h-full  lg:px-0  relative">
      <Header currentUser={CurrentUser} />

      <Content className="md:mt-44  md:ms-4 xl:ms-0" style={{ height: "100%" }}>
        <Layout className=" xl:mx-56 bg-white xl:max-w-6xl ">
          <div className="px-2 md:-mx-2 md:py-4 md:my-4 my-2">
            <Outlet />
          </div>
        </Layout>
      </Content>
      <Footer />
      <div
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        className={`float-btn ${
          isShowButton ? "end" : "start"
        }  hover:cursor-pointer hover:bg-lime-500  rounded-full fixed bottom-6 right-24  bg-lime-600 w-12 h-12 flex items-center justify-center`}
      >
        <IoIosArrowUp size={24} color="#fff" />
      </div>
      {/* <Floatbutton /> */}
      {CurrentUser && CurrentUser.user_id ? <Chatbot /> : <div></div>}
    </Layout>
  );
};
export default Main;

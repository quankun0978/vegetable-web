import { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import {
  AutoComplete,
  Avatar,
  Col,
  Drawer,
  Menu,
  Popover,
  Row,
  Space,
} from "antd";

import Input from "@/common/input/Input.jsx";
import { Header } from "antd/es/layout/layout";
import Button from "@/common/button/Button";

import logo from "@/assets/img/logo-web.png";
import { PiShoppingCartLight, PiUser } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { PATH } from "@/routes/path";

import "./header.scss";
import { logout } from "@/redux/Reducer/authSlice";

const items = [
  {
    label: "Trang chủ",
    key: PATH.TRANG_CHU,
  },
  {
    label: "Sản phẩm",
    key: PATH.SAN_PHAM,
  },

  {
    label: "Giới thiệu",
    key: PATH.GIOI_THIEU,
  },
  {
    label: "Tư vấn",
    key: PATH.TU_VAN,
  },
  {
    label: "Chuyên mục sức khỏe",
    key: PATH.CHUYEN_MUC_SUC_KHOE,
  },
  {
    label: "Tin tức",
    key: PATH.TIN_TUC,
  },
  {
    label: "Liên hệ ",
    key: PATH.LIEN_HE,
  },
];

const HeaderCustom = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const count = useRef(0);
  let location = useLocation();
  const elementHeader = useRef();
  const elementBottomHeader = useRef();

  const listProduct = useSelector((state) => state.product.listProduct);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dataInfo = useSelector((state) => state.user.dataInfo);

  const [current, setCurrent] = useState(location.pathname);
  const [isShowToggle, setIsShowToggle] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (location && location.pathname) {
      setCurrent(location.pathname);
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value, data) => {
    navigate(`${PATH.CHI_TIET_SAN_PHAM}/${data.product_id}`);
  };

  const searchResult = (query) =>
    listProduct
      .filter((item) => item.name.includes(query))
      .map((item) => {
        return {
          value: item.name,
          product_id: item.product_id,
          name: item.name,
          label: (
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <img
                loading="lazy"
                src={item.imgPath}
                width={40}
                height={40}
                alt=""
              />
              <span>{item.name}</span>
            </div>
          ),
        };
      });

  const content = () => (
    <div className="flex flex-col">
      <Link
        to={PATH.THONG_TIN_CA_NHAN + `/${currentUser && currentUser.user_id}`}
        className="  hover: cursor-pointer p-2 rounded-md "
      >
        Thông tin cá nhân
      </Link>
      <Link
        to={PATH.DOI_MAT_KHAU}
        className="  hover: cursor-pointer p-2 rounded-md "
      >
        Đổi mật khẩu
      </Link>
      <Link
        to={PATH.MA_GIAM_GIA}
        className="  hover: cursor-pointer p-2 rounded-md "
      >
        Mã giảm giá
      </Link>
      <Link
        to={PATH.MA_GIAM_GIA_CUA_TOI}
        className="  hover: cursor-pointer p-2 rounded-md "
      >
        Mã giảm giá của tôi
      </Link>
      <Link
        to={PATH.LICH_SU_MUA_HANG}
        className="  hover: cursor-pointer p-2 rounded-md "
      >
        Lịch sử đặt hàng
      </Link>

      <Link
        onClick={handleLogout}
        className="  hover: cursor-pointer p-2 rounded-md "
      >
        Đăng xuất
      </Link>
    </div>
  );

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    // if (elementHeader.current && scrollPosition === 0) {
    //   elementHeader.current.style.transform = "translateY(0)";
    // }

    if (
      elementHeader &&
      elementHeader.current &&
      elementHeader.current.offsetHeight
    ) {
      elementHeader.current.style.transition = "0.4s";

      if (elementBottomHeader && elementBottomHeader.current) {
        if (scrollPosition >= elementHeader.current.offsetHeight) {
          console.log(scrollPosition);
          if (scrollPosition > 0) {
            elementHeader.current.style.transform = "translateY(-100%)";
          }
          // if (scrollPosition >= document.documentElement.scrollHeight - 420) {
          //   elementHeader.current.style.transform = "translateY(0)";
          //   console.log(1);
          // }
          elementBottomHeader.current.style.transform = "translateY(0))";
          elementBottomHeader.current.style.position = "fixed";
        } else {
          elementHeader.current.style.transform = "translateY(0)";
        }
      }
    }
  };

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const handleLogout = () => {
    setIsLogout(true);
    localStorage.removeItem("rf_token");
    localStorage.removeItem("c_user");
    Cookies.remove("a_token");
    dispath(logout());
    navigate(PATH.TRANG_CHU);
  };
  console.log();
  return (
    <Header
      ref={elementHeader}
      className="h-auto bg-white p-0 header-app md:fixed z-50 top-0 right-0 left-0"
    >
      <div>
        <div
          style={{ transition: "0.4s" }}
          className="md:py-4 pt-4 xl:mx-56  xl:max-w-6xl  "
        >
          <Row className=" items-center gap-2 md:gap-0  px-2 ">
            <Col md={8} sm={24} className="w-full">
              <div className="flex justify-between w-full items-center">
                <IoMenu
                  onClick={() => setIsShowToggle(true)}
                  size={30}
                  className=" md:hidden"
                />
                <img
                  loading="lazy"
                  className="h-11 lg:h-auto"
                  src={logo}
                  alt=""
                  onClick={() => navigate(PATH.TRANG_CHU)}
                />
                <PiShoppingCartLight
                  onClick={() => navigate(PATH.GIO_HANG)}
                  className=" md:hidden "
                  size={30}
                />
              </div>
            </Col>
            <Col
              md={8}
              sm={24}
              className="md:pe-8 w-full  lg:w-auto lg:flex items-center mb-4 md:mb-0"
            >
              <AutoComplete
                popupMatchSelectWidth={252}
                style={{
                  width: "100%",
                }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
                size="large"
              >
                <Input
                  className={"w-full"}
                  placeholder="Tìm kiếm..."
                  allowClear
                  issearch={true}
                  size="large"
                  enterButton
                />
              </AutoComplete>
            </Col>
            <Col sm={12} md={8} className="hidden md:block">
              <div className="flex gap-2 items-center">
                {Cookies.get("a_token") && currentUser && currentUser.name ? (
                  <Space className="flex items-center ">
                    <Popover
                      className="bg-lime-500"
                      content={content}
                      trigger="click"
                    >
                      <Avatar size={40} icon={<PiUser />} />
                    </Popover>
                    <div className="hidden xl:block">
                      {dataInfo && dataInfo.name}
                    </div>
                  </Space>
                ) : (
                  <Button
                    text={"Đăng nhập / Đăng ký"}
                    size="large"
                    onClick={() => navigate(PATH.DANG_NHAP)}
                  />
                )}

                <div className="w-px h-8 bg-gray-400"></div>

                <Button
                  onClick={() => {
                    navigate(PATH.GIO_HANG);
                    setCurrent("");
                  }}
                  icon={<PiShoppingCartLight className="ps-2" size={24} />}
                  size="large"
                  text={"Giỏ hàng"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div
          ref={elementBottomHeader}
          style={{ background: "#80B435", transition: "0.3s", width: "100%" }}
        >
          <Menu
            onClick={onClick}
            className="xl:mx-56 md:mx-4  md:block hidden  max-w-6xl header-menu"
            theme="light"
            mode="horizontal"
            selectedKeys={current}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
              background: "#80B435",
            }}
          />
        </div>
      </div>
      <Drawer
        title={
          !isLogout && currentUser && currentUser.name ? (
            <Space className="flex items-center ">
              <Popover
                className="bg-lime-500"
                content={content}
                trigger="click"
              >
                <Avatar size={40} icon={<PiUser />} />
              </Popover>
              <div style={{ fontSize: "14px" }}>
                {currentUser && currentUser.name}
              </div>
            </Space>
          ) : (
            <Button
              text={"Đăng nhập / Đăng ký"}
              size="middle"
              onClick={() => navigate(PATH.DANG_NHAP)}
            />
          )
        }
        width={250}
        style={{ margin: 0 }}
        placement="left"
        onClose={() => setIsShowToggle(false)}
        open={isShowToggle}
      >
        <Menu
          onClick={onClick}
          theme="light"
          mode="vertical"
          selectedKeys={current}
          items={items}
        />
      </Drawer>
    </Header>
  );
};

export default memo(HeaderCustom);

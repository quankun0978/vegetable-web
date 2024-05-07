import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Cookies from "js-cookie";
import { Col, Menu, Row } from "antd";

import Search from "antd/es/input/Search";
import { Header } from "antd/es/layout/layout";
import Button from "@/common/button/Button";

import logo from "@/assets/img/logo-web.png";
import { PiShoppingCartLight } from "react-icons/pi";
import "./styles.scss";
import { PATH } from "@/routes/path";
import { useState } from "react";

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
    key: "about",
  },
  {
    label: "Tư vấn",
    key: "call",
  },
  {
    label: "Chuyên mục sức khỏe",
    key: "heath",
  },
  {
    label: "Tin tức",
    key: "news",
  },
  {
    label: "Liên hệ ",
    key: "contact",
  },
];

const HeaderCustom = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [current, setCurrent] = useState(PATH.TRANG_CHU);
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  const handleLogout = () => {
    localStorage.removeItem("rf_token");
    localStorage.removeItem("c_user");
    Cookies.remove("a_token");
    navigate(PATH.TRANG_CHU);
  };
  return (
    <Header className="h-auto bg-white p-0 header-app">
      <div>
        <div className="py-4 mx-56 max-w-6xl">
          <Row className=" items-center">
            <Col span={8}>
              <img src={logo} alt="" />
            </Col>
            <Col span={8} className="pe-8 flex items-center">
              <Search
                placeholder="input search text"
                allowClear
                size="large"
                enterButton
              />
            </Col>
            <Col span={8}>
              <div className="flex gap-2 items-center">
                {Cookies.get("a_token") && currentUser && currentUser.name ? (
                  <Menu
                    theme="light"
                    mode="vertical"
                    items={[
                      {
                        label: currentUser && currentUser.name,
                        key: "name",
                        children: [
                          {
                            label: "Thông tin cá nhân",
                            key: "info",
                            onClick: () =>
                              navigate(
                                PATH.THONG_TIN_CA_NHAN +
                                  `/${currentUser && currentUser.user_id}`
                              ),
                          },
                          {
                            label: "Đổi mật khẩu",
                            key: "changePassword",
                            onClick: () => navigate(PATH.DOI_MAT_KHAU),
                          },
                          {
                            label: "Lịch sử mua hàng",
                            key: "history",
                            onClick: () => navigate(PATH.LICH_SU_MUA_HANG),
                          },
                          {
                            label: "Đăng xuất",
                            key: "logout",
                            onClick: handleLogout,
                          },
                        ],
                      },
                    ]}
                  />
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
        <div style={{ background: "#80B435" }}>
          <Menu
            onClick={onClick}
            className="mx-56 max-w-6xl header-menu"
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={current}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
              background: "#80B435",
            }}
          />
        </div>
      </div>
    </Header>
  );
};

export default HeaderCustom;

import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { Form, Input, Spin } from "antd";

import * as apiUser from "@/api/user";
import { PATH } from "@/routes/path";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //hook
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //handle
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await apiUser.loginUser(values);

      if (data && data.results) {
        if (data.results.access_token) {
          setLoading(false);

          const dataCurrent = jwtDecode(data.results.access_token);
          let time = new Date(dataCurrent.exp * 1000);

          Cookies.set("a_token", data.results.access_token, {
            expires: time,
          });

          localStorage.setItem("c_user", JSON.stringify(dataCurrent));
          localStorage.setItem(
            "rf_token",
            JSON.stringify(data.results.refresh_token)
          );

          navigate(PATH.TRANG_CHU);
        }
      }
    } catch (e) {
      setLoading(true);

      setError("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  const handleClickChangeRegister = () => {
    navigate(PATH.DANG_KY);
  };

  return (
    <Spin spinning={loading} style={{ height: "100%", maxHeight: "unset" }}>
      <div className="p-5  md:p-20  h-screen w-auto flex flex-col md:flex-row items-center justify-center bg-gray-200">
        <div className="content text-3xl text-center md:text-left">
          <h1 className="text-6xl text-blue-500  pb-5">
            <span style={{ color: "#FF9303" }}>Top</span>
            <span style={{ color: "black" }}>Web</span>
          </h1>
          <p className="hidden md:block text-xl">
            Đưa thực phẩm sạch , chất lượng cao đến với mọi nhà
          </p>
        </div>
        <div className="container mx-auto flex flex-col items-center">
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical"
            className="shadow-lg lg:w-1/2 w-full p-4 flex flex-col bg-white rounded-lg"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
              ]}
            >
              <Input
                onChange={() => setError("")}
                size="large"
                placeholder="Email"
                className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
              ]}
            >
              <Input.Password
                onChange={() => setError("")}
                size="large"
                placeholder="Mật khẩu"
                className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              />
            </Form.Item>

            <span style={{ color: "#FF4D4F", transform: "translateY(-20px)" }}>
              {error && error}
            </span>

            <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg">
              Đăng nhập
            </button>
            <Link
              to={PATH.QUEN_MAT_KHAU}
              className="text-blue-400 text-center my-2"
            >
              Quên mật khẩu ?
            </Link>
            <hr />
            <button
              onClick={handleClickChangeRegister}
              className="w-full bg-lime-500 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Đăng ký
            </button>
            <button
              onClick={() => navigate(PATH.TRANG_CHU)}
              className="w-full bg-white  mb-4 text-lime-500 p-3 rounded-lg font-semibold text-lg border-solid border border-lime-500"
            >
              Trang chủ
            </button>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default Login;

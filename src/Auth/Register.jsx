import { useState } from "react";
import { useNavigate } from "react-router";

import { Form, Input, Spin } from "antd";
import { Notification } from "@/common/Notification/Notification";

import * as apiUser from "@/api/user";
import * as validate from "@/ultils/validate";
import { PATH } from "@/routes/path";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //hook
  const [error, setError] = useState("");

  //handle
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = await apiUser.registerUser(values);

      if (data && data.results) {
        setLoading(false);
        Notification.success("Đăng ký thành công");
        navigate(PATH.DANG_NHAP);
      }
    } catch (e) {
      const data = e.response.data;
      if (data) {
        setLoading(false);
        switch (data) {
          case "email is exsist":
            setError("Email này đã tồn tại trong hệ thống");
            break;
          case "phone is exsist":
            setError("Số điện thoại này đã tồn tại trong hệ thống");
            break;
          default:
            setError("");
        }
      }
    }
  };

  const handleClickChangeLogin = () => {
    navigate(PATH.DANG_NHAP);
  };

  return (
    <Spin spinning={loading} style={{ height: "100%", maxHeight: "unset" }}>
      <div className="p-5  md:p-20  h-screen w-auto flex flex-col md:flex-row items-center justify-center bg-gray-200">
        <div className="content text-3xl text-center md:text-left">
          <h1 className="text-6xl text-blue-500 font-bold pb-5">
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
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Họ và tên"
                className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
                {
                  validator: validate.validateEmail,
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Email"
                className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
                {
                  validator: validate.validatePhone,
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Số điện thoại"
                className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
                {
                  validator: validate.validatePhone,
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Địa chỉ"
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
                {
                  min: 6,
                  message: "Vui lòng nhập mật khẩu có ít nhất 6 ký tự",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Mật khẩu"
                className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              />
            </Form.Item>

            <span style={{ color: "#FF4D4F", transform: "translateY(-20px)" }}>
              {error && error}
            </span>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Đăng ký
            </button>
            <Link
              to={PATH.QUEN_MAT_KHAU}
              className="text-blue-400 text-center my-2"
            >
              Quên mật khẩu ?
            </Link>
            <hr />
            <button
              onClick={() => handleClickChangeLogin()}
              type="button"
              className="w-full bg-lime-500 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Đăng nhập
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

export default Register;

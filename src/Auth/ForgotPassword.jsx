import { useState } from "react";
import { useNavigate } from "react-router";

import { Form, Input, Spin } from "antd";
import { Notification } from "@/common/Notification/Notification";

import * as apiUser from "@/api/user";
import { PATH } from "@/routes/path";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //hook
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //handle
  const onFinish = async (values) => {
    try {
      const data = await apiUser.sendMail(values);

      if (data && data.results) {
        setLoading(false);
        Notification.success(
          "Vui lòng truy cập vào email của bạn để lấy lại mật khẩu"
        );
        form.resetFields();
      }
    } catch (e) {
      setLoading(false);
      setError("Email không tồn tại trong hệ thống");
    }
  };
  const handleSendMail = () => {
    setLoading(true);
    form.submit();
  };

  return (
    <Spin
      style={{ height: "100%", maxHeight: "unset" }}
      spinning={loading}
      delay={500}
    >
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

            <span style={{ color: "#FF4D4F", transform: "translateY(-20px)" }}>
              {error && error}
            </span>

            <button
              onClick={handleSendMail}
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg"
            >
              Xác nhận
            </button>
            <Link
              to={PATH.DANG_NHAP}
              className="text-blue-400 text-center my-2"
            >
              Bạn đã có tài khoản ?
            </Link>
            <hr />

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

export default ForgotPassword;

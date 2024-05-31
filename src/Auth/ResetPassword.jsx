import { useState } from "react";
import { useNavigate } from "react-router";

import { Form, Input, Spin } from "antd";

import * as apiUser from "@/api/user";
import { PATH } from "@/routes/path";
import { Notification } from "@/common/notification/Notification";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //hook
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //handle
  const onFinish = async (values) => {
    try {
      const data = await apiUser.resetPassword({
        password_new: values.password_new,
        email: "quannghiem0943@gmail.com",
      });

      if (data && data.results) {
        setLoading(false);
        if (!loading) {
          Notification.success("Đổi mật khẩu thành công");
        }
        navigate(PATH.DANG_NHAP);
      }
    } catch (e) {
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
          <h1 className="text-5xl text-blue-500  pb-5">TopWeb</h1>
          <p className="hidden md:block">
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
              name="password_new"
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
                placeholder="Mật khẩu mới"
                className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              />
            </Form.Item>
            <Form.Item
              name="confirm_password_new"
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
                placeholder="Nhập lại mật khẩu mới"
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

            <hr />

            <button
              onClick={() => navigate(PATH.QUEN_MAT_KHAU)}
              className="w-full bg-white  mb-4 text-green-400 p-3 rounded-lg font-semibold text-lg border-solid border border-green-400"
            >
              Quay lại
            </button>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default ResetPassword;

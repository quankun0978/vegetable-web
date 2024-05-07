import { memo, useState } from "react";

import { Button, Col, Form, Input, Row, notification } from "antd";

import * as apiUser from "@/api/apiUser";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const currentUser = useSelector((state) => state.user.currentUser);
  // hook
  const [error, setError] = useState("");

  //handle
  const onFinish = async (values) => {
    try {
      setError("");
      if (currentUser && currentUser.user_id) {
        const data = await apiUser.changePasswordUser({
          user_id: currentUser.user_id,
          password: values.password,
          password_new: values.password_new,
        });
        if (data && data.results) {
          notification.success("Đổi mật khẩu thành công");
          form.resetFields();
        }
      }
    } catch (e) {
      const { data } = e.response;
      if (data) {
        if (data === "password is incorrect") {
          setError("Mật khẩu không chính xác");
        }
      }
    }
  };

  return (
    <div
      className=" h-100 bg-white py-4 my-4"
      style={{
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "12px",
      }}
    >
      <Row justify="space-between">
        <Col md={24}>
          <div className=" ">
            <Form
              onFinish={onFinish}
              name="register"
              layout="vertical"
              form={form}
            >
              <h3 style={{ paddingBottom: "10px" }} className="font-bold">
                Đổi mật khẩu
              </h3>
              <Row>
                <Col md={24}>
                  <div style={{}}>
                    <Form.Item
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
                      label="Mật khẩu cũ"
                      name="password"
                    >
                      <Input.Password size="middle" />
                    </Form.Item>
                    <Form.Item
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
                      label="Mật khẩu mới"
                      name="password_new"
                    >
                      <Input.Password size="middle" />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng không bỏ trống",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("password_new") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Mật khẩu nhập lại  không khớp")
                            );
                          },
                        }),
                      ]}
                      label="Nhập lại mật khẩu mới"
                      name="confirm_password"
                    >
                      <Input.Password size="middle" />
                    </Form.Item>
                    <Form.Item
                      style={{ margin: "0", transform: "translateY(-15px)" }}
                    >
                      <div className="ant-form-item-explain-error">{error}</div>
                    </Form.Item>
                    <Row justify="end" style={{ gap: "10px" }}>
                      <Button htmlType="submit" type="primary">
                        Cập nhật
                      </Button>
                      <Button type="default">Hủy</Button>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default memo(ChangePassword);

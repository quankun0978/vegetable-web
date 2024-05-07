import { memo, useEffect, useState } from "react";

import { Button, Col, Form, Input, Row, notification } from "antd";

import * as apiUser from "@/api/apiUser";
import { useParams } from "react-router-dom";
// import {  } from "ultils/validate";

// const token = Cookies.get("token");

const InfoUser = () => {
  const [form] = Form.useForm();
  const { user_id } = useParams();
  //   let dataDecode = useSelector((state) => state.user.dataDecode);
  // hook
  const [error, setError] = useState("");

  useEffect(() => {
    handleGetData();
  }, [user_id]);

  const handleGetData = async () => {
    if (user_id) {
      const dt = await apiUser.getUserById(user_id);
      if (dt && dt && dt.results) {
        form.setFieldsValue(dt.results);
      }
    }
  };

  //handle
  const onFinish = async (values) => {
    try {
      const data = await apiUser.updateUserById(values);
      if (data && data.results) {
        notification.success("Cập nhật thành công");
      }
    } catch (e) {
      setError("Lỗi");
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
                Thông tin cá nhân
              </h3>
              <Row>
                <Col md={24}>
                  <div>
                    <Row justify="space-between">
                      <Col md={24}>
                        <Form.Item label="Email" name="email">
                          <Input disabled size="middle" />
                        </Form.Item>
                      </Col>
                      <Col md={24}>
                        <Form.Item label="Số điện thoại" name="phone">
                          <Input disabled size="middle" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col md={24}>
                        <Form.Item
                          label="Họ và tên"
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống",
                            },
                          ]}
                        >
                          <Input size="middle" />
                        </Form.Item>
                      </Col>
                      <Col md={24}>
                        <Form.Item
                          label="Địa chỉ"
                          name="address"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống",
                            },
                          ]}
                        >
                          <Input size="middle" />
                        </Form.Item>
                        <Form.Item name="user_id" style={{ display: "none" }}>
                          <Input size="middle" style={{ display: "none" }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row justify="end" style={{ gap: "10px" }}>
                <Button htmlType="submit" type="primary">
                  Cập nhật
                </Button>
                <Button type="default">Hủy</Button>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default memo(InfoUser);

import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Col, Form, Input, Row, Spin } from "antd";
import { Notification } from "@/common/notification/Notification";

import * as apiUser from "@/api/user";
import { PATH } from "@/routes/path";

const InfoUser = () => {
  const [form] = Form.useForm();
  const { user_id } = useParams();
  const navigate = useNavigate();
  // hook
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const data = await apiUser.updateUserById(values);
      if (data && data.results) {
        Notification.success("Cập nhật thành công");
        setLoading(false);
        navigate(PATH.TRANG_CHU);
      }
    } catch (e) {}
  };

  return (
    <Spin spinning={loading}>
      <div
        className=" h-100 bg-white "
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
                <h3 style={{ paddingBottom: "10px" }}>Thông tin cá nhân</h3>
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
    </Spin>
  );
};

export default memo(InfoUser);

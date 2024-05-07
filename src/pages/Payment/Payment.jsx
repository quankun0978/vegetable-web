import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as api from "@/api/apiCart";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes/path";
import TitleItem from "@/common/TitleItem/TitleItem";
import { Input, Radio, Modal, notification } from "antd";
import Button from "@/common/button/Button";
import { CheckCircleOutlined } from "@ant-design/icons";
import { addItemToOrder, createOrder } from "@/api/apiOrder";

const Payment = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState();
  const [value, setValue] = useState("direct");

  useEffect(() => {
    if (data && data.length === 0) {
      navigate(PATH.GIO_HANG);
    }
  }, [data]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    handleGetData();
  }, [currentUser]);
  const handleGetData = async () => {
    if (currentUser && currentUser.user_id) {
      const dt = await api.getListCartItem(currentUser.user_id);
      if (dt && dt && dt.results && dt.results) {
        setData(dt.results);
        const sum = dt.results.reduce((sum, item) => {
          return sum + item.total;
        }, 0);
        setTotal(sum);
      }
    }
  };
  const handlePayment = async () => {
    try {
      const dt =
        data &&
        data.length > 0 &&
        data.map((item) => {
          return { ...item, product_id: item.ProductProductId };
        });
      const payload = {
        user_id: currentUser.user_id,
        total: total,
        status: "wait",
        payment_id: value,
        listItem: dt,
      };
      const res = await createOrder(payload);

      if (res && res.results) {
        notification.success("Thanh toán thành công");
      }
    } catch (e) {
      notification.error("Thanh toán thất công");
    }
  };
  const confirmPayment = () => {
    Modal.confirm({
      title: "Bạn muốn thanh toán đơn hàng này?",
      icon: <CheckCircleOutlined color="green" />,
      onOk() {
        handlePayment();
      },
      onCancel() {},
    });
  };
  return (
    <div
      style={{
        border: "2px solid var(--color-green)",
        padding: "12px",
        margin: "12px 0",
      }}
    >
      <h3 className="my-2 font-bold text-2xl uppercase ">Đơn hàng của bạn </h3>
      <div>
        <div
          style={{ borderBottom: "2px solid var(--color-gray-100)" }}
          className="flex justify-between items-center mb-2 "
        >
          <h3
            className="font-bold  uppercase"
            style={{ fontSize: "16px", color: "gainsboro" }}
          >
            Sản phẩm
          </h3>
          <h3
            className="font-bold  uppercase"
            style={{ fontSize: "16px", color: "gainsboro" }}
          >
            Tổng cộng
          </h3>
        </div>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
                style={{ borderBottom: "1px solid var(--color-gray-100)" }}
              >
                <h3>
                  {item.Product.name} × {item.quantity}{" "}
                </h3>
                <h3>{item.Product.price}₫</h3>
              </div>
            );
          })}
      </div>
      <div
        className="flex justify-between items-center mb-2 "
        style={{ borderBottom: "2px solid var(--color-gray-100)" }}
      >
        <h3
          className="font-bold  uppercase"
          style={{ fontSize: "16px", color: "gainsboro" }}
        >
          Giảm giá
        </h3>
        <h3 className="font-bold  uppercase" style={{ fontSize: "16px" }}>
          100000 đ
        </h3>
      </div>
      <div
        className="flex justify-between items-center mb-2 "
        style={{ borderBottom: "2px solid var(--color-gray-100)" }}
      >
        <h3
          className="font-bold  uppercase"
          style={{ fontSize: "16px", color: "gainsboro" }}
        >
          Tổng cộng
        </h3>
        <h3 className="font-bold  uppercase" style={{ fontSize: "16px" }}>
          {total} đ
        </h3>
      </div>
      <div>
        <TitleItem title={"Phiếu giảm giá"} />
        <div className="flex items-center gap-2">
          <Input width={300} />
          <Button text={"Ap dụng ưu đãi"} />
        </div>
      </div>
      <div className="my-2">
        <TitleItem title={"Thanh toán"} />

        <Radio.Group onChange={onChange} value={value}>
          <div className="flex flex-col">
            <Radio value={"direct"}>Thanh toán khi nhận hàng</Radio>
            <Radio value={"bank"}>Zalo pay</Radio>
          </div>
        </Radio.Group>
      </div>
      <Button text={"Đặt hàng"} onClick={confirmPayment} />
    </div>
  );
};

export default Payment;

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Radio, Modal, Spin } from "antd";
import Input from "@/common/Input/Input";
import TitleItem from "@/common/TitleItem/TitleItem";
import { Notification } from "@/common/Notification/Notification";
import Button from "@/common/button/Button";

import { CheckCircleOutlined } from "@ant-design/icons";
import { createOrder, paymentZaloPay } from "@/api/orders";
import * as api from "@/api/cart";
import { PATH } from "@/routes/path";

const Payment = () => {
  const navigate = useNavigate();
  const count = useRef(1);
  const currentUser = useSelector((state) => state.user.currentUser);
  const listMyVoucher = useSelector((state) => state.voucher.listMyVoucher);
  const dataInfo = useSelector((state) => state.user.dataInfo);

  const [total, setTotal] = useState(0);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("direct");
  const [codeVoucher, setCodeVoucher] = useState("");
  const [infocode, setInfocode] = useState({});
  const [address, setAddress] = useState("");

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
      setAddress(dataInfo.address);
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
        email: dataInfo.email,
        code_id: infocode.code_id,
        point: dataInfo.point,
        address: address,
      };
      const res = await createOrder(payload);

      if (res && res.results) {
        setLoading(false);
        Notification.success("Thanh toán thành công");
        navigate(PATH.TRANG_CHU);
      }
    } catch (e) {
      Notification.error("Thanh toán thất công");
    }
  };

  const handleApplyVoucher = () => {
    if (!codeVoucher) {
      Notification.error("vui lòng nhập vào mã giảm giá");
    } else {
      if (listMyVoucher && listMyVoucher.length > 0) {
        const infoCode = listMyVoucher.find(
          (item) => item.code_id === codeVoucher
        );
        if (infoCode) {
          if (infoCode && infoCode.Voucher && infoCode.Voucher.discount) {
            if (count.current === 1) {
              let disCount = total - infoCode.Voucher.discount;
              setInfocode(infoCode);
              count.current++;
              if (disCount < 0) setTotal(0);
              else setTotal(disCount);
            }
          }
        }
      }
    }
  };

  const confirmPayment = () => {
    Modal.confirm({
      title: "Bạn muốn thanh toán đơn hàng này?",
      icon: <CheckCircleOutlined color="green" />,
      onOk() {
        setLoading(true);
        handlePayment();
      },
      onCancel() {},
    });
  };
  const handlePaymentZaloPay = async () => {
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
        status: "done",
        payment_id: value,
        listItem: dt,
        email: dataInfo.email,
        code_id: infocode.code_id,
        address: address,
      };
      const res = await paymentZaloPay(payload);
      if (res && res.results && Object.keys(res.results).length > 0) {
        window.location.href = res.results.order_url;
      }
    } catch (e) {
      Notification.error("Lỗi kết nối vui lòng thử lại");
    }
  };
  return (
    <Spin spinning={loading} delay={500}>
      <div
        style={{
          border: "2px solid var(--color-green)",
          padding: "12px",
          margin: "12px 0",
        }}
      >
        <h3 className="my-2 font-bold text-2xl uppercase ">
          Đơn hàng của bạn{" "}
        </h3>
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
            {infocode && infocode.Voucher && infocode.Voucher.discount
              ? infocode.Voucher.discount
              : 0}{" "}
            đ
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
            <Input
              width={300}
              value={codeVoucher}
              onChange={(e) => setCodeVoucher(e.target.value)}
            />
            <Button text={"Áp dụng"} onClick={handleApplyVoucher} />
          </div>
        </div>
        <div className="my-2">
          <TitleItem title={"Địa chỉ nhận hàng"} />
          <Input onChange={(e) => setAddress(e.target.value)} value={address} />
        </div>
        <div className="my-2">
          <TitleItem title={"Thanh toán"} />

          <Radio.Group onChange={onChange} value={value}>
            <div className="flex flex-col">
              <Radio value={"direct"}>Thanh toán khi nhận hàng</Radio>
              <Radio value={"zalopay"}>Zalo pay</Radio>
            </div>
          </Radio.Group>
        </div>

        {value === "direct" ? (
          <Button text={"Đặt hàng"} onClick={confirmPayment} />
        ) : (
          <Button text={"Đặt hàng"} onClick={handlePaymentZaloPay} />
        )}
      </div>
    </Spin>
  );
};

export default Payment;

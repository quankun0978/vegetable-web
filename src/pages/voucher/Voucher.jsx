import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleGetUserById } from "@/redux/Action/userAction";

import { Col, Modal, Row } from "antd";
import { Notification } from "@/common/Notification/Notification";
import Button from "@/common/button/Button";

import { MdOutlineSell } from "react-icons/md";
import { CheckCircleOutlined } from "@ant-design/icons";

import * as apiUser from "@/api/user";
import { addMyVoucher } from "@/api/voucher";

const Voucher = () => {
  const dispath = useDispatch();
  const dataInfo = useSelector((state) => state.user.dataInfo);
  const listVoucher = useSelector((state) => state.voucher.listVoucher);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (listVoucher && listVoucher.length > 0) {
      setData(listVoucher);
    }
  }, [listVoucher]);

  const handleSwapVoucher = async (item) => {
    try {
      if (dataInfo && Object.keys(dataInfo).length > 0) {
        if (dataInfo.point < item.point) {
          Notification.error("Bạn không đủ điểm để đổi");
        } else {
          const res = await addMyVoucher({
            user_id: dataInfo.user_id,
            voucher_id: item.voucher_id,
          });
          const result = await await apiUser.updateUserById({
            user_id: dataInfo.user_id,
            point: dataInfo.point - item.point,
          });
          if (res && res.results && result && result.results) {
            Notification.success("Bạn đã đổi thành công");
            dispath(handleGetUserById(dataInfo.user_id));
          }
        }
      }
    } catch (e) {
      Notification.success("Đã có lỗi xảy ra");
    }
  };

  const confirmSwapVoucher = (item) => {
    Modal.confirm({
      title: "Bạn muốn đổi mã giảm giá này?",
      icon: <CheckCircleOutlined color="green" />,
      onOk() {
        handleSwapVoucher(item);
      },
      onCancel() {},
    });
  };

  return (
    <div className="mt-4 -mx-2 flex flex-col gap-2 ">
      <h3 className="text-xl font-bold text-center ">Ưu đãi dành cho bạn</h3>
      <div>
        Số điểm hiện tại của bạn là : {dataInfo.point && dataInfo.point} điểm
      </div>
      <Row>
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <Col
                key={item.voucher_id}
                md={8}
                sm={24}
                className="pe-4 ps-4 md:ps-0  py-2 w-full"
              >
                <div
                  className=" h-100 bg-white py-4 w-full  flex flex-col gap-2"
                  style={{
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <MdOutlineSell />
                      <h3>{item.voucher_id}</h3>
                    </div>
                    <h3>{item.point} điểm</h3>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      text={"Đổi mã"}
                      onClick={() => confirmSwapVoucher(item)}
                    />
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Voucher;

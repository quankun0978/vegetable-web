import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as api from "@/api/apiOrder";
import Table from "@/common/Table/Table";
import Button from "@/common/button/Button";
import { PATH } from "@/routes/path";
import { Link, useNavigate } from "react-router-dom";
import ModalDetailOrder from "./ModalDetailOrder.jsx";

const columns = [
  {
    title: "Mã hóa đơn ",
    dataIndex: "order_id",
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },

  {
    title: "Ngày thanh toán",
    dataIndex: "createdAt",
  },
  {
    title: "Chi tiết",
    dataIndex: "detail",
  },
];

const Order = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    handleGetData();
  }, [currentUser]);

  const handleShowModal = (item) => {
    setIsModalOpen(true);
    setItem(item);
  };

  const handleGetData = async () => {
    if (currentUser && currentUser.user_id) {
      const dt = await api.getOrderById(currentUser.user_id);
      if (dt && dt && dt.results) {
        const dtTable =
          dt &&
          dt.results &&
          dt.results.length > 0 &&
          dt.results.map((item, index) => {
            return {
              ...item,
              key: index,
              detail: (
                <Link onClick={() => handleShowModal(item)}>Xem chi tiết </Link>
              ),
            };
          });
        setData(dtTable);
      }
    }
  };

  return (
    <div className="py-4 flex flex-col justify-center w-full">
      {data && data.length > 0 ? (
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
          scroll={{
            y: 350,
          }}
        />
      ) : (
        <h3 className="text-center">Bạn chưa có hóa đơn nào.</h3>
      )}
      <div className="flex justify-between items-center mt-4">
        <div
          className={`flex gap-2  ${
            data && data.length > 0 ? "" : "justify-center w-full "
          }`}
        >
          <Button text={"Quay lại"} onClick={() => navigate(PATH.TRANG_CHU)} />
        </div>
      </div>
      <ModalDetailOrder
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        item={item}
      />
    </div>
  );
};

export default Order;

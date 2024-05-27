import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Table from "@/common/Table/Table";
import ModalDetailOrder from "./ModalDetailOrder.jsx";
import Button from "@/common/button/Button";

import * as api from "@/api/orders.js";
import { PATH } from "@/routes/path";

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
  const listAllCodes = useSelector((state) => state.app.listAllCodes);

  const [data, setData] = useState();
  const [item, setItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        const dataStatus =
          listAllCodes && listAllCodes.length > 0
            ? listAllCodes.filter((item) => item.type === "status")
            : [];
        const dataPayment =
          listAllCodes && listAllCodes.length > 0
            ? listAllCodes.filter((item) => item.type === "payment")
            : [];
        const dtTable =
          dt &&
          dt.results &&
          dt.results.length > 0 &&
          dt.results.map((item, index) => {
            return {
              ...item,
              key: index,
              status:
                dataStatus &&
                dataStatus.length > 0 &&
                dataStatus.find((i) => i.value === item.status).label,
              detail: (
                <Link
                  onClick={() =>
                    handleShowModal({
                      ...item,
                      payment: dataPayment.find(
                        (i) => i.value === item.payment_id
                      ).label,
                    })
                  }
                >
                  Xem chi tiết{" "}
                </Link>
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
            x: 750,
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

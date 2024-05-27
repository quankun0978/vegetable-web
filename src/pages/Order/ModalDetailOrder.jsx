import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Modal } from "antd";
import Table from "@/common/Table/Table";

import * as api from "@/api/orders";

const columns = [
  {
    title: "Sản phẩm ",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Giá",
    dataIndex: "price",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
  },
];

const ModalDetailOrder = ({ item, isModalOpen, setIsModalOpen }) => {
  const [data, setData] = useState();

  useEffect(() => {
    handleGetData();
  }, [item]);

  const handleGetData = async () => {
    if (item && item.order_id) {
      const dt = await api.getListOrderItem(item.order_id);
      if (dt && dt.results) {
        const dtTable =
          dt.results &&
          dt.results.length > 0 &&
          dt.results.map((item, index) => {
            return {
              ...item,
              key: index,
              name: (
                <div className="flex gap-2 items-center">
                  <img
                    alt=""
                    src={item.Product.imgPath}
                    width={76}
                    height={76}
                  />
                  <p>{item.Product.name}</p>
                </div>
              ),
              price: item.Product.price,
              quantity: item.quantity,
              total: item.total,
            };
          });
        setData(dtTable);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      footer={() => {
        return <div></div>;
      }}
      title={item && item.order_id}
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <h3 className="mb-2">Phương thức thanh toán: {item && item.payment}</h3>
      <h3 className="mb-2">Địa chỉ giao hàng: {item && item.address}</h3>
      <h3 className="mb-2">Ngày mua hàng: {item && item.createdAt}</h3>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        scroll={{
          y: 350,
          x: 500,
        }}
      />
    </Modal>
  );
};

ModalDetailOrder.propTypes = {
  item: PropTypes.object,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default memo(ModalDetailOrder);

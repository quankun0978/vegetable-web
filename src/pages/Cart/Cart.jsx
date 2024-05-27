import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Notification } from "@/common/Notification/Notification";
import Table from "@/common/Table/Table.jsx";
import Button from "@/common/button/Button";

import { TiDeleteOutline } from "react-icons/ti";

import * as api from "@/api/cart";
import { PATH } from "@/routes/path";

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
  {
    title: "Tổng cộng",
    dataIndex: "total",
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [data, setData] = useState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    handleGetData();
  }, [currentUser]);

  const handleDeleteItemToCart = async (product_id) => {
    try {
      const res = await api.deleteItemToCart(product_id);

      if (res && res.results) {
        handleGetData();
      }
    } catch (e) {
      Notification.error("Lỗi");
    }
  };

  const handleGetData = async () => {
    if (currentUser && currentUser.user_id) {
      const dt = await api.getListCartItem(currentUser.user_id);
      if (dt && dt && dt.results) {
        const dtTable =
          dt &&
          dt.results &&
          dt.results.length > 0 &&
          dt.results.map((item, index) => {
                return {
              ...item,

              key: index,
              name: (
                <div className="flex  flex-wrap  justify-center md:justify-start gap-2 items-center ">
                  <TiDeleteOutline
                    size={24}
                    onClick={() =>
                      handleDeleteItemToCart(item.ProductProductId)
                    }
                  />
                  <img
                    alt=""
                    src={item.Product.imgPath}
                    width={76}
                    height={76}
                  />
                  <p className="hidden md:block">{item.Product.name}</p>
                </div>
              ),
              price:
                item.Product.price > item.Product.price_sale
                  ? item.Product.price_sale
                  : item.Product.price,
              quantity: `${item.quantity}`,
              total: item.total,
            };
          });
        setData(dtTable);
        const sum = dt.results.reduce((sum, item) => {
          return sum + item.total;
        }, 0);
        setTotal(sum);
      }
    }
  };
  return (
    <div className="py-12 flex flex-col justify-center w-full ">
      {data && data.length > 0 ? (
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
          scroll={{
            y: 350,
            x: 300,
          }}
        />
      ) : (
        <h3 className="text-center">Chưa có sản phẩm nào trong giỏ hàng.</h3>
      )}
      <div className="flex justify-between flex-wrap gap-2 items-center mt-4">
        {data && data.length > 0 && <h3>Tổng tiền {total}đ</h3>}
        <div
          className={`flex gap-2  ${
            data && data.length > 0 ? "" : "justify-center w-full "
          }`}
        >
          <Button
            text={"Tiếp tục mua hàng"}
            onClick={() => navigate(PATH.SAN_PHAM)}
          />
          {data && data.length > 0 ? (
            <Button
              onClick={() => navigate(PATH.THANH_TOAN)}
              text={"Thanh toán"}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;

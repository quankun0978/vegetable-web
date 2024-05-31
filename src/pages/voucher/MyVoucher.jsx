import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Typography } from "antd";
import Table from "@/common/Table/Table.jsx";
import Button from "@/common/button/Button";

import { PATH } from "@/routes/path";

import { IoDocumentsOutline } from "react-icons/io5";

const columns = [
  {
    title: "Mã ",
    dataIndex: "code_id",
    width: "30%",
  },
];

const Voucher = () => {
  const navigate = useNavigate();
  const listMyVoucher = useSelector((state) => state.voucher.listMyVoucher);

  const [data, setData] = useState();

  useEffect(() => {
    handleGetData();
  }, [listMyVoucher]);

  const handleGetData = async () => {
    if (listMyVoucher && listMyVoucher.length > 0) {
      const dt = listMyVoucher.map((item) => {
        return {
          ...item,
          code_id: (
            <Typography.Paragraph
              style={{ height: "100%" ,display:"flex" ,alignItems:"center" }}
              copyable={{
                icon: <IoDocumentsOutline color="#80b435" size={18} />,
              }}
            >
              {item.code_id}
            </Typography.Paragraph>
          ),
        };
      });
      setData(dt);
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
        <h3 className="text-center">Bạn chưa có mã giảm giá nào.</h3>
      )}
      <div className="flex justify-between flex-wrap gap-2 items-center mt-4">
        <div
          className={`flex gap-2  ${
            data && data.length > 0 ? "" : "justify-center w-full "
          }`}
        >
          <Button
            text={"Tiếp tục mua hàng"}
            onClick={() => navigate(PATH.SAN_PHAM)}
          />
        </div>
      </div>
    </div>
  );
};
export default Voucher;

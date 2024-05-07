import { useEffect, useRef, useState } from "react";

import { Menu, Select } from "antd";
import Item from "@/common/content/Item/Item";
import { useSelector } from "react-redux";
const items = [
  {
    label: "Hoa quả",
    key: "fruit",
  },
  {
    label: "Cây giống",
    key: "seedling",
  },
  {
    key: "vegetable",
    label: "Rau củ",
  },
];
const Product = () => {
  const [current, setCurrent] = useState("fruit");
  const listProduct = useSelector((state) => state.product.listProduct);
  const [data, setData] = useState([]);
  const dataInit = useRef(listProduct);
  useEffect(() => {
    if (listProduct && listProduct.length > 0) {
      const dt = listProduct.filter((item) => item.category === "fruit");
      setData(dt);
      dataInit.current = listProduct;
    }
  }, [listProduct]);
  const onClick = (e) => {
    setCurrent(e.key);
    if (data && data.length > 0) {
      const dt = dataInit.current.filter((item) => item.category === e.key);
      setData(dt);
    }
  };
  return (
    <div className="w-full">
      <div className="flex gap-2 w-full items-center justify-between">
        <Menu
          style={{
            backgroundColor: "#F0F0F0",
            alignItems: "center",
          }}
          className="w-full"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Select
          size="large"
          showSearch
          style={{
            width: "300px",
          }}
          placeholder="Tìm kiếm theo"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "Giá từ thấp đến cao",
            },
            {
              value: "2",
              label: "Giá từ cao đến thấp",
            },
            {
              value: "3",
              label: "Theo mức độ phổ biến",
            },
          ]}
        />
      </div>
      <div className="mt-4">
        <Item data={data && data.length > 0 && data} span={8} />
      </div>
    </div>
  );
};
export default Product;

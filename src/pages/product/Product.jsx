import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Menu, Spin } from "antd";

import ItemProduct from "@/common/content/Item/ItemProduct";
import Select from "@/common/Select/Select";

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
    label: "Rau củ",
    key: "vegetable",
  },
];

const Product = () => {
  const listProduct = useSelector((state) => state.product.listProduct);
  const dataInit = useRef(listProduct);

  const [current, setCurrent] = useState("fruit");
  const [data, setData] = useState([]);
  const [value, setValue] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listProduct && listProduct.length > 0) {
      const dt = listProduct.filter((item) => item.category === "fruit");
      setData(dt);
      dataInit.current = listProduct;
      setLoading(false);
    }
  }, [listProduct]);

  const onClick = (e) => {
    setCurrent(e.key);
    if (dataInit.current && dataInit.current.length > 0) {
      const dt = dataInit.current.filter((item) => item.category === e.key);
      setData(dt);
    }
  };

  const onChange = (e) => {
    setValue(e);

    let dataSort = data.slice(); // Tạo một bản sao của mảng data

    if (e === "sortIncrease") {
      dataSort = dataSort.sort((a, b) => a.price - b.price);
    }

    if (e === "sortDecrease") {
      dataSort = dataSort.sort((a, b) => b.price - a.price);
    }

    setData(dataSort);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 w-full flex-wrap items-center justify-between">
        <Menu
          style={{
            backgroundColor: "#F0F0F0",
            width: "fit-content",
            alignItems: "center",
          }}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Select
          defaultValue={value}
          value={value}
          onChange={onChange}
          size="large"
          showSearch
          style={{
            width: "300px",
          }}
          placeholder="Tìm kiếm theo"
          options={[
            {
              value: "default",
              label: "Theo mặc định",
            },
            {
              value: "sortIncrease",
              label: "Giá từ thấp đến cao",
            },
            {
              value: "sortDecrease",
              label: "Giá từ cao đến thấp",
            },
          ]}
        />
      </div>
      <Spin spinning={loading} delay={500}>
        <div className="mt-4">
          <ItemProduct data={data} span={12} />
        </div>
      </Spin>
    </div>
  );
};

export default Product;

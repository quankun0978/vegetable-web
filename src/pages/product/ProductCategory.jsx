import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Item from "@/common/content/Item/ItemProduct";

const ProductCategory = () => {
  const { category_id } = useParams();
  const listProduct = useSelector((state) => state.product.listProduct);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (listProduct && listProduct.length > 0) {
      const dt = listProduct.filter((item) => item.category === category_id);
      setData(dt);
    }
  }, [listProduct]);

  return (
    <div className="mb-2">
      <Item data={data && data.length > 0 ? data : []} span={24} />
    </div>
  );
};

export default ProductCategory;

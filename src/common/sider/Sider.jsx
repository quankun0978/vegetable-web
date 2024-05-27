import { memo } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import Sider from "antd/es/layout/Sider";
import ItemSider from "./Item";

import { PATH } from "@/routes/path";

const SiderCustom = ({ data }) => {
  const navigate = useNavigate();

  const dataSale =
    data && data.length > 0
      ? data.filter((item) => item.price > item.price_sale)
      : [];

  return (
    <Sider
      width={"auto"}
      className="md:w-1/4 xl:w-auto"
      style={{
        background: "var(--color-white)",
        maxWidth: "16px !important",
      }}
    >
      <ItemSider
        item={[
          {
            label: "Cây giống",
            value: "seedling",
            onClick: () => {
              navigate(PATH.SAN_PHAM),
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            },
          },
          {
            label: "Hoa quả",
            value: "fruit",
            onClick: () => {
              navigate(PATH.SAN_PHAM),
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            },
          },
          {
            label: "Rau củ",
            value: "vegetable",
            onClick: () => {
              navigate(PATH.SAN_PHAM),
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            },
          },
        ]}
        isImage={false}
        colorItem={"rgba(0,0,0,0.1)"}
        title={"Danh mục sản phẩm"}
        isparagraph={false}
      />

      <ItemSider
        item={data}
        isImage={true}
        colorItem={"rgba(0,0,0,0.1)"}
        title={"SẢN PHẨM NỔI BẬT"}
        isparagraph={false}
      />
      <ItemSider
        isSale={true}
        item={dataSale}
        isImage={true}
        colorItem={"rgba(0,0,0,0.1)"}
        title={"KHUYẾN MÃI"}
        isparagraph={false}
      />
    </Sider>
  );
};

SiderCustom.propTypes = {
  data: PropTypes.array,
};

export default memo(SiderCustom);

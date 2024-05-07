import { memo } from "react";

import Sider from "antd/es/layout/Sider";
import ItemSider from "./item";

import PropTypes from "prop-types";

const SiderCustom = ({ data }) => {
  return (
    <Sider
      width="20%"
      style={{
        background: "var(--color-white)",
      }}
    >
      <ItemSider
        item={[
          {
            label: "Cây giống",
            value: "pea",
          },
          {
            label: "Hạt giống hoa",
            value: "pea",
          },
          {
            label: "Hạt giống hoa",
            value: "pea",
          },
          {
            label: "Hạt giống hoa",
            value: "pea",
          },
          {
            label: "Cây giống",
            value: "pea",
          },
        ]}
        isImage={false}
        colorItem={"rgba(0,0,0,0.1)"}
        title={"Danh mục sản phẩm"}
        isparagraph={false}
      />
      <ItemSider
        item={[
          {
            label: "Cây giống",
            value: "pea",
          },
          {
            label: "Hạt giống hoa",
            value: "pea",
          },
          {
            label: "Hạt giống hoa",
            value: "pea",
          },
          {
            label: "Hạt giống hoa",
            value: "pea",
          },
          {
            label: "Cây giống",
            value: "pea",
          },
        ]}
        isImage={false}
        colorItem={"rgba(0,0,0,0.1)"}
        title={"Tư vấn"}
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
        item={data}
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

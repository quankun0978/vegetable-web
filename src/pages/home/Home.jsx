import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import SiderCustom from "@/common/sider/Sider";

const Home = () => {
  const listProduct = useSelector((state) => state.product.listProduct);

  return (
    <Layout className=" bg-white max-w-6xl">
      <Content
        className=" bg-white "
        style={{
          margin: 0,
          minHeight: 280,
        }}
      >
        <Layout className=" bg-white py-8  max-w-6xl">
          <SiderCustom
            data={listProduct && listProduct.length > 0 && listProduct}
          />
          <Outlet />
        </Layout>
      </Content>
    </Layout>
  );
};

export default Home;

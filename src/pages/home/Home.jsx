import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import SiderCustom from "@/common/sider/Sider";

const Home = () => {
  const listProduct = useSelector((state) => state.product.listProduct);
  return (
    <Layout className=" bg-white max-w-6xl ">
      <Content
        className=" bg-white "
        style={{
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className=" bg-white   xl:max-w-6xl  md:flex ">
          <SiderCustom
            data={listProduct && listProduct.length > 0 ? listProduct : []}
          />
          <div className="md:w-3/4 md:px-2">
            <Outlet />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;

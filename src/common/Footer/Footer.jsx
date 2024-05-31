import { FaFacebookSquare, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Col, Row, Layout } from "antd";

import ItemSider from "@/common/sider/ItemSider";
import Button from "@/common/button/Button";

import { SiZalo } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";

import { PATH } from "@/routes/path";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Layout.Footer style={{ padding: 0 }}>
      <div className="bg-black ">
        <div className="xl:mx-56    py-8 h-80  px-2 mx-2  md:mx-4">
          <Row className="-mx-2  ">
            <Col md={8} className="w-full mb-2 " sm={24}>
              <div>
                <ItemSider
                  isImage={false}
                  isparagraph={true}
                  paragraph={
                    "Công ty TNHH Việt Á là nhà cung cấp các loại Rau sạch, hạt giống hoa, cây ăn quả đảm bảo nguồn gốc xuất xứ, uy tín, an toàn vệ sinh thực phẩm là trên hết. Chúng tôi sẵn sàng tư vấn cho các bạn trồng cây, trồng rau, hoa đạt chất lượng tốt nhất."
                  }
                  title={"Rau hoa quả"}
                  color={"var(--color-white)"}
                  colorTitle={"var(--color-white)"}
                  colorItem={"rgba(255,255,255,0.3)"}
                />
                <Button
                  text={" XEM THÊM"}
                  style={{
                    fontSize: "1.15em",
                    padding: "12px",
                  }}
                />
              </div>
            </Col>
            <Col md={5} className="w-full mb-2" sm={24}>
              <ItemSider
                item={[
                  {
                    label: "Cây giống",
                    value: "pea",
                    onClick: () => navigate(PATH.SAN_PHAM),
                  },
                  {
                    label: "Hoa quả",
                    value: "fruit",
                    onClick: () => navigate(PATH.SAN_PHAM),
                  },
                  {
                    label: "Rau củ",
                    value: "pea",
                    onClick: () => navigate(PATH.SAN_PHAM),
                  },
                ]}
                isImage={false}
                colorItem={"rgba(255,255,255,0.3)"}
                title={"Sản phẩm"}
                color={"var(--color-white)"}
                colorTitle={"var(--color-white)"}
              />
            </Col>
            <Col md={5} className="w-full mb-2" sm={24}>
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
                colorItem={"rgba(255,255,255,0.3)"}
                title={"THÔNG TIN"}
                color={"var(--color-white)"}
                colorTitle={"var(--color-white)"}
              />
            </Col>
            <Col md={5} className="w-full mb-2" sm={24}>
              <ItemSider
                item={[
                  {
                    label: "Facebook",
                    value: "facebook",
                    link: "https://www.facebook.com/quan.nghiem.161/?locale=vi_VN",
                    icon: <FaFacebookSquare size={24} />,
                  },
                  {
                    label: "quankun0978@gmail.com",
                    value: "email",
                    icon: <MdOutlineMail size={24} />,
                  },
                  {
                    label: "0943087121",
                    value: "phone",
                    icon: <FaPhoneAlt size={24} />,
                  },
                  {
                    label: "0943087121",
                    value: "zalo",
                    icon: <SiZalo size={24} />,
                  },
                ]}
                isImage={false}
                colorItem={"rgba(255,255,255,0.3)"}
                title={"LIÊN HỆ"}
                color={"var(--color-white)"}
                colorTitle={"var(--color-white)"}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Layout.Footer>
  );
};

export default Footer;

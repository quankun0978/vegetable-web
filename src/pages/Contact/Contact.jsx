import { useEffect, useState } from "react";

import { Col, Row, Spin } from "antd";

import Googlemap from "@/common/Googlemap/Googlemap";
import ItemSider from "@/common/sider/Item";

import { FaFacebookSquare, FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";

const Contact = () => {
  return (
    <div>
      <Row>
        <Col sm={24} md={15}>
          <div className="pe-4">
            <Googlemap />
          </div>
        </Col>
        <Col sm={24} md={9} className="">
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
            title={"Vui lòng liên hệ"}
            color={"#000"}
            colorTitle={"var(--color-black)"}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Contact;

import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Col, Row } from "antd";

import PropTypes from "prop-types";

import Button from "@/common/button/Button";
import { PATH } from "@/routes/path";

const ItemNewChild = ({ item, width, height }) => {
  const navigate = useNavigate();
  const style = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: width,
    height: height,
    backgroundImage: `url(${item && item.imgPath && item.imgPath})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgb(0, 0, 0.4)",
  };

  return (
    <div className={`w-full  max-w-full  gap-1 pe-2 `}>
      {/* <img loading="lazy" src={image} alt="" /> */}
      <div className="slider-item " style={style}></div>
      <div className="p-2 -mx-2">
        <p style={{ marginBottom: "8px" }}>
          {item && item.title && item.title}
        </p>

        <p
          style={{
            marginBottom: "8px",
            maxHeight: "65px",
            overflowY: "hidden",
          }}
        >
          {item && item.description && item.description}
        </p>

        <Button
          onClick={() => navigate(PATH.TIN_TUC + `/${item.news_id}`)}
          text={"CHI TIẾT"}
          style={{
            backgroundColor: "var(--color-white)",
            color: "#777",
            border: "1px solid #777",
            padding: "4px 14px ",
          }}
        />
      </div>
    </div>
  );
};

ItemNewChild.propTypes = {
  item: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
};

const ItemnNew = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-between w-full -me-2">
      <Row className="w-full">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <Col key={index} md={8} sm={24} className="w-full">
                <ItemNewChild item={item} height={180} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

ItemnNew.propTypes = {
  data: PropTypes.array,
};

export default memo(ItemnNew);

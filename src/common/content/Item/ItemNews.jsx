import { memo } from "react";

import { Col, Row } from "antd";

import PropTypes from "prop-types";

import Button from "@/common/button/Button";

const ItemNewChild = ({ item, width, height }) => {
  const style = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: width,
    height: height,
    backgroundImage: `url(${item && item.image && item.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgb(0, 0, 0.4)",
  };

  return (
    <div className={`w-full  max-w-full  gap-1 pe-2`}>
      {/* <img src={image} alt="" /> */}
      <div className="slider-item" style={style}></div>
      <div className="m-2 ">
        <p style={{ marginBottom: "8px" }}>{item && item.name && item.name}</p>
        <p style={{ marginBottom: "8px" }}>
          {item && item.description && item.description}
        </p>
        <Button
          text={"XEM THÊM"}
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
  height: PropTypes.string,
  width: PropTypes.string,
};

const ItemnNew = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-between w-full -me-2">
      <Row className="">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <Col key={index} span={8}>
                <ItemNewChild item={item} width={"100%"} height={180} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

ItemnNew.propTypes = {
  data: PropTypes.object,
};

export default memo(ItemnNew);

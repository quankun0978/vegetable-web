import React from "react";
import { useNavigate } from "react-router-dom";

import { Col, Row } from "antd";
import PropTypes from "prop-types";

import Button from "@/common/button/Button";

import { PATH } from "@/routes/path";

const ItemChild = ({ item, width, height }) => {
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
    <div className={` text-center  flex gap-1 items-center w-80 `}>
      {/* <img src={imgPath} alt="" /> */}
      <div className="slider-item" style={style}>
        <Button
          className="btn-detail"
          text={"Xem nhanh"}
          onClick={() =>
            navigate(`${PATH.CHI_TIET_SAN_PHAM}/${item.product_id}`)
          }
          style={{
            width: "100%",
            position: "absolute",
            fontWeight: "500",
            fontSize: "12px",
            bottom: "0",
          }}
        />
      </div>
      <div className="m-2">
        <p className="uppercase">{item && item.category && item.category} </p>
        <p>{item && item.name && item.name}</p>

        <p>{item && item.price && item.price}đ</p>
      </div>
    </div>
  );
};

ItemChild.propTypes = {
  item: PropTypes.object,
  height: PropTypes.string,
  width: PropTypes.string,
};

const Item = ({ data, span }) => {
  return (
    <div className="flex flex-wrap justify-between  -mx-2">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <Row key={index} className="m-2 ">
              <Col span={span ? span : 12} sm={24} >
                <ItemChild item={item} width={180} height={180} />
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

Item.propTypes = {
  data: PropTypes.array,
  span: PropTypes.number,
};

export default React.memo(Item);

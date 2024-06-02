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
      {/* <img loading="lazy" src={imgPath} alt="" /> */}
      <div className="slider-item" style={style}>
        <Button
          className="btn-detail"
          text={"Xem nhanh"}
          onClick={() => {
            navigate(`${PATH.CHI_TIET_SAN_PHAM}/${item.product_id}`);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
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
        <p className="uppercase">
          {item &&
            item.categoryData &&
            item.categoryData &&
            item.categoryData.label &&
            item.categoryData.label}{" "}
        </p>
        <p>{item && item.name && item.name}</p>

        <p
          className={
            item.price > item.price_sale ? `product_sale relative` : ""
          }
        >
          {item && item.price && item.price}đ
        </p>

        {item.price > item.price_sale && (
          <p className="font-bold">
            {item && item.price_sale && item.price_sale}đ
          </p>
        )}
      </div>
    </div>
  );
};

ItemChild.propTypes = {
  item: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
};

const ItemProduct = ({ data, span }) => {
  return (
    <div className="flex flex-wrap justify-between  w-full -mx-2">
      <Row className=" w-full ">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <Col
                key={index}
                md={span ? span : 12}
                sm={24}
                className="p-2 w-full"
              >
                <ItemChild item={item} width={150} height={150} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

ItemProduct.propTypes = {
  data: PropTypes.array,
  span: PropTypes.number,
};

export default React.memo(ItemProduct);

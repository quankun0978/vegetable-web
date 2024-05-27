import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";

import { ArrowRight, ArrowLeft } from "../../arrow/Arrow";
import Button from "@/common/button/Button";

import { PATH } from "@/routes/path";

import "react-multi-carousel/lib/styles.css";
import "./slider.scss";

const SliderCustom = ({ items, isBandner, data, isShowDots, breakPoint }) => {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: items,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: breakPoint.mobile,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: breakPoint.tablet,
      partialVisibilityGutter: 30,
    },
  };
  return (
    <div>
      <Carousel
        customRightArrow={<ArrowRight isBandner={isBandner} />}
        customLeftArrow={<ArrowLeft isBandner={isBandner} />}
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container-with-dots"
        draggable
        focusOnSelect={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={isShowDots}
        slidesToSlide={1}
        swipeable
      >
        {data && data.length > 0
          ? data.map((item, index) => {
              return (
                <ItemSlider key={index} item={item} isBandner={isBandner} />
              );
            })
          : []}
      </Carousel>
    </div>
  );
};
const ItemSlider = ({ item, isBandner }) => {
  const navigate = useNavigate();
  const listAllCodes = useSelector((state) => state.app.listAllCodes);
  const [data, setData] = useState({});
  useEffect(() => {
    if (listAllCodes && listAllCodes.length > 0) {
      const dt = listAllCodes.find((i) => i.value === item.category);
      setData(dt);
    }
  }, [listAllCodes]);

  const style = !isBandner
    ? {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "180px",
        backgroundImage: `url(${item && item.imgPath && item.imgPath})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgb(0, 0, 0.4)",
      }
    : {
        height: "350px",
        backgroundImage: `url(${item && item.image && item.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgb(0, 0, 0.4)",
      };
  return isBandner ? (
    <div
      style={style}
      className={`item-slider gap-2 w-full m-auto  flex flex-col justify-center items-center bg-red-400  `}
    >
      <h1 className="text-white uppercase font-bold text-4xl text-center">
        Rau sạch hoa quả sạch
      </h1>
      <h3 className="mx-2 block text-white ">
        Cung cấp rau sạch, hoa quả sạch an toàn
      </h3>
      <Button
        onClick={() => navigate(PATH.LIEN_HE)}
        text={"Liên hệ ngay"}
        style={{
          fontSize: "1.15em",
          padding: "12px",
        }}
      />
    </div>
  ) : (
    <div
      className={` text-center max-w-full flex px-2   flex-col gap-1 justify-center`}
    >
      <div className="slider-item" style={style}>
        <Button
          text={"Xem nhanh"}
          onClick={() => {
            navigate(`${PATH.CHI_TIET_SAN_PHAM}/${item.product_id}`);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          className="btn-detail"
          style={{
            width: "100%",
            position: "absolute",
            fontWeight: "500",
            fontSize: "12px",
            bottom: "0",
          }}
        />
      </div>
      <p className="uppercase">{data && data.label && data.label} </p>
      <p>{item && item.name && item.name}</p>

      <div className="flex flex-col justify-center">
        <p
          className={
            item.price > item.price_sale
              ? `product_sale relative text-center`
              : ""
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

SliderCustom.propTypes = {
  items: PropTypes.number,
  data: PropTypes.array,
  isBandner: PropTypes.bool,
  isShowDots: PropTypes.bool,
  breakPoint: PropTypes.object,
};
ItemSlider.propTypes = {
  item: PropTypes.object,
  isBandner: PropTypes.bool,
  index: PropTypes.number,
};

export default memo(SliderCustom);

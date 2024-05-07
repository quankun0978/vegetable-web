import { memo } from "react";
import { useNavigate } from "react-router-dom";

import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";

import { ArrowRight, ArrowLeft } from "../../arrow/Arrow";
import Button from "@/common/button/Button";

import "react-multi-carousel/lib/styles.css";
import "./styles.scss";
import { PATH } from "@/routes/path";

const SliderCustom = ({ items, isBandner, data, isShowDots }) => {
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
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
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
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return <ItemSlider key={index} item={item} isBandner={isBandner} />;
          })}
      </Carousel>
      ;
    </div>
  );
};
const ItemSlider = ({ item, isBandner }) => {
  const navigate = useNavigate();
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
      <h1 className="text-white uppercase font-bold text-4xl ">
        Rau sạch hoa quả sạch
      </h1>
      <h3 className="mx-2 block text-white">
        Cung cấp rau sạch, hoa quả sạch an toàn
      </h3>
      <Button
        text={"Liên hệ ngay"}
        style={{
          fontSize: "1.15em",
          padding: "12px",
        }}
      />
    </div>
  ) : (
    <div
      className={` text-center max-w-full flex px-2  flex-col gap-1 justify-center`}
    >
      <div className="slider-item" style={style}>
        <Button
          text={"Xem nhanh"}
          onClick={() => navigate(`${PATH.CHI_TIET_SAN_PHAM}/${item.product_id}`)}
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
      <p className="uppercase">{item && item.category && item.category} </p>
      <p>{item && item.name && item.name}</p>

      <p>{item && item.price && item.price}đ</p>
    </div>
  );
};

SliderCustom.propTypes = {
  items: PropTypes.number,
  data: PropTypes.array,
  isBandner: PropTypes.bool,
  isShowDots: PropTypes.bool,
};
ItemSlider.propTypes = {
  item: PropTypes.object,
  isBandner: PropTypes.bool,
  index: PropTypes.number,
};

export default memo(SliderCustom);

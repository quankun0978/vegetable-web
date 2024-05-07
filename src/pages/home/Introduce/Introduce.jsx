import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SliderCustom from "@/common/content/slider/slider";
import TitleItem from "@/common/TitleItem/TitleItem";
import Item from "@/common/content/Item/Item";
import ItemnNew from "@/common/content/Item/ItemNews";
const Introduce = () => {
  const listProduct = useSelector((state) => state.product.listProduct);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (listProduct && listProduct.length > 0) {
      setData(listProduct);
    }
  }, [listProduct]);
  return (
    <div className="  max-w-4xl">
      <div className="">
        <SliderCustom
          isShowDots={true}
          isBandner={true}
          items={1}
          data={[
            {
              image:
                "https://img1.kienthucvui.vn/uploads/2019/10/30/hinh-anh-rau-cu-qua-dep-nhat_112153376.jpg",
            },
            {
              image:
                "https://img1.kienthucvui.vn/uploads/2019/10/30/hinh-anh-rau-cu-qua-dep-nhat_112153376.jpg",
            },
            {
              image:
                "https://img1.kienthucvui.vn/uploads/2019/10/30/hinh-anh-rau-cu-qua-dep-nhat_112153376.jpg",
            },
            {
              image:
                "https://img1.kienthucvui.vn/uploads/2019/10/30/hinh-anh-rau-cu-qua-dep-nhat_112153376.jpg",
            },
          ]}
        />
      </div>
      <div>
        <TitleItem title={"SẢN PHẨM MỚI"} />
        <SliderCustom
          isShowDots={false}
          items={4}
          isBandner={false}
          data={data && data.length > 0 && data}
        />
      </div>
      <div>
        <TitleItem title={"ĐANG KHUYẾN MÃI"} />
        <SliderCustom
          isShowDots={false}
          items={4}
          isBandner={false}
          data={data && data.length > 0 && data}
        />
      </div>

      <div>
        <TitleItem title={"HOA QUẢ SẠCH"} />
        <Item data={data && data.length > 0 && data} />
      </div>
      <div>
        <TitleItem title={"TIN TỨC"} />
        <ItemnNew
          data={[
            {
              name: "CÁCH PHÂN BIỆT CẢI BẮP TA VÀ CẢI BẮP TRUNG QUỐC",
              description:
                "Hiện nay với xu hướng đi lên của xã hội nên yêu cầu cao hơn.[...]					",
              image:
                "https://thucpham.haiphongweb.com/wp-content/uploads/2017/03/cai-bap-that-847x350-300x124.jpg",
            },
            {
              name: "CÁCH PHÂN BIỆT TỎI TA VÀ TỎI TRUNG QUỐC",
              description:
                "Ngoài chợ bán tỏi nhan nhản nhưng nhiều người sẽ hốt hoảng khi biết rằng[...]				",
              image:
                "https://thucpham.haiphongweb.com/wp-content/uploads/2017/03/cai-bap-that-847x350-300x124.jpg",
            },
            {
              name: "TƯ VẤN TRỒNG HOA DỊP TẾT",
              description:
                "Tư vấn trồng hoa dịp TếtTư vấn trồng hoa dịp TếtTư vấn trồng hoa dịp[...]",
              image:
                "https://thucpham.haiphongweb.com/wp-content/uploads/2017/03/cai-bap-that-847x350-300x124.jpg",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Introduce;

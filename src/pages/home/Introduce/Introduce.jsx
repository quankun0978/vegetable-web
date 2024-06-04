import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Spin } from "antd";
import Button from "@/common/button/Button";

import { PATH } from "@/routes/path";

const TitleItem = lazy(() => import("@/common/titleItem/TitleItem"));
const SliderCustom = lazy(() => import("@/common/content/slider/Slider"));
const ItemProduct = lazy(() => import("@/common/content/Item/ItemProduct"));
const ItemnNew = lazy(() => import("@/common/content/Item/ItemNews"));

const Introduce = () => {
  const navigate = useNavigate();
  const listProduct = useSelector((state) => state.product.listProduct);
  const listNews = useSelector((state) => state.news.listNews);

  const [dataNews, setDataNews] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listProduct && listProduct.length > 0) {
      setData(listProduct);
      setLoading(false);
    }
  }, [listProduct]);

  useEffect(() => {
    if (listNews && listNews.length > 0) {
      const dt = listNews.slice(0, 3);
      setDataNews(dt);
    }
  }, [listNews]);

  return (
    <Spin spinning={loading} delay={500}>
      <div className="  max-w-4xl px-2">
        <div className="mb-4">
          <SliderCustom
            breakPoint={{
              mobile: 1,
              tablet: 1,
            }}
            isShowDots={true}
            isBandner={true}
            items={1}
            data={[
              {
                image:
                  "https://firebasestorage.googleapis.com/v0/b/psyched-freedom-421315.appspot.com/o/product%2Fhinh-anh-rau-cu-qua-dep-nhat_112153376.jpg?alt=media&token=a12175ca-4958-4d59-89ed-0546a2e42156 ",
              },
              {
                image:
                  "https://firebasestorage.googleapis.com/v0/b/psyched-freedom-421315.appspot.com/o/product%2Fcach-chon-hoa-qua-phu-hop-trong-che-do-an-uong-han-che-duong-1-768x483-1.jpg?alt=media&token=afbeb7b0-a437-42c5-8650-ad4a833156ec",
              },
              {
                image:
                  "https://firebasestorage.googleapis.com/v0/b/psyched-freedom-421315.appspot.com/o/product%2Fanh-rau-cu-qua-dep_112150876.jpg?alt=media&token=22f3c108-f7e5-4d65-96eb-39a336b92b8e",
              },
              {
                image:
                  "https://firebasestorage.googleapis.com/v0/b/psyched-freedom-421315.appspot.com/o/product%2F6-nhom-trai-cay-de-an-buoi-sang-5711.jpg?alt=media&token=b6993ef1-79a0-4f81-9a01-beeb68e10e62",
              },
            ]}
          />
        </div>
        <div className="mb-4">
          <TitleItem color="black" title={"SẢN PHẨM MỚI"} />
          <SliderCustom
            breakPoint={{
              mobile: 2,
              tablet: 3,
            }}
            isShowDots={false}
            items={4}
            isBandner={false}
            data={data && data.length > 0 ? data : []}
          />
        </div>
        <div className="mb-4">
          <TitleItem title={"ĐANG KHUYẾN MÃI"} />
          <SliderCustom
            breakPoint={{
              mobile: 2,
              tablet: 3,
            }}
            isShowDots={false}
            items={4}
            isBandner={false}
            data={data && data.length > 0 ? data : []}
          />
        </div>

        <div className="mb-4 ">
          <TitleItem title={"HOA QUẢ SẠCH"} />
          <ItemProduct span={8} data={data && data.length > 0 ? data : []} />
          <div
            onClick={() => {
              navigate(PATH.SAN_PHAM);
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="flex  justify-end  cursor-pointer hover:text-lime-600"
          >
            <Button text={"Xem thêm"} />
          </div>
        </div>
        <div className="mb-4">
          <TitleItem title={"TIN TỨC"} />
          <ItemnNew data={dataNews} />
          <div
            onClick={() => {
              navigate(PATH.TIN_TUC);
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="flex  justify-end  cursor-pointer hover:text-lime-600"
          >
            <Button text={"Xem thêm"} />
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Introduce;

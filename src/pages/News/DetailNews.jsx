import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Spin } from "antd";

import { FaArrowLeft } from "react-icons/fa";
import * as api from "@/api/news";

const DetailNews = () => {
  const { news_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetData();
  }, [news_id]);

  const handleGetData = async () => {
    const dt = await api.getListNewsById(news_id);
    if (dt && dt.results) {
      setData(dt.results);
      setLoading(false);
    }
  };
  return (
    <Spin spinning={loading} delay={500}>
      <div className="flex flex-col gap-3 ">
        <div
          onClick={() => navigate(-1)}
          className="flex gap-2 items-center cursor-pointer hover:text-lime-600"
        >
          <FaArrowLeft />
          <h3>Quay lại</h3>
        </div>
        <h3 className="text-2xl font-bold ">
          {data && data.title && data.title}
        </h3>
        <img
          src={data && data.imgPath && data.imgPath}
          alt=""
          style={{ height: "auto", width: "100%" }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: data && data.content && data.content,
          }}
        />
      </div>
    </Spin>
  );
};

export default DetailNews;

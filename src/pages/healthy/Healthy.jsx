import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Col, Pagination, Row, Spin } from "antd";

import { PATH } from "@/routes/path";

const Healthy = () => {
  const navigate = useNavigate();
  const listNews = useSelector((state) => state.news.listNews);

  const [data, setData] = useState();
  const [loadinfg, setLoading] = useState(true);

  useEffect(() => {
    if (listNews && listNews.length > 0) {
      const dt = listNews
        .filter((item) => item.type_new === "healthy")
        .slice(0, 3);
      setLoading(false);
      setData(dt);
    }
  }, [listNews]);

  const onChange = (page) => {
    let dt = listNews
      .filter((item) => item.type_new === "healthy")
      .slice((page - 1) * 3, page * 3 + 2);

    setData(dt);
  };

  return (
    <Spin spinning={loadinfg}>
      <div className="  w-full ">
        <Row className=" w-full ">
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <Col key={index} span={24} className="p-2 w-full">
                  <div className={` text-center  md:flex gap-1  w-full `}>
                    {/* <img loading="lazy" src={imgPath} alt="" /> */}
                    <img loading="lazy"
                      className="h-52 md:w-64 w-full"
                      alt=""
                      src={item.imgPath && item.imgPath}
                      // style={{ height: "200px", width: "250px" }}
                    />
                    <div className="m-2 text-left">
                      <p
                        onClick={() =>
                          navigate(PATH.TIN_TUC + `/${item.news_id}`)
                        }
                        className="uppercase font-bold cursor-pointer hover:text-lime-600"
                      >
                        {item && item.title && item.title}{" "}
                      </p>
                      <p className="max-w-96">
                        {item && item.description && item.description}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
        <div className="flex justify-end mt-2">
          <Pagination
            defaultCurrent={1}
            total={data && data.length}
            pageSize={3}
            onChange={onChange}
          />
        </div>
      </div>
    </Spin>
  );
};

export default Healthy;

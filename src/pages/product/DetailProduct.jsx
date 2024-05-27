import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Avatar, Form, Rate, Space, Spin } from "antd";

import { Notification } from "@/common/Notification/Notification";
import ItemProduct from "@/common/content/Item/ItemProduct";
import Button from "@/common/button/Button";
import Input from "@/common/Input/Input";
import Inputnumber from "@/common/Input/Inputnumber";

import { AiOutlineUser } from "react-icons/ai";

import { getProductById } from "../../api/product";
import { getCommentByProductId, postComment } from "@/api/comment";
import * as api from "@/api/cart";

const DetailProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const listProduct = useSelector((state) => state.product.listProduct);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [data, setData] = useState();
  const [productCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [dataComment, setDataComment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    handleGetData();
  }, [id]);

  useEffect(() => {
    if (data && listProduct && listProduct.length > 0 && data.category) {
      const list = listProduct.filter(
        (item) =>
          item.category === data.category && item.product_id != data.product_id
      );
      setProductCategory(list);
      setLoading(false);
    }
  }, [data, listProduct]);

  const handleGetData = async () => {
    if (id) {
      const dt = await getProductById(id);
      const res = await getCommentByProductId(id);
      if (res && res && res.results) {
        setDataComment(res.results);
      }
      if (dt && dt && dt.results && dt.results.data) {
        setData(dt.results.data);
      }
    }
  };

  const onFinish = async (values) => {
    try {
      if (currentUser && currentUser.user_id && id) {
        const res = await postComment({
          ...values,
          user_id: currentUser.user_id,
          product_id: id,
        });
        if (res && res.results) {
          Notification.success("Đánh giá thành công");
          form.resetFields();
          handleGetData();
        }
      }
    } catch (e) {
      Notification.error("Có lỗi trong quá trình xử lý");
    }
  };

  const handleAddToCart = async () => {
    try {
      const res = await api.addItemToCart({
        UserUserId: currentUser.user_id,
        ProductProductId: id,
        quantity: quantity,
        total:
          quantity *
          (data.price > data.price_sale ? data.price_sale : data.price),
      });
      if (res && res.results) {
        Notification.success("Thêm thành công");
      }
    } catch (e) {}
  };

  const handleComment = () => {
    form.submit();
  };

  return (
    <Spin spinning={loading} delay={500}>
      <div>
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-0">
          <img
            className="xl:w-80 w-full h-80 pe-2"
            alt=""
            src={data && data.imgPath && data.imgPath}
          />
          <div className="flex flex-col gap-2 px-2">
            <h1 className="text-3xl font-bold uppercase">
              {data && data.name && data.name}
            </h1>
            {data &&
              data.price &&
              data.price_sale &&
              data.price > data.price_sale && (
                <div>
                  <p className={`product_sale relative m-0`}>{data.price}đ</p>

                  <p className="font-bold">
                    {data && data.price_sale && data.price_sale}đ
                  </p>
                </div>
              )}

            <div className="flex gap-2" direction="horizontal">
              <Inputnumber
                onChange={(value) => setQuantity(value)}
                value={quantity}
                min={1}
              />
              <Button text={"Thêm vào giỏ hàng"} onClick={handleAddToCart} />
            </div>
            <Space direction="vertical">
              <h3 className="">Mô tả</h3>
              <p>{data && data.description && data.description}</p>
            </Space>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold">Đánh giá</h3>
          {dataComment &&
            dataComment.length > 0 &&
            dataComment.map((item) => {
              return (
                <div key={item.id} className="flex gap-4 items-center mt-2">
                  <Avatar size={48} icon={<AiOutlineUser />} />
                  <div>
                    <h3>{item && item.User && item.User && item.User.name}</h3>
                    <Rate
                      defaultValue={item && item.rate && item.rate}
                      disabled
                    />
                    <p>{item && item.content && item.content}</p>
                  </div>
                </div>
              );
            })}
        </div>

        {currentUser && currentUser.name ? (
          <div className="mt-8">
            <h3>Bạn hãy đánh giá về {data && data.name && data.name}</h3>
            <Form
              form={form}
              name="comment"
              onFinish={onFinish}
              scrollToFirstError
              layout="vertical"
            >
              <Form.Item
                name="rate"
                label="Đánh giá"
                rules={[
                  {
                    required: true,
                    message: "Hãy đưa ra đánh giá của bạn",
                  },
                ]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                name="content"
                label="Bình luận"
                rules={[
                  {
                    required: true,
                    message: "Hãy đưa ra bình luận của bạn",
                  },
                ]}
              >
                <Input isTextArea={true} />
              </Form.Item>

              <Button text={"Gửi đi"} onClick={handleComment} />
            </Form>
          </div>
        ) : (
          <div className="mt-8">Vui lòng đăng nhập để đánh giá</div>
        )}
        <div className="mt-8">
          <h3>SẢN PHẨM LIÊN QUAN</h3>
          <ItemProduct
            data={
              productCategory && productCategory.length > 0
                ? productCategory
                : []
            }
          />
        </div>
      </div>
    </Spin>
  );
};

export default DetailProduct;

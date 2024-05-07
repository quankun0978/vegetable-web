import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "@/common/button/Button";
import {
  Avatar,
  Col,
  Form,
  Input,
  InputNumber,
  Rate,
  Row,
  Space,
  notification,
} from "antd";

import { AiOutlineUser } from "react-icons/ai";
import { getProductById } from "../../api/apiProduct";

import * as api from "@/api/apiCart";
import Item from "@/common/content/Item/Item";

const DetailProduct = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const listProduct = useSelector((state) => state.product.listProduct);
  const [productCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
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
    }
  }, [data, listProduct]);
  const handleGetData = async () => {
    if (id) {
      const dt = await getProductById(id);

      if (dt && dt && dt.results && dt.results.data) {
        setData(dt.results.data);
      }
    }
  };
  const onFinish = () => {};

  const handleAddToCart = async () => {
    try {
      const res = await api.addItemToCart({
        UserUserId: currentUser.user_id,
        ProductProductId: id,
        quantity: quantity,
        total: quantity * data.price,
      });
      if (res && res.results) {
        notification.success("Thêm thành công");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="ms-8">
      <div className="flex justify-center gap-8    ">
        <img
          className="w-80 h-80"
          alt=""
          src={data && data.imgPath && data.imgPath}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold uppercase">
            {data && data.name && data.name}
          </h1>
          <h3>{data && data.price && data.price}</h3>
          <div className="flex gap-2" direction="horizontal">
            <InputNumber
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
        <div className="flex gap-4 items-center mt-2">
          <Avatar size={48} icon={<AiOutlineUser />} />
          <div>
            <h3>Duy Nam</h3>
            <Rate defaultValue={4} disabled />
            <p>Rất ngon</p>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-2">
          <Avatar size={48} icon={<AiOutlineUser />} />
          <div>
            <h3>Thanh Nguyễn</h3>
            <Rate defaultValue={5} disabled />
            <p>Giao hàng nhanh</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3>Bạn hãy đánh giá về {data && data.name && data.name}</h3>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item
            name="rate"
            label="Đánh giá của bạn"
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống",
              },
            ]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Bình luận"
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống",
              },
            ]}
          >
            <Input.TextArea className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          </Form.Item>

          <Button text={"Gửi đi"} />
        </Form>
      </div>
      <div className="mt-8">
        <h3>SẢN PHẨM LIÊN QUAN</h3>
        <Item
          data={
            productCategory && productCategory.length > 0 && productCategory
          }
        />
      </div>
    </div>
  );
};

export default DetailProduct;

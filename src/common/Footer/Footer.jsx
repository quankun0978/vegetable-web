import { Col, Row } from "antd";
import ItemSider from "@/common/sider/item";
import Button from "@/common/button/Button";

const Footer = () => {
  return (
    <div className="bg-black ">
      <div className="mx-56 max-w-6xl  py-8  ">
        <Row className="-mx-2">
          <Col span={6}>
            <ItemSider
              isImage={false}
              isparagraph={true}
              paragraph={
                "Công ty TNHH Việt Á là nhà cung cấp các loại Rau sạch, hạt giống hoa, cây ăn quả đảm bảo nguồn gốc xuất xứ, uy tín, an toàn vệ sinh thực phẩm là trên hết. Chúng tôi sẵn sàng tư vấn cho các bạn trồng cây, trồng rau, hoa đạt chất lượng tốt nhất."
              }
              title={"Rau hoa quả"}
              color={"var(--color-white)"}
              colorTitle={"var(--color-white)"}
              colorItem={"rgba(255,255,255,0.3)"}
            />
          </Col>
          <Col span={6}>
            <ItemSider
              item={[
                {
                  label: "Cây giống",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Cây giống",
                  value: "pea",
                },
              ]}
              isImage={false}
              colorItem={"rgba(255,255,255,0.3)"}
              title={"Sản phẩm"}
              color={"var(--color-white)"}
              colorTitle={"var(--color-white)"}
            />
          </Col>
          <Col span={6}>
            <ItemSider
              item={[
                {
                  label: "Cây giống",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Cây giống",
                  value: "pea",
                },
              ]}
              isImage={false}
              colorItem={"rgba(255,255,255,0.3)"}
              title={"THÔNG TIN"}
              color={"var(--color-white)"}
              colorTitle={"var(--color-white)"}
            />
          </Col>
          <Col span={6}>
            <ItemSider
              item={[
                {
                  label: "Cây giống",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Hạt giống hoa",
                  value: "pea",
                },
                {
                  label: "Cây giống",
                  value: "pea",
                },
              ]}
              isImage={false}
              colorItem={"rgba(255,255,255,0.3)"}
              title={"FACEBOOK"}
              color={"var(--color-white)"}
              colorTitle={"var(--color-white)"}
            />
          </Col>
        </Row>
        <Button
          text={" XEM THÊM"}
          style={{
            fontSize: "1.15em",
            padding: "12px",
          }}
        />
      </div>
    </div>
  );
};

export default Footer;

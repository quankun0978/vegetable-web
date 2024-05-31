import AdviseImg from "@/assets/img/hinh-anh-ve-cac-loai-rau-cu-qua.jpg";

const Advise = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <img
          loading="lazy"
          src={AdviseImg}
          alt="Rau củ quả"
          className="img-fluid"
        />
      </div>
      <div className="col-md-6 mt-2">
        <ul>
          <li>
            <strong>Hoa quả:</strong> Bạn có biết rằng hoa quả không chỉ là một
            món ăn ngon miệng, mà còn là nguồn cung cấp dinh dưỡng vô cùng quan
            trọng cho sức khỏe? Các loại hoa quả như táo, cam, dâu tây, chuối...
            chứa rất nhiều vitamin, khoáng chất và chất xơ cần thiết cho cơ thể.
            Không chỉ vậy, hoa quả còn mang lại nhiều lợi ích tuyệt vời như giúp
            tăng cường hệ miễn dịch, cải thiện tiêu hóa, bảo vệ tim mạch và ngừa
            một số bệnh ung thư.
          </li>
          <li>
            <strong>Rau củ:</strong> Bạn có biết rằng rau củ là nguồn dinh dưỡng
            vô cùng quan trọng cho sức khỏe? Các loại rau như cà rốt, bông cải
            xanh, rau diếp, cải bó xôi... chứa nhiều vitamin, khoáng chất và
            chất xơ cần thiết cho cơ thể. Chúng không chỉ giúp tăng cường hệ
            miễn dịch, cải thiện tiêu hóa mà còn có tác dụng phòng ngừa một số
            bệnh ung thư.
          </li>
          <li>
            <strong>Cây giống:</strong> Cây giống là nền tảng quan trọng cho mọi
            vườn rau, vườn hoa và vườn cây ăn quả của bạn. Chúng không chỉ cung
            cấp mầm sống cho mỗi loài thực vật mà còn quyết định chất lượng,
            năng suất và độ bền vững của cây trồng.
            <br />
            Tại cửa hàng của chúng tôi, chúng tôi luôn cung cấp những giống cây
            trồng chất lượng cao, được đảm bảo nguồn gốc và xuất xứ rõ ràng. Mỗi
            loại cây giống đều được chăm sóc và nuôi trồng cẩn thận, đảm bảo sức
            khỏe và sự phát triển tốt ngay từ khi mới mầm. Chúng tôi cam kết
            cung cấp các loại cây giống tươi xanh, khỏe mạnh và có năng suất
            cao.
            <br />
            Hãy đến cửa hàng của chúng tôi để lựa chọn những loại cây giống ưng
            ý nhất cho vườn của bạn. Chúng tôi sẽ tư vấn kỹ và hỗ trợ bạn chăm
            sóc mọi loại cây trồng để có được những vườn rau, vườn hoa và vườn
            cây ăn quả tuyệt vời nhất.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Advise;

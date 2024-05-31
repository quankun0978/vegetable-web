import AboutImg from "@/assets/img/hinh-anh-rau-cu.jpg";

const About = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <img
          loading="lazy"
          src={AboutImg}
          alt="Rau củ quả"
          className="img-fluid"
        />
      </div>
      <div className="col-md-6 mt-2">
        <ul>
          <li>
            <strong>Sản phẩm chất lượng:</strong> Sản phẩm chất lượng là yếu tố
            quan trọng để thu hút và giữ chân khách hàng. Một sản phẩm chất
            lượng cao phải đáp ứng các tiêu chí như độ bền, hiệu suất, tính thẩm
            mỹ và sự tin cậy. Nhà sản xuất cần đầu tư nghiêm túc vào khâu thiết
            kế, sản xuất và kiểm tra chất lượng để đảm bảo sản phẩm đáp ứng được
            nhu cầu và mong đợi của khách hàng. Việc cung cấp những sản phẩm
            chất lượng cao không chỉ giúp tăng sự hài lòng của khách hàng, mà
            còn nâng cao uy tín và thương hiệu của doanh nghiệp trên thị trường.
          </li>
          <li>
            <strong>Giá thành hợp lý:</strong> Giá thành hợp lý là một khái niệm
            then chốt trong kinh doanh, thể hiện sự cân bằng giữa chi phí sản
            xuất của nhà cung cấp và mức giá mà khách hàng sẵn lòng chấp nhận.
            Để xác định được giá thành hợp lý, các yếu tố như chi phí, giá thị
            trường, khả năng chi trả của khách hàng và lợi nhuận hợp lý cần được
            cân nhắc kỹ lưỡng. Mức giá này phải vừa đủ để nhà cung cấp bù đắp
            chi phí và có lợi nhuận, vừa đảm bảo được sự hấp dẫn đối với khách
            hàng. Tìm được điểm cân bằng này là điều then chốt để duy trì và
            phát triển hoạt động kinh doanh.
          </li>
          <li>
            <strong>Giao hàng nhanh chóng:</strong> Giao hàng nhanh chóng là một
            yếu tố then chốt để đáp ứng kỳ vọng của khách hàng trong thời đại
            công nghệ số hiện nay. Khách hàng mong muốn nhận được sản phẩm trong
            thời gian ngắn nhất, để có thể sử dụng ngay khi cần. Nhà cung cấp
            cần xây dựng hệ thống giao hàng hiệu quả, với đội ngũ vận chuyển
            chuyên nghiệp và các quy trình hỗ trợ, nhằm đảm bảo giao hàng nhanh
            chóng và đúng hẹn. Việc này không chỉ mang lại sự hài lòng cho khách
            hàng, mà còn giúp doanh nghiệp nâng cao chất lượng dịch vụ và cạnh
            tranh tốt hơn trên thị trường.
          </li>
          <li>
            <strong>Phục vụ tận tâm:</strong> Phục vụ khách hàng tận tâm là một
            trong những yếu tố then chốt để xây dựng sự lòng tin và gắn kết với
            khách hàng. Đội ngũ nhân viên chăm sóc khách hàng cần thể hiện sự
            nhiệt tình, chu đáo và luôn sẵn sàng giải đáp mọi thắc mắc, giải
            quyết mọi vấn đề của khách hàng. Họ cần lắng nghe ý kiến của khách
            hàng, hiểu rõ nhu cầu và mong muốn của họ, để từ đó cung cấp các
            giải pháp phù hợp. Việc phục vụ khách hàng một cách tận tâm sẽ góp
            phần xây dựng hình ảnh chuyên nghiệp, đáng tin cậy của doanh nghiệp,
            qua đó thúc đẩy sự hài lòng và lòng trung thành của khách hàng.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;

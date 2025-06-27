import './BlogIntroSection.css';

const BlogIntroSection = () => {
  return (
    <section className="blog-intro">
      <div className="badge">🧠 Kiến thức y khoa từ chuyên gia</div>
      <h1>
        Tìm <strong className="highlight">kiến thức y khoa chính xác</strong> cho bạn
      </h1>
      <p className="description">
        Cập nhật thông tin y khoa mới nhất, lời khuyên từ các chuyên gia<br />
        về sức khỏe giới tính, sinh sản và phòng bệnh – hỗ trợ bạn 24/7.
      </p>
    </section>
  );
};

export default BlogIntroSection;

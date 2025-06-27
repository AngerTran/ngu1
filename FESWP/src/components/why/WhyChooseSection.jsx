import './WhyChooseSection.css';
import {
  ShieldCheck, Stethoscope, Clock, Medal,
  HeartHandshake, ActivitySquare
} from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck size={20} />,
    title: 'Bảo mật thông tin y tế',
    desc: 'Thông tin sức khỏe được mã hóa và bảo vệ theo tiêu chuẩn y tế quốc tế HIPAA',
    color: 'green',
  },
  {
    icon: <Stethoscope size={20} />,
    title: 'Bác sĩ chuyên khoa giới tính',
    desc: 'Đội ngũ bác sĩ chuyên về sức khỏe giới tính với chứng chỉ hành nghề',
    color: 'teal',
  },
  {
    icon: <Clock size={20} />,
    title: 'Tư vấn y tế 24/7',
    desc: 'Hỗ trợ và tư vấn y tế liên tục từ đội ngũ bác sĩ chuyên nghiệp',
    color: 'blue',
  },
  {
    icon: <Medal size={20} />,
    title: 'Chất lượng y tế đảm bảo',
    desc: 'Dịch vụ y tế được kiểm định và đạt tiêu chuẩn bệnh viện quốc tế',
    color: 'purple',
  },
  {
    icon: <HeartHandshake size={20} />,
    title: 'Chăm sóc y tế tận tâm',
    desc: 'Phương pháp điều trị nhân văn với sự thấu hiểu và tôn trọng bệnh nhân',
    color: 'rose',
  },
  {
    icon: <ActivitySquare size={20} />,
    title: 'Công nghệ y tế hiện đại',
    desc: 'Hệ thống theo dõi và quản lý sức khỏe giới tính với AI y tế',
    color: 'cyan',
  },
];

const WhyChooseSection = () => {
  return (
    <section className="why-section">
      <div className="why-container">
        <div className="why-header">
          <span className="badge">Lợi ích y tế vượt trội</span>
          <h2>Tại sao chọn STI Health?</h2>
          <p>
            Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe giới tính tốt nhất với sự
            chuyên nghiệp và tận tâm của đội ngũ y bác sĩ.
          </p>
        </div>

        <div className="why-grid">
          {features.map((item, index) => (
            <div key={index} className="why-card">
              <div className={`icon-box ${item.color}`}>{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="why-cta">
          <h3>Bắt đầu hành trình chăm sóc sức khỏe giới tính</h3>
          <p>Đăng ký ngay để nhận tư vấn y tế miễn phí từ bác sĩ chuyên khoa giới tính</p>
          <div className="cta-buttons">
            <button className="btn-primary">Đăng ký tư vấn y tế miễn phí</button>
            <button className="btn-outline">Tìm hiểu thêm về dịch vụ</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;

import './HeroSection.css';
import { ShieldCheck, Stethoscope, HeartHandshake, Calendar } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Bên trái */}
        <div className="hero-left">
          <div className="hero-badge">
            <ShieldCheck size={16} />
            <span>Bảo mật tuyệt đối</span>
          </div>

          <h1>
            Tư vấn sức khỏe <span className="highlight">giới tính</span><br />chuyên nghiệp
          </h1>

          <p className="hero-description">
            Hệ thống tư vấn sức khỏe giới tính hàng đầu với đội ngũ chuyên gia y tế
            giàu kinh nghiệm, bảo mật thông tin tuyệt đối và dịch vụ 24/7.
          </p>

          <div className="hero-stats">
            <div><strong>1000+</strong><br />Bệnh nhân tin tưởng</div>
            <div><strong>50+</strong><br />Bác sĩ chuyên khoa</div>
            <div><strong>24/7</strong><br />Hỗ trợ y tế</div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary"><Calendar size={16} /> Đặt lịch khám</button>
            <button className="btn-outline"><Stethoscope size={20} /> Xem dịch vụ y tế</button>
          </div>
        </div>

        {/* Bên phải */}
        <div className="hero-right">
          <div className="feature-box">
            <div className="feature">
              <ShieldCheck size={20} className="icon icon-green" />
              <div>
                <strong>Bảo mật tuyệt đối</strong>
                <p>Thông tin y tế được bảo vệ nghiêm ngặt</p>
              </div>
            </div>
            <div className="feature">
              <Stethoscope size={20} className="icon icon-blue" />
              <div>
                <strong>Bác sĩ chuyên khoa</strong>
                <p>Đội ngũ y bác sĩ giàu kinh nghiệm</p>
              </div>
            </div>
            <div className="feature">
              <HeartHandshake size={20} className="icon icon-purple" />
              <div>
                <strong>Chăm sóc tận tâm</strong>
                <p>Phục vụ với tình yêu thương và trách nhiệm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

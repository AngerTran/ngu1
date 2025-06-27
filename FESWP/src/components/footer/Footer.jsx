import './Footer.css';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Cột 1: Giới thiệu */}
                <div className="footer-column">
                <div className="footer-logo">
                    <div className="logo-icon"><Heart size={20} color="white" /></div>
                    <div>
                    <div className="footer-logo-text">STI Health</div>
                    <div className="slogan">Tư vấn sức khỏe giới tính</div>
                    </div>
                </div>
                <p className="footer-description">
                    Hệ thống tư vấn sức khỏe giới tính hàng đầu Việt Nam với đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm và dịch vụ bảo mật tuyệt đối.
                </p>
                </div>

                {/* Cột 2: Dịch vụ */}
                <div className="footer-column">
                <h4>Dịch vụ y tế</h4>
                <ul>
                    <li>Xét nghiệm STI</li>
                    <li>Tư vấn bác sĩ</li>
                    <li>Kiến thức y khoa</li>
                    <li>Đặt lịch khám</li>
                </ul>
                </div>

                {/* Cột 3: Chuyên khoa */}
                <div className="footer-column">
                <h4>Chuyên khoa</h4>
                <ul>
                    <li>Sức khỏe giới tính</li>
                    <li>Tư vấn trực tuyến</li>
                    <li>Xét nghiệm tại nhà</li>
                    <li>Tư vấn dinh dưỡng</li>
                </ul>
                </div>

                {/* Cột 4: Liên hệ */}
                <div className="footer-column">
                <h4>Liên hệ y tế</h4>
                <ul>
                    <li><Phone size={16} /> 1900-1234 <span className="sub">Hotline y tế 24/7</span></li>
                    <li><Mail size={16} /> tuvan@stihealth.vn</li>
                    <li><MapPin size={16} /> 123 Nguyễn Du, Q1<br />TP. Hồ Chí Minh</li>
                </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-container footer-bottom-inner">
                    <p>© 2024 STI Health. Tất cả quyền được bảo lưu. Giấy phép hoạt động y tế số 123/BYT.</p>
                    <div className="footer-links">
                        <a href="#">Chính sách bảo mật y tế</a>
                        <a href="#">Điều khoản sử dụng</a>
                        <a href="#">Liên hệ bác sĩ</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

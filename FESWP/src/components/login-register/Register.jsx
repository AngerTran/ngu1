import React, { useState } from 'react';
import './Register.css';
import './VerifyEmail.css';
import {
  User, Mail, Phone, Lock, Eye, EyeOff,
  HeartHandshake, ShieldCheck, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';
import axios from 'axios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirthday: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...formData,
      gender: formData.gender === 'true',
      dateOfBirthday: formData.dateOfBirthday,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', payload, {
        withCredentials: true,
      });

      console.log('Đăng ký thành công:', response.data);
      setEmail(formData.email);
      setIsRegistered(true);
    } catch (err) {
      console.error("Lỗi khi đăng ký:", err.response?.data || err.message);

      if (err.response && err.response.data) {
        const { message, errors } = err.response.data;

        if (message) {
          setError(message);
        } else if (errors && typeof errors === 'object') {
          const firstError = Object.values(errors)[0];
          setError(firstError || 'Đăng ký thất bại');
        } else {
          setError('Đăng ký thất bại');
        }
      } else {
        setError('Không thể kết nối đến máy chủ');
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-info">
        <h1>
          Tham gia cộng đồng <span className="register-highlight">sức khỏe</span>
        </h1>
        <p>Đăng ký ngay để trải nghiệm dịch vụ chăm sóc sức khỏe giới tính hàng đầu tại Việt Nam.</p>

        <div className="register-stats">
          <div>
            <div className="register-stat-value">50K+</div>
            <div className="register-stat-label">Người dùng tin tưởng</div>
          </div>
          <div>
            <div className="register-stat-value">99%</div>
            <div className="register-stat-label">Độ hài lòng</div>
          </div>
        </div>

        <div className="register-features">
          <div className="register-feature">
            <div className="register-feature-icon"><HeartHandshake size={20} /></div>
            <div><strong>Tư vấn chuyên khoa</strong><div>Đội ngũ bác sĩ giàu kinh nghiệm</div></div>
          </div>
          <div className="register-feature">
            <div className="register-feature-icon"><ShieldCheck size={20} /></div>
            <div><strong>Bảo mật tuyệt đối</strong><div>Thông tin được mã hóa end-to-end</div></div>
          </div>
          <div className="register-feature">
            <div className="register-feature-icon"><Award size={20} /></div>
            <div><strong>Chất lượng hàng đầu</strong><div>Được chứng nhận bởi Bộ Y tế</div></div>
          </div>
        </div>
      </div>

      <div className="register-form-box">
        {isRegistered ? (
          <VerifyEmail email={email} />
        ) : (
          <>
            <h2>Đăng ký</h2>
            <p>Tạo tài khoản mới để sử dụng dịch vụ</p>

            <form onSubmit={handleRegister}>
              <div className="register-input-icon">
                <User className="register-icon-left" />
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-input-icon">
                <Mail className="register-icon-left" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-input-icon">
                <Phone className="register-icon-left" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-two-columns">
                <div className="register-form-group">
                  <label htmlFor="gender">Giới tính</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="register-select"
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </div>

                <div className="register-form-group">
                  <label htmlFor="dateOfBirthday">Ngày sinh</label>
                  <input
                    type="date"
                    id="dateOfBirthday"
                    name="dateOfBirthday"
                    className="register-input"
                    value={formData.dateOfBirthday}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="register-input-icon">
                <Lock className="register-icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="register-icon-right" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <div className="register-input-icon">
                <Lock className="register-icon-left" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span className="register-icon-right" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              {/* ✅ Checkbox sửa lỗi xuống dòng */}
              <label className="register-checkbox-label">
                <input type="checkbox" required />
                <span>
                  Tôi đồng ý với <a href="#">điều khoản</a> & <a href="#">chính sách bảo mật</a>.
                </span>
              </label>

              <button type="submit" className="register-submit-btn">
                Đăng ký →
              </button>

              {typeof error === 'string' && <p className="register-error-msg">{error}</p>}

              <div className="register-login-link">
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;

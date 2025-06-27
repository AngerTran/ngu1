import React, { useState } from 'react';
import {
  Eye, EyeOff, Mail, Lock,
  HeartHandshake, ShieldCheck, Award
} from 'lucide-react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import VerifyEmail from './VerifyEmail';
import ResetPassword from './ResetPassword';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      }, { withCredentials: true });

      const token = response.data.token;
      const decoded = jwtDecode(token);

      const role = Array.isArray(decoded.role) ? decoded.role[0] : decoded.role;

      const user = {
        name: decoded.Name || decoded.name || decoded.sub,
        email: decoded.email || email,
        role: role,
        token: token
      };

      setUser(user);
      localStorage.setItem('token', token);

      // Navigate based on role
      navigate('/');
    } catch (err) {
      const res = err.response?.data;
      setError(typeof res === 'string' ? res : (res?.message || 'Đăng nhập thất bại'));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-info">
        <h1>
          Tư vấn sức khỏe <span className="login-highlight">giới tính</span><br />
          chuyên nghiệp
        </h1>
        <p>Tham gia cùng hàng nghìn người dùng tin tưởng STI Health cho việc chăm sóc sức khỏe giới tính.</p>

        <div className="login-stats">
          <div>
            <div className="stat-value">50K+</div>
            <div className="stat-label">Người dùng tin tưởng</div>
          </div>
          <div>
            <div className="stat-value">99%</div>
            <div className="stat-label">Độ hài lòng</div>
          </div>
        </div>

        <div className="login-features">
          <div className="login-feature">
            <div className="login-feature-icon"><HeartHandshake size={20} /></div>
            <div>
              <strong>Tư vấn chuyên khoa</strong>
              <div>Đội ngũ bác sĩ giàu kinh nghiệm</div>
            </div>
          </div>
          <div className="login-feature">
            <div className="login-feature-icon"><ShieldCheck size={20} /></div>
            <div>
              <strong>Bảo mật tuyệt đối</strong>
              <div>Thông tin được mã hóa end-to-end</div>
            </div>
          </div>
          <div className="login-feature">
            <div className="login-feature-icon"><Award size={20} /></div>
            <div>
              <strong>Chất lượng hàng đầu</strong>
              <div>Được chứng nhận bởi Bộ Y tế</div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-form">
        {formState === 'login' && (
          <>
            <h2>Đăng nhập</h2>
            <p>Chào mừng trở lại với STI Health</p>
            <form onSubmit={handleLogin}>
              <div className="login-input-icon">
                <Mail className="login-icon-left" />
                <input
                  type="email"
                  placeholder="Nhập địa chỉ Gmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-input-icon">
                <Lock className="login-icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="login-icon-right" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <div className="login-options">
                <label className="login-checkbox">
                  <input type="checkbox" />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <button
                  type="button"
                  onClick={() => setFormState('forgot')}
                  className="login-forgot-link"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button type="submit" className="login-submit-btn">Đăng nhập →</button>
              {error && <p className="login-error-msg">{error}</p>}
              <div className="login-register">
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
              </div>
            </form>
          </>
        )}

        {formState === 'forgot' && (
          <ForgotPassword
            onNext={(receivedEmail) => {
              setEmail(receivedEmail);
              setFormState('verify');
            }}
            onBack={() => setFormState('login')}
          />
        )}

        {formState === 'verify' && (
          <VerifyEmail
            email={email}
            type="reset"
            onBack={() => setFormState('forgot')}
            onNext={(receivedCode) => {
              setCode(receivedCode);
              setFormState('reset');
            }}
          />
        )}

        {formState === 'reset' && (
          <ResetPassword
            email={email}
            code={code}
            onBack={() => setFormState('verify')}
            onDone={() => setFormState('login')}
          />
        )}
      </div>
    </div>
  );
};

export default Login;

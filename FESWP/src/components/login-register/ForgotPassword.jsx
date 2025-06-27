import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import './ForgotPassword.css';
import axios from 'axios';

const ForgotPassword = ({ onNext, onBack }) => {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('http://localhost:8080/api/auth/forgot-password', {
        email: emailInput
      });

      setMessage(res.data || 'Mã xác thực đã được gửi đến email của bạn.');
      if (onNext) onNext(emailInput);
    } catch (err) {
      const msg = err.response?.data || 'Không thể gửi mã xác thực';
      setError(typeof msg === 'string' ? msg : msg.message);
    }
  };

  return (
    <div className="forgot-password-form">
      <h2>Quên mật khẩu?</h2>
      <p>Nhập địa chỉ email để nhận mã xác thực đặt lại mật khẩu</p>

      <form onSubmit={handleSubmit}>
        <div className="input-icon">
          <Mail className="icon-left" />
          <input
            type="email"
            placeholder="Nhập địa chỉ Gmail"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button type="submit" className="btn-submit">
          Gửi mã xác thực
        </button>

        <div className="back-button">
          <button type="button" onClick={onBack}>
            ← Quay lại đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

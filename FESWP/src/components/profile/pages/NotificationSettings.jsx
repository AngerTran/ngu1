import React, { useState } from 'react';
import './NotificationSettings.css';
import { Mail, Bell } from 'lucide-react';

const NotificationSettings = () => {
  const [methods, setMethods] = useState({
    email: true,
    push: true
  });

  const [types, setTypes] = useState({
    reminder: true,
    testResult: true,
    news: false
  });

  const toggleMethod = (name) => {
    setMethods(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleType = (name) => {
    setTypes(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="info-wrapper">
      <div className="info-header">
        <h2>Thông báo</h2>
        <p>Cài đặt thông báo và ưu tiên</p>
      </div>

      <div className="info-form">
        <h3>Phương thức thông báo</h3>
        <div className="notify-row">
          <div className="notify-label">
            <Mail size={18} />
            <div>
              <strong>Thông báo email</strong>
              <p>Nhận thông báo qua email</p>
            </div>
          </div>
          <label className="switch">
            <input type="checkbox" checked={methods.email} onChange={() => toggleMethod('email')} />
            <span className="slider" />
          </label>
        </div>

        <div className="notify-row">
          <div className="notify-label">
            <Bell size={18} />
            <div>
              <strong>Thông báo đẩy</strong>
              <p>Nhận thông báo trên ứng dụng</p>
            </div>
          </div>
          <label className="switch">
            <input type="checkbox" checked={methods.push} onChange={() => toggleMethod('push')} />
            <span className="slider" />
          </label>
        </div>

        <h3>Loại thông báo</h3>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" checked={types.reminder} onChange={() => toggleType('reminder')} /> Nhắc nhở lịch hẹn
          </label>
          <label>
            <input type="checkbox" checked={types.testResult} onChange={() => toggleType('testResult')} /> Kết quả xét nghiệm
          </label>
          <label>
            <input type="checkbox" checked={types.news} onChange={() => toggleType('news')} /> Tin tức và cập nhật
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

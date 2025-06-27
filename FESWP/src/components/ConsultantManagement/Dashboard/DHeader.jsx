import React from 'react';
import './DHeader.css';
import { CalendarDays, Users, MessageSquare, TrendingUp } from 'lucide-react';

const DHeader = () => {
  return (
    <div className="dheader-container">
      <div className="dheader-top">
        <h2>Dashboard</h2>
        <p>Tổng quan hoạt động tư vấn của bạn</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-title">Tư vấn hôm nay</p>
            <h3 className="stat-value">5</h3>
            <p className="stat-subtext">Buổi tư vấn</p>
          </div>
          <div className="stat-icon blue">
            <CalendarDays size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-title">Tổng tư vấn</p>
            <h3 className="stat-value">127</h3>
            <p className="stat-subtext">Tháng này</p>
          </div>
          <div className="stat-icon green">
            <Users size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-title">Câu hỏi chưa trả lời</p>
            <h3 className="stat-value">8</h3>
            <p className="stat-subtext">Cần xử lý</p>
          </div>
          <div className="stat-icon orange">
            <MessageSquare size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-title">Đánh giá trung bình</p>
            <h3 className="stat-value">4.8</h3>
            <div className="stars">★★★★★</div>
          </div>
          <div className="stat-icon purple">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DHeader;

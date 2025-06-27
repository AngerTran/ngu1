// SHHeader.jsx
import './SHHeader.css';
import { Calendar, CheckCircle, Clock, Users } from 'lucide-react';

const SHHeader = () => {
  return (
    <div className="sh-header">
      <div className="sh-header-title">
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="icon" className="sh-header-icon" />
        <div>
          <h1>Tổng quan hệ thống</h1>
          <p>Bảng điều khiển quản lý xét nghiệm STI</p>
        </div>
      </div>

      <div className="sh-cards">
        <div className="sh-card blue">
          <div className="sh-card-header">
            <span>Tổng lịch hẹn hôm nay</span>
            <Calendar size={18} />
          </div>
          <h2>12</h2>
          <p>+2 so với hôm qua</p>
        </div>

        <div className="sh-card green">
          <div className="sh-card-header">
            <span>Đã hoàn tất</span>
            <CheckCircle size={18} />
          </div>
          <h2>8</h2>
          <p>67% tổng số</p>
        </div>

        <div className="sh-card orange">
          <div className="sh-card-header">
            <span>Đang xử lý</span>
            <Clock size={18} />
          </div>
          <h2>1</h2>
          <p>Cần theo dõi</p>
        </div>

        <div className="sh-card purple">
          <div className="sh-card-header">
            <span>Chờ xử lý</span>
            <Users size={18} />
          </div>
          <h2>3</h2>
          <p>Cần xử lý sớm</p>
        </div>
      </div>
    </div>
  );
};

export default SHHeader;

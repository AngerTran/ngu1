import React from 'react';
import './CSFooter.css';
import { CalendarDays, Phone, Clock, UserRound } from 'lucide-react';

const sessions = [
  {
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    date: 'Thứ Ba, 18 tháng 6, 2024',
    time: '09:00',
    duration: 60,
    note: 'Tư vấn về vấn đề công việc và stress',
    status: 'Đã xác nhận',
  },
  {
    name: 'Trần Thị B',
    phone: '0987654321',
    date: 'Thứ Ba, 18 tháng 6, 2024',
    time: '14:30',
    duration: 45,
    note: 'Tư vấn về mối quan hệ gia đình',
    status: 'Chờ xác nhận',
  },
  {
    name: 'Lê Văn C',
    phone: '0369258147',
    date: 'Thứ Tư, 19 tháng 6, 2024',
    time: '10:00',
    duration: 60,
    note: 'Tư vấn phát triển kỹ năng cá nhân',
    status: 'Đã xác nhận',
  },
  {
    name: 'Phạm Thị D',
    phone: '0147258369',
    date: 'Thứ Tư, 19 tháng 6, 2024',
    time: '15:00',
    duration: 60,
    note: 'Tư vấn sức khỏe tinh thần',
    status: 'Đã hoàn thành',
  },
  {
    name: 'Ngô Văn E',
    phone: '0834567891',
    date: 'Thứ Năm, 20 tháng 6, 2024',
    time: '08:00',
    duration: 30,
    note: 'Tư vấn định hướng nghề nghiệp',
    status: 'Chờ xác nhận',
  },
];

const CSFooter = () => {
  return (
    <div className="cs-footer-container">
      {sessions.map((item, index) => (
        <div key={index} className="cs-session-card">
          {/* Trái: Avatar + Info */}
          <div className="cs-session-left">
            <div className="cs-session-avatar">
              <UserRound size={42} />
            </div>
            <div className="cs-session-info">
              <strong>{item.name}</strong>
              <div className="cs-info-line"><Phone size={14} /> {item.phone}</div>
              <div className="cs-info-line"><CalendarDays size={14} /> {item.date}</div>
              <div className="cs-info-note">
                <strong>Ghi chú:</strong> {item.note}
              </div>
            </div>
          </div>

          {/* Giữa: Thời gian */}
          <div className="cs-session-center">
            <div className="cs-session-time">
              <Clock size={16} /> {item.time} ({item.duration} phút)
            </div>
          </div>

          {/* Phải: Trạng thái + Hành động */}
          <div className="cs-session-right">
            <div className={`cs-status ${getStatusClass(item.status)}`}>{item.status}</div>
            <div className="cs-session-actions">
              <button className="btn btn-dark">Liên hệ</button>
              {item.status === 'Chờ xác nhận' && <button className="btn btn-outline">Xác nhận</button>}
              {item.status === 'Đã xác nhận' && <button className="btn btn-outline">Hoàn thành</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Đã xác nhận':
      return 'status-confirmed';
    case 'Chờ xác nhận':
      return 'status-pending';
    case 'Đã hoàn thành':
      return 'status-done';
    default:
      return '';
  }
};

export default CSFooter;

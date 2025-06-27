import React from 'react';
import './DFooter.css';

const DFooter = () => {
  const scheduleList = [
    { time: '09:00', name: 'Nguyễn Văn A', status: 'Đã hoàn thành' },
    { time: '10:30', name: 'Trần Thị B', status: 'Đang diễn ra' },
    { time: '14:00', name: 'Lê Văn C', status: 'Sắp tới' },
    { time: '15:30', name: 'Phạm Thị D', status: 'Sắp tới' },
  ];

  const notificationList = [
    {
      type: 'Lịch mới',
      description: 'Bạn có 2 lịch tư vấn mới được đặt',
      color: 'blue',
    },
    {
      type: 'Đánh giá mới',
      description: 'Bạn nhận được 3 đánh giá 5 sao',
      color: 'green',
    },
    {
      type: 'Câu hỏi chờ',
      description: '8 câu hỏi đang chờ bạn trả lời',
      color: 'orange',
    },
  ];

  return (
    <div className="dfooter-container">
      <div className="schedule-card">
        <h3>Lịch tư vấn hôm nay</h3>
        <ul className="schedule-list">
          {scheduleList.map((item, index) => (
            <li key={index} className="schedule-item">
              <span className="schedule-time">{item.time}</span>
              <span className="schedule-name">{item.name}</span>
              <span
                className={`schedule-status ${
                  item.status === 'Đã hoàn thành'
                    ? 'status-done'
                    : item.status === 'Đang diễn ra'
                    ? 'status-progress'
                    : 'status-upcoming'
                }`}
              >
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="notification-card">
        <h3>Thông báo hệ thống</h3>
        <ul className="notification-list">
          {notificationList.map((item, index) => (
            <li key={index} className={`notification-item ${item.color}`}>
              <strong>{item.type}</strong> <br />
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DFooter;

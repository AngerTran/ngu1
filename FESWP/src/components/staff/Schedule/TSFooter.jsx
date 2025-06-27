// TSFooter.jsx
import './TSFooter.css';
import { Clock } from 'lucide-react';

const appointments = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    test: 'Xét nghiệm HIV',
    note: 'Đã lấy mẫu thành công',
    time: '09:00',
    date: '2024-06-18',
    status: 'Hoàn tất'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    test: 'Xét nghiệm Giang mai',
    note: 'Đang xử lý mẫu',
    time: '10:30',
    date: '2024-06-18',
    status: 'Đang xử lý'
  },
  {
    id: 3,
    name: 'Lê Minh C',
    test: 'Xét nghiệm Lậu',
    note: 'Chờ khách đến',
    time: '11:00',
    date: '2024-06-18',
    status: 'Chờ xử lý'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    test: 'Xét nghiệm Herpes',
    note: 'Lịch hẹn chiều',
    time: '14:00',
    date: '2024-06-18',
    status: 'Chờ xử lý'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    test: 'Xét nghiệm HIV + Giang mai',
    note: 'Combo xét nghiệm',
    time: '15:30',
    date: '2024-06-18',
    status: 'Đang xử lý'
  }
];

const TSFooter = () => {
  return (
    <div className="ts-footer">
      <h2>Danh sách lịch hẹn ({appointments.length})</h2>
      <p>Tổng số lịch hẹn hôm nay: {appointments.length} | Đã hoàn tất: 1 | Còn lại: {appointments.length - 1}</p>

      <div className="appointment-list">
        {appointments.map((item) => (
          <div className="appointment-card" key={item.id}>
            <div className="info-left">
              <div className="avatar">👤</div>
              <div>
                <h4>{item.name}</h4>
                <span>ID: {item.id}</span>
              </div>
            </div>

            <div className="info-middle">
              <h4>{item.test}</h4>
              <p>{item.note}</p>
            </div>

            <div className="info-right">
              <div className="time-group">
                <Clock size={16} />
                <span>{item.time}</span>
              </div>
              <span className="date">{item.date}</span>
            </div>

            <div className="status-group">
              <span className={`status ${item.status.replace(/\s/g, '-').toLowerCase()}`}>{item.status}</span>
              {item.status !== 'Hoàn tất' && (
                <button className="action-btn">{item.status === 'Chờ xử lý' ? 'Bắt đầu xử lý' : 'Hoàn tất'}</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TSFooter;
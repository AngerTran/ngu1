import './SHFooter.css';
import { CalendarDays, FileText } from 'lucide-react';

const appointments = [
  { name: 'Nguyễn Văn A', test: 'Xét nghiệm HIV', time: '09:00', status: 'Hoàn tất' },
  { name: 'Trần Thị B', test: 'Xét nghiệm Giang mai', time: '10:30', status: 'Đang xử lý' },
  { name: 'Lê Minh C', test: 'Xét nghiệm Lậu', time: '11:00', status: 'Chờ xử lý' },
];

const SHFooter = () => {
  return (
    <div className="sh-footer">
      <div className="recent-appointments">
        <h2>Lịch hẹn gần đây</h2>
        <p>Các lịch hẹn trong ngày hôm nay</p>
        <div className="appointment-list">
          {appointments.map((item, index) => (
            <div className="appointment-item" key={index}>
              <div>
                <h4>{item.name}</h4>
                <p>{item.test}</p>
                <span>{item.time}</span>
              </div>
              <span className={`status ${item.status.replace(/\s/g, '-').toLowerCase()}`}>{item.status}</span>
            </div>
          ))}
        </div>
        <button className="view-all">Xem tất cả lịch hẹn</button>
      </div>

      <div className="quick-actions">
        <h2>Hành động nhanh</h2>
        <p>Các chức năng thường dùng</p>
        <ul>
          <li><CalendarDays className="icon" /><div><strong>Quản lý lịch hẹn</strong><br /><span>Cập nhật trạng thái xét nghiệm</span></div></li>
          <li><FileText className="icon" /><div><strong>Nhập kết quả</strong><br /><span>Gửi kết quả cho khách hàng</span></div></li>
        </ul>
      </div>
    </div>
  );
};

export default SHFooter;

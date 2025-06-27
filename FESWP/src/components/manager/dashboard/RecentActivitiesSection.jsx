import React from 'react';
import './RecentActivitiesSection.css';

const appointments = [
  { id: 1, patient: "Nguyễn Văn A", doctor: "BS. Trần Thị B", type: "Tư vấn tim mạch", time: "09:00", status: "Đã xác nhận" },
  { id: 2, patient: "Lê Thị C", doctor: "BS. Phạm Văn D", type: "Tư vấn dinh dưỡng", time: "10:30", status: "Chờ xác nhận" },
  { id: 3, patient: "Hoàng Minh E", doctor: "BS. Vũ Thị F", type: "Tư vấn da liễu", time: "14:00", status: "Hoàn thành" },
  { id: 4, patient: "Trần Văn G", doctor: "BS. Nguyễn Thị H", type: "Tư vấn nhi khoa", time: "15:30", status: "Đã xác nhận" },
];

const tests = [
  { id: 1, patient: "Nguyễn Văn A", test: "Xét nghiệm máu tổng quát", submitted: "2 giờ trước", status: "Đang xử lý" },
  { id: 2, patient: "Trần Thị B", test: "X-quang phổi", submitted: "1 ngày trước", status: "Chờ xử lý" },
  { id: 3, patient: "Lê Văn C", test: "Siêu âm bụng", submitted: "3 giờ trước", status: "Đang xử lý" },
  { id: 4, patient: "Phạm Thị D", test: "Xét nghiệm nước tiểu", submitted: "5 giờ trước", status: "Hoàn thành" },
];

const RecentActivitiesSection = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Đã xác nhận':
      case 'Đang xử lý':
        return 'badge dark';
      case 'Chờ xác nhận':
      case 'Chờ xử lý':
        return 'badge light';
      case 'Hoàn thành':
        return 'badge outline';
      default:
        return 'badge';
    }
  };

  const getDotColor = (status) => {
    switch (status) {
      case 'Đang xử lý': return 'dot orange';
      case 'Chờ xử lý': return 'dot yellow';
      case 'Hoàn thành': return 'dot green';
      default: return 'dot gray';
    }
  };

  return (
    <div className="recent-section">
      <div className="recent-card">
        <div className="recent-header">
          <h3>Lịch tư vấn hôm nay</h3>
          <span>{appointments.length} lịch</span>
        </div>
        <div className="recent-list">
          {appointments.map((item) => (
            <div key={item.id} className="recent-item">
              <div>
                <p className="patient-name">{item.patient}</p>
                <p className="patient-sub">{item.doctor}</p>
                <p className="patient-sub">{item.type}</p>
              </div>
              <div className="text-right">
                <p className="time">{item.time}</p>
                <span className={getStatusClass(item.status)}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-card">
        <div className="recent-header">
          <h3>Xét nghiệm đang xử lý</h3>
          <span>{tests.length} mẫu</span>
        </div>
        <div className="recent-list">
          {tests.map((item) => (
            <div key={item.id} className="recent-item">
              <div className="flex">
                <span className={getDotColor(item.status)}></span>
                <div>
                  <p className="patient-name">{item.patient}</p>
                  <p className="patient-sub">{item.test}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="time">{item.submitted}</p>
                <span className={getStatusClass(item.status)}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivitiesSection;

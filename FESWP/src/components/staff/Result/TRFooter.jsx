import './TRFooter.css';

const testResults = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    service: "Xét nghiệm HIV",
    sampleCode: "HIV-001-240618",
    appointmentTime: "09:00",
    appointmentDate: "2024-06-18",
    status: "chua-gui",
    finishedTime: "10:30",
  },
  {
    id: 2,
    name: "Trần Thị B",
    service: "Xét nghiệm Giang mai",
    sampleCode: "GM-002-240617",
    appointmentTime: "14:00",
    appointmentDate: "2024-06-17",
    status: "da-gui",
    finishedTime: "15:15",
    sentTime: "2024-06-17 16:30",
  },
  {
    id: 3,
    name: "Lê Minh C",
    service: "Xét nghiệm Lậu",
    sampleCode: "LAU-003-240617",
    appointmentTime: "11:00",
    appointmentDate: "2024-06-17",
    status: "chua-gui",
    finishedTime: "12:00",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    service: "Xét nghiệm Herpes",
    sampleCode: "HER-004-240616",
    appointmentTime: "09:30",
    appointmentDate: "2024-06-16",
    status: "da-gui",
    finishedTime: "10:45",
    sentTime: "2024-06-16 17:00",
  },
];

const TRFooter = () => {
  return (
    <div className="trf-container">
      <div className="trf-header">
        <h3>Danh sách khách đã hoàn tất lấy mẫu</h3>
        <p>Các ca xét nghiệm đã hoàn tất, sẵn sàng nhập kết quả</p>
      </div>

      <div className="trf-list">
        {testResults.map((item) => (
          <div className="trf-card" key={item.id}>
            <div className="trf-avatar">
              <div className="trf-avatar-icon">🧑‍⚕️</div>
            </div>

            <div className="trf-info">
              <strong>{item.name}</strong>
              <div className="trf-code">Mã mẫu: {item.sampleCode}</div>
            </div>

            <div className="trf-service">
              <strong>{item.service}</strong>
              <div className="trf-note">Hoàn tất lúc: {item.finishedTime}</div>
            </div>

            <div className="trf-time">
              <div><strong>Ngày:</strong> {item.appointmentDate}</div>
              <div><strong>Giờ hẹn:</strong> {item.appointmentTime}</div>
            </div>

            <div className="trf-action">
              {item.status === "chua-gui" ? (
                <button className="trf-button">Nhập kết quả</button>
              ) : (
                <div className="trf-status">
                  <span className="sent-tag">Đã gửi kết quả</span>
                  <span className="sent-time">{item.sentTime}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TRFooter;

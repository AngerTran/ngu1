import './DashboardHeader.css';
import { Download } from 'lucide-react';

const DashboardHeader = () => {
  const now = new Date().toLocaleString('vi-VN');

  return (
    <div className="dashboard-header">
      <div className="dashboard-title-group">
        <h1 className="dashboard-title">Dashboard Tổng Quan</h1>
        <p className="dashboard-subtitle">
          Theo dõi hiệu suất và quản lý hệ thống MediCare
        </p>
      </div>
      <div className="dashboard-actions">
        <button className="export-button">
          <Download className="download-icon" />
          <span>Xuất báo cáo</span>
        </button>
        <span className="timestamp">Cập nhật: {now}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;

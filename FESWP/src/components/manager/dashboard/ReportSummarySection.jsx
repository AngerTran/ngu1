import React from 'react';
import './ReportSummarySection.css';
import { FileText, TrendingUp, MessageSquare, CheckCircle } from 'lucide-react';

const reportData = [
  {
    label: 'Báo cáo tháng',
    value: '28 ngày',
    icon: FileText,
    bg: 'bg-blue',
    color: 'text-blue-600',
  },
  {
    label: 'Tăng trưởng',
    value: '+12%',
    icon: TrendingUp,
    bg: 'bg-green',
    color: 'text-green-600',
  },
  {
    label: 'Phản hồi',
    value: '245',
    icon: MessageSquare,
    bg: 'bg-purple',
    color: 'text-purple-600',
  },
  {
    label: 'Hoàn thành',
    value: '98.5%',
    icon: CheckCircle,
    bg: 'bg-orange',
    color: 'text-orange-600',
  },
];

const ReportSummarySection = () => {
  return (
    <div className="report-section">
      <h2 className="report-title">📊 Báo cáo & Thống kê</h2>
      <div className="report-grid">
        {reportData.map((item, index) => (
          <div key={index} className={`report-card ${item.bg}`}>
            <item.icon className={`report-icon ${item.color}`} />
            <div className="report-text">
              <p className="report-label">{item.label}</p>
              <p className={`report-value ${item.color}`}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportSummarySection;

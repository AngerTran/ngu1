import React from 'react';
import './PerformanceSection.css';

const performanceData = [
  {
    value: '99.8%',
    label: 'Thời gian hoạt động',
    bgClass: 'perf-green',
    textClass: 'text-green-600',
  },
  {
    value: '1.2s',
    label: 'Tốc độ tải trang',
    bgClass: 'perf-blue',
    textClass: 'text-blue-600',
  },
  {
    value: '4.7/5',
    label: 'Độ hài lòng KH',
    bgClass: 'perf-purple',
    textClass: 'text-purple-600',
  },
];

const PerformanceSection = () => {
  return (
    <div className="performance-section">
      <h2 className="performance-title">📈 Hiệu suất hệ thống</h2>
      <div className="performance-grid">
        {performanceData.map((item, index) => (
          <div key={index} className={`performance-box ${item.bgClass}`}>
            <p className={`performance-value ${item.textClass}`}>{item.value}</p>
            <p className="performance-label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceSection;

import React, { useState } from 'react';
import './ServiceHistory.css';
import TestResultModal from './TestResultModal';

const mockResults = {
  sti: {
    package: 'STI cơ bản',
    date: '20/05/2024',
    doctor: 'BS. Nguyễn Văn A',
    summary: 'Âm tính',
  },
  hiv: {
    package: 'HIV',
    date: '10/05/2024',
    doctor: 'BS. Trần Thị B',
    summary: 'Âm tính',
  },
};

const ServiceHistory = () => {
  const [selectedResult, setSelectedResult] = useState(null);

  const handleOpenModal = (type) => {
    setSelectedResult(mockResults[type]);
  };

  const handleCloseModal = () => {
    setSelectedResult(null);
  };

  return (
    <div className="info-wrapper">
      <div className="info-header">
        <h2>Lịch sử dịch vụ</h2>
        <p>Xem lịch sử dịch vụ đã sử dụng</p>
      </div>

      <div className="info-form">
        <h3>Lịch sử đặt lịch tư vấn</h3>
        <table className="service-table">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Tư vấn viên</th>
              <th>Loại tư vấn</th>
              <th>Trạng thái</th>
              <th>Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>25/05/2024</td>
              <td>BS. Nguyễn Văn A</td>
              <td>Tư vấn STI</td>
              <td className="status success">Hoàn thành</td>
              <td><span className="stars">★★★★★</span></td>
            </tr>
            <tr>
              <td>15/05/2024</td>
              <td>BS. Trần Thị B</td>
              <td>Tư vấn tránh thai</td>
              <td className="status success">Hoàn thành</td>
              <td><span className="stars">★★★★★</span></td>
            </tr>
          </tbody>
        </table>

        <h3>Lịch sử xét nghiệm</h3>
        <table className="service-table">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Loại xét nghiệm</th>
              <th>Trạng thái</th>
              <th>Kết quả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20/05/2024</td>
              <td>Gói xét nghiệm STI cơ bản</td>
              <td className="status success">Có kết quả</td>
              <td className="result">Âm tính</td>
              <td><button className="view-btn" onClick={() => handleOpenModal('sti')}>Xem kết quả</button></td>
            </tr>
            <tr>
              <td>10/05/2024</td>
              <td>Xét nghiệm HIV</td>
              <td className="status success">Có kết quả</td>
              <td className="result">Âm tính</td>
              <td><button className="view-btn" onClick={() => handleOpenModal('hiv')}>Xem kết quả</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedResult && <TestResultModal onClose={handleCloseModal} data={selectedResult} />}
    </div>
  );
};

export default ServiceHistory;

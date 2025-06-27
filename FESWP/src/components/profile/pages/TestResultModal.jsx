import React from 'react';
import './TestResultModal.css';

const TestResultModal = ({ onClose, data }) => {
  return (
    <div className="modal-overlay">
      <div className="test-result-modal">
        <button className="close-button" onClick={onClose}>×</button>

        <h2>Kết quả xét nghiệm</h2>

        <table className="result-table">
          <tbody>
            <tr>
              <td className="label">Gói xét nghiệm</td>
              <td>{data.package}</td>
            </tr>
            <tr>
              <td className="label">Ngày thực hiện</td>
              <td>{data.date}</td>
            </tr>
            <tr>
              <td className="label">Bác sĩ</td>
              <td>{data.doctor}</td>
            </tr>
            <tr>
              <td className="label">Tổng kết</td>
              <td className="status">{data.summary}</td>
            </tr>
          </tbody>
        </table>

        <div className="note">
          <h4>Ghi chú:</h4>
          <p>Không phát hiện dấu hiệu bất thường. Bạn nên xét nghiệm lại định kỳ 6 tháng/lần.</p>
        </div>

        <div className="note">
          <h4>Khuyến nghị:</h4>
          <p>Tiếp tục duy trì lối sống lành mạnh và sử dụng biện pháp an toàn khi quan hệ.</p>
        </div>
      </div>
    </div>
  );
};

export default TestResultModal;

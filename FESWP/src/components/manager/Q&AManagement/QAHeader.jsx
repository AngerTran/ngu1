import React from 'react';
import './QAHeader.css';

const QAHeader = () => {
  return (
    <div className="qa-header">
      <div className="qa-header-top">
        <div>
          <h2 className="qa-title">Quản lý Q&A</h2>
          <p className="qa-subtitle">Kiểm duyệt câu hỏi và quản lý nội dung FAQ</p>
        </div>
        <button className="qa-new-btn">Tạo FAQ mới</button>
      </div>
    </div>
  );
};

export default QAHeader;

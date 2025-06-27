import React from 'react';
import './CMHeader.css';

const CMHeader = () => {
  return (
    <div className="cm-header">
      <div className="cm-header-top">
        <div>
          <h2 className="cm-header-title">Quản lý tư vấn viên</h2>
          <p className="cm-header-subtitle">Quản lý thông tin và lịch làm việc của tư vấn viên</p>
        </div>
        <button className="cm-add-button">Thêm tư vấn viên</button>
      </div>
    </div>
  );
};

export default CMHeader;

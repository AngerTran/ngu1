import React from 'react';
import './StaffManagementHeader.css';

const StaffManagementHeader = () => {
  return (
    <div className="smh-container">
      {/* Header chứa tiêu đề bên trái và nút bên phải */}
      <div className="smh-header-row">
        <div className="smh-header-text">
          <h1 className="smh-title">Quản lý nhân viên</h1>
          <p className="smh-subtitle">Quản lý thông tin và phân quyền nhân viên</p>
        </div>
        <div className="smh-top-right-buttons">
          <button className="smh-add-btn">Thêm nhân viên mới</button>
        </div>
      </div>
    </div>
  );
};

export default StaffManagementHeader;

import './MSHeader.css';
import { ClipboardList, Plus } from 'lucide-react';

const MSHeader = () => {
  return (
    <div className="ms-header-container">
      <div className="ms-header-bar">
        <h2>
          <ClipboardList size={22} className="ms-icon" />
          Danh sách dịch vụ y tế
        </h2>
        <button className="ms-add-btn">
          <Plus size={16} /> Thêm dịch vụ
        </button>
      </div>
      <p className="ms-subtitle">Quản lý các dịch vụ xét nghiệm được giao</p>
    </div>
  );
};

export default MSHeader;

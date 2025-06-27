import './TRHeader.css';
import { ClipboardList } from 'lucide-react';

const TRHeader = () => {
  return (
    <div className="tr-container">
      <div className="tr-header">
        <h2><ClipboardList className="tr-icon" /> Nhập & gửi kết quả xét nghiệm</h2>
        <p>Quản lý kết quả và gửi thông báo cho khách hàng</p>
      </div>
    </div>
  );
};

export default TRHeader;

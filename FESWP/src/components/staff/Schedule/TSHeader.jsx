import './TSHeader.css';
import { CalendarCheck } from 'lucide-react';

const TSHeader = () => {
  return (
    <div className="ts-header">
      <div className="ts-header-title">
        <CalendarCheck className="ts-header-icon" />
        <div>
          <h1>Lịch làm việc & xét nghiệm</h1>
          <p>Quản lý và cập nhật trạng thái lịch hẹn</p>
        </div>
      </div>
    </div>
  );
};

export default TSHeader;

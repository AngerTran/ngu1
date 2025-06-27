import React from 'react';
import { Mail, Phone, User, BadgeCheck, Info } from 'lucide-react';

const ConsultantCard = ({ doc, viewMode }) => {
  return (
    <div className={`consultant-card ${viewMode}`}>
      <div className="card-top">
        <img
          src={doc.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.fullName)}`}
          alt={doc.fullName}
          className="avatar"
        />
        <div className="badge-gender">{doc.gender ? 'Nam' : 'Nữ'}</div>
      </div>

      <div className="card-body">
        <h3 className="doctor-name">{doc.fullName}</h3>
        <div className="info"><BadgeCheck size={14} /> {doc.specialty}</div>
        <div className="info"><User size={14} /> {doc.experienceYears || 0} năm kinh nghiệm</div>
        <div className="info"><Mail size={14} /> {doc.email}</div>
        <div className="info"><Phone size={14} /> {doc.phone}</div>
        <div className="description"><Info size={14} /> {doc.description || "Chưa có mô tả"}</div>
      </div>

      <div className="consultant-footer">
        <button className="solid">Xem hồ sơ</button>
        <button className="outline">Đặt lịch</button>
      </div>
    </div>
  );
};

export default ConsultantCard;

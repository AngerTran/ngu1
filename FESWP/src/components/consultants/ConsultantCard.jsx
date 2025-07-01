import React, { useState } from 'react';
import { Mail, Phone, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';

const ConsultantCard = ({ consultant, viewMode }) => {
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!consultant) return null;

  const getAvatarUrl = () => {
    return consultant?.avatarUrl?.trim()
      ? consultant.avatarUrl
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.fullName || 'User')}&background=667eea&color=fff`;
  };
  const handleBookingClick = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setIsBookingModalOpen(true);
  };

  return (
    <div className={`consultant-card ${viewMode}`}>
      <div className="card-body">
        <p><strong>Giới tính:</strong> {consultant.gender ? 'Nam' : 'Nữ'}</p>

        {consultant.email && (
          <p><Mail size={14} /> {consultant.email}</p>
        )}

        {consultant.phone && (
          <p><Phone size={14} /> {consultant.phone}</p>
        )}

        {consultant.specialty && (
          <p><Briefcase size={14} /> {consultant.specialty}</p>
        )}
      </div>


      <div className="consultant-footer">
        {consultant.id && (
          <Link to={`/consultant/${consultant.id}`} className="outline">
            Xem hồ sơ
          </Link>
        )}

        <button className="solid" onClick={handleBookingClick}>
          Đặt lịch
        </button>
      </div>

      {isBookingModalOpen && (
        <BookingModal
          consultant={consultant}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ConsultantCard;

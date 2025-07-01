import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Timer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PaymentModal from './PaymentModal';
import axios from 'axios';
import './BookingModal.css';

const BookingModal = ({ consultant, onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [customerNotes, setCustomerNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getNextSevenDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('vi-VN', {
          weekday: 'short',
          day: 'numeric',
          month: 'numeric'
        })
      });
    }
    return days;
  };

  const [availableDates] = useState(getNextSevenDays());

  useEffect(() => {
    if (selectedDate && consultant?.id) {
      fetchAvailableSlots();
    }
  }, [selectedDate, consultant?.id]);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/schedules/consultant/${consultant.id}/availability?date=${selectedDate}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
          withCredentials: true
        }
      );
      setAvailableSlots(res.data);
    } catch (err) {
      console.error('Error fetching slots:', err);
      setError('Không thể tải lịch trống');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setSelectedDuration(60);
    setError('');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    if (slot.availableDurations?.length > 0) {
      setSelectedDuration(slot.availableDurations[0]);
    } else {
      setSelectedDuration(slot.sessionDurationMinutes || 60);
    }
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const formatTime = (dt) =>
    new Date(dt).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });

  const calculatePrice = () => {
    if (!selectedSlot?.pricePerSession) return consultant.consultationFee || 0;
    const base = selectedSlot.pricePerSession / (selectedSlot.sessionDurationMinutes || 60);
    return base * selectedDuration;
  };

  const getEndTime = () => {
    if (!selectedSlot) return null;
    const start = new Date(selectedSlot.startTime);
    return new Date(start.getTime() + selectedDuration * 60000);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const handleConfirmBooking = async () => {
    if (!user) {
      setError('Vui lòng đăng nhập để đặt lịch');
      return;
    }
    if (!selectedDate || !selectedSlot) {
      setError('Vui lòng chọn ngày & giờ');
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/appointments/book/${user.id}`,
        {
          consultantId: consultant.id,
          scheduleId: selectedSlot.id,
          date: selectedDate,
          durationMinutes: selectedDuration,
          notes: customerNotes
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true
        }
      );
      setStep(3);
    } catch (err) {
      console.error('Booking failed:', err);
      setError('Đặt lịch thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Đặt lịch tư vấn</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="consultant-info">
            <img
              src={
                consultant.avatarUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.fullName)}`
              }
              alt={consultant.fullName}
              className="consultant-avatar"
            />
            <div className="consultant-details">
              <h4>{consultant.fullName}</h4>
              <p>{consultant.specialization}</p>
              <p className="consultation-fee">Phí: {formatPrice(calculatePrice())}</p>
            </div>
          </div>

          {step === 1 && (
            <div className="booking-step">
              <h4><Calendar size={20} /> Chọn ngày</h4>
              <div className="date-selector">
                {availableDates.map((d) => (
                  <button
                    key={d.date}
                    className={`date-option ${selectedDate === d.date ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(d.date)}
                  >
                    {d.display}
                  </button>
                ))}
              </div>

              {selectedDate && (
                <>
                  <h4><Clock size={20} /> Chọn giờ</h4>
                  {loading ? (
                    <div className="loading">Đang tải...</div>
                  ) : availableSlots.length === 0 ? (
                    <div className="no-slots">Không có lịch trống</div>
                  ) : (
                    <div className="time-slots">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.id}
                          className={`time-slot ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={!slot.available}
                        >
                          <div className="slot-time">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </div>
                          <div className="slot-price">
                            {formatPrice(slot.pricePerSession)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {selectedSlot?.availableDurations?.length > 1 && (
                <>
                  <h4><Timer size={20} /> Thời lượng</h4>
                  <div className="duration-selector">
                    {selectedSlot.availableDurations.map((d) => (
                      <button
                        key={d}
                        className={`duration-option ${selectedDuration === d ? 'selected' : ''}`}
                        onClick={() => handleDurationChange(d)}
                      >
                        {d} phút
                      </button>
                    ))}
                  </div>
                </>
              )}

              {selectedSlot && (
                <div className="next-step">
                  <button
                    className="continue-btn"
                    onClick={() => setStep(2)}
                  >
                    Tiếp tục
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="booking-step">
              <h4>Xác nhận</h4>
              <div className="booking-summary">
                <div className="summary-item"><strong>Ngày:</strong> {new Date(selectedDate).toLocaleDateString('vi-VN')}</div>
                <div className="summary-item"><strong>Giờ:</strong> {formatTime(selectedSlot.startTime)} - {formatTime(getEndTime())}</div>
                <div className="summary-item"><strong>Phí:</strong> {formatPrice(calculatePrice())}</div>
              </div>
              <div className="notes-section">
                <label>Ghi chú:</label>
                <textarea value={customerNotes} onChange={(e) => setCustomerNotes(e.target.value)} rows="3" />
              </div>
              <div className="step-actions">
                <button className="back-btn" onClick={() => setStep(1)}>Quay lại</button>
                <button className="confirm-btn" onClick={handleConfirmBooking}>
                  Xác nhận đặt lịch
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <PaymentModal
              consultant={consultant}
              appointmentDetails={{
                date: selectedDate,
                slot: selectedSlot,
                duration: selectedDuration,
                fee: calculatePrice(),
                endTime: getEndTime(),
                notes: customerNotes
              }}
              onClose={onClose}
              onBack={() => setStep(2)}
            />
          )}

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

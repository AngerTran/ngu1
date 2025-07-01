import React, { useState, useEffect } from 'react';
import {
  CreditCard, Smartphone, CheckCircle, X, Timer, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './PaymentModal.css';

const PaymentModal = ({ consultant, appointmentDetails, onClose, onBack }) => {
  const { user } = useAuth();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [paymentTimer, setPaymentTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 phút

  useEffect(() => {
    return () => {
      if (paymentTimer) {
        clearInterval(paymentTimer);
      }
    };
  }, [paymentTimer]);

  const startPaymentTimer = () => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setError('Thời gian thanh toán đã hết. Vui lòng đặt lịch lại.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setPaymentTimer(timer);
  };

  const formatTime = (dateTime) => {
    if (!dateTime) return '';
    return new Date(dateTime).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const formatTimeRemaining = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      setError('Vui lòng chọn phương thức thanh toán');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (selectedPaymentMethod === 'MOMO') {
        startPaymentTimer();
      }

      const bookingData = {
        consultantId: consultant.id, // ✅ Chuẩn: dùng consultant.id
        appointmentDate: appointmentDetails.slot.startTime,
        durationMinutes: appointmentDetails.duration,
        customerNotes: appointmentDetails.notes,
        paymentMethod: selectedPaymentMethod
      };

      const response = await axios.post(
        `http://localhost:8080/api/appointments/book/${user.id}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          withCredentials: true
        }
      );

      if (selectedPaymentMethod === 'CASH') {
        setSuccess(true);
        setTimeout(() => {
          redirectToBookingHistory();
        }, 3000);
      } else if (selectedPaymentMethod === 'MOMO') {
        setSuccess(true);
        setTimeout(() => {
          handleMoMoPaymentComplete();
        }, 5000);
      }

    } catch (err) {
      console.error('Error booking appointment:', err);
      setError(err.response?.data || 'Không thể đặt lịch. Vui lòng thử lại.');
      if (paymentTimer) {
        clearInterval(paymentTimer);
        setPaymentTimer(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMoMoPaymentComplete = () => {
    if (paymentTimer) {
      clearInterval(paymentTimer);
      setPaymentTimer(null);
    }
    setTimeout(() => {
      redirectToBookingHistory();
    }, 2000);
  };

  const redirectToBookingHistory = () => {
    window.location.href = '/profile/appointments';
  };

  if (success) {
    return (
      <div className="payment-success">
        <div className="success-icon">
          <CheckCircle size={64} />
        </div>
        <h3>
          {selectedPaymentMethod === 'CASH'
            ? 'Đặt lịch thành công!'
            : 'Đang chờ thanh toán MoMo'}
        </h3>

        {selectedPaymentMethod === 'MOMO' && timeRemaining > 0 && (
          <div className="payment-timer">
            <Timer size={20} />
            <span>Thời gian còn lại: {formatTimeRemaining(timeRemaining)}</span>
          </div>
        )}

        <div className="success-details">
          <p><strong>Tư vấn viên:</strong> {consultant.fullName}</p>
          <p><strong>Ngày:</strong> {new Date(appointmentDetails.date).toLocaleDateString('vi-VN')}</p>
          <p><strong>Giờ:</strong> {formatTime(appointmentDetails.slot.startTime)} - {formatTime(appointmentDetails.endTime)}</p>
          <p><strong>Thời gian:</strong> {appointmentDetails.duration} phút</p>
          <p><strong>Phương thức thanh toán:</strong> {selectedPaymentMethod === 'MOMO' ? 'MoMo' : 'Tiền mặt'}</p>
          <p><strong>Tổng tiền:</strong> {formatPrice(appointmentDetails.fee)}</p>
        </div>

        <p className="success-note">
          {selectedPaymentMethod === 'MOMO'
            ? timeRemaining > 0
              ? 'Vui lòng hoàn tất thanh toán qua ứng dụng MoMo để xác nhận lịch hẹn.'
              : 'Thời gian thanh toán đã hết. Lịch hẹn sẽ bị hủy.'
            : 'Bạn sẽ thanh toán bằng tiền mặt khi đến buổi tư vấn. Lịch hẹn đã được xác nhận.'}
        </p>

        {selectedPaymentMethod === 'MOMO' && timeRemaining > 0 && (
          <div className="momo-payment-actions">
            <button className="momo-pay-btn" onClick={handleMoMoPaymentComplete}>
              <Smartphone size={16} /> Mở ứng dụng MoMo
            </button>
            <button className="cancel-payment-btn" onClick={onClose}>
              Hủy thanh toán
            </button>
          </div>
        )}

        {(selectedPaymentMethod === 'CASH' || timeRemaining <= 0) && (
          <button className="close-success-btn" onClick={redirectToBookingHistory}>
            {selectedPaymentMethod === 'CASH' ? 'Xem lịch hẹn' : 'Đóng'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="payment-step">
      <h4>Chọn phương thức thanh toán</h4>

      <div className="payment-summary">
        <h5>Thông tin đặt lịch</h5>
        <div className="summary-grid">
          <div className="summary-item">
            <span>Tư vấn viên:</span>
            <strong>{consultant.fullName}</strong>
          </div>
          <div className="summary-item">
            <span>Ngày:</span>
            <strong>{new Date(appointmentDetails.date).toLocaleDateString('vi-VN')}</strong>
          </div>
          <div className="summary-item">
            <span>Giờ:</span>
            <strong>{formatTime(appointmentDetails.slot.startTime)} - {formatTime(appointmentDetails.endTime)}</strong>
          </div>
          <div className="summary-item">
            <span>Thời gian:</span>
            <strong>{appointmentDetails.duration} phút</strong>
          </div>
          <div className="summary-item total">
            <span>Tổng tiền:</span>
            <strong className="total-amount">{formatPrice(appointmentDetails.fee)}</strong>
          </div>
        </div>
      </div>

      <div className="payment-methods">
        <div
          className={`payment-option ${selectedPaymentMethod === 'MOMO' ? 'selected' : ''}`}
          onClick={() => setSelectedPaymentMethod('MOMO')}
        >
          <div className="payment-icon momo">
            <Smartphone size={24} />
          </div>
          <div className="payment-info">
            <h5>Ví MoMo</h5>
            <p>Thanh toán nhanh chóng và bảo mật qua MoMo</p>
            <div className="payment-timer-info">
              <Timer size={14} />
              <span>Thời gian thanh toán: 30 phút</span>
            </div>
          </div>
          <div className="payment-radio">
            <input
              type="radio"
              name="payment"
              value="MOMO"
              checked={selectedPaymentMethod === 'MOMO'}
              onChange={() => setSelectedPaymentMethod('MOMO')}
            />
          </div>
        </div>

        <div
          className={`payment-option ${selectedPaymentMethod === 'CASH' ? 'selected' : ''}`}
          onClick={() => setSelectedPaymentMethod('CASH')}
        >
          <div className="payment-icon cash">
            <CreditCard size={24} />
          </div>
          <div className="payment-info">
            <h5>Tiền mặt</h5>
            <p>Thanh toán bằng tiền mặt khi đến buổi tư vấn</p>
            <div className="payment-instant-info">
              <CheckCircle size={14} />
              <span>Xác nhận ngay lập tức</span>
            </div>
          </div>
          <div className="payment-radio">
            <input
              type="radio"
              name="payment"
              value="CASH"
              checked={selectedPaymentMethod === 'CASH'}
              onChange={() => setSelectedPaymentMethod('CASH')}
            />
          </div>
        </div>
      </div>

      {selectedPaymentMethod === 'MOMO' && (
        <div className="payment-note momo-note">
          <AlertTriangle size={16} />
          <p><strong>Lưu ý:</strong> Sau khi xác nhận, bạn có 30 phút để hoàn tất thanh toán qua MoMo. Nếu không thanh toán trong thời gian này, lịch hẹn sẽ bị hủy tự động.</p>
        </div>
      )}

      {selectedPaymentMethod === 'CASH' && (
        <div className="payment-note cash-note">
          <CheckCircle size={16} />
          <p>Lịch hẹn sẽ được xác nhận ngay lập tức. Vui lòng mang theo tiền mặt đúng số tiền khi đến buổi tư vấn.</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="payment-actions">
        <button className="back-btn" onClick={onBack} disabled={loading}>Quay lại</button>
        <button className="pay-btn" onClick={handlePaymentSubmit} disabled={loading || !selectedPaymentMethod}>
          {loading ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;

import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, User, Phone, MessageSquare,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import './ConsultantAppointments.css';

const ConsultantAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusOptions = [
    { value: 'ALL', label: 'Tất cả', color: '#666' },
    { value: 'PENDING', label: 'Chờ xác nhận', color: '#f39c12' },
    { value: 'CONFIRMED', label: 'Đã xác nhận', color: '#27ae60' },
    { value: 'COMPLETED', label: 'Hoàn thành', color: '#3498db' },
    { value: 'CANCELLED', label: 'Đã hủy', color: '#e74c3c' },
    { value: 'NO_SHOW', label: 'Không đến', color: '#95a5a6' }
  ];

  useEffect(() => {
    if (user?.id && user?.token) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/appointments/consultant/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          withCredentials: true
        }
      );
      setAppointments(res.data);
    } catch (err) {
      console.error('❌ Lỗi tải lịch:', err);
      setError('Không thể tải danh sách lịch hẹn');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${id}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          withCredentials: true
        }
      );
      await fetchAppointments();
    } catch (err) {
      console.error('❌ Lỗi cập nhật trạng thái:', err);
      setError('Không thể cập nhật trạng thái lịch hẹn');
    }
  };

  const filteredAppointments = appointments.filter(
    apt => filter === 'ALL' || apt.status === filter
  );

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const getStatusConfig = (status) =>
    statusOptions.find(opt => opt.value === status) || { label: status, color: '#666' };

  const getAppointmentsByDate = () => {
    const grouped = {};
    filteredAppointments.forEach(apt => {
      const dateKey = new Date(apt.appointmentDate).toLocaleDateString('vi-VN');
      grouped[dateKey] = grouped[dateKey] || [];
      grouped[dateKey].push(apt);
    });
    return Object.keys(grouped).sort(
      (a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-'))
    ).map(date => ({
      date,
      appointments: grouped[date].sort(
        (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
      )
    }));
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="consultant-appointments">
      <div className="appointments-header">
        <h2>Lịch hẹn của tôi</h2>
        <div className="filter-buttons">
          {statusOptions.map(opt => (
            <button
              key={opt.value}
              className={`filter-btn ${filter === opt.value ? 'active' : ''}`}
              onClick={() => setFilter(opt.value)}
              style={{
                backgroundColor: filter === opt.value ? opt.color : 'transparent',
                color: filter === opt.value ? 'white' : opt.color,
                borderColor: opt.color
              }}
            >
              {opt.label}
              {opt.value !== 'ALL' && (
                <span className="count">
                  {appointments.filter(apt => apt.status === opt.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="appointments-content">
        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <Calendar size={48} />
            <h3>Không có lịch hẹn</h3>
            <p>
              {filter === 'ALL'
                ? 'Bạn chưa có lịch hẹn nào.'
                : `Không có lịch với trạng thái "${getStatusConfig(filter).label}".`
              }
            </p>
          </div>
        ) : (
          <div className="appointments-timeline">
            {getAppointmentsByDate().map(({ date, appointments }) => (
              <div key={date} className="date-group">
                <div className="date-header">
                  <Calendar size={20} />
                  <span>{date}</span>
                  <span className="appointment-count">{appointments.length} lịch hẹn</span>
                </div>

                <div className="appointments-list">
                  {appointments.map(apt => {
                    const config = getStatusConfig(apt.status);
                    const { time } = formatDateTime(apt.appointmentDate);

                    return (
                      <div key={apt.id} className="appointment-card">
                        <div className="appointment-time">
                          <Clock size={16} /> <span>{time}</span>
                          <span className="duration">({apt.durationMinutes} phút)</span>
                        </div>

                        <div className="appointment-info">
                          <div className="customer-info">
                            <div className="customer-name">
                              <User size={16} /> {apt.customerName}
                            </div>
                            <div className="customer-phone">
                              <Phone size={16} /> {apt.customerPhone}
                            </div>
                          </div>

                          {apt.customerNotes && (
                            <div className="appointment-notes">
                              <MessageSquare size={16} /> Ghi chú: {apt.customerNotes}
                            </div>
                          )}

                          <div className="appointment-fee">
                            <strong>Phí tư vấn: {formatPrice(apt.consultationFee)}</strong>
                          </div>

                          {apt.payment && (
                            <div className="payment-info">
                              <span className={`payment-status ${apt.payment.paymentStatus.toLowerCase()}`}>
                                Thanh toán: {apt.payment.paymentStatus === 'COMPLETED' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                              </span>
                              <span className="payment-method">
                                ({apt.payment.paymentMethod === 'MOMO' ? 'MoMo' : 'Tiền mặt'})
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="appointment-status">
                          <span className="status-badge" style={{ backgroundColor: config.color }}>
                            {config.label}
                          </span>
                        </div>

                        {apt.status === 'PENDING' && (
                          <div className="appointment-actions">
                            <button
                              className="confirm-btn"
                              onClick={() => updateAppointmentStatus(apt.id, 'CONFIRMED')}
                              title="Xác nhận lịch hẹn"
                            >
                              <CheckCircle size={16} /> Xác nhận
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={() => updateAppointmentStatus(apt.id, 'CANCELLED')}
                              title="Hủy lịch hẹn"
                            >
                              <XCircle size={16} /> Hủy
                            </button>
                          </div>
                        )}

                        {apt.status === 'CONFIRMED' && (
                          <div className="appointment-actions">
                            <button
                              className="complete-btn"
                              onClick={() => updateAppointmentStatus(apt.id, 'COMPLETED')}
                              title="Đánh dấu hoàn thành"
                            >
                              <CheckCircle size={16} /> Hoàn thành
                            </button>
                            <button
                              className="no-show-btn"
                              onClick={() => updateAppointmentStatus(apt.id, 'NO_SHOW')}
                              title="Khách không đến"
                            >
                              <AlertCircle size={16} /> Không đến
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultantAppointments;

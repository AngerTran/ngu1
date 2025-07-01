import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, User, CreditCard, CheckCircle, XCircle, AlertCircle,
  Phone, MessageSquare, Timer, Eye, Filter
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import './UserAppointments.css';

const UserAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const statusConfig = {
    'PENDING': {
      label: 'Chờ xác nhận',
      color: '#d97706',
      icon: AlertCircle,
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.2)'
    },
    'CONFIRMED': {
      label: 'Đã xác nhận',
      color: '#16a34a',
      icon: CheckCircle,
      bgColor: 'rgba(34, 197, 94, 0.1)',
      borderColor: 'rgba(34, 197, 94, 0.2)'
    },
    'COMPLETED': {
      label: 'Hoàn thành',
      color: '#2563eb',
      icon: CheckCircle,
      bgColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.2)'
    },
    'CANCELLED': {
      label: 'Đã hủy',
      color: '#dc2626',
      icon: XCircle,
      bgColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.2)'
    },
    'NO_SHOW': {
      label: 'Không đến',
      color: '#6b7280',
      icon: XCircle,
      bgColor: 'rgba(107, 114, 128, 0.1)',
      borderColor: 'rgba(107, 114, 128, 0.2)'
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(
        `http://localhost:8080/api/appointments/customer/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`
          },
          withCredentials: true
        }
      );

      const sortedAppointments = response.data.sort((a, b) =>
        new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );

      setAppointments(sortedAppointments);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Không thể tải danh sách lịch hẹn. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      dayOfWeek: date.toLocaleDateString('vi-VN', { weekday: 'long' })
    };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getEndTime = (startTime, duration) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    return end.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const isUpcoming = (appointment) => {
    const now = new Date();
    return new Date(appointment.appointmentDate) > now &&
      ['PENDING', 'CONFIRMED'].includes(appointment.status);
  };

  const isToday = (appointmentDate) => {
    const today = new Date();
    const appointment = new Date(appointmentDate);
    return today.toDateString() === appointment.toDateString();
  };

  const getFilteredAppointments = () => {
    let filtered = appointments;

    if (filter === 'UPCOMING') {
      filtered = filtered.filter(isUpcoming);
    } else if (filter === 'PAST') {
      filtered = filtered.filter(appointment => !isUpcoming(appointment));
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    return filtered;
  };

  const getUpcomingCount = () => appointments.filter(isUpcoming).length;
  const getPastCount = () => appointments.filter(appointment => !isUpcoming(appointment)).length;

  if (loading) {
    return (
      <div className="user-appointments">
        <div className="loading">Đang tải lịch hẹn của bạn...</div>
      </div>
    );
  }

  return (
    <div className="user-appointments">
      <div className="appointments-header">
        <h2>Lịch hẹn của tôi</h2>
        <p>Quản lý và theo dõi các lịch hẹn tư vấn sức khỏe sinh sản của bạn</p>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {appointments.length === 0 ? (
        <div className="empty-state">
          <Calendar size={80} />
          <h3>Chưa có lịch hẹn nào</h3>
          <p>Bạn chưa đặt lịch hẹn tư vấn nào. Hãy tìm kiếm tư vấn viên phù hợp và đặt lịch ngay.</p>
          <button
            className="book-now-btn"
            onClick={() => window.location.href = '/tu-van-vien'}
          >
            <Calendar size={20} />
            Đặt lịch tư vấn ngay
          </button>
        </div>
      ) : (
        <div className="appointments-content">
          <div className="appointments-summary">
            <div className="summary-card">
              <div className="summary-icon upcoming">
                <Calendar size={24} />
              </div>
              <div className="summary-info">
                <span className="summary-number">{getUpcomingCount()}</span>
                <span className="summary-label">Sắp tới</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon past">
                <Clock size={24} />
              </div>
              <div className="summary-info">
                <span className="summary-number">{getPastCount()}</span>
                <span className="summary-label">Đã qua</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon total">
                <User size={24} />
              </div>
              <div className="summary-info">
                <span className="summary-number">{appointments.length}</span>
                <span className="summary-label">Tổng lịch hẹn</span>
              </div>
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label htmlFor="time-filter">
                <Filter size={16} /> Thời gian:
              </label>
              <select
                id="time-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">Tất cả</option>
                <option value="UPCOMING">Sắp tới ({getUpcomingCount()})</option>
                <option value="PAST">Đã qua ({getPastCount()})</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="status-filter">Trạng thái:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">Tất cả</option>
                <option value="PENDING">Chờ xác nhận</option>
                <option value="CONFIRMED">Đã xác nhận</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="CANCELLED">Đã hủy</option>
                <option value="NO_SHOW">Không đến</option>
              </select>
            </div>
          </div>

          <div className="appointments-table-container">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Ngày & Giờ</th>
                  <th>Tư vấn viên</th>
                  <th>Thời gian</th>
                  <th>Phí tư vấn</th>
                  <th>Trạng thái</th>
                  <th>Thanh toán</th>
                  <th>Ghi chú</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredAppointments().map(appointment => (
                  <AppointmentRow
                    key={appointment.id}
                    appointment={appointment}
                    statusConfig={statusConfig}
                    formatDateTime={formatDateTime}
                    formatPrice={formatPrice}
                    getEndTime={getEndTime}
                    isToday={isToday}
                    isUpcoming={isUpcoming}
                  />
                ))}
              </tbody>
            </table>

            {getFilteredAppointments().length === 0 && (
              <div className="no-results">
                <AlertCircle size={48} />
                <h3>Không tìm thấy lịch hẹn</h3>
                <p>Không có lịch hẹn nào phù hợp với bộ lọc đã chọn.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Component AppointmentRow giữ nguyên như bạn đã làm

export default UserAppointments;

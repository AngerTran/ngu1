import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Save, X, Calendar, Clock, DollarSign
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import './ConsultantScheduleSetup.css';

const ConsultantScheduleSetup = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [formData, setFormData] = useState({
    scheduleType: 'WEEKLY',
    dayOfWeek: 'MONDAY',
    specificDate: '',
    startTime: '09:00',
    endTime: '17:00',
    pricePerSession: '',
    sessionDurationMinutes: 60,
    notes: '',
    isAvailable: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const daysOfWeek = [
    { value: 'MONDAY', label: 'Thứ 2' },
    { value: 'TUESDAY', label: 'Thứ 3' },
    { value: 'WEDNESDAY', label: 'Thứ 4' },
    { value: 'THURSDAY', label: 'Thứ 5' },
    { value: 'FRIDAY', label: 'Thứ 6' },
    { value: 'SATURDAY', label: 'Thứ 7' },
    { value: 'SUNDAY', label: 'Chủ nhật' }
  ];

  useEffect(() => {
    if (user?.id) {
      fetchSchedules();
    }
  }, [user?.id]);

  const fetchSchedules = async () => {
    if (!user?.token) return; // 🟢 Không có token thì bỏ qua
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/schedules/consultant/${user.id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true
        }
      );
      setSchedules(res.data);
    } catch (err) {
      console.error('Error fetching schedules:', err);
      setError('Không thể tải lịch làm việc');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const scheduleData = {
        ...formData,
        pricePerSession: parseFloat(formData.pricePerSession),
        sessionDurationMinutes: parseInt(formData.sessionDurationMinutes)
      };

      if (editingSchedule) {
        await axios.put(
          `http://localhost:8080/api/schedules/${editingSchedule.id}`,
          scheduleData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
            withCredentials: true
          }
        );
      } else {
        await axios.post(
          `http://localhost:8080/api/schedules/consultant/${user.id}`,
          scheduleData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
            withCredentials: true
          }
        );
      }

      await fetchSchedules();
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving schedule:', err);
      setError('Không thể lưu lịch làm việc');
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      scheduleType: schedule.scheduleType,
      dayOfWeek: schedule.dayOfWeek || 'MONDAY',
      specificDate: schedule.specificDate || '',
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      pricePerSession: schedule.pricePerSession?.toString() || '',
      sessionDurationMinutes: schedule.sessionDurationMinutes || 60,
      notes: schedule.notes || '',
      isAvailable:
        schedule.available !== undefined ? schedule.available
          : schedule.isAvailable !== undefined ? schedule.isAvailable : true
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (scheduleId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch này?')) {
      try {
        await axios.delete(
          `http://localhost:8080/api/schedules/${scheduleId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
            withCredentials: true
          }
        );
        await fetchSchedules();
      } catch (err) {
        console.error('Error deleting schedule:', err);
        setError('Không thể xóa lịch làm việc');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      scheduleType: 'WEEKLY',
      dayOfWeek: 'MONDAY',
      specificDate: '',
      startTime: '09:00',
      endTime: '17:00',
      pricePerSession: '',
      sessionDurationMinutes: 60,
      notes: '',
      isAvailable: true
    });
    setEditingSchedule(null);
    setError('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getDayLabel = (dayOfWeek) => {
    const day = daysOfWeek.find(d => d.value === dayOfWeek);
    return day ? day.label : dayOfWeek;
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="schedule-setup">
      <div className="schedule-header">
        <h2>Sắp xếp lịch làm việc</h2>
        <button
          className="add-schedule-btn"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <Plus size={20} /> Thêm lịch mới
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="schedules-list">
        {schedules.length === 0 ? (
          <div className="empty-state">
            <Calendar size={48} />
            <h3>Chưa có lịch làm việc</h3>
            <p>Hãy tạo lịch làm việc đầu tiên của bạn</p>
          </div>
        ) : (
          schedules.map(schedule => (
            <div key={schedule.id} className={`schedule-card ${!schedule.available ? 'unavailable' : ''}`}>
              <div className="schedule-info">
                <div className="schedule-type">
                  {schedule.scheduleType === 'WEEKLY' ? (
                    <span className="weekly-tag">
                      <Calendar size={16} /> Hàng tuần - {getDayLabel(schedule.dayOfWeek)}
                    </span>
                  ) : (
                    <span className="specific-tag">
                      <Calendar size={16} /> {new Date(schedule.specificDate).toLocaleDateString('vi-VN')}
                    </span>
                  )}
                </div>
                <div className="schedule-details">
                  <div className="time-info">
                    <Clock size={16} /> {schedule.startTime} - {schedule.endTime}
                  </div>
                  <div className="price-info">
                    <DollarSign size={16} /> {formatPrice(schedule.pricePerSession)} / {schedule.sessionDurationMinutes} phút
                  </div>
                </div>
                {schedule.notes && (
                  <div className="schedule-notes">
                    <strong>Ghi chú:</strong> {schedule.notes}
                  </div>
                )}
                <div className="availability-status">
                  {schedule.available ? (
                    <span className="available">Có thể đặt lịch</span>
                  ) : (
                    <span className="unavailable">Không khả dụng</span>
                  )}
                </div>
              </div>

              <div className="schedule-actions">
                <button className="edit-btn" onClick={() => handleEdit(schedule)} title="Chỉnh sửa">
                  <Edit size={16} />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(schedule.id)} title="Xóa">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingSchedule ? 'Chỉnh sửa lịch' : 'Thêm lịch mới'}</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="schedule-form">
              <div className="form-group">
                <label>Loại lịch</label>
                <select name="scheduleType" value={formData.scheduleType} onChange={handleInputChange} required>
                  <option value="WEEKLY">Hàng tuần</option>
                  <option value="SPECIFIC_DATE">Ngày cụ thể</option>
                </select>
              </div>

              {formData.scheduleType === 'WEEKLY' ? (
                <div className="form-group">
                  <label>Thứ trong tuần</label>
                  <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleInputChange} required>
                    {daysOfWeek.map(day => (
                      <option key={day.value} value={day.value}>{day.label}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label>Ngày cụ thể</label>
                  <input
                    type="date"
                    name="specificDate"
                    value={formData.specificDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}

              <div className="two-columns">
                <div className="form-group">
                  <label>Giờ bắt đầu</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Giờ kết thúc</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="two-columns">
                <div className="form-group">
                  <label>Giá mỗi buổi (VNĐ)</label>
                  <input
                    type="number"
                    name="pricePerSession"
                    value={formData.pricePerSession}
                    onChange={handleInputChange}
                    placeholder="500000"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Thời gian mỗi buổi (phút)</label>
                  <input
                    type="number"
                    name="sessionDurationMinutes"
                    value={formData.sessionDurationMinutes}
                    onChange={handleInputChange}
                    min="15"
                    max="480"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Ghi chú về lịch làm việc..."
                  rows="3"
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleInputChange}
                  />
                  Cho phép đặt lịch
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className="save-btn">
                  <Save size={16} /> {editingSchedule ? 'Cập nhật' : 'Lưu lịch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantScheduleSetup;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReproductiveHealth.css';

const API_BASE = 'http://localhost:8080/api/auth/health';

function calcEndPeriodDate(start, periodLength) {
  if (!start) return '';
  const dt = new Date(start);
  dt.setDate(dt.getDate() + Number(periodLength || 5) - 1);
  return dt.toISOString().slice(0, 10);
}

function getMonthYear(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getFullYear()}`;
}

const ReproductiveHealth = () => {
  const [cycleData, setCycleData] = useState({
    lastPeriod: '',
    averageCycle: '',
    periodLength: 5
  });
  const [reminders, setReminders] = useState({
    ovulation: false,
    fertility: false,
    pill: false,
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load dữ liệu hiện tại + lịch sử khi mở trang
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Phải luôn trả về giá trị JWT
      axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` }

      });
      const d = res.data;
      if (d && d.cycleStartDate) {
        setIsNew(false);
        setCycleData({
          lastPeriod: d.cycleStartDate,
          averageCycle: d.cycleLength,
          periodLength: d.periodLength || 5
        });
        setReminders({
          ovulation: d.remindOvulation,
          fertility: d.remindHighFertile,
          pill: d.remindPill,
        });
      } else {
        setIsNew(true);
        setCycleData({ lastPeriod: '', averageCycle: '', periodLength: 5 });
        setReminders({ ovulation: false, fertility: false, pill: false });
      }
    } catch (err) {
      setIsNew(true);
      setCycleData({ lastPeriod: '', averageCycle: '', periodLength: 5 });
      setReminders({ ovulation: false, fertility: false, pill: false });
    }
    // Lịch sử
    try {
      const token = localStorage.getItem("token");
      const res2 = await axios.get(`${API_BASE}/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res2.data || []);
    } catch (err) {
      setHistory([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xử lý lưu/khai báo chu kỳ mới
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE}/me`, {
        cycleStartDate: cycleData.lastPeriod,
        cycleLength: Number(cycleData.averageCycle),
        periodLength: Number(cycleData.periodLength) || 5,
        remindOvulation: reminders.ovulation,
        remindHighFertile: reminders.fertility,
        remindPill: reminders.pill,
        pillTime: "20:00:00",
        note: ""
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaveSuccess(true);
      fetchData(); // Tải lại dữ liệu mới
      setTimeout(() => setSaveSuccess(false), 2000); // Ẩn thông báo sau 2s
    } catch (err) {
      alert("Có lỗi khi lưu. Kiểm tra lại dữ liệu!");
    }
  };

  // Cập nhật form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCycleData(prev => ({ ...prev, [name]: value }));
  };
  const handleReminderToggle = (name) => {
    setReminders(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Lấy lịch sử 3 tháng gần nhất, không trùng tháng
  const uniqueMonthHistory = [];
  const existed = new Set();
  for (let rec of history) {
    const ym = getMonthYear(rec.cycleStartDate);
    if (!existed.has(ym)) {
      uniqueMonthHistory.push(rec);
      existed.add(ym);
    }
    if (uniqueMonthHistory.length === 3) break;
  }

  return (
    <div className="info-wrapper">
      <div className="info-header">
        <h2>Sức khỏe sinh sản</h2>
        <p>Theo dõi sức khỏe sinh sản</p>
      </div>

      <div className="info-form">
        <div className="secure-alert">
          <span>🔒</span> Thông tin này được bảo mật và chỉ bạn mới có thể xem
        </div>
        <div className="form-row">
          <div className="form-col">
            <label>Ngày bắt đầu chu kỳ gần nhất</label>
            <input type="date" name="lastPeriod" value={cycleData.lastPeriod || ''} onChange={handleChange} />
          </div>
          <div className="form-col">
            <label>Chu kỳ trung bình (ngày)</label>
            <input type="number" name="averageCycle" value={cycleData.averageCycle || ''} onChange={handleChange} min={15} max={40} />
          </div>
          <div className="form-col">
            <label>Số ngày hành kinh</label>
            <input type="number" name="periodLength" value={cycleData.periodLength || 5} onChange={handleChange} min={3} max={10} />
          </div>
        </div>

        <h3>Cài đặt nhắc nhở</h3>
        <div className="reminder-group">
          <div className="reminder-item">
            <label>
              <input type="checkbox" checked={reminders.ovulation} onChange={() => handleReminderToggle('ovulation')} />
            </label>
            <div>
              <strong>Ngày rụng trứng</strong>
              <p>Nhắc nhở trước 2 ngày</p>
            </div>
          </div>
          <div className="reminder-item">
            <label>
              <input type="checkbox" checked={reminders.fertility} onChange={() => handleReminderToggle('fertility')} />
            </label>
            <div>
              <strong>Khả năng mang thai cao</strong>
              <p>Thông báo trong giai đoạn dễ thụ thai</p>
            </div>
          </div>
          <div className="reminder-item">
            <label>
              <input type="checkbox" checked={reminders.pill} onChange={() => handleReminderToggle('pill')} />
            </label>
            <div>
              <strong>Nhắc uống thuốc tránh thai</strong>
              <p>Hàng ngày lúc 20:00</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="save-btn"
          disabled={loading || !cycleData.lastPeriod || !cycleData.averageCycle}
        >
          {isNew ? "Lưu" : "Cập nhật"}
        </button>
        {saveSuccess && <div className="save-success">Đã lưu thành công!</div>}

        <h3>Lịch sử chu kỳ (3 tháng gần nhất)</h3>
        <ul className="cycle-history">
          {uniqueMonthHistory.length === 0 && <li>Chưa có dữ liệu lịch sử</li>}
          {uniqueMonthHistory.map((item, idx) => (
            <li key={idx}>
              <strong>Tháng {getMonthYear(item.cycleStartDate)}</strong>{" "}
              <span>
                {item.cycleStartDate} - {calcEndPeriodDate(item.cycleStartDate, item.periodLength || 5)}
                {" "}({item.cycleLength} ngày chu kỳ)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReproductiveHealth;
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { User, Lock, Bell, Heart, RotateCcw, Calendar, Clock } from 'lucide-react';
import './ProfileSidebar.css';
import { useAuth } from '../../context/AuthContext'; // 👈 CHỈ import useAuth

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth(); // ✅ Không cần useContext thủ công

  const roleName = user?.role?.roleName?.toUpperCase() || user?.role?.toUpperCase() || '';
  const isConsultant = roleName === 'CONSULTANT';
  const isCustomer = roleName === 'CUSTOMER';

  const displayName = profile?.fullName || user?.name || user?.email || 'Người dùng';
  const displayEmail = user?.email || '';
  const isActive = user?.enabled !== false;

  return (
    <aside className="profile-sidebar">
      <Link to="/" className="profile-logo">
        <div className="logo-icon">
          <Heart size={20} className="icon-white" />
        </div>
        <div className="logo-text-group">
          <h2 className="sidebar-title">STI Health</h2>
          <p className="sidebar-subtitle">Tư vấn sức khỏe giới tính</p>
        </div>
      </Link>

      <div className="profile-sidebar-header">
        <div className="profile-avatar">
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">
              {displayName
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
          )}
        </div>
        <h3 className="profile-name">{displayName}</h3>
        <p className="profile-email">{displayEmail}</p>
        <span className="profile-status">
          ● {isActive ? 'Tài khoản hoạt động' : 'Tài khoản không hoạt động'}
        </span>
      </div>

      <nav className="profile-menu">
        <ul>
          <li>
            <NavLink to="info" className={({ isActive }) => (isActive ? 'active' : '')}>
              <User size={18} /> Thông tin cá nhân
            </NavLink>
          </li>
          <li>
            <NavLink to="account" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Lock size={18} /> Thông tin tài khoản
            </NavLink>
          </li>
          <li>
            <NavLink to="notifications" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Bell size={18} /> Thông báo
            </NavLink>
          </li>

          {isCustomer && (
            <>
              <li>
                <NavLink to="appointments" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <Calendar size={18} /> Lịch hẹn của tôi
                </NavLink>
              </li>
              <li>
                <NavLink to="health" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <Heart size={18} /> Sức khỏe sinh sản
                </NavLink>
              </li>
              <li>
                <NavLink to="history" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <RotateCcw size={18} /> Lịch sử dịch vụ
                </NavLink>
              </li>
            </>
          )}

          {isConsultant && (
            <>
              <li>
                <NavLink to="schedule-setup" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <Calendar size={18} /> Sắp xếp lịch
                </NavLink>
              </li>
              <li>
                <NavLink to="consultant-appointments" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <Clock size={18} /> Lịch hẹn
                </NavLink>
              </li>
              <li>
                <NavLink to="history" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <RotateCcw size={18} /> Lịch sử tư vấn
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="profile-back-btn">
        <button onClick={() => navigate('/')}>Quay lại</button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;

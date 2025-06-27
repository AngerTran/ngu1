import {
  BarChart3, Users, UserCheck, Heart, Stethoscope,
  FileText, MessageSquare, HelpCircle, LogOut, UserPlus
} from 'lucide-react';
import './ManagerSidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ManagerSidebar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <aside className="ms-sidebar">
      <div className="ms-sidebar-top">
        <div className="ms-sidebar-header">
          <Link to="/" className="ms-logo-link">
            <div className="ms-logo-square"><Heart className="ms-icon-white" /></div>
            <div className="ms-logo-text-group">
              <h1 className="ms-sidebar-title">STI Health</h1>
              <p className="ms-sidebar-subtitle">Tư vấn sức khỏe giới tính</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="ms-sidebar-middle">
        <p className="ms-nav-label">Quản lý hệ thống</p>
        <ul>
          <li><Link to="/manager" className="ms-nav-link"><BarChart3 /> Dashboard</Link></li>
          <li><Link to="/manager/users" className="ms-nav-link"><Users /> Quản lý người dùng</Link></li>
          <li><Link to="/manager/consultants" className="ms-nav-link"><UserCheck /> Quản lý tư vấn viên</Link></li>
          <li><Link to="/manager/staffs" className="ms-nav-link"><UserPlus /> Quản lý nhân viên</Link></li>
          <li><Link to="/manager/services" className="ms-nav-link"><Stethoscope /> Quản lý dịch vụ</Link></li>
          <li><Link to="/manager/blogs" className="ms-nav-link"><FileText /> Quản lý blog</Link></li>
          <li><Link to="/manager/feedbacks" className="ms-nav-link"><MessageSquare /> Quản lý phản hồi</Link></li>
          <li><Link to="/manager/qna" className="ms-nav-link"><HelpCircle /> Quản lý Q&A</Link></li>
        </ul>
      </div>

      <div className="ms-sidebar-footer">
        <button className="ms-nav-link ms-logout-btn" onClick={handleLogout}>
          <LogOut /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};

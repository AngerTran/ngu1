import {
  Home, Calendar, FileText, Stethoscope,
  BookOpen, LogOut, UserPlus
} from 'lucide-react';
import './StaffSidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const StaffSidebar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <aside className="ss-sidebar">
      <div className="ss-sidebar-top">
        <div className="ss-sidebar-header">
          <Link to="/" className="ss-logo-link">
            <div className="ss-logo-square"><UserPlus className="ss-icon-white" /></div>
            <div className="ss-logo-text-group">
              <h1 className="ss-sidebar-title">STI Health</h1>
              <p className="ss-sidebar-subtitle">Nhân viên y tế</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="ss-sidebar-middle">
        <p className="ss-nav-label">Chức năng</p>
        <ul>
          <li><Link to="/staff" className="ss-nav-link"><Home /> Trang chủ</Link></li>
          <li><Link to="/staff/schedule" className="ss-nav-link"><Calendar /> Lịch xét nghiệm</Link></li>
          <li><Link to="/staff/results" className="ss-nav-link"><FileText /> Kết quả xét nghiệm</Link></li>
          <li><Link to="/staff/services" className="ss-nav-link"><Stethoscope /> Dịch vụ y tế</Link></li>
          <li><Link to="/staff/blogs" className="ss-nav-link"><BookOpen /> Blog Y Tế</Link></li>
        </ul>
      </div>

      <div className="ss-sidebar-footer">
        <button className="ss-nav-link ss-logout-btn" onClick={handleLogout}>
          <LogOut /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};

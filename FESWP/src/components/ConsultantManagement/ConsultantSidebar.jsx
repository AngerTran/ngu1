import { BarChart3, Calendar, MessageSquare, Star, LogOut, Heart, MessageCircle } from 'lucide-react';
import './ConsultantSidebar.css';
import { Link } from 'react-router-dom';

export const ConsultantSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-header">
          <Link to="/" className="logo-link">
            <div className="logo-square"><Heart className="icon-white" /></div>
            <div className="logo-text-group">
              <h1 className="sidebar-title">Tư vấn viên</h1>
            </div>
          </Link>
        </div>
      </div>

      <div className="sidebar-middle">
        <p className="nav-label">Quản lý</p>
        <ul>
          <li><Link to="/consultant" className="nav-link"><BarChart3 /> Dashboard</Link></li>
          <li><Link to="/consultant/schedule" className="nav-link"><Calendar /> Lịch tư vấn</Link></li>
          <li><Link to="/consultant/chat" className="nav-link"><MessageCircle /> Nhắn tin</Link></li>
          <li><Link to="/consultant/questions" className="nav-link"><MessageSquare /> Câu hỏi</Link></li>
          <li><Link to="/consultant/reviews" className="nav-link"><Star /> Đánh giá</Link></li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <Link to="/logout" className="nav-link"><LogOut /> Đăng xuất</Link>
      </div>
    </aside>
  );
};

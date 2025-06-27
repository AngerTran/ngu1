import './SBHeader.css';
import { useNavigate } from 'react-router-dom';

const SBHeader = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/staff/blogs/create');
  };

  return (
    <div className="sb-header">
      <div className="sb-header-top">
        <div>
          <h1 className="sb-title">Blog Y Tế</h1>
          <p className="sb-subtitle">Cập nhật kiến thức y tế và xu hướng xét nghiệm mới nhất</p>
        </div>

        <button className="add-post-btn" onClick={handleCreatePost}>
          Tạo bài viết mới
        </button>
      </div>
    </div>
  );
};

export default SBHeader;

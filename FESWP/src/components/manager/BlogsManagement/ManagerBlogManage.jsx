import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManagerBlogManage.css";

const PAGE_SIZE = 3;

const ManagerBlogManage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8080/api/management/blogs/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((res) => setPosts(res.data))
    .catch((err) => console.error("❌ Lỗi khi tải bài viết:", err));
  }, []);

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const visiblePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleView = (post) => {
    navigate(`/manager/blogs/${post.id}`);
  };

  const handleDelete = async (post) => {
    if (window.confirm(`❌ Bạn có chắc muốn xóa "${post.title}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/management/blogs/${post.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setPosts(prev => prev.filter(p => p.id !== post.id));
        alert(`🗑️ Đã xóa bài viết: ${post.title}`);
      } catch (err) {
        console.error("Lỗi khi xóa bài viết:", err);
        alert("❌ Xóa thất bại!");
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Đã xác nhận":
      case "Published":
        return "mbm-badge mbm-green";
      case "Đã từ chối":
      case "Rejected":
        return "mbm-badge mbm-red";
      case "Chờ xác nhận":
      case "Pending":
        return "mbm-badge mbm-gray";
      default:
        return "mbm-badge";
    }
  };

  return (
    <div className="mbm-container">
      {/* ---------- HEADER ---------- */}
      <div className="mbm-header">
        <div className="mbm-header-top">
          <div>
            <h1>Quản lý Blog</h1>
            <p className="mbm-subtitle">Tạo và quản lý nội dung blog y tế</p>
          </div>
        </div>
      </div>

      {/* ---------- BODY TABLE ---------- */}
      <div className="mbm-table-container">
        <h2>Danh sách bài viết ({posts.length})</h2>
        <table className="mbm-table">
          <thead>
            <tr>
              <th>BÀI VIẾT</th>
              <th>TÁC GIẢ</th>
              <th>CHỦ ĐỀ</th>
              <th>TRẠNG THÁI</th>
              <th>NGÀY ĐĂNG</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {visiblePosts.map((post) => (
              <tr key={post.id}>
                <td>
                  <strong>{post.title}</strong>
                  <div className="mbm-post-meta">ID: {post.id}</div>
                </td>
                <td>{post.authorName}</td>
                <td><span className="mbm-badge mbm-gray">{post.topicName}</span></td>
                <td><span className={getStatusClass(post.status)}>{post.status}</span></td>
                <td>{new Date(post.createdAt).toLocaleDateString() || "Chưa lên lịch"}</td>
                <td>
                  <div className="mbm-actions">
                    <button className="mbm-view-btn" onClick={() => handleView(post)}>Xem</button>
                    <button className="mbm-delete-btn" onClick={() => handleDelete(post)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ---------- PAGINATION ---------- */}
        <div className="mbm-pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>‹ Trước</button>
          {[...Array(totalPages)].map((_, idx) => {
            const p = idx + 1;
            return (
              <button key={p} className={page === p ? "active" : ""} onClick={() => setPage(p)}>
                {p}
              </button>
            );
          })}
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Sau ›</button>
        </div>
      </div>
    </div>
  );
};

export default ManagerBlogManage;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SBFooter.css";

const SBFooter = ({ searchKeyword, statusFilter, topicFilter }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/staff/blogs/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Lỗi khi tải bài viết:", err));
  }, []);

  const filteredPosts = posts
    .filter((post) => post && post.title)
    .filter((post) => {
      const matchKeyword = searchKeyword
        ? post.title.toLowerCase().includes(searchKeyword.toLowerCase())
        : true;
      const matchStatus = statusFilter ? post.status === statusFilter : true;
      const matchTopic = topicFilter ? post.topicName === topicFilter : true;
      return matchKeyword && matchStatus && matchTopic;
    });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const visiblePosts = filteredPosts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleView = (post) => {
    navigate(`/staff/blogs/${post.id}`);
  };

  const handleEdit = (post) => {
    navigate(`/staff/blogs/edit/${post.id}`);
  };

  const handleDelete = async (post) => {
    if (window.confirm(`❌ Bạn có chắc muốn xóa "${post.title}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/auth/staff/blogs/${post.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
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
        return "sb-badge green";
      case "Đã từ chối":
      case "Rejected":
        return "sb-badge red";
      case "Chờ xác nhận":
      case "Pending":
        return "sb-badge gray";
      default:
        return "sb-badge";
    }
  };

  return (
    <div className="sb-table-container">
      <h2>Danh sách bài viết ({filteredPosts.length})</h2>
      <table className="sb-table">
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
                <div className="sb-meta">ID: {post.id}</div>
              </td>
              <td>{post.authorName}</td>
              <td><span className="sb-badge gray">{post.topicName}</span></td>
              <td><span className={getStatusClass(post.status)}>{post.status}</span></td>
              <td>{new Date(post.createdAt).toLocaleDateString() || "Chưa lên lịch"}</td>
              <td>
                <div className="sb-actions">
                  <button className="sb-view-btn" onClick={() => handleView(post)}>Xem</button>
                  <button className="sb-edit-btn" onClick={() => handleEdit(post)}>Sửa</button>
                  <button className="sb-delete-btn" onClick={() => handleDelete(post)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sb-pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>‹ Trước</button>
        {[...Array(totalPages)].map((_, idx) => {
          const p = idx + 1;
          return (
            <button
              key={p}
              className={page === p ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          );
        })}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Sau ›</button>
      </div>
    </div>
  );
};

export default SBFooter;

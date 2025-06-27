import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BMBody.css";

const BMBody = ({ searchKeyword, statusFilter, topicFilter }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  // Gọi API khi component được render
  useEffect(() => {
    axios.get("http://localhost:8080/api/management/blogs/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // hoặc thay bằng token bạn đang dùng
      }
    })
    .then((res) => setPosts(res.data))
    .catch((err) => console.error("Lỗi khi tải bài viết:", err));
  }, []);

  // Lọc bài viết theo từ khóa, trạng thái, chủ đề
  const filteredPosts = posts.filter(post => {
    const matchKeyword = post.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchStatus = statusFilter ? post.status === statusFilter : true;
    const matchTopic = topicFilter ? post.topicName === topicFilter : true;
    return matchKeyword && matchStatus && matchTopic;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const visiblePosts = filteredPosts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
      // Cập nhật lại danh sách sau khi xóa
      setPosts((prevPosts) => prevPosts.filter(p => p.id !== post.id));
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
      return "badge green";
    case "Đã từ chối":
    case "Rejected":
      return "badge red";
    case "Chờ xác nhận":
    case "Pending":
      return "badge gray";
    default:
      return "badge";
  }
};

  return (
    <div className="blog-table-container">
      <h2>Danh sách bài viết ({filteredPosts.length})</h2>
      <table className="blog-table">
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
                <div className="post-meta">ID: {post.id}</div>
              </td>
              <td>{post.authorName}</td>
              <td><span className="badge gray">{post.topicName}</span></td>
              <td><span className={getStatusClass(post.status)}>{post.status}</span></td>
              <td>{new Date(post.createdAt).toLocaleDateString() || "Chưa lên lịch"}</td>
              <td>
                <div className="actions">
                  <button className="view-btn" onClick={() => handleView(post)}>Xem</button>
                  <button className="delete-btn" onClick={() => handleDelete(post)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
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
  );
};

export default BMBody;

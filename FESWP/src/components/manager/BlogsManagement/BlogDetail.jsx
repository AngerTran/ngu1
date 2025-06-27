import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/management/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error("❌ Không lấy được bài viết:", err);
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updateStatus = (newStatus) => {
    const endpoint =
      newStatus === "Đã xác nhận"
        ? `/api/management/blogs/${id}/approve`
        : `/api/management/blogs/${id}/reject`;

    axios
      .put(`http://localhost:8080${endpoint}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert(`Đã cập nhật trạng thái: ${newStatus}`);
        navigate(-1);
      })
      .catch((err) => {
        console.error("Lỗi cập nhật trạng thái:", err);
        alert("Không thể cập nhật trạng thái!");
      });
  };

  if (loading) return <div className="blog-detail-wrapper">⏳ Đang tải...</div>;
  if (!post)
    return <div className="blog-detail-wrapper">❌ Không tìm thấy bài viết.</div>;

  const normalizedStatus = post.status?.toLowerCase().trim();
  const showActions =
    normalizedStatus === "chờ xác nhận" || normalizedStatus === "pending";

  return (
    <div className="blog-detail-wrapper">
      <div className="blog-detail-header">
        <div className="blog-detail-left">
          <button className="blog-detail-btn" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>

        {showActions && (
          <div className="blog-detail-actions">
            <button
              className="blog-detail-btn green"
              onClick={() => updateStatus("Đã xác nhận")}
            >
              Xác nhận
            </button>
            <button
              className="blog-detail-btn red"
              onClick={() => updateStatus("Đã từ chối")}
            >
              Từ chối
            </button>
          </div>
        )}
      </div>

      <h1 className="blog-detail-title">{post.title}</h1>
      <div className="blog-detail-meta">
        <p>
          <strong>Tác giả:</strong> {post.authorName}
        </p>
        <p>
          <strong>Chủ đề:</strong> {post.topicName}
        </p>
        <p>
          <strong>Trạng thái:</strong> {post.status}
        </p>
        <p>
          <strong>Ngày đăng:</strong>{" "}
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : "Chưa lên lịch"}
        </p>
      </div>
      <hr />
      <div className="blog-detail-content">{post.content}</div>
    </div>
  );
};

export default BlogDetail;

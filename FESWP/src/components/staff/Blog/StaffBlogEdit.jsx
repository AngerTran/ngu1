import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StaffBlogEdit.css";

const StaffBlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Lấy danh sách chủ đề
    axios.get("http://localhost:8080/api/topics")
      .then(res => setTopics(res.data || []))
      .catch(err => console.error("Không thể tải chủ đề:", err));

    // Lấy bài viết theo ID
    axios.get(`http://localhost:8080/api/auth/staff/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setTopic(blog.topicId || "");
      })
      .catch(err => {
        console.error("Không thể tải bài viết:", err);
        alert("Bài viết không tồn tại!");
        navigate("/staff/blogs");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/auth/staff/blogs/${id}`,
        {
          title,
          content,
          topicId: topic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Bài viết đã được cập nhật!");
      navigate("/staff/blogs");
    } catch (error) {
      console.error("❌ Lỗi cập nhật bài viết:", error);
      alert("Không thể cập nhật bài viết. Vui lòng thử lại.");
    }
  };

  return (
    <div className="sb-edit-container">
      <div className="sb-edit-header">
        <button className="sb-edit-back-btn" onClick={() => navigate("/staff/blogs")}>
          ← Quay lại
        </button>
        <h2>Chỉnh sửa bài viết</h2>
      </div>

      <form onSubmit={handleSubmit} className="sb-edit-form">
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Nội dung</label>
        <textarea
          id="content"
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label htmlFor="topic">Chủ đề</label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        >
          <option value="">-- Chọn chủ đề --</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <div className="sb-edit-buttons">
          <button type="submit" className="sb-edit-submit-btn">Lưu thay đổi</button>
          <button type="button" className="sb-edit-cancel-btn" onClick={() => navigate("/staff/blogs")}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffBlogEdit;

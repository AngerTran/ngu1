import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StaffBlogCreate.css";


const StaffBlogCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  // Lấy danh sách chủ đề
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/topics");
        setTopics(res.data || []);
      } catch (err) {
        console.error("Không thể tải danh sách chủ đề:", err);
      }
    };
    fetchTopics();
  }, []);

  // Xử lý submit tạo bài viết mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/auth/staff/blogs",
        {
          title,
          content,
          topicId: topic, // gửi ID của chủ đề
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Bài viết đã được tạo!");
      navigate("/staff/blogs");
    } catch (error) {
      console.error("❌ Lỗi tạo bài viết:", error);
      alert("Không thể tạo bài viết. Vui lòng thử lại.");
    }
  };

  return (
    <div className="blog-create-container">
      <div className="blog-header-buttons">
        <button className="back-btn" onClick={() => navigate("/staff/blogs")}>
          Quay lại
        </button>
      </div>

      <h2>Tạo bài viết mới</h2>
      <form onSubmit={handleSubmit} className="blog-create-form">
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          type="text"
          placeholder="Nhập tiêu đề..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Nội dung</label>
        <textarea
          id="content"
          placeholder="Nhập nội dung bài viết..."
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
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Đăng bài
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/staff/blogs")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffBlogCreate;


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceDetail.css"; // Dùng lại CSS detail chung
import { FaCheckCircle, FaBan } from "react-icons/fa";

const formatCurrency = (number) =>
  number ? number.toLocaleString("vi-VN") + " VNĐ" : "-";

const TestingServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Lấy chi tiết dịch vụ xét nghiệm
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/prices/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setService(res.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [id, token]);

  // Lấy danh mục
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, [token]);

  const getCategoryName = (id) => {
    if (!id) return "-";
    const found = categories.find((cat) => cat.id === id);
    return found ? found.name : "-";
  };

  const handleChangeStatus = async (newStatus) => {
    setStatusLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8080/api/prices/${service.id}/status`,
        null,
        {
          params: { status: newStatus },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setService(res.data);
    } catch (err) {
      alert("Không thể cập nhật trạng thái!");
    }
    setStatusLoading(false);
  };

  if (loading)
    return <div className="service-detail-wrapper">⏳ Đang tải...</div>;

  if (!service)
    return (
      <div className="service-detail-wrapper">
        ❌ Không tìm thấy dịch vụ.
      </div>
    );

  const badge =
    service.status === "Active" ? (
      <span className="status-badge">
        <span className="dot" /> Active
      </span>
    ) : (
      <span className="status-badge inactive">
        <span className="dot" /> Inactive
      </span>
    );

  return (
    <div className="service-detail-wrapper">
      <button className="service-detail-btn" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>
      <h1 className="service-detail-title">{service.name}</h1>
      <div className="service-detail-meta">
        <p>
          <strong>ID:</strong> {service.id}
        </p>
        <p>
          <strong>Danh mục:</strong>{" "}
          <span className="service-category-badge">
            {service.categoryName || getCategoryName(service.categoryId)}
          </span>
        </p>
        <p>
          <strong>Giá:</strong> {formatCurrency(service.price)}
        </p>

        <div className="service-status-row">
          <strong>Trạng thái:</strong>
          {badge}
          <button
            className="status-btn green"
            disabled={statusLoading || service.status === "Active"}
            onClick={() => handleChangeStatus("Active")}
          >
            <FaCheckCircle style={{ fontSize: 17 }} /> Kích hoạt
          </button>
          <button
            className="status-btn red"
            disabled={statusLoading || service.status === "Inactive"}
            onClick={() => handleChangeStatus("Inactive")}
          >
            <FaBan style={{ fontSize: 17 }} /> Ngưng áp dụng
          </button>
        </div>

        <p>
          <strong>Mô tả:</strong>{" "}
          <span className="service-description">
            {service.description || "—"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TestingServiceDetail;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceDetail.css";

const formatCurrency = (number) => {
  return `$ ${number.toLocaleString("vi-VN")} VNĐ`;
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/management/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("📦 Service:", res.data);
        setService(res.data);
      })
      .catch((err) => {
        console.error("❌ Không lấy được dịch vụ:", err);
        setService(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updateStatus = (newStatus) => {
    const endpoint =
      newStatus === "Đang hoạt động"
        ? `/api/management/services/${id}/approve`
        : `/api/management/services/${id}/reject`;

    axios
      .put(`http://localhost:8080${endpoint}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert(`✅ Trạng thái đã cập nhật: ${newStatus}`);
        navigate(-1);
      })
      .catch((err) => {
        console.error("❌ Lỗi cập nhật:", err);
        alert("Không thể cập nhật trạng thái!");
      });
  };

  if (loading) return <div className="service-detail-wrapper">⏳ Đang tải...</div>;

  if (!service) return <div className="service-detail-wrapper">❌ Không tìm thấy dịch vụ.</div>;

  const normalizedStatus = service.status?.toLowerCase().trim();
  const showActions = normalizedStatus === "chờ xét duyệt" || normalizedStatus === "pending";

  return (
    <div className="service-detail-wrapper">
      <div className="service-detail-header">
        <button className="service-detail-btn" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>

        {showActions && (
          <div className="service-detail-actions">
            <button className="service-detail-btn green" onClick={() => updateStatus("Đang hoạt động")}>
              ✅ Đồng ý
            </button>
            <button className="service-detail-btn red" onClick={() => updateStatus("Bị từ chối")}>
              ❌ Từ chối
            </button>
          </div>
        )}
      </div>

      <h1 className="service-detail-title">{service.name}</h1>
      <div className="service-detail-meta">
        <p><strong>Mô tả:</strong> {service.desc}</p>
        <p><strong>Danh mục:</strong> {service.category}</p>
        <p><strong>Giá:</strong> {formatCurrency(service.price)}</p>
        <p><strong>Thời gian:</strong> {service.time} phút</p>
        <p><strong>Trạng thái:</strong> {service.status}</p>
      </div>
    </div>
  );
};

export default ServiceDetail;

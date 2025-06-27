import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SMBody.css";

const SMBody = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/management/services/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setServices(res.data))
      .catch((err) => console.error("❌ Lỗi tải dịch vụ:", err));
  }, []);

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const visibleServices = services.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleView = (service) => {
    navigate(`/manager/services/${service.id}`, { state: { service } });
  };

  const handleDelete = async (service) => {
    if (window.confirm(`❌ Bạn có chắc muốn xóa dịch vụ "${service.name}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/management/services/${service.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices((prev) => prev.filter((s) => s.id !== service.id));
        alert(`🗑️ Đã xóa dịch vụ: ${service.name}`);
      } catch (err) {
        console.error("Lỗi khi xóa dịch vụ:", err);
        alert("❌ Xóa thất bại!");
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "đang hoạt động":
      case "published":
        return "sm-badge green";
      case "bị từ chối":
      case "rejected":
        return "sm-badge red";
      case "chờ xét duyệt":
      case "pending":
      default:
        return "sm-badge gray";
    }
  };

  const formatCurrency = (number) => `$ ${number.toLocaleString("vi-VN")} VNĐ`;

  return (
    <div className="sm-table-container">
      <h2>Danh sách dịch vụ ({services.length})</h2>
      <table className="sm-table">
        <thead>
          <tr>
            <th>DỊCH VỤ</th>
            <th>DANH MỤC</th>
            <th>GIÁ</th>
            <th>THỜI GIAN</th>
            <th>TRẠNG THÁI</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {visibleServices.map((service) => (
            <tr key={service.id}>
              <td>
                <strong>{service.name}</strong>
                <div className="sm-meta">ID: {service.id}</div>
              </td>
              <td><span className="sm-badge gray">{service.category}</span></td>
              <td>{formatCurrency(service.price)}</td>
              <td>{service.time} phút</td>
              <td><span className={getStatusClass(service.status)}>{service.status}</span></td>
              <td>
                <div className="sm-actions">
                  <button className="sm-view-btn" onClick={() => handleView(service)}>Xem</button>
                  <button className="sm-delete-btn" onClick={() => handleDelete(service)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sm-pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>‹ Trước</button>
        {[...Array(totalPages)].map((_, idx) => (
          <button key={idx} className={page === idx + 1 ? "active" : ""} onClick={() => setPage(idx + 1)}>
            {idx + 1}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Sau ›</button>
      </div>
    </div>
  );
};

export default SMBody;

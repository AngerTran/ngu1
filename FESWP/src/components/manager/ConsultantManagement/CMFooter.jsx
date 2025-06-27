import React, { useState } from "react";
import "./CMFooter.css";

const CMFooter = () => {
  const doctorsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const doctors = [
    {
      id: "A",
      name: "BS. Nguyễn Văn A",
      specialty: "Tim mạch",
      status: "Đang hoạt động",
      rating: 4.8,
      consultations: 245,
      nextAvailable: "2024-06-06 09:00",
      contact: "bs.nguyenvana@hospital.com",
      phone: "0123456789",
    },
    {
      id: "B",
      name: "BS. Trần Thị B",
      specialty: "Nội tiết",
      status: "Đang hoạt động",
      rating: 4.9,
      consultations: 312,
      nextAvailable: "2024-06-06 14:00",
      contact: "bs.tranthib@hospital.com",
      phone: "0987654321",
    },
    {
      id: "C",
      name: "BS. Lê Văn C",
      specialty: "Da liễu",
      status: "Tạm nghỉ",
      rating: 4.7,
      consultations: 189,
      nextAvailable: "Không có lịch",
      contact: "bs.levanc@hospital.com",
      phone: "0345678901",
    },
    {
      id: "D",
      name: "BS. Phạm Thị D",
      specialty: "Nhi khoa",
      status: "Đang hoạt động",
      rating: 4.6,
      consultations: 156,
      nextAvailable: "2024-06-07 10:30",
      contact: "bs.phamthid@hospital.com",
      phone: "0112233445",
    },
    {
      id: "E",
      name: "BS. Hoàng Văn E",
      specialty: "Thần kinh",
      status: "Đang hoạt động",
      rating: 4.7,
      consultations: 203,
      nextAvailable: "2024-06-06 15:30",
      contact: "bs.hoangvane@hospital.com",
      phone: "0667788990",
    },
    {
      id: "F",
      name: "BS. Võ Thị F",
      specialty: "Sản phụ khoa",
      status: "Bận",
      rating: 4.8,
      consultations: 178,
      nextAvailable: "2024-06-08 08:00",
      contact: "bs.vothif@hospital.com",
      phone: "0998877665",
    },
    // 🔻 12 bác sĩ mẫu bổ sung
    ...Array.from({ length: 12 }).map((_, i) => ({
      id: String.fromCharCode(71 + i),
      name: `BS. Giả Lập ${i + 1}`,
      specialty: "Chuyên khoa X",
      status: i % 3 === 0 ? "Đang hoạt động" : i % 3 === 1 ? "Tạm nghỉ" : "Bận",
      rating: (4.0 + (i % 5) * 0.2).toFixed(1),
      consultations: 100 + i * 5,
      nextAvailable:
        i % 2 === 0
          ? `2024-06-${10 + i} 10:00`
          : "Không có lịch",
      contact: `bs.fake${i + 1}@hospital.com`,
      phone: `09000000${i + 1}`,
    })),
  ];

  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Đang hoạt động":
        return "status-active";
      case "Tạm nghỉ":
        return "status-inactive";
      case "Bận":
        return "status-busy";
      default:
        return "";
    }
  };

  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  );

  return (
    <div className="footer-wrapper">
      <div className="footer-grid">
        {paginatedDoctors.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <div className="doctor-header">
              <div className="avatar">{doctor.id}</div>
              <div>
                <div className="doctor-name">{doctor.name}</div>
                <div className="doctor-specialty">{doctor.specialty}</div>
              </div>
            </div>
            <div className="doctor-status">
              Trạng thái:{" "}
              <span className={getStatusClass(doctor.status)}>{doctor.status}</span>
            </div>
            <div>Đánh giá: ★ {doctor.rating}</div>
            <div>Tổng tư vấn: {doctor.consultations}</div>
            <div>
              Lịch trống tiếp theo:{" "}
              {doctor.nextAvailable.includes("Không")
                ? <span className="no-schedule">{doctor.nextAvailable}</span>
                : <span className="has-schedule">{doctor.nextAvailable}</span>}
            </div>
            <div>Liên hệ:<br />
              {doctor.contact}<br />
              {doctor.phone}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Trước
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          sau &raquo;
        </button>
      </div>
    </div>
  );
};

export default CMFooter;

import React from "react";
import "./MSFooter.css";
import { CalendarCheck, Clock, Star } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Gói xét nghiệm sức khỏe tổng quát",
    duration: "45 phút",
    rating: 4.8,
    reviews: 1567,
    description: "Công thức máu, sinh hóa máu, chức năng gan thận, lipid máu, đường huyết",
    highlights: ["Gói toàn diện", "Báo cáo chi tiết", "Tư vấn bác sĩ"],
    price: 400000,
    originalPrice: 500000,
    discount: "-20%",
    total: 203,
    thisMonth: 45,
    thisWeek: 12,
  },
  {
    id: 2,
    name: "Gói xét nghiệm tiền hôn nhân",
    duration: "60 phút",
    rating: 4.9,
    reviews: 1123,
    description: "Nhóm máu, HIV, Giang mai, Thalassemia, G6PD và các xét nghiệm cơ bản",
    highlights: ["Gói hoàn chỉnh", "Tư vấn di truyền", "Báo cáo thân thiện"],
    price: 480000,
    originalPrice: 600000,
    discount: "-20%",
    total: 89,
    thisMonth: 17,
    thisWeek: 4,
  },
  {
    id: 3,
    name: "Xét nghiệm AMH (Anti-Müllerian Hormone)",
    duration: "30 phút",
    rating: 4.7,
    reviews: 234,
    description: "Đánh giá dự trữ buồng trứng và khả năng sinh sản ở phụ nữ",
    highlights: ["Đánh giá sinh sản", "Hỗ trợ IVF", "Tư vấn chuyên sâu"],
    price: 280000,
    originalPrice: 350000,
    discount: "-20%",
    total: 45,
    thisMonth: 8,
    thisWeek: 2,
  },
];

const MSFooter = () => {
  return (
    <div className="ms-footer-wrapper">
      {services.map((service) => (
        <div key={service.id} className="ms-card">
          <div className="ms-header">
            <CalendarCheck size={20} />
            <span className="ms-badge">định kỳ</span>
          </div>
          <h3 className="ms-title">{service.name}</h3>
          <div className="ms-subinfo">
            <span><Clock size={16} /> {service.duration}</span>
            <span className="ms-rating">
              <Star size={16} color="#facc15" /> {service.rating} ({service.reviews})
            </span>
          </div>
          <p className="ms-description">{service.description}</p>
          <div className="ms-highlights">
            {service.highlights.map((h, idx) => (
              <span key={idx} className="ms-tag">{h}</span>
            ))}
          </div>
          <div className="ms-price-box">
            <p className="ms-price">
              💰 Giá dịch vụ: <span className="ms-price-new">{service.price.toLocaleString()}đ</span>{" "}
              <span className="ms-price-old">{service.originalPrice.toLocaleString()}đ</span>
            </p>
            <span className="ms-discount">{service.discount}</span>
          </div>
          <div className="ms-stats">
            <div><p>{service.total}</p><span>Tổng số</span></div>
            <div><p>{service.thisMonth}</p><span>Tháng này</span></div>
            <div><p>{service.thisWeek}</p><span>Tuần này</span></div>
          </div>
          <button className="ms-book-btn">📅 Đặt lịch</button>
        </div>
      ))}
    </div>
  );
};

export default MSFooter;

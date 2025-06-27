import React from 'react';
import './EHeader.css';
import { Star } from 'lucide-react';

const EHeader = () => {
  const total = 6;
  const fiveStars = 4;
  const fourStars = 2;
  const satisfaction = Math.round((fiveStars / total) * 100);

  return (
    <div className="e-header-container">
      <div className="e-header-top">
        <h2>Đánh giá từ khách hàng</h2>
        <p>Xem phản hồi và đánh giá để cải thiện chất lượng tư vấn</p>
      </div>

      <div className="e-header-stats">
        {/* Đánh giá trung bình */}
        <div className="e-box">
          <h3>Đánh giá trung bình</h3>
          <div className="e-average">
            <span className="e-score">4.7</span>
            <div className="e-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="#facc15" stroke="#facc15" size={20} />
              ))}
            </div>
            <p className="e-total">Từ 6 đánh giá</p>
          </div>
        </div>

        {/* Phân bố đánh giá */}
        <div className="e-box">
          <h3>Phân bố đánh giá</h3>
          <div className="e-distribution">
            {[5, 4, 3, 2, 1].map((star, idx) => {
              const count = star === 5 ? 4 : star === 4 ? 2 : 0;
              return (
                <div className="e-bar-line" key={idx}>
                  <span className="e-star-label">
                    {star} <Star size={14} fill="#facc15" stroke="#facc15" />
                  </span>
                  <div className="e-bar-wrapper">
                    <div className="e-bar-bg">
                      <div
                        className="e-bar-fill"
                        style={{ width: `${(count / total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="e-bar-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="e-box">
          <h3>Thống kê tổng quan</h3>
          <ul className="e-summary">
            <li><span>Tổng đánh giá</span> <strong>{total}</strong></li>
            <li><span>Đánh giá 5 sao</span> <strong>{fiveStars}</strong></li>
            <li><span>Tỷ lệ hài lòng</span> <strong className="green">{satisfaction}%</strong></li>
            <li><span>Đánh giá gần nhất</span> <strong>17/6/2024</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EHeader;

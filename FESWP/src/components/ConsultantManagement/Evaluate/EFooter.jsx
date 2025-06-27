import React from 'react';
import './EFooter.css';
import { UserRound, Clock4, Star } from 'lucide-react';

const reviews = [
  {
    name: 'Khách hàng A***',
    date: '17/6/2024',
    topic: 'Tư vấn về căng thẳng công việc',
    rating: 5,
    comment:
      'Tư vấn viên rất tận tình và chuyên nghiệp. Những lời khuyên đã giúp tôi vượt qua khó khăn trong công việc. Cảm ơn rất nhiều!',
  },
  {
    name: 'Khách hàng B***',
    date: '16/6/2024',
    topic: 'Tư vấn về giáo dục con cái',
    rating: 4,
    comment:
      'Buổi tư vấn rất hữu ích. Tôi đã hiểu rõ hơn về cách giao tiếp với con mình. Mong có thể tiếp tục được tư vấn.',
  },
  {
    name: 'Khách hàng C***',
    date: '15/6/2024',
    topic: 'Tư vấn phát triển bản thân',
    rating: 5,
    comment:
      'Rất hài lòng với chất lượng tư vấn. Tư vấn viên lắng nghe tốt và đưa ra những giải pháp thiết thực.',
  },
  {
    name: 'Khách hàng D***',
    date: '14/6/2024',
    topic: 'Tư vấn hướng nghiệp',
    rating: 5,
    comment:
      'Cảm ơn bạn đã giúp tôi tìm ra hướng đi mới trong sự nghiệp. Những lời khuyên rất bổ ích và thực tế.',
  },
  {
    name: 'Khách hàng E***',
    date: '13/6/2024',
    topic: 'Tư vấn tâm lý cá nhân',
    rating: 4,
    comment:
      'Buổi tư vấn giúp tôi hiểu rõ hơn về bản thân. Tư vấn viên rất kiên nhẫn và thấu hiểu.',
  },
  {
    name: 'Khách hàng F***',
    date: '12/6/2024',
    topic: 'Tư vấn về mối quan hệ',
    rating: 5,
    comment:
      'Tuyệt vời! Đây là lần đầu tiên tôi cảm thấy được lắng nghe và hiểu một cách sâu sắc như vậy.',
  },
];

const EFooter = () => {
  return (
    <div className="e-footer-container">
      {reviews.map((review, index) => (
        <div key={index} className="e-review-card">
          <div className="e-review-header">
            <div className="e-review-info">
              <UserRound size={18} />
              <div>
                <strong>{review.name}</strong>
                <div className="e-review-date">
                  <Clock4 size={14} /> {review.date}
                </div>
              </div>
            </div>
            <div className="e-review-rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < review.rating ? '#facc15' : 'none'}
                  stroke="#facc15"
                />
              ))}
              <span className="e-score">{review.rating}/5</span>
            </div>
          </div>

          <div className="e-review-topic">
            <strong>Phiên tư vấn:</strong> {review.topic}
          </div>

          <div className="e-review-comment">
            <blockquote>
              <em>"{review.comment}"</em>
            </blockquote>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EFooter;

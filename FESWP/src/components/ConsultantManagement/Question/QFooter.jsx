import React from 'react';
import './QFooter.css';
import { UserRound, Clock4, Send } from 'lucide-react';

const questions = {
  pending: [
    {
      name: 'Nguyễn Văn A',
      time: '10:30:00 18/6/2024',
      category: 'Công việc',
      content: 'Tôi đang gặp khó khăn trong việc cân bằng giữa công việc và cuộc sống cá nhân. Bạn có thể cho tôi lời khuyên không?',
    },
    {
      name: 'Trần Thị B',
      time: '14:15:00 18/6/2024',
      category: 'Gia đình',
      content: 'Con tôi 15 tuổi, gần đây rất hay cáu gắt và không nghe lời. Tôi không biết phải làm sao để giao tiếp với con?',
    },
    {
      name: 'Phạm Thị D',
      time: '09:20:00 17/6/2024',
      category: 'Hướng nghiệp',
      content: 'Tôi đang phân vân về việc chọn ngành nghề. Hiện tại đã 25 tuổi nhưng vẫn chưa tìm được đam mê thực sự.',
    },
  ],
  answered: [
    {
      name: 'Lê Văn C',
      time: '16:45:00 17/6/2024',
      category: 'Phát triển cá nhân',
      content: 'Tôi cảm thấy mình thiếu tự tin khi nói trước đám đông. Làm thế nào để khắc phục điều này?',
      answer: 'Để khắc phục tình trạng thiếu tự tin khi nói trước đám đông, bạn có thể thực hiện một số phương pháp sau: 1. Luyện tập thường xuyên...'
    },
  ]
};

const QFooter = () => {
  return (
    <div className="qf-container">
      <section>
        <h3>Câu hỏi chờ trả lời</h3>
        {questions.pending.map((q, index) => (
          <div key={index} className="qf-card pending">
            <div className="qf-card-header">
              <div className="qf-user">
                <UserRound size={18} />
                <span className="name">{q.name}</span>
              </div>
              <div className="qf-time">
                <Clock4 size={16} />
                <span>{q.time}</span>
              </div>
            </div>

            <div className="qf-content">{q.content}</div>

            <div className="qf-card-footer">
              <div className="qf-tags">
                <span className="tag tag-category">{q.category}</span>
                <span className="tag tag-status tag-pending">Chờ trả lời</span>
              </div>
              <button className="btn btn-dark">
                <Send size={16} /> Trả lời
              </button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3>Câu hỏi đã trả lời</h3>
        {questions.answered.map((q, index) => (
          <div key={index} className="qf-card answered">
            <div className="qf-card-header">
              <div className="qf-user">
                <UserRound size={18} />
                <span className="name">{q.name}</span>
              </div>
              <div className="qf-time">
                <Clock4 size={16} />
                <span>{q.time}</span>
              </div>
            </div>

            <div className="qf-content">
              <strong>Câu hỏi:</strong> {q.content}
            </div>

            <div className="qf-answer">
              <strong>Câu trả lời của bạn:</strong> {q.answer}
            </div>

            <div className="qf-card-footer">
              <div className="qf-tags">
                <span className="tag tag-category tag-green">{q.category}</span>
                <span className="tag tag-status tag-answered">Đã trả lời</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default QFooter;

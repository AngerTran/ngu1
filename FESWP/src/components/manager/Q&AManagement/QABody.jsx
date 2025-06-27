import React, { useState } from 'react';
import './QABody.css';

const allQAData = [
  {
    id: 1,
    question: 'Tôi có nên xét nghiệm máu định kỳ không?',
    author: 'Nguyễn Văn A',
    date: '2024-06-03',
    category: 'Xét nghiệm',
    status: 'Đã duyệt',
    isFAQ: true,
    likes: 15,
    answer: {
      content: 'Xét nghiệm máu định kỳ rất quan trọng để phát hiện sớm các vấn đề sức khỏe. Bạn nên thực hiện ít nhất 1 lần/năm.',
      doctor: 'BS. Trần Thị B',
    }
  },
  {
    id: 2,
    question: 'Triệu chứng đau ngực có nguy hiểm không?',
    author: 'Lê Thị C',
    date: '2024-06-04',
    category: 'Tìm mạch',
    status: 'Chờ duyệt',
    isFAQ: false,
    likes: 0,
    answer: null,
  },
  {
    id: 3,
    question: 'Làm thế nào để giảm stress hiệu quả?',
    author: 'Hoàng Minh D',
    date: '2024-06-02',
    category: 'Tâm lý',
    status: 'Đã duyệt',
    isFAQ: true,
    likes: 23,
    answer: {
      content: 'Có nhiều cách giảm stress như thiền định, tập thể dục, nghe nhạc, và duy trì lối sống lành mạnh.',
      doctor: 'BS. Phạm Văn E',
    }
  },
  // 👉 Thêm giả lập 3 câu nữa để test phân trang:
  {
    id: 4,
    question: 'Dinh dưỡng cho trẻ nhỏ nên như thế nào?',
    author: 'Trần Thị H',
    date: '2024-06-01',
    category: 'Dinh dưỡng',
    status: 'Chờ duyệt',
    isFAQ: false,
    likes: 0,
    answer: null,
  },
  {
    id: 5,
    question: 'Tôi có cần tiêm phòng sau khi khỏi bệnh không?',
    author: 'Ngô Văn T',
    date: '2024-05-31',
    category: 'Thuốc',
    status: 'Đã duyệt',
    isFAQ: false,
    likes: 5,
    answer: {
      content: 'Tùy vào loại bệnh, nhưng nhiều trường hợp nên tiêm phòng để bảo vệ lâu dài.',
      doctor: 'BS. Lê Minh A',
    }
  },
  {
    id: 6,
    question: 'Đau đầu kéo dài có cần đi khám không?',
    author: 'Bùi Minh K',
    date: '2024-05-30',
    category: 'Tâm lý',
    status: 'Chờ duyệt',
    isFAQ: false,
    likes: 0,
    answer: null,
  }
];

const QABody = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allQAData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = allQAData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <div className="qa-body">
        {currentData.map((qa) => (
          <div key={qa.id} className="qa-card">
            {/* Header */}
            <div className="qa-card-header">
              <div className="qa-question-title">
                <span className="qa-icon">❓</span>
                <strong>{qa.question}</strong>
                {qa.isFAQ && <span className="qa-badge">FAQ</span>}
              </div>
              <div className="qa-meta">
                <span className={`qa-status ${qa.status === 'Đã duyệt' ? 'approved' : 'pending'}`}>{qa.status}</span>
                {qa.status === 'Đã duyệt' && (
                  <span className="qa-likes">{qa.likes} lượt thích</span>
                )}
              </div>
            </div>

            {/* Subinfo */}
            <div className="qa-subinfo">
              <span>👤 {qa.author}</span>
              <span>📅 {qa.date}</span>
              <span className="qa-category">{qa.category}</span>
            </div>

            {/* Answer or form */}
            {qa.answer ? (
              <div className="qa-answer-box">
                ✅ {qa.answer.content}
                <div className="qa-doctor">Trả lời bởi: {qa.answer.doctor}</div>
              </div>
            ) : (
              <div className="qa-reply-box">
                <label>Trả lời câu hỏi:</label>
                <textarea placeholder="Nhập câu trả lời..." />
                <select>
                  <option>Chọn tư vấn viên trả lời</option>
                  <option>BS. Trần Thị B</option>
                  <option>BS. Phạm Văn E</option>
                </select>
                <div className="qa-actions">
                  <button className="btn success">✔ Duyệt và đăng</button>
                  <button className="btn danger">✖ Từ chối</button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="qa-footer">
              {qa.isFAQ && <button className="btn-outline">Bỏ khỏi FAQ</button>}
              <span className="qa-id">ID: {qa.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PHÂN TRANG */}
      <div className="qa-pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ‹ Trước
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Sau ›
        </button>
      </div>
    </>
  );
};

export default QABody;

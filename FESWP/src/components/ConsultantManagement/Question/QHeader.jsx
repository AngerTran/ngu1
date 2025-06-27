import React from 'react';
import './QHeader.css';
import { MessageSquare, MessageCircleReply, MessageCircle } from 'lucide-react';

const QHeader = () => {
  return (
    <div className="q-header-container">
      <div className="q-header-title">
        <h2>Câu hỏi từ khách hàng</h2>
        <p>Trả lời câu hỏi và hỗ trợ khách hàng</p>
      </div>

      <div className="q-stats">
        <div className="q-card orange">
          <MessageSquare size={20} />
          <div>
            <strong>3</strong>
            <p>Chờ trả lời</p>
          </div>
        </div>
        <div className="q-card green">
          <MessageCircleReply size={20} />
          <div>
            <strong>1</strong>
            <p>Đã trả lời</p>
          </div>
        </div>
        <div className="q-card blue">
          <MessageCircle size={20} />
          <div>
            <strong>4</strong>
            <p>Tổng câu hỏi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QHeader;

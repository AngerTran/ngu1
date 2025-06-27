import { useState, useRef, useEffect } from 'react';
import './CM.css';
import { MessageCircle, Share2, MoreHorizontal, Copy, Trash2, Bookmark } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    status: 'online',
    avatar: 'N',
    preview: 'Xin chào, tôi cần tư vấn về…',
    messages: [
      { from: 'user', text: 'Xin chào, tôi cần tư vấn về dịch vụ của công ty', time: '14:37' },
      { from: 'me', text: 'Chào bạn! Tôi rất sẵn lòng hỗ trợ bạn. Bạn muốn tìm hiểu về dịch vụ nào cụ thể?', time: '14:42' },
      { from: 'user', text: 'Tôi quan tâm đến gói dịch vụ tư vấn doanh nghiệp', time: '14:47' },
    ],
    unread: 2,
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    status: 'offline',
    avatar: 'T',
    preview: 'Cảm ơn bạn đã tư vấn',
    messages: [{ from: 'user', text: 'Cảm ơn bạn đã tư vấn!', time: '14:10' }],
    unread: 0,
  },
  {
    id: 3,
    name: 'Lê Hoàng Cường',
    status: 'calling',
    avatar: 'L',
    preview: 'Tôi đang có cuộc họp…',
    messages: [],
    unread: 1,
  },
];

const CM = () => {
  const [currentUserId, setCurrentUserId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const chatBodyRef = useRef(null);
  const [hoveredMsgIndex, setHoveredMsgIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const [userData, setUserData] = useState(() =>
    users.reduce((acc, user) => {
      acc[user.id] = { messages: user.messages, unread: user.unread };
      return acc;
    }, {})
  );

  const currentUser = users.find((u) => u.id === currentUserId);
  const currentMessages = userData[currentUserId].messages;

  const handleSend = () => {
    if (!messageInput.trim()) return;
    const newMsg = {
      from: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setUserData((prev) => ({
      ...prev,
      [currentUserId]: {
        ...prev[currentUserId],
        messages: [...prev[currentUserId].messages, newMsg],
      },
    }));

    setMessageInput('');
  };

  const handleSelectUser = (id) => {
    setCurrentUserId(id);
    setUserData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        unread: 0,
      },
    }));
  };

  const handleDeleteMessage = (index) => {
    setUserData((prev) => {
      const newMessages = [...prev[currentUserId].messages];
      newMessages.splice(index, 1);
      return {
        ...prev,
        [currentUserId]: {
          ...prev[currentUserId],
          messages: newMessages,
        },
      };
    });
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [userData, currentUserId]);

  return (
    <div className="cm-container">
      <div className="cm-sidebar">
        <h3 className="cm-title">💬 Khách hàng</h3>
        <ul className="cm-user-list">
          {users.map((user) => (
            <li
              key={user.id}
              className={`cm-user-item ${currentUserId === user.id ? 'active' : ''}`}
              onClick={() => handleSelectUser(user.id)}
            >
              <div className="cm-avatar">{user.avatar}</div>
              <div className="cm-user-info">
                <div className="cm-user-name">{user.name}</div>
                <div className={`cm-user-status ${user.status}`}>
                  {user.status === 'online' ? 'Trực tuyến' : user.status === 'offline' ? 'Ngoại tuyến' : 'Đang gọi'}
                </div>
                <div className="cm-user-message">{user.preview}</div>
              </div>
              {userData[user.id].unread > 0 && (
                <span className="cm-unread">{userData[user.id].unread}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="cm-chat">
        <div className="cm-chat-header">
          <div>
            <div className="cm-chat-name">{currentUser.name}</div>
            <div className={`cm-user-status ${currentUser.status}`}>
              {currentUser.status === 'online'
                ? 'Trực tuyến'
                : currentUser.status === 'offline'
                ? 'Ngoại tuyến'
                : 'Đang gọi'}
            </div>
          </div>
        </div>

        <div className="cm-chat-body" ref={chatBodyRef}>
          {currentMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`cm-message ${msg.from === 'me' ? 'right' : 'left'}`}
              onMouseEnter={() => setHoveredMsgIndex(idx)}
              onMouseLeave={() => setHoveredMsgIndex(null)}
            >
              <p>{msg.text}</p>
              <span>{msg.time}</span>
              {hoveredMsgIndex === idx && (
                <div className="cm-msg-actions">
                  <button title="Trả lời"><MessageCircle size={16} /></button>
                  <button title="Chia sẻ"><Share2 size={16} /></button>
                  <div className="cm-msg-menu-wrapper">
                    <button onClick={() => setMenuIndex(idx)} title="Menu"><MoreHorizontal size={16} /></button>
                    {menuIndex === idx && (
                      <div className="cm-msg-menu">
                        <button onClick={() => handleCopyMessage(msg.text)}><Copy size={14} /> Sao chép</button>
                        <button><Bookmark size={14} /> Ghim</button>
                        <button onClick={() => handleDeleteMessage(idx)}><Trash2 size={14} /> Xóa</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="cm-chat-input">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} disabled={!messageInput.trim()}>📩</button>
        </div>
      </div>
    </div>
  );
};

export default CM;

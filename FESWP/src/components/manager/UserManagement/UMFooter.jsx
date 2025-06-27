import React, { useState, useEffect } from 'react';
import './UMFooter.css';
import axios from 'axios';

const PAGE_SIZE = 3;

function UMFooter() {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:8080/api/auth/manager/customers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setUsersData(res.data || []);
      })
      .catch(err => {
        console.error('❌ Lỗi khi tải danh sách người dùng:', err);
      });
  }, []);

  const totalPages = Math.ceil(usersData.length / PAGE_SIZE);
  const currentUsers = usersData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleView = (user) => {
    alert(`🔍 Xem chi tiết người dùng:\n\nTên: ${user.name}\nEmail: ${user.email}\nSĐT: ${user.phone}`);
  };

  const handleEdit = (user) => {
    alert(`✏️ Bạn đang sửa thông tin của: ${user.name}`);
  };

  const handleDelete = async (user) => {
  const token = localStorage.getItem("token"); // 🔥 Thêm dòng này
  if (!token) {
    alert("⚠️ Chưa đăng nhập hoặc token không tồn tại!");
    return;
  }

  if (!window.confirm(`❗Bạn có chắc muốn xóa "${user.name}"?`)) return;

  try {
    const response = await fetch(`http://localhost:8080/api/auth/manager/customers/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi xóa: ${response.status}`);
    }

    alert(`🗑️ Đã xóa người dùng: ${user.name}`);
    setUsersData(prev => prev.filter(u => u.id !== user.id));

  } catch (err) {
    console.error(err);
    alert('🚫 Không thể xóa người dùng. Vui lòng thử lại sau.');
  }
};

  return (
    <div className="user-page">
      <div className="title">Danh sách người dùng ({usersData.length})</div>
      <div className="user-table">
        <div className="table-head">
          <div>Thông tin người dùng</div>
          <div>Liên hệ</div>
          <div>Trạng thái</div>
          <div>Thao tác</div>
        </div>
        {currentUsers.map(user => (
          <div className="table-row" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>ID: {user.id}</span>
              <span>
                Đăng ký: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
              </span>
            </div>
            <div>
              <span>{user.email}</span>
              <span>{user.phone}</span>
            </div>
            <div>
              <span className={`status ${user.verifiedStatus === 'Đã xác thực' ? 'active' : 'inactive'}`}>
                {user.verifiedStatus}
              </span>
            </div>
<div className="action-buttons">
              <button className="view-btn" onClick={() => handleView(user)}>Xem</button>
              <button className="edit-btn" onClick={() => handleEdit(user)}>Sửa</button>
              <button className="delete-btn" onClick={() => handleDelete(user)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt; Trước
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Sau &gt;
        </button>
      </div>
    </div>
  );
}

export default UMFooter;
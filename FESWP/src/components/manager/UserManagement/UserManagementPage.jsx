import React, { useState, useEffect } from 'react';
import './UserManagementPage.css';
import axios from 'axios';

const PAGE_SIZE = 3;

const UserManagementPage = () => {
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
    const token = localStorage.getItem("token");
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
    <div className="um-container">
      {/* --------- HEADER --------- */}
      <div className="um-header-row">
        <div className="um-header-text">
          <h1 className="um-title">Quản lý người dùng</h1>
          <p className="um-subtitle">Quản lý tài khoản khách hàng</p>
        </div>
        <div className="um-top-right-buttons">
          <button className="um-user-add-btn">Thêm người dùng mới</button>
        </div>
      </div>

      {/* --------- TABLE --------- */}
      <div className="um-user-page">
        <div className="um-user-title">Danh sách người dùng ({usersData.length})</div>
        <div className="um-user-table">
          <div className="um-table-head">
            <div>Thông tin người dùng</div>
            <div>Liên hệ</div>
            <div>Trạng thái</div>
            <div>Thao tác</div>
          </div>
          {currentUsers.map(user => (
            <div className="um-table-row" key={user.id}>
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
                <span className={`um-status ${user.verifiedStatus === 'Đã xác thực' ? 'active' : 'inactive'}`}>
                  {user.verifiedStatus}
                </span>
              </div>
              <div className="um-action-buttons">
                <button className="um-view-btn" onClick={() => handleView(user)}>Xem</button>
                <button className="um-edit-btn" onClick={() => handleEdit(user)}>Sửa</button>
                <button className="um-delete-btn" onClick={() => handleDelete(user)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>

        <div className="um-pagination">
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
    </div>
  );
};

export default UserManagementPage;

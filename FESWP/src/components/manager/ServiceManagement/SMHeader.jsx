import './SMHeader.css';

const SMHeader = () => {
  return (
    <div className="sm-header">
      <div className="sm-header-top">
        <h1 className="sm-title">Quản lý dịch vụ xét nghiệm</h1>
        <p className="sm-subtitle">
          Quản lý danh sách dịch vụ, giá cả và thời gian thực hiện
        </p>
        <button className="add-service-btn">Thêm dịch vụ mới</button>
      </div>
    </div>
  );
};

export default SMHeader;

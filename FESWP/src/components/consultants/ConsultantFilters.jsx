import React from 'react';
import { SlidersHorizontal, Grid, List, User } from 'lucide-react';

const ConsultantFilters = ({
  viewMode,
  setViewMode,
  total,
  filters,
  setFilters
}) => {
  return (
    <div className="filter-container">
      <div className="filter-header">
        <div className="title"><SlidersHorizontal size={18} /> Bộ lọc</div>
        <div className="view-toggle">
          <span>Hiển thị:</span>
          <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={16} /></button>
          <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={16} /></button>
        </div>
      </div>
      <div className="filters">
        <div className="filter-group">
          <label><User size={14} /> Chuyên khoa</label>
          <select
            value={filters.specialty}
            onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
          >
            <option>Tất cả</option>
            <option>Sản phụ khoa</option>
            <option>Nhiễm khuẩn & HIV</option>
            <option>Nhi khoa</option>
            <option>Nam học</option>
            <option>Da liễu</option>
            <option>Tim mạch</option>
            <option>Tâm lý</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Giới tính</label>
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option>Tất cả</option>
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>
      </div>
      <div className="results-count">Tìm thấy {total} bác sĩ</div>
    </div>
  );
};

export default ConsultantFilters;

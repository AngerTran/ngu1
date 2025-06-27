import { SlidersHorizontal, Grid, List, Stethoscope } from 'lucide-react';

const ServiceFilters = ({
  viewMode,
  setViewMode,
  total,
  category,
  setCategory,
  price,
  setPrice,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="filter-container">
      <div className="filter-header">
        <div className="title"><SlidersHorizontal size={18} /> Bộ lọc & Sắp xếp</div>
        <div className="view-toggle">
          <span>Hiển thị:</span>
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={16} />
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label><Stethoscope size={14} /> Danh mục</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Tất cả</option>
            <option>Tư vấn</option>
            <option>Xét nghiệm</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Mức giá</label>
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option>Tất cả mức giá</option>
            <option value="Dưới 500k">Dưới 500k</option>
            <option value="500k - 1 triệu">500k - 1 triệu</option>
            <option value="Trên 1 triệu">Trên 1 triệu</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sắp xếp theo</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Phổ biến nhất</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
          </select>
        </div>
      </div>

      <div className="results-count">Tìm thấy {total} dịch vụ</div>
    </div>
  );
};

export default ServiceFilters;

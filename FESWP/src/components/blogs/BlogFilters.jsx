import { Filter, Grid, List, User } from 'lucide-react';

const BlogFilters = ({
  category,
  setCategory,
  author,
  setAuthor,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  total,
}) => {
  return (
    <div className="blog-filter-container">
      <div className="filter-header">
        <div className="title">
          <Filter size={18} /> Bộ lọc & Sắp xếp
        </div>
        <div className="view-toggle">
          <button
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'active' : ''}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'active' : ''}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>
            <User size={14} style={{ marginRight: 6 }} />
            Chuyên mục
          </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Tất cả">Tất cả</option>
            <option value="Sức khỏe">Sức khỏe</option>
            <option value="Tình dục">Tình dục</option>
            <option value="Sinh sản">Sinh sản</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sắp xếp theo</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="popular">Phổ biến</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Tác giả</label>
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="Tất cả">Tất cả tác giả</option>
            <option value="Bác sĩ Lan">Bác sĩ Lan</option>
            <option value="Chuyên gia Minh">Chuyên gia Minh</option>
          </select>
        </div>
      </div>

      <p className="results-count">
        Tìm thấy <strong>{total}</strong> bài viết
      </p>
    </div>
  );
};

export default BlogFilters;

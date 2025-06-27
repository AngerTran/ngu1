import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import BlogFilters from './BlogFilters';
import Pagination from './Pagination';
import './BlogContent.css';

const BlogContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [author, setAuthor] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('newest');
  const perPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/api/blogs')
      .then(res => {
        const published = res.data.filter(blog => blog.status === "Published");
        setBlogs(published);
      })
      .catch(err => console.error("Lỗi khi tải blog:", err));
  }, []);

  const filtered = blogs
    .filter(blog => {
      const keyword = search.toLowerCase();
      const matchesKeyword =
        blog.title.toLowerCase().includes(keyword) ||
        blog.content.toLowerCase().includes(keyword) ||
        blog.authorName?.toLowerCase().includes(keyword);

      const matchesCategory = category === 'Tất cả' || blog.topicName === category;
      const matchesAuthor = author === 'Tất cả' || blog.authorName === author;

      return matchesKeyword && matchesCategory && matchesAuthor;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="blog-section">
      {/* Bộ lọc & chuyển đổi chế độ xem */}
      <BlogFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        category={category}
        setCategory={setCategory}
        author={author}
        setAuthor={setAuthor}
        sortBy={sortBy}
        setSortBy={setSortBy}
        total={filtered.length}
      />

      {/* Danh sách bài viết */}
      <div className={viewMode === 'grid' ? 'blog-grid' : 'blog-list'}>
        {paginated.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={{
              ...blog,
              topic: { name: blog.topicName },
              createdBy: { fullName: blog.authorName }
            }}
            role="public"
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Phân trang */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default BlogContent;

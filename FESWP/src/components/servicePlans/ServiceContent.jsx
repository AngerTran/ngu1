import React, { useEffect, useState } from 'react';
import ServiceFilters from './ServiceFilters';
import ServiceCard from './ServiceCard';
import Pagination from './Pagination';
import './ServiceContent.css';
import axios from 'axios';

const ServiceContent = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [price, setPrice] = useState('Tất cả mức giá');
  const [sortBy, setSortBy] = useState('Phổ biến nhất');

  const perPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/api/public/services')
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Lỗi khi tải danh sách dịch vụ:", err));
  }, []);

  const filtered = services
    .filter(service => {
      const matchesSearch =
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'Tất cả' ||
        (category === 'Tư vấn' && service.title.includes('Tư vấn')) ||
        (category === 'Xét nghiệm' && service.title.includes('Xét nghiệm'));

      const priceValue = service.price || 0;
      const matchesPrice =
        price === 'Tất cả mức giá' ||
        (price === 'Dưới 500k' && priceValue < 500000) ||
        (price === '500k - 1 triệu' && priceValue >= 500000 && priceValue <= 1000000) ||
        (price === 'Trên 1 triệu' && priceValue > 1000000);

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'Giá tăng dần') return a.price - b.price;
      if (sortBy === 'Giá giảm dần') return b.price - a.price;
      return b.reviews - a.reviews;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="service-section">
      <ServiceFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        total={filtered.length}
        category={category}
        setCategory={setCategory}
        price={price}
        setPrice={setPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
      />

      <div className={viewMode === 'grid' ? 'service-grid' : 'service-list'}>
        {paginated.map((service, idx) => (
          <ServiceCard key={service.id} data={service} viewMode={viewMode} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default ServiceContent;

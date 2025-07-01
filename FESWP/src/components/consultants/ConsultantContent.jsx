import React, { useEffect, useState } from 'react';
import ConsultantFilters from './ConsultantFilters';
import ConsultantCard from './ConsultantCard';
import Pagination from './Pagination';
import './ConsultantContent.css';
import axios from 'axios';

const ConsultantContent = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    specialty: 'Tất cả',
    gender: 'Tất cả',
  });

  const [consultants, setConsultants] = useState([]);
  const perPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          specialty: filters.specialty !== 'Tất cả' ? filters.specialty : undefined,
          gender: filters.gender !== 'Tất cả' ? filters.gender : undefined,
        };

        const response = await axios.get('http://localhost:8080/api/public/consultants', { params });
        const data = response.data;

        setConsultants(data);
        setPage(1);
      } catch (err) {
        console.error('❌ Lỗi lấy danh sách tư vấn viên:', err);
      }
    };

    fetchData();
  }, [filters]);

  const totalPages = Math.ceil(consultants.length / perPage);
  const paginated = consultants.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="consultant-section">
      <ConsultantFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        total={consultants.length}
        filters={filters}
        setFilters={setFilters}
      />

      <div className={viewMode === 'grid' ? 'consultant-grid' : 'consultant-list'}>
        {paginated.map((consultant, idx) => (
          <ConsultantCard key={idx} consultant={consultant} viewMode={viewMode} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
};

export default ConsultantContent;

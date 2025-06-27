const Pagination = ({ page: currentPage, totalPages, setPage: setCurrentPage }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button className="page prev" onClick={() => setCurrentPage(currentPage - 1)}>
          ← Previous
        </button>
      )}

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`page ${currentPage === i + 1 ? 'active' : ''}`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      {currentPage < totalPages && (
        <button className="page next" onClick={() => setCurrentPage(currentPage + 1)}>
          Next →
        </button>
      )}
    </div>
  );
};

export default Pagination;

import './Pagination.css';

export default function Pagination({ page, totalPages, onPageChange, totalItems, limit }) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);

  const getPages = () => {
    const pages = [];
    const delta = 2;
    const left = page - delta;
    const right = page + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      }
    }

    const withEllipsis = [];
    let prev = null;
    for (const p of pages) {
      if (prev && p - prev > 1) withEllipsis.push('...');
      withEllipsis.push(p);
      prev = p;
    }
    return withEllipsis;
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <span className="page-info">
        Showing <strong>{start}–{end}</strong> of <strong>{totalItems}</strong> products
      </span>

      <div className="page-controls">
        <button
          className="page-btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {getPages().map((p, i) =>
          p === '...'
            ? <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
            : (
              <button
                key={p}
                className={`page-btn page-num ${p === page ? 'active' : ''}`}
                onClick={() => onPageChange(p)}
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            )
        )}

        <button
          className="page-btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

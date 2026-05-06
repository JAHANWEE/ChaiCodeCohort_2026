import './Pagination.css'

function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total-4, total-3, total-2, total-1, total]
  return [1, '...', current-1, current, current+1, '...', total]
}

export default function Pagination({ page, totalPages, onChange }) {
  const pages = getPages(page, totalPages)

  return (
    <nav className="pg" aria-label="Pagination">
      <button
        className="pg__arrow"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        ← Prev
      </button>

      <div className="pg__nums">
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`e${i}`} className="pg__ellipsis">…</span>
          ) : (
            <button
              key={p}
              className={`pg__num${p === page ? ' active' : ''}`}
              onClick={() => onChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        className="pg__arrow"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  )
}

import QuoteCard from './QuoteCard'
import SkeletonCard from './SkeletonCard'
import './QuoteGrid.css'

function QuoteGrid({ quotes, loading, error, liked, copied, onLike, onCopy, onRetry }) {
  if (error) {
    return (
      <div className="qg__error">
        <span className="qg__error-emoji">😕</span>
        <p>{error}</p>
        <button onClick={onRetry}>Try Again</button>
      </div>
    )
  }

  if (!loading && quotes.length === 0) {
    return (
      <div className="qg__empty">
        <span className="qg__empty-emoji">🔍</span>
        <p>No quotes match your search.</p>
      </div>
    )
  }

  return (
    <div className="qg">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
        : quotes.map((q, i) => (
            <QuoteCard
              key={q.id}
              quote={q}
              index={i}
              liked={liked.includes(q.id)}
              copied={copied === q.id}
              onLike={onLike}
              onCopy={onCopy}
            />
          ))
      }
    </div>
  )
}

export default QuoteGrid

import './QuoteCard.css'

// 8 accent colors cycling by quote id
const ACCENTS = ['--c1','--c2','--c3','--c4','--c5','--c6','--c7','--c8']

function QuoteCard({ quote, liked, copied, onLike, onCopy, index }) {
  const accent = `var(${ACCENTS[index % ACCENTS.length]})`

  return (
    <article
      className="qc"
      style={{ '--accent': accent }}
      aria-label={`Quote by ${quote.author}`}
    >
      {/* top accent bar */}
      <div className="qc__bar" aria-hidden="true" />

      {/* big decorative quote mark */}
      <span className="qc__deco" aria-hidden="true">"</span>

      {/* quote text */}
      <blockquote className="qc__text">{quote.content}</blockquote>

      {/* author */}
      <footer className="qc__footer">
        <div className="qc__author-wrap">
          <div className="qc__avatar" aria-hidden="true">
            {quote.author.charAt(0)}
          </div>
          <div>
            <p className="qc__author">{quote.author}</p>
            {quote.tags?.length > 0 && (
              <p className="qc__tag-inline">{quote.tags[0]}</p>
            )}
          </div>
        </div>

        {/* actions */}
        <div className="qc__actions">
          <button
            className={`qc__btn${liked ? ' qc__btn--liked' : ''}`}
            onClick={() => onLike(quote.id)}
            aria-label={liked ? 'Unlike' : 'Like'}
            title={liked ? 'Unlike' : 'Like'}
          >
            {liked ? '♥' : '♡'}
          </button>
          <button
            className={`qc__btn${copied ? ' qc__btn--copied' : ''}`}
            onClick={() => onCopy(quote)}
            aria-label="Copy quote"
            title="Copy to clipboard"
          >
            {copied ? '✓' : '⎘'}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.content}" — ${quote.author}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="qc__btn qc__btn--twitter"
            aria-label="Share on X (Twitter)"
            title="Share on X"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </footer>
    </article>
  )
}

export default QuoteCard

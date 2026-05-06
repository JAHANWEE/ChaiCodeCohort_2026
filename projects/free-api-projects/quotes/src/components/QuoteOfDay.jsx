import './QuoteOfDay.css'

function QuoteOfDay({ quote, liked, onLike, onCopy, copied, onNewQuote, newQuoteLoading }) {
  return (
    <section className="qod" aria-label="Quote of the day">
      <div className="qod__header">
        <p className="qod__label">✦ Quote of the Day</p>
        <button
          className={`qod__refresh${newQuoteLoading ? ' qod__refresh--spinning' : ''}`}
          onClick={onNewQuote}
          disabled={newQuoteLoading}
          aria-label="Get a new quote of the day"
          title="New Quote"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
            <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          {newQuoteLoading ? 'Loading…' : 'New Quote'}
        </button>
      </div>

      <blockquote className="qod__text">
        <span className="qod__open">"</span>
        {quote.content}
        <span className="qod__close">"</span>
      </blockquote>

      <p className="qod__author">— {quote.author}</p>

      {quote.tags?.length > 0 && (
        <div className="qod__tags">
          {quote.tags.map(tag => (
            <span key={tag} className="qod__tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="qod__actions">
        <button
          className={`qod__btn qod__btn--like${liked ? ' active' : ''}`}
          onClick={onLike}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          {liked ? '♥' : '♡'} {liked ? 'Liked' : 'Like'}
        </button>
        <button
          className={`qod__btn qod__btn--copy${copied ? ' active' : ''}`}
          onClick={onCopy}
          aria-label="Copy quote"
        >
          {copied ? '✓ Copied!' : '⎘ Copy'}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.content}" — ${quote.author}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="qod__btn qod__btn--share"
          aria-label="Share on X"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share
        </a>
      </div>
    </section>
  )
}

export default QuoteOfDay

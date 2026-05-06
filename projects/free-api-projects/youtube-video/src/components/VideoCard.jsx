import { formatDistanceToNow } from '../utils/dateUtils'
import { formatCount } from '../utils/formatUtils'
import { parseDuration } from '../utils/durationUtils'
import './VideoCard.css'

const AVATAR_COLORS = [
  '#e50914','#e87c25','#2ecc71','#3498db',
  '#9b59b6','#1abc9c','#e74c3c','#f39c12'
]

function avatarColor(name) {
  const c = name?.charCodeAt(0) ?? 0
  return AVATAR_COLORS[c % AVATAR_COLORS.length]
}

function VideoCard({ video }) {
  const { snippet, statistics, contentDetails } = video
  const thumbnail =
    snippet?.thumbnails?.maxres?.url ||
    snippet?.thumbnails?.standard?.url ||
    snippet?.thumbnails?.high?.url ||
    snippet?.thumbnails?.medium?.url
  const title = snippet?.title || 'Untitled'
  const channelTitle = snippet?.channelTitle || 'Unknown'
  const publishedAt = snippet?.publishedAt
  const viewCount = statistics?.viewCount
  const duration = contentDetails?.duration
  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`

  return (
    <div className="vc">
      {/* ── Thumbnail (always visible) ── */}
      <div className="vc__thumb-wrap">
        <img src={thumbnail} alt={title} className="vc__thumb" loading="lazy" />
        {duration && (
          <span className="vc__duration">{parseDuration(duration)}</span>
        )}
      </div>

      {/* ── Info row (YouTube-style, always visible) ── */}
      <div className="vc__info">
        <div
          className="vc__avatar"
          style={{ background: avatarColor(channelTitle) }}
          aria-hidden="true"
        >
          {channelTitle.charAt(0).toUpperCase()}
        </div>
        <div className="vc__meta">
          <h3 className="vc__title">{title}</h3>
          <p className="vc__channel">{channelTitle}</p>
          <p className="vc__stats">
            {viewCount ? `${formatCount(viewCount)} views` : ''}
            {viewCount && publishedAt ? ' · ' : ''}
            {publishedAt ? formatDistanceToNow(publishedAt) : ''}
          </p>
        </div>
      </div>

      {/* ── Netflix hover panel (expands over everything) ── */}
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="vc__hover-panel"
        aria-label={`Play ${title}`}
        tabIndex={-1}
      >
        {/* enlarged thumbnail */}
        <div className="vc__hp-thumb">
          <img src={thumbnail} alt="" className="vc__hp-img" />
          <div className="vc__hp-vignette" />
        </div>

        {/* action row */}
        <div className="vc__hp-actions">
          <button className="vc__hp-btn vc__hp-btn--play" aria-label="Play">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <button className="vc__hp-btn" aria-label="Add to list">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button className="vc__hp-btn" aria-label="Like">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
            </svg>
          </button>
          <button className="vc__hp-btn vc__hp-btn--more" aria-label="More info">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
        </div>

        {/* meta */}
        <div className="vc__hp-meta">
          <p className="vc__hp-title">{title}</p>
          <div className="vc__hp-row">
            {viewCount && (
              <span className="vc__hp-views">{formatCount(viewCount)} views</span>
            )}
            {duration && (
              <span className="vc__hp-dur">{parseDuration(duration)}</span>
            )}
          </div>
          <p className="vc__hp-channel">{channelTitle}</p>
        </div>
      </a>
    </div>
  )
}

export default VideoCard

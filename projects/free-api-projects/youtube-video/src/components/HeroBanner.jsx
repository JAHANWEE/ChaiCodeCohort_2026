import { formatCount } from '../utils/formatUtils'
import { parseDuration } from '../utils/durationUtils'
import './HeroBanner.css'

function HeroBanner({ video }) {
  if (!video) return null

  const { snippet, statistics, contentDetails } = video
  const backdrop =
    snippet?.thumbnails?.maxres?.url ||
    snippet?.thumbnails?.standard?.url ||
    snippet?.thumbnails?.high?.url
  const title = snippet?.title || 'Untitled'
  const channelTitle = snippet?.channelTitle || ''
  const description = snippet?.description?.split('\n')[0]?.slice(0, 160) || ''
  const viewCount = statistics?.viewCount
  const duration = contentDetails?.duration
  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`

  return (
    <div className="hero">
      {/* backdrop image */}
      <div className="hero__backdrop">
        <img src={backdrop} alt="" className="hero__img" />
        {/* Netflix-style vignette */}
        <div className="hero__vignette-bottom" />
        <div className="hero__vignette-left" />
      </div>

      {/* content */}
      <div className="hero__content">
        <p className="hero__label">
          <span className="hero__label-n">N</span> FEATURED
        </p>
        <h1 className="hero__title">{title}</h1>

        <div className="hero__meta">
          {viewCount && (
            <span className="hero__meta-item hero__meta-views">
              {formatCount(viewCount)} views
            </span>
          )}
          {duration && (
            <span className="hero__meta-item">{parseDuration(duration)}</span>
          )}
          {channelTitle && (
            <span className="hero__meta-item hero__meta-channel">{channelTitle}</span>
          )}
        </div>

        {description && (
          <p className="hero__desc">{description}</p>
        )}

        <div className="hero__actions">
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="hero__btn hero__btn--play">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </a>
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="hero__btn hero__btn--info">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            More Info
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner

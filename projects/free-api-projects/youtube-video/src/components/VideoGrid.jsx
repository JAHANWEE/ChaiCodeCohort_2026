import { useRef, useState, useEffect, useCallback } from 'react'
import VideoCard from './VideoCard'
import SkeletonCard from './SkeletonCard'
import './VideoGrid.css'

const ROW_LABELS = [
  'Trending Now',
  'Popular on ViewTube',
  'Top Picks for You',
]

const TILES_PER_PAGE = 6

function chunk(arr, size) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = []
  if (current <= 4) pages.push(1, 2, 3, 4, 5, '...', total)
  else if (current >= total - 3) pages.push(1, '...', total-4, total-3, total-2, total-1, total)
  else pages.push(1, '...', current-1, current, current+1, '...', total)
  return pages
}

// ── Netflix-style slider row ──
function SliderRow({ label, videos }) {
  const trackRef   = useRef(null)
  const [sliderPage, setSliderPage]   = useState(0)   // which "window" we're on
  const [totalSlides, setTotalSlides] = useState(1)
  const [atStart, setAtStart]         = useState(true)
  const [atEnd, setAtEnd]             = useState(false)

  // total pages = ceil(videos / TILES_PER_PAGE)
  useEffect(() => {
    setTotalSlides(Math.ceil(videos.length / TILES_PER_PAGE))
  }, [videos.length])

  // sync scroll position → sliderPage + edge flags
  const syncState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const tileW = el.scrollWidth / videos.length
    const page  = Math.round(el.scrollLeft / (tileW * TILES_PER_PAGE))
    setSliderPage(page)
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [videos.length])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', syncState, { passive: true })
    syncState()
    return () => el.removeEventListener('scroll', syncState)
  }, [syncState])

  const goTo = (dir) => {
    const el = trackRef.current
    if (!el) return
    // scroll by exactly one full viewport width (= 6 tiles)
    el.scrollBy({ left: dir === 'next' ? el.clientWidth : -el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="vg__row">
      {/* Row header: label + progress dots */}
      <div className="vg__row-header">
        <h2 className="vg__row-label">{label}</h2>
        {totalSlides > 1 && (
          <div className="vg__dots" aria-hidden="true">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <span key={i} className={`vg__dot${i === sliderPage ? ' vg__dot--active' : ''}`} />
            ))}
          </div>
        )}
      </div>

      {/* Slider wrapper — clips the track, hosts the edge arrows */}
      <div className="vg__slider">

        {/* LEFT arrow — full-height edge panel */}
        <button
          className={`vg__edge vg__edge--left${atStart ? ' vg__edge--hidden' : ''}`}
          onClick={() => goTo('prev')}
          aria-label="Previous"
          tabIndex={atStart ? -1 : 0}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        {/* Scrollable track */}
        <div className="vg__track-clip">
          <div className="vg__track" ref={trackRef}>
            {videos.map((video) => (
              <div className="vg__tile" key={video.items.id}>
                <VideoCard video={video.items} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT arrow */}
        <button
          className={`vg__edge vg__edge--right${atEnd ? ' vg__edge--hidden' : ''}`}
          onClick={() => goTo('next')}
          aria-label="Next"
          tabIndex={atEnd ? -1 : 0}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ── Main grid ──
function VideoGrid({ videos, loading, error, page, totalPages, onPageChange }) {
  if (error) {
    return (
      <div className="vg__error">
        <div className="vg__error-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <p>Something went wrong loading videos.</p>
        <button onClick={() => onPageChange(page)}>Try Again</button>
      </div>
    )
  }

  const rows     = loading ? [] : chunk(videos, TILES_PER_PAGE)
  const pageNums = getPageNumbers(page, totalPages)

  return (
    <div className="vg">
      {loading ? (
        <div className="vg__row">
          <div className="vg__row-header">
            <h2 className="vg__row-label">Trending Now</h2>
          </div>
          <div className="vg__slider">
            <div className="vg__track-clip">
              <div className="vg__track">
                {Array.from({ length: TILES_PER_PAGE }).map((_, i) => (
                  <div className="vg__tile" key={i}><SkeletonCard /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        rows.map((rowVideos, rowIdx) => (
          <SliderRow
            key={rowIdx}
            label={ROW_LABELS[rowIdx % ROW_LABELS.length]}
            videos={rowVideos}
          />
        ))
      )}

      {/* Pagination */}
      {!loading && (
        <div className="vg__pagination">
          <button className="vg__pg-btn" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
            ‹ Prev
          </button>
          <div className="vg__pg-nums">
            {pageNums.map((p, i) =>
              p === '...' ? (
                <span key={`e-${i}`} className="vg__pg-ellipsis">…</span>
              ) : (
                <button
                  key={p}
                  className={`vg__pg-num${p === page ? ' active' : ''}`}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </button>
              )
            )}
          </div>
          <button className="vg__pg-btn" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
            Next ›
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoGrid

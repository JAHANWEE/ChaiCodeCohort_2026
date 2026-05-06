import './SkeletonCard.css'

export default function SkeletonCard({ mode = 'grid' }) {
  if (mode === 'list') {
    return (
      <div className="sk sk--list" aria-hidden="true">
        <div className="sk__circle sk__circle--sm" />
        <div className="sk__lines sk__lines--row">
          <div className="sk__line sk__line--med" />
          <div className="sk__line sk__line--short" />
        </div>
        <div className="sk__line sk__line--long sk__hide-sm" />
        <div className="sk__line sk__line--med sk__hide-sm" />
      </div>
    )
  }

  return (
    <div className="sk sk--grid" aria-hidden="true">
      <div className="sk__cover" />
      <div className="sk__avatar-area">
        <div className="sk__circle" />
      </div>
      <div className="sk__body">
        <div className="sk__line sk__line--med" />
        <div className="sk__line sk__line--short" />
        <div className="sk__chips">
          <div className="sk__chip" />
          <div className="sk__chip" />
        </div>
        <div className="sk__divider" />
        <div className="sk__line sk__line--full" />
        <div className="sk__line sk__line--full" />
        <div className="sk__line sk__line--med" />
      </div>
    </div>
  )
}

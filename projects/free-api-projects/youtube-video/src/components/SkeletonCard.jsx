import './SkeletonCard.css'

function SkeletonCard() {
  return (
    <div className="sk" aria-hidden="true">
      <div className="sk__thumb" />
      <div className="sk__info">
        <div className="sk__avatar" />
        <div className="sk__lines">
          <div className="sk__line sk__line--full" />
          <div className="sk__line sk__line--med" />
          <div className="sk__line sk__line--short" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard

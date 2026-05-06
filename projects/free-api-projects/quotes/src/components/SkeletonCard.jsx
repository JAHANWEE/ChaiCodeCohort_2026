import './SkeletonCard.css'

function SkeletonCard() {
  return (
    <div className="sk" aria-hidden="true">
      <div className="sk__bar" />
      <div className="sk__line sk__line--long" />
      <div className="sk__line sk__line--full" />
      <div className="sk__line sk__line--med" />
      <div className="sk__line sk__line--short" />
      <div className="sk__footer">
        <div className="sk__avatar" />
        <div className="sk__author" />
      </div>
    </div>
  )
}

export default SkeletonCard

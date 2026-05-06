import './SkeletonCard.css'

export default function SkeletonCard() {
  return (
    <div className="sk" aria-hidden="true">
      <div className="sk__thumb" />
      <div className="sk__body">
        <div className="sk__line sk__line--short" />
        <div className="sk__line sk__line--full" />
        <div className="sk__line sk__line--med" />
        <div className="sk__line sk__line--long" />
        <div className="sk__line sk__line--med" />
        <div className="sk__footer">
          <div className="sk__line sk__line--short" />
          <div className="sk__circle" />
        </div>
      </div>
    </div>
  )
}

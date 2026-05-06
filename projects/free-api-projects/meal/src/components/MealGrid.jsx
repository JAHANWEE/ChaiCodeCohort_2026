import MealCard from './MealCard'
import SkeletonCard from './SkeletonCard'
import './MealGrid.css'

export default function MealGrid({ meals, loading, error, onSelect, onRetry }) {
  if (error) {
    return (
      <div className="mg__state">
        <span className="mg__state-icon">😵</span>
        <p>{error}</p>
        <button onClick={onRetry}>Try Again</button>
      </div>
    )
  }

  if (!loading && meals.length === 0) {
    return (
      <div className="mg__state">
        <span className="mg__state-icon">🍽️</span>
        <p>No meals match your search.</p>
      </div>
    )
  }

  return (
    <div className="mg">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
        : meals.map((m, i) => (
            <MealCard
              key={m.idMeal}
              meal={m}
              onSelect={onSelect}
              style={{ animationDelay: `${i * 0.04}s` }}
            />
          ))
      }
    </div>
  )
}

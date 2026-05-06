import UserCard from './UserCard'
import UserRow from './UserRow'
import SkeletonCard from './SkeletonCard'
import './UserGrid.css'

export default function UserGrid({ users, loading, error, viewMode, onSelect, onRetry }) {
  if (error) {
    return (
      <div className="ug__error">
        <div className="ug__error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={onRetry}>Try Again</button>
      </div>
    )
  }

  if (!loading && users.length === 0) {
    return (
      <div className="ug__empty">
        <div className="ug__empty-icon">🔍</div>
        <p>No users match your search.</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="ug ug--list">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} mode="list" />)
          : users.map((u, i) => (
              <UserRow
                key={u.id}
                user={u}
                onSelect={onSelect}
                style={{ animationDelay: `${i * 0.04}s` }}
              />
            ))
        }
      </div>
    )
  }

  return (
    <div className="ug ug--grid">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} mode="grid" />)
        : users.map((u, i) => (
            <UserCard
              key={u.id}
              user={u}
              onSelect={onSelect}
              style={{ animationDelay: `${i * 0.04}s` }}
            />
          ))
      }
    </div>
  )
}

import './StatsBar.css'

export default function StatsBar({ total, showing, page, totalPages, loading }) {
  if (loading) return <div className="stats stats--loading"><span className="stats__shimmer" /></div>

  return (
    <div className="stats">
      <span className="stats__text">
        Showing <strong>{showing}</strong> users
        {showing !== total && <> of <strong>{total}</strong> total</>}
      </span>
      <span className="stats__sep" aria-hidden="true">·</span>
      <span className="stats__text">Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
    </div>
  )
}

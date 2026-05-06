import './ProfileView.css'

export default function ProfileView({ user, onLogout, loading }) {
  const initial = (user.username?.[0] ?? '?').toUpperCase()

  return (
    <div className="profile">
      <div className="profile-avatar" aria-hidden="true">{initial}</div>
      <p className="profile-name">{user.username}</p>
      <p className="profile-email">{user.email}</p>
      <span className="profile-role">{user.role ?? 'USER'}</span>

      <button className="btn-logout" onClick={onLogout} disabled={loading}>
        {loading
          ? <span className="spinner-muted" aria-label="Signing out" />
          : 'Sign out'}
      </button>
    </div>
  )
}

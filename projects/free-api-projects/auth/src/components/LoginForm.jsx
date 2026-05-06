import InputField from './InputField'
import './AuthForm.css'

export default function LoginForm({ onSubmit, loading, onSwitch }) {
  function handleSubmit(e) {
    e.preventDefault()
    const { username, password } = Object.fromEntries(new FormData(e.target))
    onSubmit({ username, password })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="form-title">Sign in</p>
      <p className="form-sub">Enter your credentials to continue</p>

      <div className="form-fields">
        <InputField label="Username" name="username" autoComplete="username" required placeholder="username" />
        <InputField label="Password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••" />
      </div>

      <button className="btn-submit" type="submit" disabled={loading}>
        {loading
          ? <span className="btn-loading"><span className="spinner" />Signing in…</span>
          : 'Sign in'}
      </button>

      <p className="form-switch">
        No account?{' '}
        <button type="button" className="switch-link" onClick={onSwitch}>Register</button>
      </p>
    </form>
  )
}

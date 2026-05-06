import InputField from './InputField'
import './AuthForm.css'

export default function RegisterForm({ onSubmit, loading, onSwitch }) {
  function handleSubmit(e) {
    e.preventDefault()
    const { username, email, password } = Object.fromEntries(new FormData(e.target))
    onSubmit({ username, email, password })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="form-title">Create account</p>
      <p className="form-sub">Fill in the details below to get started</p>

      <div className="form-fields">
        <InputField label="Username" name="username" autoComplete="username" required placeholder="username" />
        <InputField label="Email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        <InputField label="Password" name="password" type="password" autoComplete="new-password" required placeholder="••••••••" />
      </div>

      <button className="btn-submit" type="submit" disabled={loading}>
        {loading
          ? <span className="btn-loading"><span className="spinner" />Creating…</span>
          : 'Create account'}
      </button>

      <p className="form-switch">
        Have an account?{' '}
        <button type="button" className="switch-link" onClick={onSwitch}>Sign in</button>
      </p>
    </form>
  )
}

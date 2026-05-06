import { useState } from 'react'
import './InputField.css'

export default function InputField({ label, name, type = 'text', autoComplete, required, placeholder }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="field">
      <label className="field-label" htmlFor={name}>{label}</label>
      <div className="field-wrap">
        <input
          id={name}
          name={name}
          type={isPassword ? (show ? 'text' : 'password') : type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className="field-input"
        />
        {isPassword && (
          <button
            type="button"
            className="field-eye"
            onClick={() => setShow(s => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

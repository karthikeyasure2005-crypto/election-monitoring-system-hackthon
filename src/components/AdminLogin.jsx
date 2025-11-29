import React, { useState } from 'react'

export default function AdminLogin({ onAdminLogin, onBack }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('Both fields are required')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      // Accept only admin/admin for this page
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        onAdminLogin({ username: 'admin', role: 'admin', loginTime: new Date().toLocaleString() })
      } else {
        setError('Invalid admin credentials')
      }
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1>Admin Portal</h1>
            <p className="login-subtitle">Administrator Login</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">❌ {error}</div>}

            <div className="form-group">
              <label htmlFor="admin-username">Username</label>
              <input id="admin-username" name="username" value={credentials.username} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input id="admin-password" type="password" name="password" value={credentials.password} onChange={handleChange} />
            </div>

            <div className="form-buttons">
              <button type="submit" className="login-button" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign in'}</button>
              <button type="button" className="clear-button" onClick={onBack}>Back</button>
            </div>
          </form>

          <div className="login-footer">
            <p>Only administrators may use this portal.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

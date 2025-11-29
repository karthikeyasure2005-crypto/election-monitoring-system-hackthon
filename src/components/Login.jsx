import React, { useState } from 'react'

export default function Login({ onLogin, onShowAdminLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (!credentials.username.trim()) {
      setError('Username is required')
      return
    }
    if (!credentials.password.trim()) {
      setError('Password is required')
      return
    }
    if (credentials.password.length < 4) {
      setError('Password must be at least 4 characters')
      return
    }

    // Simulate login
    setIsLoading(true)
    setTimeout(() => {
      // Demo credentials
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        onLogin({
          username: credentials.username,
          role: 'admin',
          loginTime: new Date().toLocaleString()
        })
      } else if (credentials.username === 'observer' && credentials.password === 'observer') {
        onLogin({
          username: credentials.username,
          role: 'observer',
          loginTime: new Date().toLocaleString()
        })
      } else if (credentials.username === 'user' && credentials.password === 'user') {
        onLogin({
          username: credentials.username,
          role: 'voter',
          loginTime: new Date().toLocaleString()
        })
      } else {
        setError('Invalid username or password')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1>🗳️ Election Monitor</h1>
            <p className="login-subtitle">Secure Access Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span>❌</span> {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              <button type="button" className="clear-button" onClick={() => onShowAdminLogin && onShowAdminLogin()}>
                Admin Login
              </button>
            </div>
          </form>

          <div className="login-info">
            <p className="info-title">Demo Credentials:</p>
            <div className="credentials-list">
              <div className="credential-item">
                <span className="cred-role">Admin:</span>
                <span className="cred-value">admin / admin</span>
              </div>
              <div className="credential-item">
                <span className="cred-role">Observer:</span>
                <span className="cred-value">observer / observer</span>
              </div>
              <div className="credential-item">
                <span className="cred-role">Voter:</span>
                <span className="cred-value">user / user</span>
              </div>
            </div>
          </div>

          <div className="login-footer">
            <p>🔒 Your login is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  )
}

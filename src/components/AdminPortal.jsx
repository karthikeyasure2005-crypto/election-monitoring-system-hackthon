import React from 'react'
import Admin from './Admin'

export default function AdminPortal({ votes, voteHistory, onReset, user, onLogout, reports }) {
  return (
    <div className="admin-portal-container">
      <header className="admin-portal-header">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1 style={{margin: 0}}>🛡️ Admin Portal</h1>
            <p style={{margin: 0, color: '#9CA3AF'}}>Administrative interface — restricted access</p>
          </div>
          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
            <span style={{fontWeight: 700}}>{user?.username}</span>
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main style={{padding: '1.5rem'}}>
        <Admin votes={votes} voteHistory={voteHistory} onReset={onReset} user={user} reports={reports} />
      </main>
    </div>
  )
}

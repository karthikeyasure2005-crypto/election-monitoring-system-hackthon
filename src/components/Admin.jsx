import React from 'react'

const candidates = [
  { id: 'candidate1', name: 'John Smith' },
  { id: 'candidate2', name: 'Sarah Johnson' },
  { id: 'candidate3', name: 'Mike Chen' },
  { id: 'candidate4', name: 'Emma Davis' },
]

export default function Admin({ votes, voteHistory, onReset }) {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0)
  const avgVotesPerCandidate = totalVotes > 0 ? (totalVotes / 4).toFixed(2) : 0

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <p className="admin-notice">Restricted access: System administrators only</p>
      </div>

      <div className="admin-section">
        <h3>System Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <label>Total Votes</label>
            <div className="stat-val">{totalVotes}</div>
          </div>
          <div className="stat-item">
            <label>Total Voters</label>
            <div className="stat-val">{voteHistory.length}</div>
          </div>
          <div className="stat-item">
            <label>Candidates</label>
            <div className="stat-val">{candidates.length}</div>
          </div>
          <div className="stat-item">
            <label>Avg Votes/Candidate</label>
            <div className="stat-val">{avgVotesPerCandidate}</div>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3>Vote Distribution</h3>
        <div className="vote-table">
          <div className="table-header">
            <div>Candidate</div>
            <div>Votes</div>
            <div>Percentage</div>
          </div>
          {candidates.map(candidate => {
            const candidateVotes = votes[candidate.id] || 0
            const percentage = totalVotes > 0 ? ((candidateVotes / totalVotes) * 100).toFixed(1) : 0
            return (
              <div key={candidate.id} className="table-row">
                <div>{candidate.name}</div>
                <div>{candidateVotes}</div>
                <div>{percentage}%</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="admin-section">
        <h3>Voting Activity Log</h3>
        {voteHistory.length > 0 ? (
          <div className="activity-log">
            {voteHistory.map((vote, idx) => {
              const candidate = candidates.find(c => c.id === vote.candidateId)
              return (
                <div key={idx} className="log-entry">
                  <span className="log-number">{idx + 1}</span>
                  <span className="log-time">{vote.timestamp}</span>
                  <span className="log-voter">{vote.voterId}</span>
                  <span className="log-action">→</span>
                  <span className="log-candidate">{candidate?.name}</span>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="no-activity">No voting activity yet.</p>
        )}
      </div>

      <div className="admin-section">
        <h3>Demo: Simulate External Vote</h3>
        <p className="text-sm">Simulate a vote from another browser/session (won't affect your local vote lock).</p>
        <SimulateVoteForm onSimulate={(candidateId) => {
          if (typeof window !== 'undefined' && window.__simulateExternalVote) {
            window.__simulateExternalVote(candidateId)
          }
        }} />
      </div>

      <div className="admin-section danger-zone">
        <h3>Danger Zone</h3>
        <p className="warning">⚠️ These actions cannot be undone</p>
        <button onClick={onReset} className="reset-button danger">
          Reset All Votes
        </button>
      </div>

      <div className="admin-section">
        <h3>System Information</h3>
        <div className="info-box">
          <p><strong>System Version:</strong> 1.0.0</p>
          <p><strong>Last Updated:</strong> {new Date().toLocaleString()}</p>
          <p><strong>Election Status:</strong> Active</p>
          <p><strong>Security Level:</strong> High</p>
        </div>
      </div>
    </div>
  )
}

function SimulateVoteForm({ onSimulate }) {
  const [candidate, setCandidate] = React.useState('candidate1')
  return (
    <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
      <select value={candidate} onChange={(e) => setCandidate(e.target.value)}>
        <option value="candidate1">John Smith</option>
        <option value="candidate2">Sarah Johnson</option>
        <option value="candidate3">Mike Chen</option>
        <option value="candidate4">Emma Davis</option>
      </select>
      <button className="reset-button" onClick={() => onSimulate(candidate)}>Simulate External Vote</button>
    </div>
  )
}

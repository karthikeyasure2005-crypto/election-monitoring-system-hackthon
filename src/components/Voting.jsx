import React from 'react'

const candidates = [
  { id: 'candidate1', name: 'John Smith', party: 'Democratic Party', color: '#2563eb', description: 'Education Reform & Healthcare' },
  { id: 'candidate2', name: 'Sarah Johnson', party: 'Republican Party', color: '#dc2626', description: 'Economic Growth & Security' },
  { id: 'candidate3', name: 'Mike Chen', party: 'Independent', color: '#7c3aed', description: 'Environmental Focus' },
  { id: 'candidate4', name: 'Emma Davis', party: 'Green Party', color: '#16a34a', description: 'Sustainability & Social Justice' },
]

export default function Voting({ onVote, hasVoted, voterId }) {
  return (
    <div className="voting-container">
      <div className="voting-header">
        <h2>Cast Your Vote</h2>
        {hasVoted ? (
          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
            <span className="already-voted">✓ You have voted</span>
            {voterId && <small style={{color: '#f3f4f6', opacity: 0.9}}>ID: {voterId}</small>}
          </div>
        ) : (
          <p className="voting-notice">Select your preferred candidate below</p>
        )}
      </div>

      <div className="voting-grid">
        {candidates.map(candidate => (
          <div key={candidate.id} className="voting-card">
            <div className="candidate-avatar" style={{ backgroundColor: candidate.color }}></div>
            <div className="candidate-details">
              <h3>{candidate.name}</h3>
              <p className="party">{candidate.party}</p>
              <p className="description">{candidate.description}</p>
            </div>
            <button
              onClick={() => onVote(candidate.id)}
              className={`vote-button ${hasVoted ? 'disabled' : ''}`}
              disabled={hasVoted}
            >
              {hasVoted ? 'Voted' : 'Vote'}
            </button>
          </div>
        ))}
      </div>

      <div className="voting-info">
        <p>💡 Your vote is anonymous and secure.</p>
        <p>{hasVoted ? '🔒 You cannot vote again from this browser.' : '🔓 You can vote once from this browser.'}</p>
      </div>
    </div>
  )
}

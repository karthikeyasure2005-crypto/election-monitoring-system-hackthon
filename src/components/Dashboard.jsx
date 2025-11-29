import React from 'react'

const candidates = [
  { id: 'candidate1', name: 'John Smith', party: 'Democratic Party', color: '#2563eb' },
  { id: 'candidate2', name: 'Sarah Johnson', party: 'Republican Party', color: '#dc2626' },
  { id: 'candidate3', name: 'Mike Chen', party: 'Independent', color: '#7c3aed' },
  { id: 'candidate4', name: 'Emma Davis', party: 'Green Party', color: '#16a34a' },
]

export default function Dashboard({ votes, totalVoters }) {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0)
  
  const getCandidateVotes = (candidateId) => votes[candidateId] || 0
  const getPercentage = (candidateId) => {
    if (totalVotes === 0) return 0
    return ((getCandidateVotes(candidateId) / totalVotes) * 100).toFixed(1)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Election Overview</h2>
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-label">Total Votes</div>
            <div className="stat-value">{totalVotes}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Total Voters</div>
            <div className="stat-value">{totalVoters}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Voting Status</div>
            <div className="stat-value">{totalVotes > 0 ? 'Active' : 'Pending'}</div>
          </div>
        </div>
      </div>

      <div className="candidates-grid">
        {candidates.map(candidate => {
          const candidateVotes = getCandidateVotes(candidate.id)
          const percentage = getPercentage(candidate.id)
          return (
            <div key={candidate.id} className="candidate-card">
              <div className="candidate-info">
                <h3>{candidate.name}</h3>
                <p className="party-name">{candidate.party}</p>
              </div>
              <div className="vote-display">
                <div className="vote-bar-container">
                  <div 
                    className="vote-bar" 
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: candidate.color
                    }}
                  ></div>
                </div>
                <div className="vote-stats">
                  <span className="vote-count">{candidateVotes}</span>
                  <span className="vote-percentage">{percentage}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import React, { useState } from 'react'

const candidates = [
  { id: 'candidate1', name: 'John Smith', party: 'Democratic Party' },
  { id: 'candidate2', name: 'Sarah Johnson', party: 'Republican Party' },
  { id: 'candidate3', name: 'Mike Chen', party: 'Independent' },
  { id: 'candidate4', name: 'Emma Davis', party: 'Green Party' },
]

export default function Results({ votes, voteHistory }) {
  const [sortBy, setSortBy] = useState('votes')
  
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0)
  
  const getCandidateVotes = (candidateId) => votes[candidateId] || 0
  const getPercentage = (candidateId) => {
    if (totalVotes === 0) return 0
    return ((getCandidateVotes(candidateId) / totalVotes) * 100).toFixed(1)
  }

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'votes') {
      return getCandidateVotes(b.id) - getCandidateVotes(a.id)
    }
    return 0
  })

  const winner = sortedCandidates[0]
  const winnerVotes = getCandidateVotes(winner.id)

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Election Results</h2>
        <p className="total-votes">Total Votes Cast: {totalVotes}</p>
      </div>

      {totalVotes > 0 && (
        <div className="winner-section">
          <h3>Current Leading</h3>
          <div className="winner-card">
            <div className="winner-name">{winner.name}</div>
            <div className="winner-party">{winner.party}</div>
            <div className="winner-votes">{winnerVotes} votes ({getPercentage(winner.id)}%)</div>
          </div>
        </div>
      )}

      <div className="results-list">
        <div className="results-header-row">
          <div className="rank">#</div>
          <div className="name">Candidate</div>
          <div className="party-col">Party</div>
          <div className="votes">Votes</div>
          <div className="percentage">%</div>
        </div>

        {sortedCandidates.map((candidate, index) => (
          <div key={candidate.id} className="result-row">
            <div className="rank">{index + 1}</div>
            <div className="name">{candidate.name}</div>
            <div className="party-col">{candidate.party}</div>
            <div className="votes">{getCandidateVotes(candidate.id)}</div>
            <div className="percentage">{getPercentage(candidate.id)}%</div>
          </div>
        ))}
      </div>

      {voteHistory.length > 0 && (
        <div className="vote-history">
          <h3>Recent Voting Activity</h3>
          <div className="history-list">
            {voteHistory.slice(-10).reverse().map((vote, idx) => {
              const candidate = candidates.find(c => c.id === vote.candidateId)
              return (
                <div key={idx} className="history-item">
                  <span className="time">{vote.timestamp}</span>
                  <span className="voter-id">Voter: {vote.voterId}</span>
                  <span className="voted-for">→ {candidate?.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {totalVotes === 0 && (
        <div className="no-results">
          <p>No votes have been cast yet.</p>
          <p>Go to "Cast Vote" to start voting!</p>
        </div>
      )}
    </div>
  )
}

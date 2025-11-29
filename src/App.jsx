import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Voting from './components/Voting'
import Results from './components/Results'
import Admin from './components/Admin'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [votes, setVotes] = useState({
    candidate1: 0,
    candidate2: 0,
    candidate3: 0,
    candidate4: 0,
  })
  const [hasVoted, setHasVoted] = useState(false)
  const [voteHistory, setVoteHistory] = useState([])

  const castVote = (candidateId) => {
    if (hasVoted) {
      alert('You have already voted!')
      return
    }
    setVotes(prev => ({
      ...prev,
      [candidateId]: prev[candidateId] + 1
    }))
    setVoteHistory(prev => [...prev, {
      candidateId,
      timestamp: new Date().toLocaleString(),
      voterId: Math.random().toString(36).substr(2, 9)
    }])
    setHasVoted(true)
    alert('Vote recorded successfully!')
  }

  const resetVotes = () => {
    if (window.confirm('Are you sure you want to reset all votes?')) {
      setVotes({
        candidate1: 0,
        candidate2: 0,
        candidate3: 0,
        candidate4: 0,
      })
      setVoteHistory([])
      setHasVoted(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🗳️ Election Monitoring System</h1>
        <nav className="nav-menu">
          <button 
            className={currentView === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={currentView === 'voting' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentView('voting')}
          >
            Cast Vote
          </button>
          <button 
            className={currentView === 'results' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentView('results')}
          >
            Results
          </button>
          <button 
            className={currentView === 'admin' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentView('admin')}
          >
            Admin
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' && <Dashboard votes={votes} totalVoters={voteHistory.length} />}
        {currentView === 'voting' && <Voting onVote={castVote} hasVoted={hasVoted} />}
        {currentView === 'results' && <Results votes={votes} voteHistory={voteHistory} />}
        {currentView === 'admin' && <Admin votes={votes} voteHistory={voteHistory} onReset={resetVotes} />}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Election Monitoring System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

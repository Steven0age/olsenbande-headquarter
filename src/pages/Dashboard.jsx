import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useAuth } from '../hooks/useAuth'
import './Dashboard.css'

export function Dashboard() {
  const { projects } = useProjects()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const activeProjects = projects.filter(p => p.status === 'active').length
  const pausedProjects = projects.filter(p => p.status === 'paused').length
  const completedProjects = projects.filter(p => p.status === 'completed').length

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Olsenbande Headquarter</h1>
        <nav className="main-nav">
          <button onClick={() => navigate('/projects')} className="nav-link">
            Projekte
          </button>
          <button onClick={() => navigate('/chat')} className="nav-link">
            Chat
          </button>
          <button onClick={handleLogout} className="nav-link logout">
            Abmelden
          </button>
        </nav>
      </header>

      <main className="dashboard-content">
        <h2>Dashboard</h2>
        
        <div className="stats-grid">
          <div className="stat-card active">
            <span className="stat-number">{activeProjects}</span>
            <span className="stat-label">Aktive Projekte</span>
          </div>
          
          <div className="stat-card paused">
            <span className="stat-number">{pausedProjects}</span>
            <span className="stat-label">Pausierte Projekte</span>
          </div>
          
          <div className="stat-card completed">
            <span className="stat-number">{completedProjects}</span>
            <span className="stat-label">Abgeschlossene Projekte</span>
          </div>
          
          <div className="stat-card total">
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Gesamtprojekte</span>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Schnellzugriff</h3>
          <div className="action-buttons">
            <button 
              onClick={() => navigate('/projects')} 
              className="action-btn primary"
            >
              Projekte verwalten
            </button>
            <button 
              onClick={() => navigate('/chat')} 
              className="action-btn secondary"
            >
              Zum Chat
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

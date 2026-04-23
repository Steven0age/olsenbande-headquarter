import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useAuth } from '../hooks/useAuth'
import './Chat.css'

// Demo-Chat-Nachrichten pro Projekt
const DEMO_MESSAGES = {
  '1': [
    { id: '1', sender: 'Egon', text: 'Plan ist fertig. Wir starten um Mitternacht.', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', sender: 'Benny', text: 'Alles klar, Boss!', timestamp: new Date(Date.now() - 82800000).toISOString() }
  ],
  '2': [
    { id: '3', sender: 'Kjeld', text: 'Die Route ist geprüft.', timestamp: new Date(Date.now() - 172800000).toISOString() }
  ]
}

export function Chat() {
  const { projects } = useProjects()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const [selectedProject, setSelectedProject] = useState(null)
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('olsenbande_messages')
    return stored ? JSON.parse(stored) : DEMO_MESSAGES
  })
  const [newMessage, setNewMessage] = useState('')

  // Speichere Nachrichten
  useEffect(() => {
    localStorage.setItem('olsenbande_messages', JSON.stringify(messages))
  }, [messages])

  // Scroll zum Ende
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selectedProject])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedProject) return

    const projectMessages = messages[selectedProject.id] || []
    const message = {
      id: Date.now().toString(),
      sender: 'Du',
      text: newMessage.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages({
      ...messages,
      [selectedProject.id]: [...projectMessages, message]
    })
    setNewMessage('')
  }

  const currentMessages = selectedProject ? (messages[selectedProject.id] || []) : []

  return (
    <div className="chat-page">
      <header className="page-header">
        <h1>Chat</h1>
        <nav className="page-nav">
          <button onClick={() => navigate('/dashboard')} className="nav-link">
            Dashboard
          </button>
          <button onClick={() => navigate('/projects')} className="nav-link">
            Projekte
          </button>
          <button onClick={handleLogout} className="nav-link logout">
            Abmelden
          </button>
        </nav>
      </header>

      <div className="chat-container">
        <aside className="chat-sidebar">
          <h3>Projekte</h3>
          <ul className="project-list">
            {projects.map(project => (
              <li
                key={project.id}
                className={selectedProject?.id === project.id ? 'active' : ''}
                onClick={() => setSelectedProject(project)}
              >
                <span className="project-name">{project.name}</span>
                <span className={`status-indicator ${project.status}`}></span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="chat-main">
          {selectedProject ? (
            <>
              <div className="chat-header">
                <h2>{selectedProject.name}</h2>
                <p>{selectedProject.description}</p>
              </div>

              <div className="messages">
                {currentMessages.length === 0 ? (
                  <p className="no-messages">Noch keine Nachrichten in diesem Projekt.</p>
                ) : (
                  currentMessages.map(msg => (
                    <div key={msg.id} className={`message ${msg.sender === 'Du' ? 'own' : 'other'}`}>
                      <div className="message-header">
                        <span className="sender">{msg.sender}</span>
                        <span className="timestamp">
                          {new Date(msg.timestamp).toLocaleString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                      <p className="message-text">{msg.text}</p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="message-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Nachricht schreiben..."
                />
                <button type="submit" disabled={!newMessage.trim()}>Senden</button>
              </form>
            </>
          ) : (
            <div className="no-selection">
              <p>Wähle ein Projekt aus der Liste aus</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

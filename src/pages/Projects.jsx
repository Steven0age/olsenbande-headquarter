import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useAuth } from '../hooks/useAuth'
import { ProjectCard } from '../components/ProjectCard'
import { AgentList } from '../components/AgentList'
import './Projects.css'

export function Projects() {
  const { projects, addProject, updateProject, deleteProject, getProjectById } = useProjects()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [showAgents, setShowAgents] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '', status: 'active' })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleAdd = () => {
    setIsEditing(true)
    setEditingProject(null)
    setFormData({ name: '', description: '', status: 'active' })
  }

  const handleEdit = (project) => {
    setIsEditing(true)
    setEditingProject(project)
    setFormData({ name: project.name, description: project.description, status: project.status })
  }

  const handleDelete = (id) => {
    if (confirm('Projekt wirklich löschen?')) {
      deleteProject(id)
      if (showAgents === id) {
        setShowAgents(null)
      }
    }
  }

  const handleSelect = (project) => {
    setShowAgents(showAgents === project.id ? null : project.id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProject) {
      updateProject(editingProject.id, formData)
    } else {
      addProject(formData.name, formData.description)
    }
    setIsEditing(false)
    setEditingProject(null)
    setFormData({ name: '', description: '', status: 'active' })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingProject(null)
    setFormData({ name: '', description: '', status: 'active' })
  }

  return (
    <div className="projects-page">
      <header className="page-header">
        <h1>Projekt-Manager</h1>
        <nav className="page-nav">
          <button onClick={() => navigate('/dashboard')} className="nav-link">
            Dashboard
          </button>
          <button onClick={() => navigate('/chat')} className="nav-link">
            Chat
          </button>
          <button onClick={handleLogout} className="nav-link logout">
            Abmelden
          </button>
        </nav>
      </header>

      <main className="projects-content">
        <div className="projects-toolbar">
          <h2>Projekte</h2>
          <button onClick={handleAdd} className="btn-add">+ Neues Projekt</button>
        </div>

        {isEditing && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editingProject ? 'Projekt bearbeiten' : 'Neues Projekt'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Beschreibung</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                  />
                </div>
                {editingProject && (
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="active">Aktiv</option>
                      <option value="paused">Pausiert</option>
                      <option value="completed">Abgeschlossen</option>
                    </select>
                  </div>
                )}
                <div className="modal-actions">
                  <button type="button" onClick={handleCancel} className="btn-cancel">Abbrechen</button>
                  <button type="submit" className="btn-save">Speichern</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="projects-layout">
          <div className="projects-list">
            {projects.length === 0 ? (
              <p className="empty-state">Noch keine Projekte vorhanden.</p>
            ) : (
              projects.map(project => (
                <div key={project.id}>
                  <ProjectCard
                    project={project}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSelect={handleSelect}
                  />
                  {showAgents === project.id && (
                    <div className="agents-panel">
                      <AgentList projectId={project.id} />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

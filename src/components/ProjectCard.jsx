import './ProjectCard.css'

export function ProjectCard({ project, onEdit, onDelete, onSelect }) {
  const statusLabels = {
    active: 'Aktiv',
    paused: 'Pausiert',
    completed: 'Abgeschlossen'
  }

  const statusClass = `status-badge status-${project.status}`

  return (
    <div className="project-card" onClick={() => onSelect?.(project)} role="button">
      <div className="project-header">
        <h3>{project.name}</h3>
        <span className={statusClass}>{statusLabels[project.status] || project.status}</span>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-footer">
        <span className="project-date">
          Erstellt: {new Date(project.createdAt).toLocaleDateString('de-DE')}
        </span>
        <div className="project-actions">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit?.(project) }} 
            className="btn btn-edit"
          >
            Bearbeiten
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete?.(project.id) }} 
            className="btn btn-delete"
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  )
}

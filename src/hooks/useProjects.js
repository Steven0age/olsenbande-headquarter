import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'olsenbande_projects'

// Demo-Daten für den Anfang
const DEMO_PROJECTS = [
  {
    id: '1',
    name: 'Coup Planning',
    description: 'Planung des nächsten großen Coups',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Flucht Route',
    description: 'Routenplanung für den Notfall',
    status: 'paused',
    createdAt: new Date().toISOString()
  }
]

export function useProjects() {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return DEMO_PROJECTS
  })

  // Speichere Projekte bei jeder Änderung
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  const addProject = useCallback((name, description) => {
    const newProject = {
      id: Date.now().toString(),
      name,
      description,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    setProjects(prev => [...prev, newProject])
    return newProject
  }, [])

  const updateProject = useCallback((id, updates) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    )
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(project => project.id !== id))
  }, [])

  const getProjectById = useCallback((id) => {
    return projects.find(project => project.id === id)
  }, [projects])

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById
  }
}

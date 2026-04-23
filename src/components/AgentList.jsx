import { useState } from 'react'
import './AgentList.css'

// Demo-Agenten
const DEMO_AGENTS = [
  { id: '1', name: 'Egon', role: 'Stratege', status: 'idle' },
  { id: '2', name: 'Benny', role: 'Techniker', status: 'idle' },
  { id: '3', name: 'Kjeld', role: 'Logistiker', status: 'running' },
  { id: '4', name: 'Yvonne', role: 'Ablenkung', status: 'idle' }
]

export function AgentList({ projectId }) {
  const [agents, setAgents] = useState(() => {
    // Lade gespeicherte Agent-Status für dieses Projekt
    const stored = localStorage.getItem(`olsenbande_agents_${projectId}`)
    if (stored) {
      return JSON.parse(stored)
    }
    return DEMO_AGENTS
  })

  const toggleAgent = (agentId) => {
    const updated = agents.map(agent =>
      agent.id === agentId
        ? { ...agent, status: agent.status === 'running' ? 'idle' : 'running' }
        : agent
    )
    setAgents(updated)
    localStorage.setItem(`olsenbande_agents_${projectId}`, JSON.stringify(updated))
  }

  return (
    <div className="agent-list">
      <h4>Verfügbare Agenten</h4>
      <ul className="agents">
        {agents.map(agent => (
          <li key={agent.id} className={`agent-item ${agent.status}`}>
            <div className="agent-info">
              <span className="agent-name">{agent.name}</span>
              <span className="agent-role">{agent.role}</span>
            </div>
            <button
              onClick={() => toggleAgent(agent.id)}
              className={`btn btn-toggle ${agent.status}`}
            >
              {agent.status === 'running' ? 'Stop' : 'Start'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

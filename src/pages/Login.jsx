import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Login.css'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Bitte Benutzername und Passwort eingeben')
      return
    }

    const success = login(username, password)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Ungültige Anmeldedaten. Versuche admin / olsen123')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Olsenbande Headquarter</h1>
        <h2>Anmeldung</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Benutzername</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn-login">
            Anmelden
          </button>
        </form>
        
        <p className="hint">
          Demo: Benutzername: <strong>admin</strong> / Passwort: <strong>olsen123</strong>
        </p>
      </div>
    </div>
  )
}

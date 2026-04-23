import { createContext, useState, useCallback, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialer Auth-Check (Client-seitig)
  useEffect(() => {
    const auth = localStorage.getItem('olsenbande_auth') === 'true'
    const userData = localStorage.getItem('olsenbande_user')
    setIsAuthenticated(auth)
    setUser(userData || null)
    setLoading(false)
  }, [])

  const login = useCallback((username, password) => {
    // Einfache Client-seitige Auth-Prüfung
    if (username === 'admin' && password === 'olsen123') {
      localStorage.setItem('olsenbande_auth', 'true')
      localStorage.setItem('olsenbande_user', username)
      setIsAuthenticated(true)
      setUser(username)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('olsenbande_auth')
    localStorage.removeItem('olsenbande_user')
    setIsAuthenticated(false)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('olsenbande_auth') === 'true'
  })
  const [user, setUser] = useState(() => {
    return localStorage.getItem('olsenbande_user') || null
  })

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
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

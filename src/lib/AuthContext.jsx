import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('aprica_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (userData) => {
    const u = { ...userData, loggedIn: true }
    setUser(u)
    sessionStorage.setItem('aprica_user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('aprica_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'

function Protected({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/auth" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<HomePage />} />
      <Route path="/auth"     element={<AuthPage />} />
      <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
      <Route path="*"         element={<Navigate to="/" replace />} />
    </Routes>
  )
}

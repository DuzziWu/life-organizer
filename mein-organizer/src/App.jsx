import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Profile from './pages/Profile'
import Dashboard from "./pages/Dashboard"


function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App

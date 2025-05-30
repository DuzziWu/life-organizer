import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App

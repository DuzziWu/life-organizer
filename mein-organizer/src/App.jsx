import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import AuthPage from './pages/AuthPage'
import Profile from './pages/Profile'
import WelcomePage from './pages/WelcomePage'
import Dashboard from './pages/Dashboard'

function App() {
  const location = useLocation()

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AuthPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AnimatePresence>
    </LayoutGroup>
  )
}

export default App

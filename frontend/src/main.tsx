import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { WidgetProvider } from './contexts/WidgetContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { WelcomePage } from './pages/WelcomePage'
import { FirstVisitPage } from './pages/FirstVisitPage'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WidgetProvider>
          <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/welcome" 
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/first-visit" 
            element={
              <ProtectedRoute>
                <FirstVisitPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </WidgetProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
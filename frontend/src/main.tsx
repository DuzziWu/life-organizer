import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Simple App component für Testing
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="cyber-grid-bg animate-grid-move" />
        <div className="scan-lines-bg" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="glass rounded-3xl p-12 max-w-2xl text-center border border-border-accent/50">
          <h1 className="text-6xl font-display font-bold mb-4 text-gradient">
            LIFE<span className="text-cyber-blue-500">_ORG</span>
          </h1>

          <p className="text-xl text-text-secondary mb-8 font-body">
            Eine moderne, personalisierbare Dashboard-Webapp zur Lebensorganisation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cyber-button cyber-button-primary px-8 py-3 text-lg">
              Dashboard öffnen
            </button>
            <button className="cyber-button cyber-button-secondary px-8 py-3 text-lg">
              Dokumentation
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="glass-effect p-4 rounded-xl">
              <div className="text-cyber-blue-500 text-2xl mb-2">🚀</div>
              <h3 className="font-semibold text-text-primary">Futuristisch</h3>
              <p className="text-text-muted">Modernes Dark Theme mit Cyber-Ästhetik</p>
            </div>
            <div className="glass-effect p-4 rounded-xl">
              <div className="text-matrix-green-500 text-2xl mb-2">🧩</div>
              <h3 className="font-semibold text-text-primary">Flexibel</h3>
              <p className="text-text-muted">Drag & Drop Widgets nach deinen Wünschen</p>
            </div>
            <div className="glass-effect p-4 rounded-xl">
              <div className="text-neon-purple-500 text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-text-primary">Schnell</h3>
              <p className="text-text-muted">React 18 + Vite + Supabase</p>
            </div>
          </div>

          <div className="mt-8 text-xs text-text-muted font-mono">
            Status: <span className="text-success">🟢 Online</span> |
            Version: <span className="text-cyber-blue-500">v0.1.0-dev</span>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
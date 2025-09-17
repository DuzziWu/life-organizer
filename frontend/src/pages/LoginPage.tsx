import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard'
import { useAuth } from '../contexts/AuthContext'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      navigate('/dashboard')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <LiquidGlassCard variant="elevated" className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-cyan-400" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  LIFE<span className="text-cyan-400">_ORG</span>
                </h1>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Willkommen zurück</h2>
            <p className="text-gray-400 text-sm">Melde dich in deinem Dashboard an</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                E-Mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                           transition-all duration-200"
                  placeholder="Deine E-Mail Adresse"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Passwort
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                           transition-all duration-200"
                  placeholder="Dein Passwort"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Passwort vergessen?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 
                       hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700
                       text-white font-semibold py-3 px-6 rounded-xl
                       transition-all duration-300 ease-out
                       disabled:cursor-not-allowed disabled:opacity-50
                       shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span className="relative flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Anmeldung läuft...</span>
                  </>
                ) : (
                  <>
                    <span>Anmelden</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Noch keinen Account?{' '}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Registrieren
              </Link>
            </p>
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  )
}
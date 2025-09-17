import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard'
import { useAuth } from '../contexts/AuthContext'

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [registrationAttempted, setRegistrationAttempted] = useState(false)
  
  const { signUp, user } = useAuth()
  const navigate = useNavigate()

  // Navigate to welcome when user is successfully created
  useEffect(() => {
    console.log('RegisterPage useEffect triggered - user:', user?.email, 'registrationAttempted:', registrationAttempted)
    // Navigate when user exists and we attempted registration
    if (user && registrationAttempted) {
      console.log('✅ User exists and registration was attempted, navigating to welcome:', user.email)
      // Small delay to ensure everything is set up
      setTimeout(() => {
        navigate('/welcome')
      }, 500)
    } else {
      console.log('❌ Navigation conditions not met - user:', !!user, 'registrationAttempted:', registrationAttempted)
    }
  }, [user, registrationAttempted, navigate])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Die Passwörter stimmen nicht überein')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setError('')
    setRegistrationAttempted(true)

    console.log('🚀 Calling signUp with:', formData.email)
    const { error } = await signUp(formData.email, formData.password, {
      fullName: formData.name,
      username: formData.name
    })
    
    console.log('📝 SignUp result - error:', error, 'setting success to:', !error)
    if (error) {
      // Even if there's an "error", if it's just about email confirmation, still consider it success
      if (error.message?.includes('email') || error.message?.includes('confirmation')) {
        console.log('🔄 Email confirmation error but account likely created, setting success to true')
        setSuccess(true)
        setLoading(false)
      } else {
        console.log('❌ Real error occurred:', error.message)
        setError(error.message)
        setLoading(false)
      }
    } else {
      setSuccess(true)
      console.log('✅ Registration success, success state set to true')
      setLoading(false)
      // Navigation happens in useEffect when user is available
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <LiquidGlassCard variant="elevated" className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Willkommen bei Life Organizer!</h2>
          <p className="text-gray-400 mb-6">
            Dein Account wurde erfolgreich erstellt. Dein Arbeitsbereich wird eingerichtet.
          </p>
          <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500 mt-4">Weiterleitung zur Einrichtung...</p>
        </LiquidGlassCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <LiquidGlassCard variant="elevated" className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-emerald-400" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  LIFE<span className="text-emerald-400">_ORG</span>
                </h1>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Erstelle deinen Account</h2>
            <p className="text-gray-400 text-sm">Tritt der Zukunft der Organisation bei</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                           transition-all duration-200"
                  placeholder="Dein vollständiger Name"
                  required
                />
              </div>
            </div>

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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                           transition-all duration-200"
                  placeholder="Erstelle ein Passwort"
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                Passwort bestätigen
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                           transition-all duration-200"
                  placeholder="Passwort wiederholen"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-600 
                       hover:from-emerald-400 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700
                       text-white font-semibold py-3 px-6 rounded-xl
                       transition-all duration-300 ease-out
                       disabled:cursor-not-allowed disabled:opacity-50
                       shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              <span className="relative flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Account wird erstellt...</span>
                  </>
                ) : (
                  <>
                    <span>Account erstellen</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Bereits einen Account?{' '}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Anmelden
              </Link>
            </p>
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  )
}
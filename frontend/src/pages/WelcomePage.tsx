import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Sparkles, ArrowRight, Plus, Settings, Mail } from 'lucide-react'
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard'
import { useAuth } from '../contexts/AuthContext'

export function WelcomePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const steps = [
    {
      icon: CheckCircle,
      title: 'Account erstellt',
      description: 'Dein Life Organizer Account ist bereit',
      color: 'text-green-400'
    },
    {
      icon: Settings,
      title: 'Dashboard wird eingerichtet',
      description: 'Dein personalisierter Arbeitsbereich wird erstellt',
      color: 'text-cyan-400'
    },
    {
      icon: Plus,
      title: 'Starter-Widgets hinzufügen',
      description: 'Deine wichtigsten Tools werden eingerichtet',
      color: 'text-purple-400'
    },
    {
      icon: Sparkles,
      title: 'Bereit zum Loslegen!',
      description: 'Dein Dashboard ist einsatzbereit',
      color: 'text-emerald-400'
    }
  ]

  useEffect(() => {
    // Auto-progress through setup steps
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  const handleComplete = async () => {
    setIsCompleting(true)
    
    // Simulate final setup completion
    setTimeout(() => {
      navigate('/first-visit')
    }, 1000)
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
        <LiquidGlassCard variant="elevated" className="p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-12 h-12 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Willkommen bei Life Organizer!
            </h1>
            <p className="text-gray-400">
              Hi {profile?.full_name || user?.email?.split('@')[0]}, wir richten deinen Arbeitsbereich ein
            </p>
          </div>

          {/* Setup Steps */}
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              const isPending = index > currentStep

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                    isActive
                      ? 'bg-white/10 border border-white/20'
                      : isCompleted
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isCompleted 
                      ? 'bg-green-500/20' 
                      : isActive 
                      ? 'bg-cyan-500/20' 
                      : 'bg-gray-500/20'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? step.color : 'text-gray-500'}`} />
                    )}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold ${
                      isCompleted || isActive ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      isCompleted || isActive ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {isActive && (
                    <div className="w-5 h-5 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Email Verification Notice */}
          {currentStep < steps.length - 1 && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-400">E-Mails überprüfen</p>
                  <p className="text-xs text-gray-400">
                    Wir haben dir einen Verifizierungslink zur Bestätigung deines Accounts gesendet
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Complete Button */}
          {currentStep === steps.length - 1 && (
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-600 
                       hover:from-emerald-400 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700
                       text-white font-semibold py-3 px-6 rounded-xl
                       transition-all duration-300 ease-out
                       disabled:cursor-not-allowed disabled:opacity-50
                       shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              <span className="relative flex items-center justify-center space-x-2">
                {isCompleting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Dashboard wird geöffnet...</span>
                  </>
                ) : (
                  <>
                    <span>Zum Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          )}

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Einrichtungsfortschritt</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Sparkles, 
  Zap, 
  Calendar, 
  Mail, 
  Clock, 
  Layout,
  Rocket,
  ArrowDown,
  CheckCircle
} from 'lucide-react'
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard'
import { useAuth } from '../contexts/AuthContext'

export function FirstVisitPage() {
  const [isLaunching, setIsLaunching] = useState(false)
  const [showRocket, setShowRocket] = useState(false)
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Show rocket after page loads
    const timer = setTimeout(() => setShowRocket(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: Layout,
      title: 'Personalisierbare Widgets',
      description: 'Gestalte dein Dashboard mit flexiblen Widgets für Notizen, To-Dos, Kalender und mehr.',
      color: 'from-cyan-500 to-blue-500',
      delay: 'delay-100'
    },
    {
      icon: Calendar,
      title: 'Kalender-Integration',
      description: 'Synchronisiere all deine Termine von Google, Outlook und anderen Kalendern an einem Ort.',
      color: 'from-emerald-500 to-cyan-500',
      delay: 'delay-200'
    },
    {
      icon: Mail,
      title: 'Mail-Zentrale',
      description: 'Verwalte all deine E-Mail-Accounts übersichtlich in einem modernen Interface.',
      color: 'from-purple-500 to-pink-500',
      delay: 'delay-300'
    },
    {
      icon: Zap,
      title: 'Echtzeit-Updates',
      description: 'Alle deine Daten werden in Echtzeit synchronisiert und sind immer aktuell.',
      color: 'from-amber-500 to-orange-500',
      delay: 'delay-400'
    },
    {
      icon: Clock,
      title: 'Automatisierung',
      description: 'Spare Zeit mit intelligenten Automatisierungen und Workflows für wiederkehrende Aufgaben.',
      color: 'from-indigo-500 to-purple-500',
      delay: 'delay-500'
    },
    {
      icon: Sparkles,
      title: 'Futuristisches Design',
      description: 'Erlebe eine moderne, intuitive Benutzeroberfläche mit Liquid Glass Design und smooth Animationen.',
      color: 'from-pink-500 to-rose-500',
      delay: 'delay-600'
    }
  ]

  const handleLaunch = async () => {
    setIsLaunching(true)
    
    // Mark that user has visited
    if (user) {
      localStorage.setItem(`visited_${user.id}`, 'true')
    }
    
    // Rocket launch animation duration - longer for the big rocket
    setTimeout(() => {
      navigate('/dashboard')
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <LiquidGlassCard variant="elevated" className="p-8 mb-8">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-16 h-16 text-cyan-400" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-4">
                Willkommen{profile?.full_name ? `, ${profile.full_name}` : ''}!
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Du bist jetzt Teil der Zukunft der persönlichen Organisation. 
                Lass uns gemeinsam dein Leben strukturieren.
              </p>
              
              {/* Scroll indicator */}
              <div className="flex flex-col items-center space-y-4 animate-bounce">
                <p className="text-sm text-gray-400">Scrolle nach unten um mehr zu erfahren</p>
                <ArrowDown className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Was dich erwartet
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Life Organizer vereint alle deine digitalen Tools in einem modernen, personalisierbaren Dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <LiquidGlassCard 
                  key={index} 
                  className={`p-6 transform hover:scale-105 transition-all duration-500 animate-fade-in-up ${feature.delay}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </LiquidGlassCard>
              )
            })}
          </div>

          {/* Ready to start section */}
          <div className="text-center">
            <LiquidGlassCard variant="elevated" className="p-8 max-w-2xl mx-auto">
              <div className="mb-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Bereit für den Start?
                </h3>
                <p className="text-gray-400 mb-8">
                  Dein personalisiertes Dashboard wartet auf dich. Lass uns deine Reise in die Zukunft der Organisation beginnen!
                </p>
              </div>

              {/* Rocket Launch Button */}
              <div className="relative">
                {showRocket && (
                  <div className={`relative ${
                    isLaunching ? 'animate-rocket-launch' : ''
                  }`}>
                    <button
                      onClick={handleLaunch}
                      disabled={isLaunching}
                      className={`group relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 
                               hover:from-orange-400 hover:via-red-400 hover:to-pink-500 
                               disabled:from-gray-600 disabled:to-gray-700
                               text-white font-bold py-4 px-8 rounded-2xl
                               transition-all duration-500 ease-out
                               disabled:cursor-not-allowed disabled:opacity-50
                               shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60
                               transform hover:scale-110 active:scale-95
                               ${!isLaunching ? 'animate-rocket-idle' : ''}`}
                    >
                      <span className="relative flex items-center space-x-3 text-lg">
                        {isLaunching ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Start in 3... 2... 1...</span>
                          </>
                        ) : (
                          <>
                            <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                            <span>Dashboard starten!</span>
                          </>
                        )}
                      </span>
                      
                      {/* Fire effect */}
                      {isLaunching && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                          <div className="w-8 h-16 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full opacity-80 animate-pulse" />
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-red-500 via-orange-400 to-transparent rounded-full animate-ping" />
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-yellow-500 via-red-400 to-transparent rounded-full animate-pulse delay-75" />
                        </div>
                      )}
                    </button>
                  </div>
                )}
                
                {/* Launch trail effect */}
                {isLaunching && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full animate-ping" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-red-500/30 to-transparent rounded-full animate-ping delay-100" />
                  </div>
                )}
              </div>

              {isLaunching && (
                <p className="text-sm text-gray-400 mt-8 animate-pulse">
                  🚀 Dein Dashboard wird geladen...
                </p>
              )}
            </LiquidGlassCard>
          </div>
        </div>
      </section>

      {/* Classic Rocket Launch Animation */}
      {isLaunching && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* Dark background with falling lines */}
          <div className="absolute inset-0 bg-slate-950 animate-fade-in" />
          
          {/* Falling animated lines */}
          <div className="absolute inset-0">
            {Array.from({length: 50}).map((_, i) => (
              <div 
                key={i}
                className="absolute w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Classic Rocket (like reference image) */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-startup-rocket-launch">
            <div className="relative flex flex-col items-center">
              
              {/* Red Nose Cone */}
              <div className="relative">
                <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[36px] border-l-transparent border-r-transparent border-b-red-500" />
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-600" />
              </div>
              
              {/* White Main Body */}
              <div className="relative w-12 h-32 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-lg shadow-lg border border-gray-300">
                
                {/* Body highlights */}
                <div className="absolute left-1 top-0 w-1 h-full bg-gradient-to-b from-white to-transparent rounded-b-lg" />
                <div className="absolute right-1 top-0 w-1 h-full bg-gradient-to-b from-transparent to-gray-400/30 rounded-b-lg" />
                
                {/* Blue Window */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-700 shadow-inner">
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-sky-300 to-blue-500" />
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/80" />
                </div>
                
                {/* Life Organizer Logo */}
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="flex items-center space-x-0.5 bg-white/90 px-1.5 py-0.5 rounded border border-gray-300">
                    <Sparkles className="w-2 h-2 text-cyan-500" />
                    <div className="text-xs font-bold text-gray-800">
                      LIFE<span className="text-cyan-500">_ORG</span>
                    </div>
                  </div>
                </div>
                
                {/* Body stripes */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-red-500 rounded-full" />
                <div className="absolute top-22 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-red-400 rounded-full" />
              </div>
              
              {/* Red Side Fins */}
              <div className="absolute top-16 left-0 transform -translate-x-2">
                <div className="w-0 h-0 border-t-[8px] border-b-[16px] border-r-[6px] border-t-transparent border-b-transparent border-r-red-500" />
                <div className="absolute top-1 left-1 w-0 h-0 border-t-[6px] border-b-[12px] border-r-[4px] border-t-transparent border-b-transparent border-r-red-600" />
              </div>
              
              <div className="absolute top-16 right-0 transform translate-x-2">
                <div className="w-0 h-0 border-t-[8px] border-b-[16px] border-l-[6px] border-t-transparent border-b-transparent border-l-red-500" />
                <div className="absolute top-1 right-1 w-0 h-0 border-t-[6px] border-b-[12px] border-l-[4px] border-t-transparent border-b-transparent border-l-red-600" />
              </div>
              
              {/* Engine Section */}
              <div className="w-8 h-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-lg relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-orange-400 rounded-full" />
              </div>
              
              {/* Yellow Fire Trail (like in reference) */}
              <div className="relative mt-1">
                <div className="w-2 h-16 bg-gradient-to-t from-yellow-400 via-orange-400 to-yellow-300 rounded-full animate-pulse" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-orange-300 rounded-full animate-ping" />
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-t from-yellow-300 to-white rounded-full animate-pulse delay-100" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
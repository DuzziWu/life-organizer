import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard'
import { LogOut, Settings, Plus } from 'lucide-react'

export function DashboardPage() {
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-black/20 border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                LIFE<span className="text-cyan-400">_ORG</span>
              </h1>
              <span className="text-gray-400 text-sm">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">
                Willkommen, {profile?.full_name || user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 
                         border border-white/10 rounded-lg transition-all duration-200
                         text-gray-300 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span>Abmelden</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <LiquidGlassCard className="p-6 md:col-span-2 lg:col-span-3">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Willkommen in deinem Life Organizer
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Dein personalisiertes Dashboard ist bereit. Beginne damit, Widgets hinzuzufügen, um dein Leben zu organisieren.
              </p>
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 
                               hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl
                               transition-all duration-300 shadow-lg shadow-cyan-500/25">
                <Plus className="w-5 h-5" />
                <span>Dein erstes Widget hinzufügen</span>
              </button>
            </div>
          </LiquidGlassCard>

          {/* Quick Stats */}
          <LiquidGlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Widgets</h3>
                <p className="text-3xl font-bold text-cyan-400">0</p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Dashboards</h3>
                <p className="text-3xl font-bold text-emerald-400">1</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Account</h3>
                <p className="text-sm text-gray-400">Aktiv</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Widget Area Placeholder */}
        <div className="mt-8">
          <LiquidGlassCard className="p-12">
            <div className="text-center text-gray-400">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-2xl flex items-center justify-center">
                <Plus className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Noch keine Widgets</h3>
              <p className="text-gray-400 mb-6">
                Beginne dein Leben zu organisieren, indem du dein erstes Widget hinzufügst
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 
                               hover:from-purple-400 hover:to-pink-500 text-white font-semibold rounded-xl
                               transition-all duration-300 shadow-lg shadow-purple-500/25">
                Widget-Galerie durchsuchen
              </button>
            </div>
          </LiquidGlassCard>
        </div>
      </main>
    </div>
  )
}
import React from 'react'
import { useWidget } from '../contexts/WidgetContext'
import { CollapsibleSidebar } from '../components/layout/CollapsibleSidebar'
import { WidgetPageView } from '../components/layout/WidgetPageView'
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard'
import { Plus, BookOpen, Sparkles } from 'lucide-react'

export function DashboardPage() {
  const { 
    dashboardMode, 
    sidebarState,
    createWidgetPage, 
    getWidgetTemplates 
  } = useWidget()

  const handleCreateFirstPage = async () => {
    try {
      await createWidgetPage('Meine erste Seite', 'Eine personalisierte Widget-Sammlung')
    } catch (error) {
      console.error('Fehler beim Erstellen der Widget-Seite:', error)
    }
  }

  // Show Widget Page if user has a main page, otherwise show Welcome Dashboard
  if (dashboardMode.type === 'widget-page') {
    return (
      <div className="relative">
        <CollapsibleSidebar />
        <WidgetPageView />
      </div>
    )
  }

  // Welcome Dashboard (no widget pages created yet)
  const isExpanded = !sidebarState.isCollapsed || sidebarState.isHovered || sidebarState.isPinned
  
  return (
    <div className="relative flex">
      <CollapsibleSidebar />
      
      {/* Main Welcome Content */}
      <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="mb-12">
            <LiquidGlassCard className="p-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="w-16 h-16 text-cyan-400" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Willkommen in deinem Life Organizer
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  Erstelle deine erste Widget-Seite und organisiere dein Leben mit personalisierbaren Widgets. 
                  Jede Seite ist wie eine Seite in deinem digitalen Notizbuch.
                </p>
                <button
                  onClick={handleCreateFirstPage}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 
                           hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl
                           transition-all duration-300 shadow-lg shadow-cyan-500/25 text-lg"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>Meine erste Widget-Seite erstellen</span>
                </button>
              </div>
            </LiquidGlassCard>
          </div>

          {/* Features Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Verfügbare Widgets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getWidgetTemplates().map(template => (
                <LiquidGlassCard key={template.type} className="p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{template.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {template.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {template.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                        {template.category}
                      </span>
                    </div>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mb-12">
            <LiquidGlassCard className="p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                So funktioniert es
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl 
                                  flex items-center justify-center border border-cyan-500/30">
                    <BookOpen className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Seite erstellen</h3>
                  <p className="text-gray-400 text-sm">
                    Erstelle Widget-Seiten wie Seiten in einem Notizbuch. Jede Seite kann ein anderes Thema haben.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl 
                                  flex items-center justify-center border border-emerald-500/30">
                    <Plus className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Widgets hinzufügen</h3>
                  <p className="text-gray-400 text-sm">
                    Füge Widgets hinzu und arrangiere sie nach deinen Wünschen. Resize und positioniere sie frei.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl 
                                  flex items-center justify-center border border-purple-500/30">
                    <Sparkles className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Hauptseite festlegen</h3>
                  <p className="text-gray-400 text-sm">
                    Wähle eine Seite als Hauptseite aus. Diese wird im Vollbild angezeigt wenn du dich anmeldest.
                  </p>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </main>
      </div>
    </div>
  )
}
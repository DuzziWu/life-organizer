import React from 'react'
import { 
  LayoutDashboard, 
  Grid3X3, 
  Settings, 
  LogOut, 
  User, 
  Plus,
  Pin,
  PinOff,
  BookOpen
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useWidget } from '../../contexts/WidgetContext'

export function CollapsibleSidebar() {
  const { user, profile, signOut } = useAuth()
  const { 
    sidebarState, 
    setSidebarHovered, 
    setSidebarPinned,
    dashboardMode,
    widgetPages,
    currentPage,
    switchToPage,
    createWidgetPage
  } = useWidget()

  const isExpanded = !sidebarState.isCollapsed || sidebarState.isHovered || sidebarState.isPinned
  
  const handleSignOut = async () => {
    await signOut()
  }

  const handleMouseEnter = () => {
    if (sidebarState.isCollapsed && !sidebarState.isPinned) {
      setSidebarHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (sidebarState.isCollapsed && !sidebarState.isPinned) {
      setSidebarHovered(false)
    }
  }

  const togglePin = () => {
    setSidebarPinned(!sidebarState.isPinned)
  }

  const handleCreatePage = async () => {
    try {
      await createWidgetPage('Neue Widget-Seite', 'Eine weitere personalisierte Widget-Sammlung')
    } catch (error) {
      console.error('Fehler beim Erstellen der Widget-Seite:', error)
    }
  }

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-16'
      } bg-black/40 backdrop-blur-xl border-r border-white/10`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          {isExpanded ? (
            <>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                LIFE<span className="text-cyan-400">_ORG</span>
              </h1>
              {sidebarState.isCollapsed && (
                <button
                  onClick={togglePin}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  title={sidebarState.isPinned ? 'Sidebar lösen' : 'Sidebar anheften'}
                >
                  {sidebarState.isPinned ? (
                    <PinOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Pin className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              )}
            </>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LO</span>
            </div>
          )}
        </div>

        {/* User Profile Section */}
        {isExpanded && (
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-medium truncate">{profile?.full_name || 'User'}</p>
                <p className="text-gray-400 text-sm truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {/* Dashboard/Welcome */}
          <button
            onClick={() => {
              if (dashboardMode.type === 'widget-page' && currentPage) {
                // If we're on a widget page, this shows welcome
                window.location.reload() // Temporary - should use proper navigation
              }
            }}
            className={`flex items-center w-full px-3 py-3 rounded-xl font-medium transition-all duration-200 ${
              dashboardMode.type === 'welcome'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title={isExpanded ? undefined : 'Dashboard'}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="ml-3">Dashboard</span>}
          </button>

          {/* Widget Pages */}
          {widgetPages.length > 0 && (
            <>
              {isExpanded && (
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Widget-Seiten
                  </p>
                </div>
              )}
              
              {widgetPages.map(page => (
                <button
                  key={page.id}
                  onClick={() => switchToPage(page.id)}
                  className={`flex items-center w-full px-3 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentPage?.id === page.id
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={isExpanded ? undefined : page.name}
                >
                  <BookOpen className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && (
                    <div className="ml-3 min-w-0 flex-1 text-left">
                      <p className="truncate">{page.name}</p>
                      {page.is_main && (
                        <p className="text-xs text-gray-500">Hauptseite</p>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </>
          )}

          {/* Divider */}
          <div className="py-2">
            <div className="border-t border-white/10" />
          </div>

          {/* Create New Page */}
          <button
            onClick={handleCreatePage}
            className="flex items-center w-full px-3 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all duration-200"
            title={isExpanded ? undefined : 'Neue Seite erstellen'}
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="ml-3">Neue Seite</span>}
          </button>

          {/* Widget Gallery */}
          <button
            className="flex items-center w-full px-3 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all duration-200"
            title={isExpanded ? undefined : 'Widget-Galerie'}
          >
            <Grid3X3 className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="ml-3">Widget-Galerie</span>}
          </button>

          {/* Settings */}
          <button
            className="flex items-center w-full px-3 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all duration-200"
            title={isExpanded ? undefined : 'Einstellungen'}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="ml-3">Einstellungen</span>}
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-2 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-3 py-3 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-xl font-medium transition-all duration-200"
            title={isExpanded ? undefined : 'Abmelden'}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="ml-3">Abmelden</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}
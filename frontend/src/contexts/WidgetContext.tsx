import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { WidgetPage, Widget, WidgetTemplate, WidgetType, WidgetCategory, DashboardMode, SidebarState } from '../types/widget'
import { useAuth } from './AuthContext'

interface WidgetContextType {
  // Widget Pages
  widgetPages: WidgetPage[]
  currentPage: WidgetPage | null
  mainPage: WidgetPage | null
  
  // Dashboard Mode
  dashboardMode: DashboardMode
  
  // Sidebar State
  sidebarState: SidebarState
  
  // Actions
  createWidgetPage: (name: string, description?: string) => Promise<WidgetPage>
  updateWidgetPage: (pageId: string, updates: Partial<WidgetPage>) => Promise<void>
  deleteWidgetPage: (pageId: string) => Promise<void>
  setMainPage: (pageId: string) => Promise<void>
  switchToPage: (pageId: string) => void
  
  // Widget Actions
  addWidget: (pageId: string, widgetType: WidgetType, position?: { x: number, y: number }) => Promise<Widget>
  updateWidget: (pageId: string, widgetId: string, updates: Partial<Widget>) => Promise<void>
  removeWidget: (pageId: string, widgetId: string) => Promise<void>
  moveWidget: (pageId: string, widgetId: string, newPosition: { x: number, y: number, w: number, h: number }) => Promise<void>
  
  // Sidebar Actions
  setSidebarCollapsed: (collapsed: boolean) => void
  setSidebarHovered: (hovered: boolean) => void
  setSidebarPinned: (pinned: boolean) => void
  
  // Widget Templates
  getWidgetTemplates: () => WidgetTemplate[]
  getWidgetTemplate: (type: WidgetType) => WidgetTemplate | undefined
  
  // Loading States
  loading: boolean
  error: string | null
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined)

export function useWidget() {
  const context = useContext(WidgetContext)
  if (context === undefined) {
    throw new Error('useWidget must be used within a WidgetProvider')
  }
  return context
}

interface WidgetProviderProps {
  children: ReactNode
}

export function WidgetProvider({ children }: WidgetProviderProps) {
  const { user } = useAuth()
  const [widgetPages, setWidgetPages] = useState<WidgetPage[]>([])
  const [currentPage, setCurrentPage] = useState<WidgetPage | null>(null)
  const [dashboardMode, setDashboardMode] = useState<DashboardMode>({ type: 'welcome' })
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    isCollapsed: false,
    isHovered: false,
    isPinned: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get main page
  const mainPage = widgetPages.find(page => page.is_main) || null

  // Load widget pages when user changes
  useEffect(() => {
    if (user) {
      loadWidgetPages()
    } else {
      setWidgetPages([])
      setCurrentPage(null)
      setDashboardMode({ type: 'welcome' })
    }
  }, [user])

  // Set dashboard mode based on main page
  useEffect(() => {
    if (mainPage) {
      setDashboardMode({ type: 'widget-page', currentPageId: mainPage.id })
      setCurrentPage(mainPage)
      // Auto-collapse sidebar when there's a main page
      setSidebarState(prev => ({ ...prev, isCollapsed: true }))
    } else {
      setDashboardMode({ type: 'welcome' })
      setCurrentPage(null)
      // Keep sidebar expanded when in welcome mode for better UX
      setSidebarState(prev => ({ ...prev, isCollapsed: false }))
    }
  }, [mainPage])

  const loadWidgetPages = async () => {
    if (!user) return
    
    setLoading(true)
    setError(null)

    try {
      // TODO: Implement API call to load widget pages
      // For now, simulate empty state
      setWidgetPages([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Widget-Seiten')
    } finally {
      setLoading(false)
    }
  }

  const createWidgetPage = async (name: string, description?: string): Promise<WidgetPage> => {
    if (!user) throw new Error('User not authenticated')

    const newPage: WidgetPage = {
      id: `page_${Date.now()}`, // TODO: Use proper UUID
      user_id: user.id,
      name,
      description,
      widgets: [],
      grid_config: {
        cols: 9, // 9-column grid for more flexible widget positioning
        rows: 8,
        gap: 16,
        compact: false,
        breakpoints: {
          lg: 1200,
          md: 996,
          sm: 768,
          xs: 480
        }
      },
      is_main: widgetPages.length === 0, // First page becomes main automatically
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // TODO: Implement API call to create widget page
    setWidgetPages(prev => [...prev, newPage])
    
    return newPage
  }

  const updateWidgetPage = async (pageId: string, updates: Partial<WidgetPage>) => {
    // TODO: Implement API call
    setWidgetPages(prev =>
      prev.map(page =>
        page.id === pageId
          ? { ...page, ...updates, updated_at: new Date().toISOString() }
          : page
      )
    )
  }

  const deleteWidgetPage = async (pageId: string) => {
    // TODO: Implement API call
    setWidgetPages(prev => prev.filter(page => page.id !== pageId))
    
    if (currentPage?.id === pageId) {
      setCurrentPage(null)
    }
  }

  const setMainPage = async (pageId: string) => {
    // Remove main flag from all pages
    setWidgetPages(prev =>
      prev.map(page => ({
        ...page,
        is_main: page.id === pageId,
        updated_at: new Date().toISOString()
      }))
    )
  }

  const switchToPage = (pageId: string) => {
    const page = widgetPages.find(p => p.id === pageId)
    if (page) {
      setCurrentPage(page)
      setDashboardMode({ type: 'widget-page', currentPageId: pageId })
    }
  }

  const addWidget = async (pageId: string, widgetType: WidgetType, position?: { x: number, y: number }): Promise<Widget> => {
    const template = getWidgetTemplate(widgetType)
    if (!template) throw new Error(`Widget template for ${widgetType} not found`)

    const newWidget: Widget = {
      id: `widget_${Date.now()}`, // TODO: Use proper UUID
      type: widgetType,
      position: {
        x: position?.x || 0,
        y: position?.y || 0,
        w: template.default_size.w,
        h: template.default_size.h
      },
      config: { ...template.default_config },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // TODO: Implement API call
    setWidgetPages(prev =>
      prev.map(page =>
        page.id === pageId
          ? {
              ...page,
              widgets: [...page.widgets, newWidget],
              updated_at: new Date().toISOString()
            }
          : page
      )
    )

    return newWidget
  }

  const updateWidget = async (pageId: string, widgetId: string, updates: Partial<Widget>) => {
    // TODO: Implement API call
    setWidgetPages(prev =>
      prev.map(page =>
        page.id === pageId
          ? {
              ...page,
              widgets: page.widgets.map(widget =>
                widget.id === widgetId
                  ? { ...widget, ...updates, updated_at: new Date().toISOString() }
                  : widget
              ),
              updated_at: new Date().toISOString()
            }
          : page
      )
    )
  }

  const removeWidget = async (pageId: string, widgetId: string) => {
    // TODO: Implement API call
    setWidgetPages(prev =>
      prev.map(page =>
        page.id === pageId
          ? {
              ...page,
              widgets: page.widgets.filter(widget => widget.id !== widgetId),
              updated_at: new Date().toISOString()
            }
          : page
      )
    )
  }

  const moveWidget = async (pageId: string, widgetId: string, newPosition: { x: number, y: number, w: number, h: number }) => {
    await updateWidget(pageId, widgetId, { position: newPosition })
  }

  const setSidebarCollapsed = (collapsed: boolean) => {
    setSidebarState(prev => ({ ...prev, isCollapsed: collapsed }))
  }

  const setSidebarHovered = (hovered: boolean) => {
    setSidebarState(prev => ({ ...prev, isHovered: hovered }))
  }

  const setSidebarPinned = (pinned: boolean) => {
    setSidebarState(prev => ({ ...prev, isPinned: pinned }))
    // If pinned, also uncollapse
    if (pinned) {
      setSidebarState(prev => ({ ...prev, isCollapsed: false }))
    }
  }

  const getWidgetTemplates = (): WidgetTemplate[] => {
    return [
      {
        type: WidgetType.WEATHER,
        name: 'Wetter',
        description: 'Lokale Wettervorhersage mit verschiedenen Größen',
        icon: '🌤️',
        category: WidgetCategory.UTILITIES,
        default_size: { w: 3, h: 1 }, // Medium size as default
        min_size: { w: 1, h: 1 }, // Small size
        max_size: { w: 3, h: 3 }, // Large size
        resizable: true,
        configurable: true,
        default_config: {
          location: 'auto',
          units: 'metric',
          showForecast: true,
          days: 4,
          updateInterval: 30,
          showDetails: true
        }
      },
      {
        type: WidgetType.CLOCK,
        name: 'Uhr & Datum',
        description: 'Zeigt aktuelle Zeit und Datum an',
        icon: '🕐',
        category: WidgetCategory.UTILITIES,
        default_size: { w: 2, h: 1 },
        min_size: { w: 1, h: 1 },
        max_size: { w: 3, h: 2 },
        resizable: true,
        configurable: true,
        default_config: {
          showSeconds: true,
          format24h: true,
          showDate: true,
          timezone: 'Europe/Berlin'
        }
      },
      {
        type: WidgetType.NOTES,
        name: 'Notizen',
        description: 'Quick Notes und Erinnerungen',
        icon: '📝',
        category: WidgetCategory.PRODUCTIVITY,
        default_size: { w: 2, h: 2 },
        min_size: { w: 1, h: 1 },
        max_size: { w: 3, h: 3 },
        resizable: true,
        configurable: true,
        default_config: {
          title: 'Meine Notizen',
          allowMarkdown: true,
          fontSize: 'medium'
        }
      },
      {
        type: WidgetType.TODO,
        name: 'To-Do Liste',
        description: 'Aufgaben verwalten und abhaken',
        icon: '✅',
        category: WidgetCategory.PRODUCTIVITY,
        default_size: { w: 2, h: 3 },
        min_size: { w: 1, h: 2 },
        max_size: { w: 3, h: 3 },
        resizable: true,
        configurable: true,
        default_config: {
          title: 'Aufgaben',
          showCompleted: false,
          maxItems: 10
        }
      }
    ]
  }

  const getWidgetTemplate = (type: WidgetType): WidgetTemplate | undefined => {
    return getWidgetTemplates().find(template => template.type === type)
  }

  const value: WidgetContextType = {
    widgetPages,
    currentPage,
    mainPage,
    dashboardMode,
    sidebarState,
    createWidgetPage,
    updateWidgetPage,
    deleteWidgetPage,
    setMainPage,
    switchToPage,
    addWidget,
    updateWidget,
    removeWidget,
    moveWidget,
    setSidebarCollapsed,
    setSidebarHovered,
    setSidebarPinned,
    getWidgetTemplates,
    getWidgetTemplate,
    loading,
    error
  }

  return (
    <WidgetContext.Provider value={value}>
      {children}
    </WidgetContext.Provider>
  )
}
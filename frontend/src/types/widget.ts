// Widget System Types for Life Organizer

export interface WidgetPosition {
  x: number
  y: number
  w: number // width in grid units
  h: number // height in grid units
}

export interface WidgetConfig {
  [key: string]: any
}

export interface Widget {
  id: string
  type: WidgetType
  position: WidgetPosition
  config: WidgetConfig
  created_at: string
  updated_at: string
}

export enum WidgetType {
  CLOCK = 'clock',
  NOTES = 'notes',
  TODO = 'todo',
  WEATHER = 'weather',
  CALENDAR = 'calendar',
  MAIL = 'mail',
  NEWS = 'news',
  HABITS = 'habits',
  FINANCE = 'finance',
  MUSIC = 'music',
  FILES = 'files'
}

export interface WidgetPage {
  id: string
  user_id: string
  name: string
  description?: string
  widgets: Widget[]
  grid_config: GridConfig
  is_main: boolean
  created_at: string
  updated_at: string
}

export interface GridConfig {
  cols: number
  rows: number
  gap: number
  compact: boolean
  breakpoints: {
    lg: number
    md: number
    sm: number
    xs: number
  }
}

export interface WidgetTemplate {
  type: WidgetType
  name: string
  description: string
  icon: string
  category: WidgetCategory
  default_size: Pick<WidgetPosition, 'w' | 'h'>
  default_config: WidgetConfig
  min_size: Pick<WidgetPosition, 'w' | 'h'>
  max_size?: Pick<WidgetPosition, 'w' | 'h'>
  resizable: boolean
  configurable: boolean
}

export enum WidgetCategory {
  PRODUCTIVITY = 'productivity',
  COMMUNICATION = 'communication',
  ENTERTAINMENT = 'entertainment',
  UTILITIES = 'utilities',
  HEALTH = 'health',
  FINANCE = 'finance',
  SOCIAL = 'social'
}

export interface SidebarState {
  isCollapsed: boolean
  isHovered: boolean
  isPinned: boolean
}

export interface DashboardMode {
  type: 'welcome' | 'widget-page'
  currentPageId?: string
}
// Database types for Life Organizer
// Auto-generated from Supabase schema

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          preferences: {
            theme?: 'light' | 'dark'
            language?: string
            timezone?: string
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          preferences?: {
            theme?: 'light' | 'dark'
            language?: string
            timezone?: string
          }
        }
        Update: {
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          preferences?: {
            theme?: 'light' | 'dark'
            language?: string
            timezone?: string
          }
        }
      }
      dashboards: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_default: boolean
          layout_config: {
            columns?: number
            gap?: number
            padding?: number
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          description?: string | null
          is_default?: boolean
          layout_config?: {
            columns?: number
            gap?: number
            padding?: number
          }
        }
        Update: {
          name?: string
          description?: string | null
          is_default?: boolean
          layout_config?: {
            columns?: number
            gap?: number
            padding?: number
          }
        }
      }
      widgets: {
        Row: {
          id: string
          user_id: string
          dashboard_id: string
          type: string
          title: string | null
          position: {
            x: number
            y: number
            w: number
            h: number
          }
          config: Record<string, any>
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          dashboard_id: string
          type: string
          title?: string | null
          position: {
            x: number
            y: number
            w: number
            h: number
          }
          config?: Record<string, any>
          is_active?: boolean
        }
        Update: {
          type?: string
          title?: string | null
          position?: {
            x: number
            y: number
            w: number
            h: number
          }
          config?: Record<string, any>
          is_active?: boolean
        }
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          type: string
          name: string | null
          config: Record<string, any>
          credentials: Record<string, any> | null
          is_active: boolean
          last_sync: string | null
          sync_frequency: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          type: string
          name?: string | null
          config: Record<string, any>
          credentials?: Record<string, any> | null
          is_active?: boolean
          sync_frequency?: number
        }
        Update: {
          type?: string
          name?: string | null
          config?: Record<string, any>
          credentials?: Record<string, any> | null
          is_active?: boolean
          last_sync?: string | null
          sync_frequency?: number
        }
      }
      widget_data: {
        Row: {
          id: string
          widget_id: string
          user_id: string
          type: string
          title: string | null
          content: Record<string, any>
          metadata: Record<string, any>
          is_completed: boolean
          priority: number
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          widget_id: string
          user_id: string
          type: string
          title?: string | null
          content?: Record<string, any>
          metadata?: Record<string, any>
          is_completed?: boolean
          priority?: number
          due_date?: string | null
        }
        Update: {
          type?: string
          title?: string | null
          content?: Record<string, any>
          metadata?: Record<string, any>
          is_completed?: boolean
          priority?: number
          due_date?: string | null
        }
      }
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Dashboard = Database['public']['Tables']['dashboards']['Row']
export type Widget = Database['public']['Tables']['widgets']['Row']
export type Integration = Database['public']['Tables']['integrations']['Row']
export type WidgetData = Database['public']['Tables']['widget_data']['Row']

export type InsertProfile = Database['public']['Tables']['profiles']['Insert']
export type InsertDashboard = Database['public']['Tables']['dashboards']['Insert']
export type InsertWidget = Database['public']['Tables']['widgets']['Insert']
export type InsertIntegration = Database['public']['Tables']['integrations']['Insert']
export type InsertWidgetData = Database['public']['Tables']['widget_data']['Insert']

export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type UpdateDashboard = Database['public']['Tables']['dashboards']['Update']
export type UpdateWidget = Database['public']['Tables']['widgets']['Update']
export type UpdateIntegration = Database['public']['Tables']['integrations']['Update']
export type UpdateWidgetData = Database['public']['Tables']['widget_data']['Update']
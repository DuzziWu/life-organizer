import React from 'react'
import { Widget } from '../../types/widget'
import { WeatherWidget } from './WeatherWidget'
import { WeatherSize } from '../../types/weather'

interface WidgetRendererProps {
  widget: Widget
  onConfigChange?: (widgetId: string, newConfig: any) => void
}

function getWidgetSize(w: number, h: number): WeatherSize {
  // Determine widget size based on grid dimensions
  if (w === 1 && h === 1) return 'small'   // 1×1 (135×135px)
  if (w === 3 && h === 1) return 'medium'  // 1×3 (135×405px)
  if (w === 3 && h === 3) return 'large'   // 3×3 (405×405px)
  
  // Default mapping for other sizes
  if (w <= 1) return 'small'
  if (h <= 1) return 'medium'
  return 'large'
}

export function WidgetRenderer({ widget, onConfigChange }: WidgetRendererProps) {
  const handleConfigChange = (newConfig: any) => {
    if (onConfigChange) {
      onConfigChange(widget.id, newConfig)
    }
  }

  switch (widget.type) {
    case 'weather':
      const size = getWidgetSize(widget.position.w, widget.position.h)
      return (
        <WeatherWidget
          size={size}
          config={widget.config}
          onConfigChange={handleConfigChange}
        />
      )
    
    case 'clock':
      return (
        <div className="h-full flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
          <div className="text-center">
            <div className="text-4xl mb-2">🕐</div>
            <p className="text-white font-medium">Uhr Widget</p>
            <p className="text-xs text-gray-400">Kommt bald...</p>
          </div>
        </div>
      )
    
    case 'notes':
      return (
        <div className="h-full flex items-center justify-center bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg border border-emerald-500/30">
          <div className="text-center">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-white font-medium">Notizen Widget</p>
            <p className="text-xs text-gray-400">Kommt bald...</p>
          </div>
        </div>
      )
    
    case 'todo':
      return (
        <div className="h-full flex items-center justify-center bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
          <div className="text-center">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-white font-medium">Todo Widget</p>
            <p className="text-xs text-gray-400">Kommt bald...</p>
          </div>
        </div>
      )
    
    default:
      return (
        <div className="h-full flex items-center justify-center bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-lg border border-gray-500/30">
          <div className="text-center">
            <div className="text-4xl mb-2">❓</div>
            <p className="text-white font-medium">Unbekanntes Widget</p>
            <p className="text-xs text-gray-400">{widget.type}</p>
          </div>
        </div>
      )
  }
}
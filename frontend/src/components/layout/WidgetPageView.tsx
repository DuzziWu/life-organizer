import React, { useState, useRef, useCallback } from 'react'
import { useWidget } from '../../contexts/WidgetContext'
import { LiquidGlassCard } from '../ui/LiquidGlassCard'
import { WidgetRenderer } from '../widgets/WidgetRenderer'
import { CitySelector } from '../widgets/weather/CitySelector'
import { Plus, Settings, Edit3, Trash2, Maximize, Minimize, Square, Move } from 'lucide-react'

export function WidgetPageView() {
  const { currentPage, addWidget, updateWidget, removeWidget, getWidgetTemplates, getWidgetTemplate } = useWidget()
  const [widgetSettingsOpen, setWidgetSettingsOpen] = useState<string | null>(null)
  
  // Drag & Drop State
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null)
  const [dragOverPosition, setDragOverPosition] = useState<{ x: number, y: number } | null>(null)
  const [dragPreview, setDragPreview] = useState<{ x: number, y: number, w: number, h: number } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const handleAddWidget = async (widgetType: any) => {
    if (currentPage) {
      try {
        // Get widget template to determine size
        const template = getWidgetTemplate(widgetType)
        const widgetWidth = template?.default_size.w || 3
        const widgetHeight = template?.default_size.h || 1
        
        // Find empty position that can fit this widget size
        const position = findEmptyPosition(widgetWidth, widgetHeight)
        await addWidget(currentPage.id, widgetType, position)
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Widgets:', error)
      }
    }
  }

  const findEmptyPosition = (widgetWidth: number = 3, widgetHeight: number = 1) => {
    // Find first available spot that can fit the widget size
    const occupiedPositions = currentPage?.widgets.map(w => ({
      x: w.position.x,
      y: w.position.y,
      w: w.position.w,
      h: w.position.h
    })) || []

    const maxCols = currentPage?.grid_config.cols || 9
    const maxRows = currentPage?.grid_config.rows || 8

    // Start from top-left and find first available position
    for (let y = 0; y <= maxRows - widgetHeight; y++) {
      for (let x = 0; x <= maxCols - widgetWidth; x++) {
        // Check if all cells for this widget are free
        let canPlace = true
        for (let checkY = y; checkY < y + widgetHeight; checkY++) {
          for (let checkX = x; checkX < x + widgetWidth; checkX++) {
            const isOccupied = occupiedPositions.some(pos => 
              checkX >= pos.x && checkX < pos.x + pos.w &&
              checkY >= pos.y && checkY < pos.y + pos.h
            )
            if (isOccupied) {
              canPlace = false
              break
            }
          }
          if (!canPlace) break
        }
        
        if (canPlace) {
          return { x, y }
        }
      }
    }
    return { x: 0, y: 0 } // Fallback - place at origin (may overlap)
  }

  // Drag & Drop Functions
  const getGridPositionFromMouseEvent = useCallback((e: React.DragEvent | React.MouseEvent) => {
    if (!gridRef.current || !currentPage) return null

    const gridRect = gridRef.current.getBoundingClientRect()
    const cellSize = 135
    const gap = 12
    
    const relativeX = e.clientX - gridRect.left
    const relativeY = e.clientY - gridRect.top
    
    const gridX = Math.floor(relativeX / (cellSize + gap))
    const gridY = Math.floor(relativeY / (cellSize + gap))
    
    // Ensure position is within bounds
    const maxX = currentPage.grid_config.cols - 1
    const maxY = currentPage.grid_config.rows - 1
    
    return {
      x: Math.max(0, Math.min(gridX, maxX)),
      y: Math.max(0, Math.min(gridY, maxY))
    }
  }, [currentPage])

  const canPlaceWidgetAt = useCallback((x: number, y: number, w: number, h: number, excludeWidgetId?: string) => {
    if (!currentPage) return false

    // Check grid bounds
    if (x < 0 || y < 0 || x + w > currentPage.grid_config.cols || y + h > currentPage.grid_config.rows) {
      return false
    }

    // Check for overlaps with other widgets
    const otherWidgets = currentPage.widgets.filter(widget => widget.id !== excludeWidgetId)
    
    for (const widget of otherWidgets) {
      const overlap = !(
        x + w <= widget.position.x ||
        x >= widget.position.x + widget.position.w ||
        y + h <= widget.position.y ||
        y >= widget.position.y + widget.position.h
      )
      
      if (overlap) return false
    }

    return true
  }, [currentPage])

  const handleDragStart = useCallback((e: React.DragEvent, widgetId: string) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', widgetId)
    
    const widget = currentPage?.widgets.find(w => w.id === widgetId)
    if (widget) {
      setDraggedWidget(widgetId)
      setDragPreview({
        x: widget.position.x,
        y: widget.position.y,
        w: widget.position.w,
        h: widget.position.h
      })
    }
  }, [currentPage])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    if (!draggedWidget) return

    const gridPos = getGridPositionFromMouseEvent(e)
    if (!gridPos) return

    const widget = currentPage?.widgets.find(w => w.id === draggedWidget)
    if (!widget) return

    // Check if we can place the widget at this position
    if (canPlaceWidgetAt(gridPos.x, gridPos.y, widget.position.w, widget.position.h, draggedWidget)) {
      setDragOverPosition(gridPos)
      setDragPreview({
        x: gridPos.x,
        y: gridPos.y,
        w: widget.position.w,
        h: widget.position.h
      })
    } else {
      setDragOverPosition(null)
    }
  }, [draggedWidget, currentPage, getGridPositionFromMouseEvent, canPlaceWidgetAt])

  const handleDragEnd = useCallback(() => {
    setDraggedWidget(null)
    setDragOverPosition(null)
    setDragPreview(null)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    
    const widgetId = e.dataTransfer.getData('text/plain')
    if (!widgetId || !dragOverPosition || !currentPage) return

    const widget = currentPage.widgets.find(w => w.id === widgetId)
    if (!widget) return

    // Update widget position
    try {
      await updateWidget(currentPage.id, widgetId, {
        position: {
          ...widget.position,
          x: dragOverPosition.x,
          y: dragOverPosition.y
        }
      })
    } catch (error) {
      console.error('Fehler beim Verschieben des Widgets:', error)
    }

    handleDragEnd()
  }, [dragOverPosition, currentPage, updateWidget, handleDragEnd])

  const handleWidgetConfigChange = (widgetId: string, newConfig: any) => {
    if (currentPage) {
      updateWidget(currentPage.id, widgetId, { config: newConfig })
    }
  }

  const handleDeleteWidget = async (widgetId: string) => {
    if (currentPage && window.confirm('Widget wirklich löschen?')) {
      try {
        await removeWidget(currentPage.id, widgetId)
      } catch (error) {
        console.error('Fehler beim Löschen des Widgets:', error)
      }
    }
  }

  const handleResizeWidget = async (widgetId: string, newSize: 'small' | 'medium' | 'large') => {
    if (!currentPage) return

    const widget = currentPage.widgets.find(w => w.id === widgetId)
    const template = getWidgetTemplate(widget?.type as any)
    
    if (!widget || !template) return

    let newPosition = { ...widget.position }

    // Map sizes to grid dimensions
    switch (newSize) {
      case 'small':
        newPosition.w = 1
        newPosition.h = 1
        break
      case 'medium':
        newPosition.w = 3
        newPosition.h = 1
        break
      case 'large':
        newPosition.w = 3
        newPosition.h = 3
        break
    }

    // Check if new size fits at current position without overlapping
    const maxX = (currentPage.grid_config.cols || 9) - newPosition.w
    const maxY = (currentPage.grid_config.rows || 8) - newPosition.h
    
    // Adjust position to fit within grid bounds
    if (newPosition.x > maxX) newPosition.x = maxX
    if (newPosition.y > maxY) newPosition.y = maxY
    if (newPosition.x < 0) newPosition.x = 0
    if (newPosition.y < 0) newPosition.y = 0

    // Check for collisions with other widgets and resolve them
    const updatedWidgets = await resolveWidgetCollisions(widgetId, newPosition)

    try {
      // Update all affected widgets in batch
      for (const updatedWidget of updatedWidgets) {
        await updateWidget(currentPage.id, updatedWidget.id, { position: updatedWidget.position })
      }
    } catch (error) {
      console.error('Fehler beim Resize des Widgets:', error)
    }
  }

  const resolveWidgetCollisions = async (resizedWidgetId: string, newPosition: { x: number, y: number, w: number, h: number }) => {
    const otherWidgets = currentPage!.widgets.filter(w => w.id !== resizedWidgetId)
    const updatedWidgets = [{ id: resizedWidgetId, position: newPosition }]

    // Find all widgets that would collide with the resized widget
    const collidingWidgets = otherWidgets.filter(widget => {
      return isColliding(newPosition, widget.position)
    })

    // Move colliding widgets to new positions
    for (const collidingWidget of collidingWidgets) {
      const newPos = findEmptyPositionForWidget(collidingWidget, updatedWidgets)
      updatedWidgets.push({ id: collidingWidget.id, position: newPos })
    }

    return updatedWidgets
  }

  const isColliding = (pos1: { x: number, y: number, w: number, h: number }, pos2: { x: number, y: number, w: number, h: number }) => {
    return !(pos1.x + pos1.w <= pos2.x || 
             pos2.x + pos2.w <= pos1.x || 
             pos1.y + pos1.h <= pos2.y || 
             pos2.y + pos2.h <= pos1.y)
  }

  const findEmptyPositionForWidget = (widget: any, occupiedPositions: { id: string, position: { x: number, y: number, w: number, h: number } }[]) => {
    const maxCols = currentPage?.grid_config.cols || 9
    const maxRows = currentPage?.grid_config.rows || 8
    const widgetW = widget.position.w
    const widgetH = widget.position.h

    // Start from top-left and find first available position
    for (let y = 0; y <= maxRows - widgetH; y++) {
      for (let x = 0; x <= maxCols - widgetW; x++) {
        const testPosition = { x, y, w: widgetW, h: widgetH }
        
        // Check if this position collides with any occupied position
        const hasCollision = occupiedPositions.some(occupied => 
          isColliding(testPosition, occupied.position)
        )
        
        if (!hasCollision) {
          return testPosition
        }
      }
    }
    
    // If no position found, place at bottom
    return { x: 0, y: maxRows, w: widgetW, h: widgetH }
  }

  if (!currentPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <LiquidGlassCard className="p-8 max-w-md">
          <div className="text-center text-gray-400">
            <p>Keine Widget-Seite ausgewählt</p>
          </div>
        </LiquidGlassCard>
      </div>
    )
  }

  const hasWidgets = currentPage.widgets.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Floating Header - zentriert unten */}
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
        hasWidgets ? 'opacity-0 hover:opacity-100' : 'opacity-100'
      }`}>
        <LiquidGlassCard className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold text-white">{currentPage.name}</h1>
              {currentPage.is_main && (
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                  Hauptseite
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                title="Seite bearbeiten"
              >
                <Edit3 className="w-4 h-4 text-gray-400" />
              </button>
              <button
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                title="Seiteneinstellungen"
              >
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleAddWidget('weather')}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 
                         hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg
                         transition-all duration-300 shadow-lg shadow-cyan-500/25"
                title="Wetter-Widget hinzufügen"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Wetter</span>
              </button>
            </div>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Main Content Area */}
      <main className="p-4 ml-16">
        {hasWidgets ? (
          /* Widget Grid */
          <div 
            ref={gridRef}
            className="grid gap-3 relative"
            style={{
              gridTemplateColumns: `repeat(${currentPage.grid_config.cols}, 135px)`,
              gridTemplateRows: `repeat(${currentPage.grid_config.rows}, 135px)`,
              minHeight: '100vh',
              justifyContent: 'center',
              width: `${currentPage.grid_config.cols * 135 + (currentPage.grid_config.cols - 1) * 12}px`
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Drag Preview */}
            {dragPreview && dragOverPosition && (
              <div
                className="absolute border-2 border-cyan-400/50 bg-cyan-400/10 rounded-lg pointer-events-none z-10"
                style={{
                  gridColumn: `${dragPreview.x + 1} / span ${dragPreview.w}`,
                  gridRow: `${dragPreview.y + 1} / span ${dragPreview.h}`,
                  width: `${dragPreview.w * 135 + (dragPreview.w - 1) * 12}px`,
                  height: `${dragPreview.h * 135 + (dragPreview.h - 1) * 12}px`,
                  left: `${dragPreview.x * (135 + 12)}px`,
                  top: `${dragPreview.y * (135 + 12)}px`
                }}
              />
            )}
            {currentPage.widgets.map(widget => (
              <div
                key={widget.id}
                className={`relative group transition-opacity duration-200 ${
                  draggedWidget === widget.id ? 'opacity-50' : ''
                }`}
                style={{
                  gridColumn: `${widget.position.x + 1} / span ${widget.position.w}`,
                  gridRow: `${widget.position.y + 1} / span ${widget.position.h}`
                }}
              >
                {/* Widget Container */}
                <LiquidGlassCard className="h-full relative overflow-hidden">
                  {/* Drag Handle - sichtbar bei Hover */}
                  <div 
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    draggable
                    onDragStart={(e) => handleDragStart(e, widget.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="p-1 bg-black/50 hover:bg-black/70 rounded text-gray-300 hover:text-white transition-colors cursor-grab active:cursor-grabbing">
                      <Move className="w-3 h-3" />
                    </div>
                  </div>
                  {/* Widget Controls - nur bei Hover sichtbar */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="flex flex-col space-y-1">
                      {/* Size Controls */}
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => handleResizeWidget(widget.id, 'small')}
                          className={`p-1 rounded text-gray-300 hover:text-white transition-colors ${
                            widget.position.w === 1 && widget.position.h === 1 
                              ? 'bg-cyan-500/70' 
                              : 'bg-black/50 hover:bg-black/70'
                          }`}
                          title="Klein (1x1)"
                        >
                          <Minimize className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleResizeWidget(widget.id, 'medium')}
                          className={`p-1 rounded text-gray-300 hover:text-white transition-colors ${
                            widget.position.w === 3 && widget.position.h === 1 
                              ? 'bg-cyan-500/70' 
                              : 'bg-black/50 hover:bg-black/70'
                          }`}
                          title="Mittel (3x1)"
                        >
                          <Square className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleResizeWidget(widget.id, 'large')}
                          className={`p-1 rounded text-gray-300 hover:text-white transition-colors ${
                            widget.position.w === 3 && widget.position.h === 3 
                              ? 'bg-cyan-500/70' 
                              : 'bg-black/50 hover:bg-black/70'
                          }`}
                          title="Groß (3x3)"
                        >
                          <Maximize className="w-3 h-3" />
                        </button>
                      </div>
                      
                      {/* Action Controls */}
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => setWidgetSettingsOpen(widget.id)}
                          className="p-1 bg-black/50 hover:bg-black/70 rounded text-gray-300 hover:text-white transition-colors"
                          title="Widget-Einstellungen"
                        >
                          <Settings className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleDeleteWidget(widget.id)}
                          className="p-1 bg-black/50 hover:bg-red-500/70 rounded text-gray-300 hover:text-white transition-colors"
                          title="Widget löschen"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Widget Content */}
                  <div className={`h-full ${draggedWidget === widget.id ? 'pointer-events-none' : ''}`}>
                    <WidgetRenderer 
                      widget={widget} 
                      onConfigChange={handleWidgetConfigChange}
                    />
                  </div>
                </LiquidGlassCard>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="min-h-screen flex items-center justify-center">
            <LiquidGlassCard className="p-12 max-w-lg">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl 
                                flex items-center justify-center border border-cyan-500/30">
                  <Plus className="w-12 h-12 text-cyan-400" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">
                  {currentPage.name}
                </h2>
                
                {currentPage.description && (
                  <p className="text-gray-400 mb-6">
                    {currentPage.description}
                  </p>
                )}
                
                <p className="text-gray-400 mb-8">
                  Diese Widget-Seite ist noch leer. Füge dein erstes Widget hinzu, um zu beginnen.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {getWidgetTemplates().slice(0, 4).map(template => (
                    <button
                      key={template.type}
                      onClick={() => handleAddWidget(template.type)}
                      className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl 
                               transition-all duration-200 group"
                    >
                      <div className="text-2xl mb-2">{template.icon}</div>
                      <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                        {template.name}
                      </p>
                    </button>
                  ))}
                </div>
                
                <button
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 
                           hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl
                           transition-all duration-300 shadow-lg shadow-cyan-500/25"
                >
                  Alle Widgets anzeigen
                </button>
              </div>
            </LiquidGlassCard>
          </div>
        )}
      </main>

      {/* Central Widget Settings PopUp */}
      {widgetSettingsOpen && (() => {
        const widget = currentPage.widgets.find(w => w.id === widgetSettingsOpen)
        if (!widget) return null

        // For weather widgets, show city selector
        if (widget.type === 'weather') {
          return (
            <CitySelector
              selectedLocation={widget.config.location}
              onLocationChange={(location) => {
                handleWidgetConfigChange(widgetSettingsOpen, { ...widget.config, location })
                setWidgetSettingsOpen(null)
              }}
              onClose={() => setWidgetSettingsOpen(null)}
            />
          )
        }

        // For other widget types, we can add different settings UIs here
        return null
      })()}
    </div>
  )
}
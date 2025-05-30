import React, { useState } from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import WeatherWidget from '../widgets/WeatherWidget'
// import weitere Widgets hier, z.B.: import NotesWidget from '../widgets/NotesWidget'

export default function Dashboard() {
  const allowedSizes = [
    { w: 3, h: 2 },
    { w: 6, h: 2 },
    { w: 6, h: 4 },
  ]

  const [layout, setLayout] = useState([
    { i: 'widget-weather-1', x: 0, y: 0, w: 3, h: 2 },
  ])
  const [widgets, setWidgets] = useState([
    { id: 'widget-weather-1', type: 'weather' },
  ])
  const [editMode, setEditMode] = useState(false)
  const [openSettingsFor, setOpenSettingsFor] = useState(null)

  const addWidget = (type = 'weather') => {
    const newId = `widget-${type}-${Date.now()}`
    const newWidget = { i: newId, x: 0, y: Infinity, w: 3, h: 2 }
    setLayout((prev) => [...prev, newWidget])
    setWidgets((prev) => [...prev, { id: newId, type }])
  }

  const removeWidget = (id) => {
    setLayout((prev) => prev.filter((w) => w.i !== id))
    setWidgets((prev) => prev.filter((w) => w.id !== id))
    if (openSettingsFor === id) setOpenSettingsFor(null)
  }

  const resizeWidget = (id, direction) => {
    setLayout((prev) =>
      prev.map((item) => {
        if (item.i !== id) return item
        const currentIndex = allowedSizes.findIndex((s) => s.w === item.w && s.h === item.h)
        const newIndex = Math.min(allowedSizes.length - 1, Math.max(0, currentIndex + direction))
        return { ...item, w: allowedSizes[newIndex].w, h: allowedSizes[newIndex].h }
      })
    )
  }

  const toggleSettings = (id) => {
    setOpenSettingsFor((prev) => (prev === id ? null : id))
  }

  const getWidgetSizeLabel = (id) => {
    const current = layout.find((w) => w.i === id)
    const index = allowedSizes.findIndex((s) => s.w === current?.w && s.h === current?.h)
    return ['Klein', 'Mittel', 'Groß'][index] || 'Unbekannt'
  }

  const getSizeKey = (id) => {
    const current = layout.find((w) => w.i === id)
    const index = allowedSizes.findIndex((s) => s.w === current?.w && s.h === current?.h)
    return ['small', 'medium', 'large'][index] || 'small'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 text-center mb-4">Dein Dashboard</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => {
            setEditMode((prev) => !prev)
            setOpenSettingsFor(null)
          }}
          className={`px-4 py-2 rounded font-semibold ${
            editMode ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {editMode ? 'Bearbeitungsmodus verlassen' : 'Bearbeitungsmodus starten'}
        </button>

        {editMode && (
          <button
            onClick={() => addWidget('weather')}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
          >
            Wetter-Widget hinzufügen
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-7xl px-4">
          <GridLayout
            className="layout"
            layout={layout}
            onLayoutChange={(newLayout) => setLayout(newLayout)}
            cols={12}
            rowHeight={100}
            width={1200}
            isDraggable={editMode}
            isResizable={false}
            margin={[10, 10]}
            draggableCancel=".non-draggable"
          >
            {widgets.map((widget) => (
              <div key={widget.id} className="relative perspective">
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
                    editMode ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Vorderseite */}
                  <div className="absolute w-full h-full backface-hidden bg-gray-800 rounded-xl p-4 shadow-lg">
                    {widget.type === 'weather' && (
                      <WeatherWidget
                        openSettings={openSettingsFor === widget.id}
                        size={getSizeKey(widget.id)}
                      />
                    )}
                    {/* Hier später andere Widget-Typen einfügen */}
                  </div>

                  {/* Rückseite */}
                  <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-gray-800 rounded-xl shadow-lg flex flex-col justify-center items-center px-4 py-6">
                    <h2 className="text-2xl font-bold mb-1">{widget.type.toUpperCase()}</h2>
                    <p className="text-lg text-gray-400 mb-6">{getWidgetSizeLabel(widget.id)}</p>

                    <div className="absolute inset-0 pointer-events-none animate-fade-in-delay">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeWidget(widget.id)
                        }}
                        className="non-draggable pointer-events-auto absolute top-2 right-2 text-gray-300 hover:text-red-500 text-2xl"
                      >
                        ❌
                      </button>
                      <button
                        onClick={() => resizeWidget(widget.id, -1)}
                        disabled={getSizeKey(widget.id) === 'small'}
                        className="non-draggable pointer-events-auto absolute bottom-2 left-2 text-white text-2xl"
                      >
                        ➖
                      </button>
                      <button
                        onClick={() => resizeWidget(widget.id, 1)}
                        disabled={getSizeKey(widget.id) === 'large'}
                        className="non-draggable pointer-events-auto absolute bottom-2 right-2 text-white text-2xl"
                      >
                        ➕
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSettings(widget.id)
                        }}
                        className="non-draggable pointer-events-auto absolute top-2 left-2 text-white text-2xl"
                      >
                        ⚙️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  )
}

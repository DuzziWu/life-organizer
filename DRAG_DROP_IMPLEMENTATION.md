# 🎯 Drag & Drop Implementation

Diese Dokumentation beschreibt die vollständige Implementierung des Drag & Drop Systems für das Life Organizer Widget-Dashboard.

## ✨ Features

### 🎮 Benutzerinteraktion
- **Drag Handle**: Move-Icon (🔀) erscheint beim Hover über Widgets (oben links)
- **Live Preview**: Cyan-farbige Vorschau zeigt gültige Drop-Positionen in Echtzeit
- **Visual Feedback**: Gedraggtes Widget wird während des Ziehens 50% transparent
- **Cursor-Änderungen**: Grab/Grabbing Cursor für bessere UX
- **Grid-Snapping**: Automatische Ausrichtung an 135px Grid-Zellen

### 🧠 Intelligente Kollisionserkennung
- **Boundary-Checking**: Widgets können nicht außerhalb des 9×8 Grids platziert werden
- **Overlap-Prevention**: Verhindert Überlappungen mit anderen Widgets
- **Size-Awareness**: Berücksichtigt alle Widget-Größen (1×1, 1×3, 3×3)
- **Multi-Cell-Support**: Unterstützt Widgets, die mehrere Grid-Zellen belegen

## 🏗️ Technische Implementierung

### Grid-System
```typescript
// Grid-Konfiguration
const CELL_SIZE = 135  // px
const GAP = 12         // px
const COLS = 9         // Spalten
const ROWS = 8         // Zeilen (dynamisch erweiterbar)
```

### Kernfunktionen

#### 1. Grid-Position Berechnung
```typescript
const getGridPositionFromMouseEvent = (e: DragEvent) => {
  const gridRect = gridRef.current.getBoundingClientRect()
  const relativeX = e.clientX - gridRect.left
  const relativeY = e.clientY - gridRect.top
  
  const gridX = Math.floor(relativeX / (CELL_SIZE + GAP))
  const gridY = Math.floor(relativeY / (GAP + GAP))
  
  return {
    x: Math.max(0, Math.min(gridX, COLS - 1)),
    y: Math.max(0, Math.min(gridY, ROWS - 1))
  }
}
```

#### 2. Kollisionserkennung
```typescript
const canPlaceWidgetAt = (x, y, w, h, excludeWidgetId) => {
  // Grid-Grenzen prüfen
  if (x < 0 || y < 0 || x + w > COLS || y + h > ROWS) {
    return false
  }

  // Überlappungen mit anderen Widgets prüfen
  const otherWidgets = widgets.filter(widget => widget.id !== excludeWidgetId)
  
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
}
```

#### 3. Drag & Drop Event-Handling
```typescript
const handleDragStart = (e: DragEvent, widgetId: string) => {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', widgetId)
  setDraggedWidget(widgetId)
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  const gridPos = getGridPositionFromMouseEvent(e)
  
  if (canPlaceWidgetAt(gridPos.x, gridPos.y, widget.w, widget.h, draggedWidgetId)) {
    setDragOverPosition(gridPos)
    setDragPreview({ x: gridPos.x, y: gridPos.y, w: widget.w, h: widget.h })
  }
}

const handleDrop = async (e: DragEvent) => {
  e.preventDefault()
  const widgetId = e.dataTransfer.getData('text/plain')
  
  // Widget-Position in Datenbank aktualisieren
  await updateWidget(pageId, widgetId, {
    position: { ...widget.position, x: dragOverPosition.x, y: dragOverPosition.y }
  })
}
```

## 🎨 UI/UX Design

### Visual Feedback
1. **Hover State**: Move-Handle wird mit sanfter Opacity-Transition eingeblendet
2. **Drag State**: Widget wird 50% transparent, Handle bekommt "grabbing" Cursor
3. **Preview State**: Cyan-farbige Überlagerung zeigt Drop-Position
4. **Drop State**: Widget springt an neue Position, Preview verschwindet

### CSS-Implementierung
```css
/* Drag Handle */
.drag-handle {
  opacity: 0;
  transition: opacity 200ms ease;
  cursor: grab;
}

.widget:hover .drag-handle {
  opacity: 1;
}

.drag-handle:active {
  cursor: grabbing;
}

/* Drag Preview */
.drag-preview {
  position: absolute;
  border: 2px solid rgba(34, 211, 238, 0.5);
  background: rgba(34, 211, 238, 0.1);
  border-radius: 0.5rem;
  pointer-events: none;
  z-index: 10;
}

/* Dragged Widget */
.widget.dragging {
  opacity: 0.5;
}
```

## 📁 Dateistruktur

### Hauptkomponenten
- `src/components/layout/WidgetPageView.tsx` - Haupt-Grid und Drag & Drop Logic
- `src/components/widgets/WidgetRenderer.tsx` - Widget-Container mit Drag-Handle
- `src/contexts/WidgetContext.tsx` - Widget-State-Management
- `src/hooks/useWidget.ts` - Widget-Hooks für CRUD-Operationen

### State Management
```typescript
// Drag & Drop State
const [draggedWidget, setDraggedWidget] = useState<string | null>(null)
const [dragOverPosition, setDragOverPosition] = useState<{x: number, y: number} | null>(null)
const [dragPreview, setDragPreview] = useState<{x: number, y: number, w: number, h: number} | null>(null)
```

## 🔄 Datenfluss

1. **Drag Start**: Widget-ID wird gesetzt, Drag-State aktiviert
2. **Drag Over**: Grid-Position berechnet, Kollision geprüft, Preview aktualisiert
3. **Drop**: Widget-Position in Datenbank aktualisiert, UI-State zurückgesetzt
4. **Context Update**: Widget-Context benachrichtigt alle Komponenten über Änderung
5. **Re-Render**: Grid wird mit neuen Positionen neu gerendert

## 🚀 Performance Optimierungen

- **useCallback**: Alle Event-Handler sind memoized
- **Präzise Kollisionserkennung**: Nur bei tatsächlichen Positionsänderungen
- **Minimal Re-Renders**: State-Updates nur bei gültigen Drop-Positionen
- **Debounced Updates**: Database-Updates nur beim finalen Drop

## 🔮 Zukunftserweiterungen

### Geplante Features
- **Multi-Select**: Mehrere Widgets gleichzeitig verschieben
- **Snap-to-Grid**: Magnetische Anziehung zu Grid-Linien
- **Auto-Layout**: Automatische Neuanordnung bei Platzmangel
- **Touch Support**: Mobile Drag & Drop Unterstützung
- **Undo/Redo**: Rückgängig-machen von Widget-Verschiebungen

### Mögliche Erweiterungen
- **Ghost Preview**: Halbtransparente Vorschau des kompletten Widgets
- **Drop Zones**: Spezielle Bereiche für bestimmte Widget-Typen
- **Layout Templates**: Vordefinierte Widget-Anordnungen
- **Grid Resize**: Dynamische Anpassung der Grid-Größe
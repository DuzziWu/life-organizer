# 🎨 Design System

## Design Principles

### Core Values
- **Futuristic Minimalism**: Saubere Linien, viel Whitespace, sci-fi Ästhetik
- **Dark-First Design**: Primär dunkles Theme mit subtilen Akzenten
- **Cyber Aesthetics**: Glowing effects, neon accents, holographic elements
- **Accessibility**: Hoher Kontrast trotz Dark Theme
- **Performance**: Fluid animations, smooth transitions
- **Consistency**: Einheitliche futuristische Sprache

## Color Palette

### Primary Colors (Futuristic Dark Theme)
```css
/* Dark Background Gradient */
--bg-primary: #0a0a0f;     /* Deep space black */
--bg-secondary: #0f0f1a;   /* Slightly lighter black */
--bg-tertiary: #1a1a2e;    /* Dark navy */
--bg-card: #0d1117;        /* Card background */
--bg-glass: rgba(255, 255, 255, 0.05); /* Glassmorphism */

/* Cyber Blue Accents */
--cyber-blue-300: #64ffda;  /* Bright cyan */
--cyber-blue-400: #00e5ff;  /* Electric blue */
--cyber-blue-500: #00bcd4;  /* Primary brand color */
--cyber-blue-600: #0097a7;  /* Darker blue */
--cyber-blue-900: #004d5b;  /* Deep blue */

/* Neon Purple */
--neon-purple-300: #e1bee7; /* Light purple */
--neon-purple-400: #ba68c8; /* Medium purple */
--neon-purple-500: #9c27b0; /* Primary purple */
--neon-purple-600: #7b1fa2; /* Dark purple */

/* Matrix Green */
--matrix-green-300: #81c784;
--matrix-green-400: #66bb6a;
--matrix-green-500: #4caf50; /* Success color */
--matrix-green-600: #388e3c;
```

### Semantic Colors (Futuristic)
```css
/* Success - Matrix Green */
--success-bg: rgba(76, 175, 80, 0.1);
--success-border: #4caf50;
--success-text: #81c784;
--success-glow: 0 0 20px rgba(76, 175, 80, 0.5);

/* Warning - Neon Orange */
--warning-bg: rgba(255, 152, 0, 0.1);
--warning-border: #ff9800;
--warning-text: #ffb74d;
--warning-glow: 0 0 20px rgba(255, 152, 0, 0.5);

/* Error - Electric Red */
--error-bg: rgba(244, 67, 54, 0.1);
--error-border: #f44336;
--error-text: #ef5350;
--error-glow: 0 0 20px rgba(244, 67, 54, 0.5);

/* Info - Cyber Blue */
--info-bg: rgba(0, 188, 212, 0.1);
--info-border: #00bcd4;
--info-text: #64ffda;
--info-glow: 0 0 20px rgba(0, 188, 212, 0.5);
```

### Text & Surface Colors
```css
/* Text Hierarchy */
--text-primary: #ffffff;        /* Pure white for headings */
--text-secondary: #e2e8f0;      /* Light gray for body text */
--text-muted: #94a3b8;          /* Muted gray for secondary info */
--text-accent: #64ffda;         /* Cyber blue for links/accents */

/* Surface Colors */
--surface-primary: #0a0a0f;     /* Main background */
--surface-secondary: #0d1117;   /* Card backgrounds */
--surface-tertiary: #161b22;    /* Elevated surfaces */
--surface-glass: rgba(255, 255, 255, 0.05); /* Glass effect */
--surface-glow: rgba(100, 255, 218, 0.1);   /* Subtle glow */

/* Borders & Dividers */
--border-primary: #30363d;      /* Main borders */
--border-secondary: #21262d;    /* Subtle borders */
--border-accent: #00bcd4;       /* Accent borders */
--border-glow: 0 0 10px rgba(0, 188, 212, 0.3); /* Glowing borders */
```

## Typography

### Font Stack (Futuristic)
```css
/* Primary font - Futuristic & Clean */
font-family: 'Orbitron', 'Exo 2', 'Space Grotesk', 'Inter', sans-serif;

/* Monospace font - Sci-fi coding */
font-family: 'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace;

/* Display font - Headers & Branding */
font-family: 'Oxanium', 'Orbitron', 'Exo 2', sans-serif;

/* Alternative: Falls Google Fonts nicht verfügbar */
font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale
```css
/* Headings */
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }

/* Font weights */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

## Spacing System

### Consistent Scale
```css
/* Tailwind spacing scale */
.space-1 { /* 4px */ }
.space-2 { /* 8px */ }
.space-3 { /* 12px */ }
.space-4 { /* 16px */ }
.space-6 { /* 24px */ }
.space-8 { /* 32px */ }
.space-12 { /* 48px */ }
.space-16 { /* 64px */ }
.space-20 { /* 80px */ }
.space-24 { /* 96px */ }
```

### Component Spacing
- **Widget padding**: 16px (space-4)
- **Widget margin**: 8px (space-2)
- **Button padding**: 8px 16px (space-2 space-4)
- **Input padding**: 12px 16px (space-3 space-4)

## Component Library

### Button System

```tsx
// Button variants
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

// Examples
<Button variant="primary" size="md">Speichern</Button>
<Button variant="outline" size="sm">Abbrechen</Button>
<Button variant="danger" size="lg">Löschen</Button>
```

### Input Components

```tsx
// Input variants
interface InputProps {
  type: 'text' | 'email' | 'password' | 'search'
  size: 'sm' | 'md' | 'lg'
  error?: boolean
  disabled?: boolean
  placeholder?: string
}

// Form components
<FormField>
  <Label>E-Mail Adresse</Label>
  <Input type="email" placeholder="mail@example.com" />
  <FieldError>Ungültige E-Mail Adresse</FieldError>
</FormField>
```

### Card Components

```tsx
// Card system für Widgets und Content
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined'
  padding: 'none' | 'sm' | 'md' | 'lg'
}

<Card variant="elevated" padding="md">
  <CardHeader>
    <CardTitle>Widget Titel</CardTitle>
    <CardDescription>Widget Beschreibung</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Widget content */}
  </CardContent>
</Card>
```

## Widget Design System

### Widget Container (Futuristic)

```css
.widget-container {
  background: linear-gradient(135deg,
    var(--surface-secondary) 0%,
    var(--surface-tertiary) 100%
  );
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Glassmorphism effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  /* Subtle inner glow */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--surface-glow);
    border-radius: 16px;
    opacity: 0;
    transition: opacity 300ms ease;
    pointer-events: none;
  }

  &:hover {
    border-color: var(--border-accent);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(100, 255, 218, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transform: translateY(-4px) scale(1.02);

    &::before {
      opacity: 1;
    }
  }

  &.dragging {
    transform: rotate(3deg) scale(1.08);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.5),
      0 0 0 2px var(--cyber-blue-500),
      0 0 30px rgba(0, 188, 212, 0.4);
    z-index: 1000;
    border-color: var(--cyber-blue-500);
  }

  /* Scan line effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      var(--cyber-blue-500),
      transparent
    );
    animation: scan 3s linear infinite;
  }
}

@keyframes scan {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

### Widget Header

```tsx
// Einheitlicher Widget Header
interface WidgetHeaderProps {
  title: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  draggable?: boolean
}

<WidgetHeader
  title="To-Do Liste"
  icon={<CheckSquare />}
  actions={
    <DropdownMenu>
      <DropdownItem>Bearbeiten</DropdownItem>
      <DropdownItem>Löschen</DropdownItem>
    </DropdownMenu>
  }
/>
```

### Widget Sizes

```css
/* Widget size classes */
.widget-sm {
  width: 200px;
  height: 150px;
}

.widget-md {
  width: 300px;
  height: 200px;
}

.widget-lg {
  width: 400px;
  height: 300px;
}

.widget-xl {
  width: 500px;
  height: 400px;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .widget-sm,
  .widget-md,
  .widget-lg,
  .widget-xl {
    width: 100%;
    min-height: 150px;
  }
}
```

## Icons & Illustrations

### Icon System
```tsx
// Lucide React Icons
import {
  Home, Settings, User, Mail, Calendar,
  Plus, Edit, Trash, Check, X,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  Sun, Moon, Palette, Bell, Search
} from 'lucide-react'

// Consistent icon sizes
interface IconProps {
  size: 'sm' | 'md' | 'lg' | 'xl'
}

// sm: 16px, md: 20px, lg: 24px, xl: 32px
```

### Widget Icons

```tsx
// Widget-spezifische Icons
const widgetIcons = {
  notes: <FileText />,
  todo: <CheckSquare />,
  calendar: <Calendar />,
  mail: <Mail />,
  weather: <Cloud />,
  news: <Newspaper />,
  habits: <Target />,
  finance: <DollarSign />,
  music: <Music />
}
```

## Animation & Transitions (Futuristic)

### Micro-interactions

```css
/* Fluid transitions */
.transition-cyber {
  transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.transition-glow {
  transition: all 300ms ease, box-shadow 500ms ease;
}

/* Futuristic hover states */
.interactive:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(100, 255, 218, 0.2);
  filter: brightness(1.1);
}

/* Holographic loading effect */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(100, 255, 218, 0.4),
    transparent
  );
  animation: hologram 2s linear infinite;
}

@keyframes hologram {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Matrix-style text reveal */
@keyframes matrix-reveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* Neon glow pulse */
@keyframes neon-pulse {
  0%, 100% {
    box-shadow: 0 0 5px var(--cyber-blue-500);
  }
  50% {
    box-shadow: 0 0 20px var(--cyber-blue-500);
  }
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

### Drag & Drop Animations

```css
/* Drag states */
.dragging {
  animation: wobble 0.3s ease-in-out;
  z-index: 1000;
}

.drop-zone {
  border: 2px dashed var(--primary-300);
  background: var(--primary-50);
  animation: pulse-border 1s ease-in-out infinite;
}

.drop-zone.active {
  border-color: var(--primary-500);
  background: var(--primary-100);
}
```

## Responsive Design

### Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Grid System

```tsx
// Responsive widget grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {widgets.map(widget => (
    <Widget key={widget.id} {...widget} />
  ))}
</div>
```

### Mobile-first Approach

```css
/* Mobile first styling */
.dashboard {
  padding: 1rem;
}

@media (min-width: 768px) {
  .dashboard {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .dashboard {
    padding: 3rem;
  }
}
```

## Accessibility

### ARIA Labels

```tsx
// Accessibility best practices
<Button
  aria-label="Widget hinzufügen"
  aria-describedby="add-widget-description"
>
  <Plus />
</Button>

<div id="add-widget-description" className="sr-only">
  Fügt ein neues Widget zu deinem Dashboard hinzu
</div>
```

### Keyboard Navigation

```css
/* Focus states */
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
```

### Screen Reader Support

```tsx
// Screen reader only text
<span className="sr-only">
  Widget wurde erfolgreich hinzugefügt
</span>

// Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Zum Hauptinhalt springen
</a>
```

## Dark Mode Implementation

### CSS Variables Approach

```css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
}

:root[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #ffffff;
}
```

### React Implementation

```tsx
// Theme context
const ThemeContext = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>()

// Theme toggle component
<Button
  variant="ghost"
  size="sm"
  onClick={toggleTheme}
  aria-label={theme === 'light' ? 'Dark mode aktivieren' : 'Light mode aktivieren'}
>
  {theme === 'light' ? <Moon /> : <Sun />}
</Button>
```
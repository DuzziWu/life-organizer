# 🚀 Futuristic UI Components

## Component-Bibliothek für Cyber-Ästhetik

### Dashboard Layout

```tsx
// Hauptlayout mit futuristischem Hintergrund
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-pattern animate-pulse" />
        <div className="scan-lines" />
      </div>

      {/* Floating particles */}
      <ParticleField />

      {/* Main content */}
      <div className="relative z-10">
        <CyberHeader />
        <WidgetGrid />
      </div>
    </div>
  )
}
```

### Cyber Header/Navigation

```tsx
const CyberHeader = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-surface-glass border-b border-border-accent">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo mit Glow-Effekt */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue-500 to-neon-purple-500 flex items-center justify-center shadow-neon">
              <TerminalIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-display font-bold text-text-primary tracking-wider">
              LIFE<span className="text-cyber-blue-500">_ORG</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {['Dashboard', 'Widgets', 'Settings'].map((item) => (
              <button
                key={item}
                className="px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-glow transition-all duration-300 font-medium"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* User menu */}
          <CyberUserMenu />
        </div>
      </div>
    </header>
  )
}
```

### Futuristic Buttons

```tsx
interface CyberButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
  size: 'sm' | 'md' | 'lg'
  glow?: boolean
  children: React.ReactNode
}

const CyberButton = ({ variant, size, glow, children }: CyberButtonProps) => {
  const baseClasses = "relative font-medium transition-all duration-300 rounded-lg border font-mono uppercase tracking-wide"

  const variants = {
    primary: `
      bg-gradient-to-r from-cyber-blue-600 to-cyber-blue-500
      border-cyber-blue-400 text-white
      hover:from-cyber-blue-500 hover:to-cyber-blue-400
      hover:border-cyber-blue-300 hover:shadow-cyber-glow
      active:scale-95
    `,
    secondary: `
      bg-surface-secondary border-border-primary text-text-primary
      hover:bg-surface-tertiary hover:border-border-accent
      hover:text-text-accent
    `,
    ghost: `
      bg-transparent border-transparent text-text-secondary
      hover:bg-surface-glow hover:text-text-primary
      hover:border-border-secondary
    `,
    danger: `
      bg-gradient-to-r from-error-border to-red-600
      border-error-border text-white
      hover:shadow-error-glow
    `
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        glow && 'animate-neon-pulse'
      )}
    >
      {/* Scan line effect */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-scan" />

      <span className="relative z-10">{children}</span>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-blue-500 opacity-60" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-blue-500 opacity-60" />
    </button>
  )
}
```

### Glassmorphism Cards

```tsx
const GlassCard = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-surface-glass border border-border-primary rounded-2xl p-6",
        "shadow-lg hover:shadow-cyber-glow transition-all duration-500",
        "relative overflow-hidden group",
        className
      )}
      {...props}
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyber-blue-500/20 via-transparent to-neon-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Floating particles on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
      </div>
    </div>
  )
}
```

### Futuristic Input Fields

```tsx
const CyberInput = ({ label, error, icon, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-secondary uppercase tracking-wide">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}

        <input
          className={cn(
            "w-full bg-surface-secondary border border-border-primary rounded-lg",
            "px-4 py-3 text-text-primary placeholder-text-muted",
            "focus:border-cyber-blue-500 focus:ring-2 focus:ring-cyber-blue-500/20",
            "focus:bg-surface-tertiary transition-all duration-300",
            "font-mono text-sm",
            icon && "pl-10",
            error && "border-error-border focus:border-error-border focus:ring-error-border/20"
          )}
          {...props}
        />

        {/* Focus glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyber-blue-500/10 to-neon-purple-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {error && (
        <p className="text-sm text-error-text flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
```

### Widget Container Template

```tsx
const FuturisticWidget = ({ title, icon, children, onRemove, onEdit }) => {
  return (
    <GlassCard className="widget-container group">
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-blue-500 to-neon-purple-500 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="font-display font-semibold text-text-primary">
            {title}
          </h3>
        </div>

        {/* Widget Actions */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <CyberButton variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </CyberButton>
          <CyberButton variant="danger" size="sm" onClick={onRemove}>
            <Trash className="w-4 h-4" />
          </CyberButton>
        </div>
      </div>

      {/* Widget Content */}
      <div className="widget-content">
        {children}
      </div>
    </GlassCard>
  )
}
```

### Loading States

```tsx
const CyberLoader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      {/* Spinning loader */}
      <div className={cn("relative", sizes[size])}>
        <div className="absolute inset-0 border-2 border-border-primary rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-cyber-blue-500 rounded-full animate-spin" />
        <div className="absolute inset-1 border border-transparent border-t-neon-purple-500 rounded-full animate-spin animation-delay-75" />
      </div>

      {/* Loading text */}
      <div className="text-text-muted text-sm font-mono uppercase tracking-wide animate-pulse">
        {text}
      </div>
    </div>
  )
}
```

### Notification System

```tsx
const CyberNotification = ({ type, title, message, onClose }) => {
  const typeStyles = {
    success: 'border-matrix-green-500 bg-success-bg text-success-text',
    error: 'border-error-border bg-error-bg text-error-text',
    warning: 'border-warning-border bg-warning-bg text-warning-text',
    info: 'border-cyber-blue-500 bg-info-bg text-info-text'
  }

  return (
    <div className={cn(
      "relative p-4 rounded-lg border backdrop-blur-xl",
      "shadow-lg transform transition-all duration-300",
      "animate-matrix-reveal",
      typeStyles[type]
    )}>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-50 blur-sm -z-10 bg-current" />

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {type === 'success' && <CheckCircle className="w-5 h-5" />}
          {type === 'error' && <AlertCircle className="w-5 h-5" />}
          {type === 'warning' && <AlertTriangle className="w-5 h-5" />}
          {type === 'info' && <Info className="w-5 h-5" />}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-sm opacity-90 mt-1">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
```

### CSS Effects

```css
/* Grid pattern background */
.grid-pattern {
  background-image:
    linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

/* Scan lines */
.scan-lines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(100, 255, 218, 0.03) 2px,
    rgba(100, 255, 218, 0.03) 4px
  );
  animation: scan-lines 0.1s linear infinite;
}

/* Particle effects */
.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--cyber-blue-500);
  border-radius: 50%;
  animation: float-particle 3s ease-in-out infinite;
}

.particle-1 { top: 20%; left: 30%; animation-delay: 0s; }
.particle-2 { top: 60%; left: 70%; animation-delay: 1s; }
.particle-3 { top: 80%; left: 20%; animation-delay: 2s; }

/* Shadow effects */
.shadow-cyber-glow {
  box-shadow:
    0 0 20px rgba(0, 188, 212, 0.3),
    0 10px 40px rgba(0, 0, 0, 0.2);
}

.shadow-neon {
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
}

/* Animation utilities */
.animation-delay-75 {
  animation-delay: 75ms;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}
```

Dieses Design System bietet alle Komponenten für ein modernes, futuristisches Dark Theme mit Cyber-Ästhetik und minimalistischem Design!
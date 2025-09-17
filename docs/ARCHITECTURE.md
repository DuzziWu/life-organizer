# 🏗️ Architecture Documentation

## System Overview

Life Organizer folgt einer modernen **Client-Server Architektur** mit klarer Trennung zwischen Frontend und Backend.

```
┌─────────────────┐     ┌─────────────────┐
│   React Client  │────▶│    Supabase     │
│   (Frontend)    │     │ (DB+Auth+RT+Storage)
└─────────────────┘     └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ Serverless API  │     │ External APIs   │
│   (Optional)    │     │ (Mail, Calendar)│
└─────────────────┘     └─────────────────┘
```

## Frontend Architecture

### Component Hierarchy

```
App
├── AuthProvider
├── ThemeProvider
└── Router
    ├── LoginPage
    ├── RegisterPage
    └── DashboardPage
        ├── DashboardHeader
        ├── WidgetGrid
        │   └── Widget[]
        │       ├── WidgetHeader
        │       └── WidgetContent
        └── AddWidgetSidebar
```

### State Management

```typescript
// Zustand Stores
interface AuthStore {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

interface DashboardStore {
  dashboards: Dashboard[]
  currentDashboard: Dashboard | null
  widgets: Widget[]
  updateWidgetPosition: (id: string, position: Position) => void
  updateWidgetSize: (id: string, size: Size) => void
}

interface WidgetStore {
  availableWidgets: WidgetType[]
  addWidget: (type: WidgetType, position: Position) => void
  removeWidget: (id: string) => void
  updateWidgetConfig: (id: string, config: any) => void
}
```

### Widget System

Jedes Widget folgt einem einheitlichen Interface:

```typescript
interface Widget {
  id: string
  type: WidgetType
  position: { x: number; y: number }
  size: { width: number; height: number }
  config: Record<string, any>
  isActive: boolean
}

interface WidgetComponent {
  type: WidgetType
  Component: React.ComponentType<WidgetProps>
  defaultSize: Size
  minSize: Size
  maxSize: Size
  configSchema: JSONSchema
}
```

## Backend Architecture

### API Structure

```
/api
├── /auth
│   ├── POST /login
│   ├── POST /register
│   ├── POST /logout
│   └── GET  /me
├── /dashboards
│   ├── GET    /
│   ├── POST   /
│   ├── PUT    /:id
│   └── DELETE /:id
├── /widgets
│   ├── GET    /
│   ├── POST   /
│   ├── PUT    /:id
│   └── DELETE /:id
└── /integrations
    ├── /mail
    │   ├── POST /connect
    │   ├── GET  /messages
    │   └── DELETE /disconnect
    └── /calendar
        ├── POST /connect
        ├── GET  /events
        └── DELETE /disconnect
```

### Service Layer

```typescript
// Services for business logic
interface UserService {
  authenticate(credentials: LoginCredentials): Promise<User>
  createUser(userData: CreateUserData): Promise<User>
  updateUser(id: string, updates: UserUpdates): Promise<User>
}

interface DashboardService {
  getDashboards(userId: string): Promise<Dashboard[]>
  createDashboard(userId: string, data: CreateDashboardData): Promise<Dashboard>
  updateDashboard(id: string, updates: DashboardUpdates): Promise<Dashboard>
}

interface WidgetService {
  getWidgets(dashboardId: string): Promise<Widget[]>
  createWidget(data: CreateWidgetData): Promise<Widget>
  updateWidget(id: string, updates: WidgetUpdates): Promise<Widget>
}
```

## Database Schema

### Core Tables

```sql
-- Users werden automatisch von Supabase Auth verwaltet
-- auth.users table ist bereits vorhanden

-- User Profiles (ergänzt auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(100),
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Dashboards table
CREATE TABLE dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  layout_config JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Widgets table
CREATE TABLE widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dashboard_id UUID REFERENCES dashboards(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  position JSONB NOT NULL,
  size JSONB NOT NULL,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Integrations table
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_sync TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Policies für sicheren Datenzugriff
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own dashboards" ON dashboards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own dashboards" ON dashboards FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own widgets" ON widgets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own widgets" ON widgets FOR ALL USING (auth.uid() = user_id);
```

## Security Architecture

### Authentication Flow

```
1. User submits credentials
2. Server validates credentials
3. Server generates JWT token
4. Client stores token in httpOnly cookie
5. Client includes token in subsequent requests
6. Server validates token on protected routes
```

### Data Protection

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Short-lived access tokens + refresh tokens
- **API Rate Limiting**: Per-user and per-endpoint limits
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **CORS**: Configured for production domains only

## Integration Architecture

### Mail Integration

```typescript
interface MailIntegration {
  type: 'imap' | 'pop3' | 'oauth'
  config: {
    host: string
    port: number
    secure: boolean
    username: string
    password: string // encrypted
  }
}

// Mail service flow
class MailService {
  async connectAccount(integration: MailIntegration): Promise<void>
  async fetchMessages(accountId: string, limit: number): Promise<Message[]>
  async syncMessages(accountId: string): Promise<void>
}
```

### Calendar Integration

```typescript
interface CalendarIntegration {
  type: 'caldav' | 'google' | 'outlook'
  config: {
    url?: string
    clientId?: string
    accessToken?: string // encrypted
    refreshToken?: string // encrypted
  }
}

class CalendarService {
  async connectCalendar(integration: CalendarIntegration): Promise<void>
  async fetchEvents(calendarId: string, dateRange: DateRange): Promise<Event[]>
  async syncEvents(calendarId: string): Promise<void>
}
```

## Performance Considerations

### Frontend Optimizations

- **Code Splitting**: Route-based + Widget-based
- **Lazy Loading**: Widgets loaded on demand
- **Memoization**: React.memo für Widget-Komponenten
- **Virtual Scrolling**: Bei vielen Widgets
- **Image Optimization**: Automatic resizing und WebP

### Backend Optimizations

- **Database Indexing**: Auf user_id, dashboard_id
- **Query Optimization**: Eager loading mit Prisma
- **Caching**: Redis für häufige Abfragen
- **Background Jobs**: Queue für Mail/Calendar sync
- **CDN**: Statische Assets

### Real-time Updates

```typescript
// WebSocket events für live updates
interface WebSocketEvents {
  'widget:updated': { widgetId: string; updates: WidgetUpdates }
  'widget:added': { widget: Widget }
  'widget:removed': { widgetId: string }
  'dashboard:updated': { dashboardId: string; updates: DashboardUpdates }
}
```

## Deployment Architecture

### Production Setup

```
┌─────────────────┐
│    Vercel       │ ← React Frontend
│   (Frontend)    │
└─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│    Railway      │────▶│   PostgreSQL    │
│   (Backend)     │     │   (Database)    │
└─────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│     Redis       │ ← Caching & Sessions
│   (Cache)       │
└─────────────────┘
```

### Environment Configuration

```bash
# Frontend (.env)
VITE_API_URL=https://api.life-organizer.com
VITE_WS_URL=wss://api.life-organizer.com

# Backend (.env)
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
ENCRYPTION_KEY=...
```

## Monitoring & Logging

- **Error Tracking**: Sentry für Frontend und Backend
- **Performance Monitoring**: Web Vitals, API Response Times
- **Logging**: Structured JSON logs mit Winston
- **Health Checks**: `/health` Endpoint für Uptime monitoring
- **Metrics**: Custom metrics für Widget-Nutzung
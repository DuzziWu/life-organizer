# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start both frontend and backend in development mode (uses concurrently)
- `npm run dev:frontend` - Start only the React frontend (Vite dev server on port 5173)
- `npm run dev:backend` - Start only the Node.js backend with watch mode
- `npm run build` - Build both frontend and backend for production
- `npm run test` - Run tests for both frontend and backend
- `npm run lint` - Run ESLint on both frontend and backend
- `npm run type-check` - Run TypeScript type checking on both workspaces

### Installation & Setup
- `npm run install:all` - Install dependencies for root, frontend, and backend
- `npm run setup` - Full setup including dependencies and environment configuration
- `npm run clean` - Remove all node_modules
- `npm run reset` - Clean and reinstall all dependencies

### Individual Workspace Commands
- `cd frontend && npm run [command]` - Work with frontend specifically
- `cd backend && npm run [command]` - Work with backend specifically

### Testing
- `npm run test:frontend` - Run Vitest tests for frontend
- `npm run test:backend` - Run backend tests
- Frontend supports coverage: `cd frontend && npm run test:coverage`

## Project Architecture

### Monorepo Structure
This is a monorepo with separate frontend and backend workspaces:
- `frontend/` - React 18 + TypeScript + Vite + Tailwind CSS
- `backend/` - Node.js + TypeScript + Express + Supabase integration
- Both workspaces are managed through the root package.json

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite
- **Styling**: Tailwind CSS with custom futuristic Liquid Glass theme
- **Authentication**: Supabase Auth with React Context (✅ IMPLEMENTED)
- **State Management**: React Context (auth) ✅, Zustand (planned for widgets)
- **Routing**: React Router v6 with protected routes (✅ IMPLEMENTED)
- **Drag & Drop**: @hello-pangea/dnd for widget system (planned)
- **UI Components**: Custom Liquid Glass components ✅ + Radix UI primitives (planned)
- **Form Handling**: Custom forms with React state ✅ (React Hook Form + Zod planned)
- **Animation**: Custom CSS animations with Tailwind ✅
- **Icons**: Lucide React ✅

### Frontend Path Aliases (vite.config.ts)
```typescript
"@" -> "./src"
"@/components" -> "./src/components"  
"@/widgets" -> "./src/widgets"
"@/hooks" -> "./src/hooks"
"@/stores" -> "./src/stores"
"@/utils" -> "./src/utils"
"@/types" -> "./src/types"
```

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js (planned)
- **Database**: Supabase (PostgreSQL + Auth + Real-time + Storage)
- **Authentication**: Supabase Auth
- **Development**: tsx for TypeScript execution with watch mode

### Widget System Architecture
The core concept is a flexible widget system where:
- Each widget follows a unified interface with type, position, size, and config
- Widgets are draggable and resizable on a grid layout
- Widget state management will use Zustand stores
- Widget components are dynamically loaded based on type

### Tech Stack Highlights
- **Database**: Supabase for backend services (PostgreSQL, Auth, Real-time, Storage)
- **UI**: Custom futuristic theme with glass effects and cyber aesthetics
- **Form Validation**: Zod schemas for type-safe validation
- **Testing**: Vitest for unit testing, Testing Library for React components
- **Linting**: ESLint with TypeScript rules for both workspaces

### Development Status
This project is in active development with substantial progress:

**✅ COMPLETED FEATURES:**
- Complete project structure and tooling setup
- Supabase integration with database schema and RLS policies
- Authentication system with German localization (Login/Register/Welcome pages)
- Protected routes with authentication context
- First-Visit experience with animated rocket launch
- Custom Liquid Glass UI components with futuristic design
- Rocket animation matching reference design with smooth flight

**📋 DATABASE SCHEMA:**
- `profiles` table for user profile data
- `dashboards` table for user dashboard configurations
- `widgets` table for widget types and templates
- `integrations` table for third-party service connections
- `widget_data` table for individual widget instances
- Complete RLS policies for data security

**🚧 IN PROGRESS:**
- Widget system architecture planning
- Dashboard layout implementation

**📅 PLANNED:**
- Drag & drop widget system
- Calendar integration
- Email management
- Task/todo management
- Weather widget
- Notes widget

### Key Dependencies
- **Frontend**: React 18, React Router, Radix UI, Framer Motion, React Hook Form, Zod
- **Backend**: Express, Supabase client, bcryptjs, jsonwebtoken, winston
- **Development**: Vite, tsx, ESLint, Prettier, Vitest

## Supabase Configuration

### Database Connection
- **Project URL**: https://fzerbeehvifnusnjtmid.supabase.co
- **Environment**: Configured in `backend/.env` and `frontend/.env`
- **Email Confirmation**: Disabled for development (configured in Supabase dashboard)

### Current Schema
```sql
-- Key tables implemented:
profiles (id, user_id, full_name, avatar_url, created_at, updated_at)
dashboards (id, user_id, name, layout, created_at, updated_at)
widgets (id, type, name, description, default_config, created_at)
integrations (id, user_id, type, config, is_active, created_at, updated_at)
widget_data (id, user_id, widget_id, dashboard_id, position, size, config, created_at, updated_at)
```

## Authentication Flow

The app implements a complete German-localized authentication system:

1. **Login Page** (`/login`): Email/password login with Liquid Glass design
2. **Register Page** (`/register`): Account creation with full name
3. **First Visit** (`/first-visit`): Animated feature showcase with rocket launch
4. **Dashboard** (`/dashboard`): Protected main application area

### Key Components
- `AuthContext.tsx`: Main authentication context with Supabase integration
- `ProtectedRoute.tsx`: Route protection component
- `LiquidGlassCard.tsx`: Reusable UI component with glass morphism effect

## Animation System

### Rocket Launch Animation
The First-Visit page features a detailed rocket animation:
- Classic rocket design (red nose cone, white body, blue window)
- Smooth upward flight with scaling and opacity transitions
- Falling line background effects during launch
- 4-second animation duration with cubic-bezier easing

### Custom CSS Classes
```css
.animate-startup-rocket-launch - Main rocket flight animation
.animate-fall - Falling lines background effect
.glass-effect - Liquid glass morphism
.text-gradient - Cyber-themed text gradients
```

## Important Notes

- Always run commands from the root directory unless specifically working with a single workspace
- The project uses futuristic/cyber theming with custom CSS classes for glass effects and animations
- Supabase is the chosen backend solution for database, authentication, and real-time features
- The widget system is the core feature - widgets should be modular, draggable, and configurable
- Authentication is fully functional with German localization
- First-time users see an animated onboarding experience
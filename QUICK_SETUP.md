# ⚡ Quick Setup Guide

Schnelle Installation auf neuen Geräten.

## 📋 Voraussetzungen

- **Node.js 18+** ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** ([Registrierung](https://supabase.com/))

## 🚀 Schnellstart (1 Minute)

```bash
# Repository klonen
git clone https://github.com/USERNAME/life-organizer.git
cd life-organizer

# Alles installieren und einrichten
npm run setup

# Development starten
npm run dev
```

Das war's! Die App läuft auf `http://localhost:5173` 🎉

## 📦 Was wird installiert?

### Root Dependencies
- `concurrently` - Gleichzeitiges Ausführen von Frontend/Backend
- `cross-env` - Cross-platform Environment Variables

### Frontend (React + TypeScript)
**Core Framework:**
- `react` + `react-dom` - React 18
- `typescript` - TypeScript Support
- `vite` - Build Tool (super schnell!)

**UI & Styling:**
- `tailwindcss` - Utility-first CSS (Futuristic Dark Theme)
- `lucide-react` - Icons
- `framer-motion` - Animationen
- `@radix-ui/*` - Accessible UI Components
- Custom Tailwind config mit Cyber-Ästhetik

**State & Data:**
- `zustand` - State Management
- `@supabase/supabase-js` - Database & Auth
- `react-hook-form` + `zod` - Forms & Validation

**Dashboard Features:**
- `@hello-pangea/dnd` - Drag & Drop
- `react-grid-layout` - Grid Layout
- `date-fns` - Date Utilities

**Development:**
- `vitest` - Testing
- `eslint` + `prettier` - Code Quality
- `@testing-library/*` - Testing Utilities

### Backend (Node.js + TypeScript)
**Core Framework:**
- `express` - Web Framework
- `typescript` - TypeScript Support
- `tsx` - TypeScript Execution

**Database & Auth:**
- `@supabase/supabase-js` - Supabase Client
- `bcryptjs` + `jsonwebtoken` - Security

**Integrations:**
- `nodemailer` - Email Sending
- `imap` - Email Reading
- `ical.js` - Calendar Parsing
- `axios` - HTTP Client

**Utilities:**
- `zod` - Schema Validation
- `winston` - Logging
- `node-cron` - Scheduled Tasks
- `sharp` - Image Processing

**Development:**
- `supabase` - CLI Tools
- `vitest` - Testing
- `supertest` - API Testing

## 🔧 Manuelle Installation

Falls `npm run setup` nicht funktioniert:

```bash
# 1. Dependencies installieren
npm install
npm run install:frontend
npm run install:backend

# 2. Environment Setup
node scripts/setup-env.js

# 3. Supabase konfigurieren (siehe SUPABASE_SETUP.md)
# frontend/.env.local und backend/.env editieren

# 4. Development starten
npm run dev
```

## 🛠 Verfügbare Scripts

### Root Level
```bash
npm run dev              # Frontend + Backend gleichzeitig
npm run build            # Alles bauen
npm run test             # Alle Tests
npm run lint             # Code Linting
npm run type-check       # TypeScript Check
npm run setup            # Komplettes Setup
npm run clean            # node_modules löschen
npm run reset            # Clean + Reinstall
```

### Frontend Only
```bash
cd frontend
npm run dev              # Development Server (Vite)
npm run build            # Production Build
npm run preview          # Build Preview
npm run test             # Tests mit Vitest
npm run lint             # ESLint
npm run format           # Prettier
```

### Backend Only
```bash
cd backend
npm run dev              # Development Server (tsx watch)
npm run build            # TypeScript Build
npm run start            # Production Start
npm run test             # Tests mit Vitest
npm run supabase:start   # Lokale Supabase
npm run supabase:reset   # Database Reset
```

## 🗄 Supabase Setup

Nach der Installation:

1. **Supabase Projekt erstellen** auf [supabase.com](https://supabase.com/dashboard)

2. **API Keys kopieren** aus Project Settings → API

3. **Environment Dateien ausfüllen:**
   ```bash
   # frontend/.env.local
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

   # backend/.env
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_KEY=eyJhbGciOi...
   ```

4. **Database Schema erstellen** (siehe `docs/SUPABASE_SETUP.md`)

## 🔍 Troubleshooting

### Node Version Probleme
```bash
# Node Version prüfen
node --version  # Sollte >= 18.0.0 sein

# Falls älter, Node.js updaten
# Oder nvm verwenden:
nvm install 18
nvm use 18
```

### Port bereits belegt
```bash
# Andere Ports verwenden
VITE_PORT=5174 npm run dev:frontend
PORT=3002 npm run dev:backend
```

### Supabase Probleme
```bash
# Supabase CLI installieren
npm install -g supabase

# Lokale Supabase starten
cd backend
npx supabase start
```

### Package Installation Fehler
```bash
# Cache leeren und neu installieren
npm run clean
npm cache clean --force
npm run install:all
```

## 📱 Development URLs

Nach `npm run dev`:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Supabase Studio**: http://localhost:54323

## 🎯 Was als nächstes?

1. **Frontend Grundstruktur** entwickeln
2. **Authentication** implementieren
3. **Dashboard Layout** erstellen
4. **Widget System** entwickeln
5. **Drag & Drop** implementieren

Folge dem **PROJECT_PLAN.md** für die detaillierte Roadmap! 🗺️
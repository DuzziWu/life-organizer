# 🏠 Life Organizer

Eine moderne, personalisierbare Dashboard-Webapp zur Lebensorganisation mit einem flexiblen Widget-System.

## ✨ Features

### ✅ Bereits implementiert
- 🔐 **Authentifizierung** - Sichere Anmeldung und Registrierung mit Supabase
- 🎨 **Liquid Glass Design** - Futuristisches UI mit Glasmorphismus-Effekten
- 🚀 **Onboarding Experience** - Animierte Willkommensseite mit Raketen-Launch
- 🌍 **Deutsche Lokalisierung** - Vollständig deutschsprachige Benutzeroberfläche
- 🛡️ **Protected Routes** - Sicherer Zugang zu geschützten Bereichen

### 🚧 In Entwicklung
- 📊 **Personalisiertes Dashboard** - Gestalte dein Dashboard wie einen Handy-Homescreen
- 🧩 **Flexible Widgets** - Drag & Drop, Größenänderung, individuelle Anordnung

### 📅 Geplant
- 📧 **Mail-Integration** - Alle deine Mail-Accounts an einem Ort
- 📅 **Kalender-Sync** - Synchronisation mit Google, Outlook und anderen Kalendern
- 🌙 **Dark/Light Mode** - Themes nach deinen Vorlieben
- 📱 **Responsive Design** - Perfekt auf Desktop und Mobile
- 🔒 **Sicher & Privat** - Deine Daten gehören dir

## 🚀 Geplante Widgets

### MVP Widgets
- 📝 **Notizen** - Quick Notes und wichtige Erinnerungen
- ✅ **To-Do Listen** - Aufgaben verwalten und abhaken
- 🕐 **Uhr & Datum** - Aktuelle Zeit und Datum
- 📧 **Mail Preview** - Neueste E-Mails anzeigen

### Erweiterte Widgets
- 🌤️ **Wetter** - Lokale Wettervorhersage
- 📰 **News & RSS** - Personalisierte Nachrichten-Feeds
- 💪 **Habits Tracker** - Gewohnheiten verfolgen
- 💰 **Finance Overview** - Budget und Ausgaben im Blick
- 📁 **File Manager** - Cloud-Storage Integration
- 🎵 **Music Player** - Spotify/Apple Music Integration

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL + Auth + Real-time + Storage)
- **Drag & Drop**: @hello-pangea/dnd
- **State Management**: Zustand
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (Frontend), Supabase (Backend)

## 🏗️ Projektstruktur

```
life-organizer/
├── frontend/          # React Frontend
├── backend/           # Serverless Functions (optional)
├── supabase/          # Database Schema & Functions
├── shared/            # Geteilte Types/Utils
├── docs/              # Dokumentation
└── docker-compose.yml # Local Development
```

## 🚦 Development Status

- [x] Projektplanung
- [x] Repository Setup (Monorepo mit Frontend/Backend)
- [x] Frontend Grundstruktur (React 18 + TypeScript + Vite)
- [x] Backend Grundstruktur (Node.js + TypeScript + Express)
- [x] Supabase Integration (Database + Auth + Real-time + Storage)
- [x] User Authentication (Login/Register mit deutscher Lokalisierung)
- [x] Liquid Glass UI Components
- [x] Onboarding Experience mit Raketen-Animation
- [x] Protected Routes System
- [ ] Dashboard Framework
- [ ] Widget System
- [ ] Drag & Drop Implementation
- [ ] Basis Widgets
- [ ] Mail Integration
- [ ] Kalender Integration

## 🛠️ Setup & Installation

### Voraussetzungen
- Node.js (v18+)
- npm
- Supabase Account

### Installation
```bash
# Repository klonen
git clone <repository-url>
cd life-organizer

# Alle Dependencies installieren
npm run install:all

# Umgebungsvariablen einrichten
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Supabase Credentials in .env Dateien eintragen

# Development Server starten
npm run dev
```

### Supabase Setup
1. Neues Projekt in Supabase erstellen
2. Database Migration ausführen (Schema aus CLAUDE.md verwenden)
3. Email Confirmation in Auth Settings deaktivieren
4. URLs und Keys in .env Dateien eintragen

## 📋 Roadmap

### Phase 1 - MVP ✅ Größtenteils abgeschlossen
- ✅ User Authentication
- ✅ Liquid Glass Design System
- ✅ Onboarding Experience
- 🚧 Basic Dashboard
- 🚧 Core Widget System

### Phase 2 - Widget Implementation (Q1 2025)
- Notes Widget
- Todo Widget
- Clock Widget
- Drag & Drop System

### Phase 3 - Integrations (Q2 2025)
- Mail Integration
- Calendar Sync
- Weather Widget
- News/RSS Feeds

### Phase 4 - Advanced (Q3 2025)
- Desktop App (Electron)
- Team Collaboration
- Premium Features
- Mobile App

## 🤝 Contributing

Aktuell ist dies ein privates Projekt in der Entwicklungsphase. Contributions sind noch nicht möglich, aber das wird sich in Zukunft ändern!

## 📄 License

Noch nicht festgelegt - wird vor dem ersten Release definiert.

## 🔗 Links

- 📖 [Projektplan](./PROJECT_PLAN.md)
- 🏗️ [Architektur Dokumentation](./docs/ARCHITECTURE.md)
- 🎨 [Design System](./docs/DESIGN_SYSTEM.md)
- 🚀 [Futuristic Components](./docs/FUTURISTIC_COMPONENTS.md)
- 🗄️ [Supabase Setup Guide](./docs/SUPABASE_SETUP.md)

---

**Status**: 🚧 In Entwicklung | **Version**: Pre-Alpha | **Last Updated**: September 2025

## 🎨 Screenshots

### Onboarding Experience
- Animierte Willkommensseite mit Feature-Showcase
- Klassisches Raketen-Design mit flüssiger Launch-Animation
- Liquid Glass UI Komponenten mit futuristischem Cyber-Theme

### Authentication
- Deutsche Login/Register Seiten
- Glasmorphismus-Effekte
- Sichere Supabase Integration
# 🗄️ Supabase Setup Guide

## Warum Supabase?

Supabase bietet uns alles was wir brauchen:
- **PostgreSQL Database** - Robuste, skalierbare Datenbank
- **Authentication** - Email/Password, OAuth (Google, GitHub, etc.)
- **Real-time Subscriptions** - Live Updates für Widgets
- **Row Level Security** - Sichere Datenzugriffe
- **Storage** - File uploads für Attachments
- **Edge Functions** - Serverless API Endpunkte

## Setup Schritte

### 1. Supabase Projekt erstellen

```bash
# Supabase CLI installieren
npm install -g supabase

# Login
supabase login

# Neues Projekt erstellen
supabase init life-organizer
cd life-organizer
supabase start
```

### 2. Database Schema

```sql
-- In Supabase SQL Editor ausführen

-- User Profiles (ergänzt auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(100),
  avatar_url TEXT,
  preferences JSONB DEFAULT '{
    "theme": "light",
    "language": "de",
    "timezone": "Europe/Berlin"
  }'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Dashboards
CREATE TABLE dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  layout_config JSONB DEFAULT '{
    "columns": 4,
    "gap": 16,
    "padding": 24
  }'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Widgets
CREATE TABLE widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dashboard_id UUID REFERENCES dashboards(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(100),
  position JSONB NOT NULL DEFAULT '{
    "x": 0,
    "y": 0,
    "w": 2,
    "h": 2
  }'::jsonb,
  config JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Integrations (Mail, Calendar, etc.)
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'email', 'calendar', 'weather', etc.
  name VARCHAR(100),
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  credentials JSONB, -- Encrypted credentials
  is_active BOOLEAN DEFAULT TRUE,
  last_sync TIMESTAMP,
  sync_frequency INTEGER DEFAULT 300, -- seconds
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Widget Data (für Notizen, To-Dos, etc.)
CREATE TABLE widget_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  widget_id UUID REFERENCES widgets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'note', 'todo', 'calendar_event', etc.
  title VARCHAR(200),
  content JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_completed BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 0,
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Row Level Security (RLS)

```sql
-- RLS aktivieren
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE widget_data ENABLE ROW LEVEL SECURITY;

-- Policies für Profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policies für Dashboards
CREATE POLICY "Users can view own dashboards"
  ON dashboards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own dashboards"
  ON dashboards FOR ALL
  USING (auth.uid() = user_id);

-- Policies für Widgets
CREATE POLICY "Users can view own widgets"
  ON widgets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own widgets"
  ON widgets FOR ALL
  USING (auth.uid() = user_id);

-- Policies für Integrations
CREATE POLICY "Users can view own integrations"
  ON integrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own integrations"
  ON integrations FOR ALL
  USING (auth.uid() = user_id);

-- Policies für Widget Data
CREATE POLICY "Users can view own widget data"
  ON widget_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own widget data"
  ON widget_data FOR ALL
  USING (auth.uid() = user_id);
```

### 4. Functions & Triggers

```sql
-- Funktion für updated_at Timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers für alle Tabellen
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboards_updated_at
  BEFORE UPDATE ON dashboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_widgets_updated_at
  BEFORE UPDATE ON widgets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at
  BEFORE UPDATE ON integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_widget_data_updated_at
  BEFORE UPDATE ON widget_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Funktion für automatisches Profile erstellen
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name'
  );

  -- Standard Dashboard erstellen
  INSERT INTO public.dashboards (user_id, name, is_default)
  VALUES (NEW.id, 'Mein Dashboard', TRUE);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger für neuen User
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 5. Environment Variables

```bash
# Frontend (.env.local)
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# Backend (.env)
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
```

### 6. TypeScript Types

```typescript
// types/supabase.ts
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          preferences?: Json
        }
        Update: {
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          preferences?: Json
        }
      }
      dashboards: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_default: boolean
          layout_config: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          description?: string | null
          is_default?: boolean
          layout_config?: Json
        }
        Update: {
          name?: string
          description?: string | null
          is_default?: boolean
          layout_config?: Json
        }
      }
      widgets: {
        Row: {
          id: string
          user_id: string
          dashboard_id: string
          type: string
          title: string | null
          position: Json
          config: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          dashboard_id: string
          type: string
          title?: string | null
          position: Json
          config?: Json
          is_active?: boolean
        }
        Update: {
          type?: string
          title?: string | null
          position?: Json
          config?: Json
          is_active?: boolean
        }
      }
    }
  }
}
```

## Real-time Subscriptions

```typescript
// Real-time Updates für Widgets
const subscription = supabase
  .channel('widgets')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'widgets',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      console.log('Widget changed:', payload)
      // Update lokaler State
    }
  )
  .subscribe()
```

## Authentication Setup

```typescript
// Auth Konfiguration
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// OAuth Provider aktivieren (in Supabase Dashboard)
// - Google
// - GitHub
// - Discord
// - Apple
```

## Storage Setup

```sql
-- Storage Bucket für User Uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', false);

-- Storage Policies
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Migration Commands

```bash
# Lokale Migrations erstellen
supabase migration new create_initial_schema

# Migrations deployen
supabase db push

# Schema aus DB generieren
supabase gen types typescript --local > types/supabase.ts
```

## Troubleshooting

### Häufige Probleme

1. **RLS Fehler**: Stelle sicher, dass alle Policies korrekt gesetzt sind
2. **Auth Errors**: Überprüfe JWT Secret und Anon Key
3. **CORS Issues**: Konfiguriere erlaubte Origins in Supabase Dashboard
4. **Real-time nicht funktioniert**: Aktiviere Real-time in Projekteinstellungen

### Nützliche Queries

```sql
-- Alle User Dashboards anzeigen
SELECT d.*, COUNT(w.id) as widget_count
FROM dashboards d
LEFT JOIN widgets w ON d.id = w.dashboard_id
WHERE d.user_id = auth.uid()
GROUP BY d.id;

-- Widget Performance Stats
SELECT
  type,
  COUNT(*) as count,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_lifetime_seconds
FROM widgets
WHERE user_id = auth.uid()
GROUP BY type;
```
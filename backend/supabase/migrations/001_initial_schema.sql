-- Life Organizer Database Schema
-- Initial migration with all core tables

-- User Profiles (ergänzt auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(100),
  avatar_url TEXT,
  preferences JSONB DEFAULT '{
    "theme": "dark",
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

-- Row Level Security (RLS) aktivieren
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

-- Indexes für Performance
CREATE INDEX idx_dashboards_user_id ON dashboards(user_id);
CREATE INDEX idx_widgets_user_id ON widgets(user_id);
CREATE INDEX idx_widgets_dashboard_id ON widgets(dashboard_id);
CREATE INDEX idx_widget_data_widget_id ON widget_data(widget_id);
CREATE INDEX idx_widget_data_user_id ON widget_data(user_id);
CREATE INDEX idx_integrations_user_id ON integrations(user_id);
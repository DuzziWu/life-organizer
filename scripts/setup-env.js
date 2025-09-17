#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Life Organizer - Environment Setup\n');

// Environment template für Frontend
const frontendEnvTemplate = `# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Development Settings
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3001

# Optional: Analytics
VITE_GOOGLE_ANALYTICS_ID=

# Optional: Sentry Error Tracking
VITE_SENTRY_DSN=
`;

// Environment template für Backend
const backendEnvTemplate = `# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_KEY=your-supabase-service-role-key
SUPABASE_JWT_SECRET=your-supabase-jwt-secret

# Server Settings
PORT=3001
NODE_ENV=development

# CORS Settings
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration (für Mail-Integration)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# External APIs
OPENWEATHER_API_KEY=
NEWS_API_KEY=

# Security
JWT_SECRET=your-jwt-secret-here
ENCRYPTION_KEY=your-32-char-encryption-key-here

# Logging
LOG_LEVEL=info
`;

function createEnvFile(filePath, content, description) {
  const fullPath = path.resolve(__dirname, '..', filePath);

  if (fs.existsSync(fullPath)) {
    console.log(`⚠️  ${description} bereits vorhanden: ${filePath}`);
    return;
  }

  try {
    fs.writeFileSync(fullPath, content);
    console.log(`✅ ${description} erstellt: ${filePath}`);
  } catch (error) {
    console.error(`❌ Fehler beim Erstellen von ${filePath}:`, error.message);
  }
}

function createDirectory(dirPath) {
  const fullPath = path.resolve(__dirname, '..', dirPath);

  if (!fs.existsSync(fullPath)) {
    try {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Verzeichnis erstellt: ${dirPath}`);
    } catch (error) {
      console.error(`❌ Fehler beim Erstellen von ${dirPath}:`, error.message);
    }
  }
}

// Verzeichnisse erstellen
console.log('📁 Erstelle Verzeichnisse...');
createDirectory('frontend/src');
createDirectory('frontend/public');
createDirectory('backend/src');
createDirectory('supabase');

// Environment Dateien erstellen
console.log('\n🔧 Erstelle Environment Dateien...');
createEnvFile('frontend/.env.local', frontendEnvTemplate, 'Frontend Environment');
createEnvFile('backend/.env', backendEnvTemplate, 'Backend Environment');

// Beispiel-Konfigurationsdateien
console.log('\n📋 Nächste Schritte:\n');
console.log('1. Supabase Projekt erstellen:');
console.log('   → https://supabase.com/dashboard');
console.log('   → Notiere dir URL und API Keys\n');

console.log('2. Environment Variablen konfigurieren:');
console.log('   → frontend/.env.local');
console.log('   → backend/.env\n');

console.log('3. Packages installieren:');
console.log('   → npm run install:all\n');

console.log('4. Supabase Setup:');
console.log('   → cd backend && npm run supabase:start');
console.log('   → Folge der Anleitung in docs/SUPABASE_SETUP.md\n');

console.log('5. Development starten:');
console.log('   → npm run dev\n');

console.log('📖 Weitere Informationen findest du in der Dokumentation!');
console.log('🚀 Happy Coding!\n');
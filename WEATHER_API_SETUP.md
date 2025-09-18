# 🌤️ Weather API Setup Guide

## Schritt 1: OpenWeatherMap Account erstellen

1. Gehe zu: https://openweathermap.org/api
2. Klicke auf **"Sign Up"** (kostenloser Account)
3. Fülle das Anmeldeformular aus
4. Bestätige deine Email-Adresse

## Schritt 2: API Key generieren

1. Logge dich in dein OpenWeatherMap Dashboard ein
2. Gehe zu **"API Keys"** Sektion
3. Klicke **"Generate"** oder **"Create"** 
4. Kopiere deinen API Key (z.B. `abc123def456...`)

⚠️ **Wichtig**: Der API Key kann 10-60 Minuten brauchen bis er aktiviert ist!

## Schritt 3: API Key konfigurieren

1. Öffne die Datei: `frontend/.env.local`
2. Ersetze `your_api_key_here` mit deinem echten API Key:

```bash
VITE_OPENWEATHER_API_KEY=abc123def456your_real_api_key_here
```

## Schritt 4: API testen

1. Öffne `frontend/test-weather-api.js`
2. Ersetze `your_api_key_here` mit deinem API Key
3. Führe den Test aus:

```bash
cd frontend
node test-weather-api.js
```

**Erwartete Ausgabe:**
```
🧪 Testing OpenWeatherMap API...
📍 Test 1: Searching for "Prenzlau"
✅ Found locations: [{"name":"Prenzlau","country":"DE",...}]
🌤️ Test 2: Getting current weather
✅ Current weather:
   Temperature: 18°C
   Condition: scattered clouds
   ...
🎉 All tests passed!
```

## Schritt 5: Development Server neustarten

```bash
npm run dev
```

## Troubleshooting

### ❌ "401 Unauthorized"
- API Key ist falsch oder nicht aktiviert
- Warte 10-60 Minuten nach der Erstellung
- Überprüfe die Schreibweise des Keys

### ❌ "No cities found"
- Deine Fallback-Datenbank wird verwendet
- Das ist normal ohne gültigen API Key
- Mit API Key funktioniert die echte Suche

### ❌ "Network Error"
- Internetverbindung prüfen
- OpenWeatherMap Service Status checken
- Firewall/Proxy Einstellungen prüfen

## Features mit echter API

✅ **Echte Wetterdaten** für jede Stadt weltweit  
✅ **Aktuelle Temperaturen** und Bedingungen  
✅ **Präzise Vorhersagen** für 5 Tage  
✅ **Automatische Standorterkennung** mit echten Ortsnamen  
✅ **Globale Stadtsuche** mit tausenden Städten  

## API Limits (Free Plan)

- **1.000 Calls/Tag** (mehr als genug für persönliche Nutzung)
- **60 Calls/Minute**
- **5-Tage Vorhersage**
- **Aktuelle Wetterdaten**

Mehr Infos: https://openweathermap.org/price
# 🚀 GitHub Repository Setup

## Repository erstellen

### 1. GitHub Repository erstellen
1. Gehe zu [GitHub.com](https://github.com) und logge dich ein
2. Klicke auf "New repository" (oder über [diesen Link](https://github.com/new))
3. Repository Details:
   - **Repository name**: `life-organizer`
   - **Description**: `🏠 Eine moderne, personalisierbare Dashboard-Webapp zur Lebensorganisation mit futuristischem Design`
   - **Visibility**: Private oder Public (deine Wahl)
   - **Initialize**: NICHT initialisieren (wir haben bereits lokale Dateien)

### 2. Lokales Repository mit GitHub verbinden

```bash
# Remote origin hinzufügen (ersetze USERNAME mit deinem GitHub Username)
git remote add origin https://github.com/USERNAME/life-organizer.git

# Branch auf main umbenennen (moderne Git Convention)
git branch -M main

# Ersten Push zum GitHub Repository
git push -u origin main
```

### 3. Repository Settings (empfohlene Konfiguration)

#### Branch Protection
- Gehe zu Settings → Branches
- Füge Branch protection rule für `main` hinzu:
  - ✅ Require pull request reviews before merging
  - ✅ Dismiss stale PR approvals when new commits are pushed
  - ✅ Require status checks to pass before merging

#### GitHub Pages (optional für Dokumentation)
- Settings → Pages
- Source: GitHub Actions
- Später können wir Dokumentation automatisch deployen

#### Topics/Tags hinzufügen
Füge diese Topics hinzu für bessere Auffindbarkeit:
```
dashboard, widget-system, supabase, react, typescript,
futuristic-ui, dark-theme, productivity, life-organizer
```

### 4. GitHub Actions Workflows (später)

```yaml
# .github/workflows/ci.yml (später hinzufügen)
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build
```

### 5. Issue Templates

Erstelle `.github/ISSUE_TEMPLATE/` mit:
- `bug_report.md` - Für Bug Reports
- `feature_request.md` - Für Feature Requests
- `widget_request.md` - Für neue Widget Ideen

### 6. Pull Request Template

```markdown
# .github/pull_request_template.md

## Beschreibung
<!-- Beschreibe deine Änderungen -->

## Art der Änderung
- [ ] Bug fix
- [ ] Neues Feature
- [ ] Breaking change
- [ ] Dokumentation

## Testing
- [ ] Manuelle Tests durchgeführt
- [ ] Unit Tests hinzugefügt/aktualisiert
- [ ] Build läuft ohne Fehler

## Screenshots
<!-- Falls UI Änderungen -->

## Checklist
- [ ] Code folgt dem Style Guide
- [ ] Self-review durchgeführt
- [ ] Dokumentation aktualisiert
```

### 7. Deployment Setup

#### Vercel Deployment
1. Verbinde GitHub Repository mit Vercel
2. Environment Variables konfigurieren:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

#### Auto-Deploy Branch Structure
```
main          → Production (vercel.com)
develop       → Preview (develop.vercel.app)
feature/*     → Preview deploys
```

## Nächste Schritte nach GitHub Setup

1. **GitHub Repository erstellen und pushen**
2. **Erste Issues für MVP Features erstellen**
3. **Project Board für Sprint Planning**
4. **Development Branch erstellen**
5. **Frontend Projekt aufsetzen**

## Repository URL
Nach dem Setup wird die Repository URL sein:
`https://github.com/USERNAME/life-organizer`

## Entwicklungsworkflow

```bash
# Feature branch erstellen
git checkout -b feature/widget-system

# Änderungen committen
git add .
git commit -m "feat: implement basic widget system"

# Push und Pull Request erstellen
git push origin feature/widget-system
# Dann PR über GitHub UI erstellen
```
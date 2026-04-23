# Olsenbande Headquarter

Ein React-basiertes Dashboard für Projektmanagement mit Chat-Funktion und Sub-Agent-Steuerung.

## Features

- **Login-Seite**: HTTP Basic Auth Simulation
- **Dashboard**: Übersicht mit Projekt-Statistiken
- **Projekt-Manager**: Projekte erstellen, bearbeiten, löschen
- **Chat-Interface**: Projekt-basierter Chat mit Kontext-Switch
- **Sub-Agent-Panel**: Agenten pro Projekt starten/stoppen

## Technologie-Stack

- React 18 mit Hooks
- Vite (Build-Tool)
- React Router v6 für Navigation
- Lokaler State (localStorage für Datenpersistenz)
- HTTP Basic Auth via Vite Proxy Konfiguration

## Schnellstart

### 1. Abhängigkeiten installieren

```bash
npm install
```

### 2. Entwicklungsserver starten

```bash
npm run dev
```

Die App ist dann unter `http://localhost:5173` verfügbar.

### 3. Produktions-Build erstellen

```bash
npm run build
```

## Login

- **Benutzername**: `admin`
- **Passwort**: `olsen123`

## Projektstruktur

```
src/
├── components/       # Wiederverwendbare UI-Komponenten
│   ├── ProjectCard.jsx
│   ├── ProjectCard.css
│   ├── AgentList.jsx
│   └── AgentList.css
├── pages/             # Seiten-Komponenten
│   ├── Login.jsx
│   ├── Login.css
│   ├── Dashboard.jsx
│   ├── Dashboard.css
│   ├── Projects.jsx
│   ├── Projects.css
│   ├── Chat.jsx
│   └── Chat.css
├── hooks/             # Custom React Hooks
│   ├── useAuth.js
│   └── useProjects.js
├── context/           # React Context
│   └── AuthContext.jsx
├── App.jsx           # Haupt-Routing
├── main.jsx          # Einstiegspunkt
└── index.css         # Globale Styles
```

## Datenpersistenz

Alle Daten werden im Browser's localStorage gespeichert:
- `olsenbande_auth` - Authentifizierungsstatus
- `olsenbande_user` - Benutzername
- `olsenbande_projects` - Projektdaten
- `olsenbande_messages` - Chat-Nachrichten
- `olsenbande_agents_{projectId}` - Agent-Status pro Projekt

## Agenten

Die Demo beinhaltet folgende Agenten:
- **Egon** - Stratege
- **Benny** - Techniker
- **Kjeld** - Logistiker
- **Yvonne** - Ablenkung

## Lizenz

MIT

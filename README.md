# ☀️ SolarSync

**SolarSync** is a **demo project**, built using offline-first application architecture. It simulates a field reporting tool for solar panel technicians - focused on logging comments, observations, and map-based data tied to a single report.

> ⚠️ This is a **conceptual demo**, built to showcase clean architecture, local-first principles, and scalability. The app is currently scoped to field noting for **one report**.

---
🌐 **[Live Demo](https://solarsync-ee16d33ed3e6.herokuapp.com/)**

<div align="left">
  <img src="https://github.com/user-attachments/assets/d7a959f5-c808-44dc-82e0-185256464cc4" height="310" />
  <img src="https://github.com/user-attachments/assets/4ac8c4f0-0139-40f2-a793-e6bda67a2b46" height="310" />
</div>

---

## 🌍 What is SolarSync?

SolarSync is a **PWA** designed for technicians who may be working in remote areas with poor or no internet connectivity. It enables:
- Logging field observations
- Commenting and threaded replies
- Syncing data later when online

It lays the groundwork for **future multi-report support**, multi-user conflict handling, and real-world deployments.

---

## 🔧 Key Features

### ✅ Offline-First Field Notes
- Works fully offline - try turning off Wi-Fi and reloading!
- Uses IndexedDB via `Dexie.js` for local persistence
- Cached tiles and markers (Leaflet/OpenStreetMap)
- Nested threaded comments

### 💡 Smart Local-first Architecture
- Notes are created, updated, and read locally
- Each note includes `synced` and `updatedAt` fields
- Multi-tab notes sync
- Sync engine (WIP) will support conflict resolution patterns

### ⚡ PWA Capabilities
- Installable on desktop & mobile
- Service worker handles background caching

### 🧪 Fully Testable & Maintainable
- Powered by **Vitest** + **React Testing Library**
- Domain-oriented file structure for clear separation

---

## 🏗️ Tech Stack

- **React + TypeScript**
- **Vite + SWC**
- **TailwindCSS**
- **IndexedDB via Dexie.js**
- **Vitest + Testing Library**
- **Leaflet + OpenStreetMap**
- **VitePWA plugin**

---

## 📁 Project structure
```markdown
src/
├── common/             # Shared types, UI components, utilities
├── features/
│   └── comments/       # Field note logic, forms, nested UI
├── sync/               # (WIP) Sync engine for remote API integration
├── App.tsx             # Entry point
```

---

## 🚧 Current Limitations

This is a demo/prototype build with the following constraints:

- 📝 **Single report scope** — the app assumes one predefined report for now
- 🚫 **No real backend** — everything is stored locally in the browser
- 🔄 **Sync logic is in progress** — `syncUp` / `syncDown` methods will be implemented to communicate with a backend
- 🔐 **No auth/users** — everyone is a fake technician with mock avatars
- 🧷 **No media support** — you can’t attach files, photos, or audio notes
- 🧪 **Only unit tests** — no E2E tests or visual testing yet

---

## 🔁 Sync Layer (Planned)

The `sync/` folder will host logic for keeping local and remote data in sync.

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/evankazadaiev/solarsync.git
cd solarsync

# Install dependencies
npm install

# Start the dev server
npm run dev

# Run the tests
npm run test

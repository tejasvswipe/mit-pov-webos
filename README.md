# mit-pov

> A desktop OS from the perspective of an MIT topper, featuring draggable windows, a live top-bar clock, and interactive apps (transcript, trophy case, terminal, and projects) built as a real React + TypeScript app.

[🖥️ **Try the Live Demo →**](https://mit-pov-webos.vercel.app)

---

## Preview

<p align="center">
  <img width="957" alt="Desktop OS Preview" src="https://github.com/user-attachments/assets/4c947398-79dc-41d9-bb3b-db6f76b3065f" />
</p>

<details>
  <summary><img width="957" height="422" alt="Screenshot 2026-09-23 023655" src="https://github.com/user-attachments/assets/b28b906a-3634-47d0-b122-696da6b92dcf" />
</summary>
  <br />
  <img width="956" alt="Terminal and Apps Preview" src="https://github.com/user-attachments/assets/bfdfb2af-c20e-4391-9b73-b05f2d1d48ab" />
</details>

---

## Quick Start

Visit [mit-pov-webos.vercel.app](https://mit-pov-webos.vercel.app) — no installation or setup required.

---

## Features

- 🖥️ **Desktop Shell:** Includes custom wallpaper, top bar with a live clock, and interactive desktop icons.
- 🪟 **Window Management System:** Draggable, focusable, openable, and closable windows.
- 📜 **Transcript.exe:** Displays GPA and coursework formatted like an academic transcript.
- 🏆 **Trophy Case.exe:** Showcases awards, hackathon wins, and achievements.
- 💻 **Terminal.exe:** Interactive terminal equipped with easter egg commands.
- 📂 **Projects.exe:** Cards linking directly to repositories and live demos.

---

## How It Works

Instead of relying on raw DOM manipulations or heavy desktop libraries, the windowing system manages state (visibility, drag coordinates, and dynamic `z-index` focus) purely within React. Adding new apps requires zero chrome boilerplate — you simply wrap any react component in the shared `Window` primitive.

### Tech Stack
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, wouter
- **UI System:** shadcn/ui (Radix UI primitives)
- **Backend:** Express (Node.js built via esbuild)
- **Package Manager:** pnpm

---

## Run Locally

### Prerequisites
- Node.js (v18+)
- pnpm (`npm install -g pnpm`)

### Steps

```bash

# Clone the repository
git clone [https://github.com/tejasvswipe/mit-pov-webos.git](https://github.com/tejasvswipe/mit-pov-webos.git)

# Navigate to directory
cd mit-pov-webos

# Install dependencies
pnpm installOther Useful CommandsCommandDescriptionpnpm checkType-check TypeScript code without emittingpnpm buildBuild production bundle for client and serverpnpm startRun the compiled production serverpnpm previewPreview the production Vite build locallyProject Structuremit-pov-webos/
├── client/    # React frontend (components, desktop apps, window system)
├── server/    # Express backend
├── shared/    # Shared types and utility logic
└── patches/   # pnpm patch overrides
CreditsWindowing architecture inspired by the WebOS Builder project from Hack Club's webOS Jams by SerenityUX.UI Components from shadcn/ui.

# Start development server
pnpm dev

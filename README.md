# mit-pov

we doesnt sucks
 A desktop OS from the perspective of an MIT topper, featuring draggable windows, a top-bar clock, and interactive apps (`transcript.exe`, `trophy case.exe`, `terminal.exe`, and `projects.exe`) built as a real React/TypeScript app.

[🖥️ Try it live →](https://mit-pov-webos.vercel.app?utm_source=gemini)

## Preview
<img width="957" height="422" alt="Screenshot 2026-09-23 023655" src="https://github.com/user-attachments/assets/4e54c20b-731c-467f-a67a-cf5fb85472a5" />

## Quick Start

No installation required! Just visit [mit-pov-webos.vercel.app](https://mit-pov-webos.vercel.app?utm_source=gemini).
 commit -m " i want good stardust due to my robot building  (a rizzy  robot irl ) project "
## Features

* **Desktop shell:** Custom wallpaper, live clock on the top bar, and desktop app icons.

* **Window manager:** Draggable, focusable, openable, and closable windows built from scratch (no magic windowing libraries!).

* **`transcript.exe`:** Mimics a real-life academic record showing GPA, coursework, and schedule.

* **`trophy case.exe`:** Displays cool achievements, hackathon wins, and accolades.

* **`terminal.exe`:** Interactive terminal with custom commands and easter eggs.

* **`projects.exe`:** Cards with live demos and direct links to project repos.

## How It Works

Instead of using the traditional approach of raw DOM element manipulation or heavy window manager libraries, I built everything directly in React. The app manages window state (open/closed, z-index focus) and drag coordinates natively.

This makes adding new desktop apps super simple — you just write a standard React component and pass it into the `Window` primitive exported by this project.

## Tech Stack

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, wouter

* **UI Components:** shadcn/ui (Radix UI primitives)

* **Backend:** Express (Node.js built using esbuild)

* **Package Manager:** pnpm

## How to Run Locally

### Requirements

* Node.js (v18+)

* pnpm (`npm install -g pnpm`)

### Installation & Setup

```
# Clone the repository
git clone https://github.com/tejasvswipe/mit-pov-webos.git

# Navigate into project folder
cd mit-pov-webos

# Install dependencies
pnpm install

# Start the dev server
pnpm dev

```

### Useful Scripts

| **Command** | **Description** | 
| `pnpm check` | Type check TypeScript code without emitting | 
| `pnpm build` | Build app for production (client and server) | 
| `pnpm start` | Run the compiled production server | 
| `pnpm preview` | Preview production build locally | 

## Project Structure

```
mit-pov-webos/
├── client/    # React frontend (desktop shell, apps, window components)
├── server/    # Node.js Express server
├── shared/    # Shared types/utilities between client and server
└── patches/   # pnpm patch overrides

```

## Credits & Inspiration

* Window manager concept inspired by the [WebOS Builder](https://jams.hackclub.com/batch/webOS?utm_source=gemini) project created during Hack Club's webOS Jams by SerenityUX. 

* UI components built with [shadcn/ui](https://ui.shadcn.com?utm_source=gemini).

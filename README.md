# mit-pov

A personal, browser-based desktop OS — seen through the POV of an MIT topper. Draggable windows, a live top-bar clock, and desktop apps like a transcript, a trophy case, and a terminal, built as a real React + TypeScript app instead of a static page.
<img width="957" height="422" alt="Screenshot 2026-09-23 023655" src="https://github.com/user-attachments/assets/c53011da-5235-4d9e-9d78-700c810698bb" />

<img width="956" height="421" alt="Screenshot 2026-09-23 023502" src="https://github.com/user-attachments/assets/9196fa33-a04d-4ebb-ad6a-eb2deafcf5cb" />


**[🖥️ Try it live →](https://mit-pov-webos.vercel.app)**

## Quick start

Open the link above — no install needed.

## Features

- 🖥️ Full desktop shell — wallpaper, top bar, live clock, desktop icons
- 🪟 Draggable, openable, closable windows (reusable window system across every app)
- 📜 **Transcript.exe** — GPA and key coursework, styled like a real transcript
- 🏆 **Trophy Case.exe** — awards, hackathon wins, achievements
- 💻 **Terminal.exe** — a fake interactive terminal with easter-egg commands
- 📂 **Projects.exe** — portfolio cards linking to repos and demos

## Tech stack

- **Frontend:** React 19 + TypeScript, built with Vite
- **UI components:** [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives + `class-variance-authority`, `tailwind-merge`)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Routing:** wouter
- **Forms/validation:** react-hook-form + zod
- **Backend:** Express (Node), bundled with esbuild for production
- **Package manager:** pnpm

## Running it locally

```bash
git clone https://github.com/tejasvswipe/mit-pov-webos.git
cd mit-pov-webos
pnpm install
pnpm dev
```

This starts Vite in dev mode (`vite --host`). To build and run the production bundle:

```bash
pnpm build
pnpm start
```

Other useful scripts:

```bash
pnpm check     # type-check with tsc, no emit
pnpm format    # prettier --write .
pnpm preview   # preview the production build locally
```

## Project structure

```
client/    # React frontend (components, pages, desktop apps)
server/    # Express server
shared/    # Code/types shared between client and server
patches/   # pnpm patch files (e.g. wouter patch)
```

## How it works

Every app on the desktop shares one reusable window system — open, close, drag, and focus — built on top of shadcn/ui components rather than raw DOM manipulation, so adding a new app means composing existing primitives instead of hand-rolling window chrome again. State (which windows are open, their position, z-index) lives in React rather than being tracked via manual DOM classes.

## Credits

- Windowing concept inspired by the [WebOS Builder](https://jams.hackclub.com/batch/webOS) pattern from Hack Club's webOS Jams by SerenityUX, adapted into a React/TypeScript implementation
- UI components from [shadcn/ui](https://ui.shadcn.com)

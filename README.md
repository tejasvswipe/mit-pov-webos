# mit-pov



A desktop OS from the perspective of an MIT topper, featuring draggable windows, a live top-bar clock and apps like a transcript, trophy case and terminal as a real React + TypeScript app (not a page).



[🖥️ Try it live →](https://mit-pov-webos.vercel.app)



## Quick Start

<img width="957" height="422" alt="Screenshot 2026-09-23 023655" src="https://github.com/user-attachments/assets/4c947398-79dc-41d9-bb3b-db6f76b3065f" />
<img width="956" height="421" alt="Screenshot 2026-09-23 023502" src="https://github.com/user-attachments/assets/bfdfb2af-c20e-4391-9b73-b05f2d1d48ab" />

Visit the link above. No install required.



## Features



- 🖥️ Desktop shell, complete with wallpaper, top bar with live clock and desktop icons

- 🪟 Draggable, openable and closable windows (reusable window system across all apps)

- 📜 Transcript.exe — GPA and coursework, styled as a transcript

- 🏆 Trophy Case.exe — all your awards, hackathon wins etc.

- 💻 Terminal.exe — an interactive terminal with some easter egg commands

- 📂 Projects.exe — cards for all your projects, linking to repos and demos

## Technologies



- Frontend: React 19 + TypeScript (Vite)

- UI Components: [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives + `class-variance-authority`, `tailwind-merge`)

- Styling: Tailwind CSS v4

- Animations: Framer Motion

- Routing: wouter

- Forms/Validation: react-hook-form + zod

- Backend: Express (Node) (built with esbuild for production)

- Package manager: pnpm



## Run Locally



```bash

git clone https://github.com/tejasvswipe/mit-pov-webos.git

cd mit-pov-webos

pnpm install

pnpm dev

```



This will start the dev server with Vite in dev mode (`vite --host`). To build and run the production bundle:



```bash

pnpm build

pnpm start

```



Other useful scripts:



```bash

pnpm check # type-check with tsc, no emit

pnpm format # prettier --write .

pnpm preview # preview the production build locally

```



## Project Structure

```



client/ # React frontend (components, pages, desktop apps)

server/ # Express server

shared/ # Code/types shared between client and server

patches/ # pnpm patch files (e.g. wouter patch)

```



## How It Works



A few apps on the desktop share a common window system — you can open, close, drag and focus windows (built on top of shadcn/ui components) rather than fighting with raw DOM APIs every time, so to add a new app you just compose existing primitives rather than reimplementing window chrome. Window state (openness, position, z-index) is managed in React rather than with classes.



## Credits



- Windowing pattern inspired by the [WebOS Builder](https://jams.hackclub.com/batch/webOS) pattern from Hack Club's webOS Jams by SerenityUX, adapted into a React/TypeScript implementation

- UI Components from [shadcn/ui](https://ui.shadcn.com)

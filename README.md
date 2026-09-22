# mit-pov

A personal, browser-based desktop OS — seen through the POV of an MIT topper. Draggable windows, a live top-bar clock, and desktop apps like a transcript, a trophy case, and a terminal, all built with vanilla HTML, CSS, and JS.

<!-- Add a screenshot or GIF of the desktop in action here -->
<!-- ![mit-pov screenshot](./docs/screenshot.png) -->

**[🖥️ Try it live →](#)** <!-- swap in your deployed URL once it's live -->

## Quick start

Open the link above — no install needed.

## Features

- 🖥️ Full desktop shell — wallpaper, top bar, live clock, desktop icons
- 🪟 Draggable, openable, closable windows (reusable across every app)
- 📜 **Transcript.exe** — GPA and key coursework, styled like a real transcript
- 🏆 **Trophy Case.exe** — awards, hackathon wins, achievements
- 💻 **Terminal.exe** — a fake interactive terminal with easter-egg commands
- 📂 **Projects.exe** — portfolio cards linking to repos and demos

## Running it locally

```bash
git clone https://github.com/tejasvswipe/mit-pov-webos.git
cd mit-pov
```

No build step, no dependencies — just open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## How it works

The whole OS is three files: `index.html` for structure, `style.css` for every visual rule, and `script.js` for all behavior. Every app on the desktop shares one reusable window system — `.window`, `.windowheader`, `.closebutton` — with a single `dragElement()` function bound to each header, so adding a new app never means rebuilding drag/open/close from scratch.

## Credits

- Built on the [WebOS Builder](https://jams.hackclub.com/batch/webOS) pattern from Hack Club's webOS Jams by SerenityUX

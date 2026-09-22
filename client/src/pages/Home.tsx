import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Award,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  Code2,
  Command,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  FolderKanban,
  Github,
  Globe2,
  Hash,
  Linkedin,
  Loader2,
  Maximize2,
  Minus,
  Network,
  Play,
  Radar,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal as TerminalIcon,
  Trophy,
  TreePine,
  UserRound,
  Wifi,
  X,
  Zap,
} from "lucide-react";

type AppId = "transcript" | "trophies" | "projects" | "ocw" | "terminal" | "notes" | "orbital" | "collab";
type WindowPosition = { left: number; top: number };
type Apod = { title: string; explanation: string; url: string; hdurl?: string; media_type: string; date: string; copyright?: string };

const appItems: Array<{ id: AppId; label: string; kicker: string; icon: typeof BookOpen; tone: string }> = [
  { id: "transcript", label: "Transcript.exe", kicker: "academic record", icon: BookOpen, tone: "red" },
  { id: "trophies", label: "Trophy Case.exe", kicker: "proof of work", icon: Trophy, tone: "amber" },
  { id: "projects", label: "Projects.exe", kicker: "selected builds", icon: FolderKanban, tone: "blue" },
  { id: "ocw", label: "OCW / CS Tree", kicker: "course constellation", icon: TreePine, tone: "pink" },
  { id: "terminal", label: "Terminal.exe", kicker: "run a query", icon: TerminalIcon, tone: "green" },
  { id: "notes", label: "Notes.exe", kicker: "field notes", icon: FileText, tone: "violet" },
  { id: "orbital", label: "Orbital Brief.exe", kicker: "NASA live feed", icon: Radar, tone: "cyan" },
  { id: "collab", label: "Collab.exe", kicker: "live team room", icon: Network, tone: "green" },
];

const defaultPositions: Record<AppId, WindowPosition> = {
  transcript: { left: 292, top: 106 },
  trophies: { left: 594, top: 138 },
  projects: { left: 370, top: 110 },
  ocw: { left: 448, top: 84 },
  terminal: { left: 320, top: 152 },
  notes: { left: 630, top: 118 },
  orbital: { left: 250, top: 88 },
  collab: { left: 480, top: 150 },
};

const projectData = [
  { title: "Signal / 01", type: "robotics", desc: "Low-latency sensor fusion for autonomous lab rovers.", meta: "C++ · ROS2 · 2025", tone: "red" },
  { title: "Atlas of Attention", type: "research", desc: "A visual field guide to finding signal in noisy systems.", meta: "Python · D3 · 2024", tone: "blue" },
  { title: "Lumen Grid", type: "systems", desc: "A resilient energy dashboard for microgrid operators.", meta: "TypeScript · WebGL · 2024", tone: "amber" },
];

const ocwNodes = [
  { id: "root", label: "MIT EECS / computer science", meta: "THE BIG TREE", depth: 0, branch: "pink" },
  { id: "foundations", label: "foundations", meta: "4 courses", depth: 1, branch: "pink" },
  { id: "6.006", label: "6.006 · algorithms", meta: "active · 12 weeks", depth: 2, branch: "pink" },
  { id: "18.06", label: "18.06 · linear algebra", meta: "completed · A", depth: 2, branch: "pink" },
  { id: "systems", label: "systems & architecture", meta: "3 courses", depth: 1, branch: "blue" },
  { id: "6.033", label: "6.033 · computer systems", meta: "active · 10 weeks", depth: 2, branch: "blue" },
  { id: "6.004", label: "6.004 · computation structures", meta: "next up · 13 weeks", depth: 2, branch: "blue" },
  { id: "ai", label: "ai & intelligence", meta: "3 courses", depth: 1, branch: "lime" },
  { id: "6.034", label: "6.034 · artificial intelligence", meta: "queued · 12 weeks", depth: 2, branch: "lime" },
  { id: "6.100", label: "6.100 · programming", meta: "completed · A", depth: 2, branch: "lime" },
];

const ocwDetails: Record<string, { title: string; accent: string; description: string; tags: string[] }> = {
  root: { title: "The MIT CS constellation", accent: "pink", description: "A playful map of the computer science spine: start with foundations, branch into systems, then follow the signal toward intelligence.", tags: ["OCW INDEX", "MIT EECS", "SELF-PACED"] },
  foundations: { title: "Foundations", accent: "pink", description: "The core mental models: algorithms, linear algebra, probability, and the craft of making a proof executable.", tags: ["ALGORITHMS", "MATH", "LOGIC"] },
  "6.006": { title: "6.006 / Introduction to Algorithms", accent: "pink", description: "Design and analysis of efficient algorithms. A cozy little forest of graphs, heaps, hashing, and the occasional dynamic-programming boss battle.", tags: ["GRAPHS", "DP", "COMPLEXITY"] },
  "18.06": { title: "18.06 / Linear Algebra", accent: "pink", description: "Vectors, matrices, eigenvalues, and the geometry hiding under every good model.", tags: ["VECTORS", "EIGENVALUES", "MODELS"] },
  systems: { title: "Systems & architecture", accent: "blue", description: "The branch where abstractions meet silicon: operating systems, distributed services, networks, and trade-offs with receipts.", tags: ["OS", "NETWORKS", "DISTRIBUTED"] },
  "6.033": { title: "6.033 / Computer Systems Engineering", accent: "blue", description: "Build systems that survive real users, real failure, and real time. The favorite branch of this desktop.", tags: ["RELIABILITY", "SECURITY", "DESIGN"] },
  "6.004": { title: "6.004 / Computation Structures", accent: "blue", description: "From Boolean logic to processors: understand the machine all the way down to the voltage.", tags: ["DIGITAL", "CPU", "HARDWARE"] },
  ai: { title: "AI & intelligence", accent: "lime", description: "The branch that asks how machines can represent, infer, and act — with a human-sized sense of wonder.", tags: ["LEARNING", "SEARCH", "AGENTS"] },
  "6.034": { title: "6.034 / Artificial Intelligence", accent: "lime", description: "Symbolic reasoning, search, learning, and the lovely friction between a clean theory and a messy world.", tags: ["REASONING", "SEARCH", "LEARNING"] },
  "6.100": { title: "6.100 / Introduction to Programming", accent: "lime", description: "The first spark: variables, functions, recursion, and the confidence to make the computer do a tiny dance.", tags: ["PYTHON", "RECURSION", "BUILD"] },
};

const awards = [
  { date: "05.25", title: "HackMIT — Grand Prize", detail: "Real-time assistive computing", badge: "01" },
  { date: "11.24", title: "MIT 6.006 — Top 5%", detail: "Introduction to Algorithms", badge: "02" },
  { date: "06.24", title: "UROP Research Credit", detail: "Distributed systems lab", badge: "03" },
  { date: "03.24", title: "Kaggle — Silver Medal", detail: "Climate signal classification", badge: "04" },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function formatDate(date: Date) {
  return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

function Home() {
  const [entered, setEntered] = useState(false);
  const [time, setTime] = useState(() => new Date());
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<AppId | null>(null);
  const [openWindows, setOpenWindows] = useState<Record<AppId, boolean>>({
    transcript: true,
    trophies: false,
    projects: false,
    ocw: false,
    terminal: false,
    notes: false,
    orbital: false,
    collab: false,
  });
  const [positions, setPositions] = useState(defaultPositions);
  const [maximized, setMaximized] = useState<Record<AppId, boolean>>({
    transcript: false,
    trophies: false,
    projects: false,
    ocw: false,
    terminal: false,
    notes: false,
    orbital: false,
    collab: false,
  });
  const [topLayer, setTopLayer] = useState(20);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "MIT POV OS shell / secure session established",
    "type 'help' for available commands",
    "",
  ]);
  const [ocwSelected, setOcwSelected] = useState("root");
  const [notes, setNotes] = useState(() => {
    if (typeof window === "undefined") return "The best systems make the complex feel inevitable.\n\nCurrent focus → distributed intelligence, human-scale tools, and the discipline to ship.";
    return window.localStorage.getItem("mit-pov-notes") || "The best systems make the complex feel inevitable.\n\nCurrent focus → distributed intelligence, human-scale tools, and the discipline to ship.";
  });
  const [notesSaved, setNotesSaved] = useState(true);
  const [nasaKey, setNasaKey] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("mit-pov-nasa-key") || "";
  });
  const [apod, setApod] = useState<Apod | null>(null);
  const [apodLoading, setApodLoading] = useState(false);
  const [apodError, setApodError] = useState("");
  const [systemMessage, setSystemMessage] = useState("All systems nominal");
  const desktopRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: AppId; offsetX: number; offsetY: number } | null>(null);

  const filteredApps = useMemo(() => {
    const query = commandQuery.trim().toLowerCase();
    if (!query) return appItems;
    return appItems.filter((app) => `${app.label} ${app.kicker}`.toLowerCase().includes(query));
  }, [commandQuery]);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setSelectedIcon(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      const desktop = desktopRef.current;
      if (!drag || !desktop) return;
      const bounds = desktop.getBoundingClientRect();
      const nextLeft = Math.max(12, Math.min(event.clientX - bounds.left - drag.offsetX, bounds.width - 360));
      const nextTop = Math.max(70, Math.min(event.clientY - bounds.top - drag.offsetY, bounds.height - 120));
      setPositions((current) => ({ ...current, [drag.id]: { left: nextLeft, top: nextTop } }));
    };
    const onPointerUp = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const bringToFront = (id: AppId) => {
    setActiveApp(id);
    setTopLayer((layer) => layer + 1);
  };

  const openApp = (id: AppId) => {
    setOpenWindows((current) => ({ ...current, [id]: true }));
    setSelectedIcon(id);
    bringToFront(id);
    setSystemMessage(`${appItems.find((app) => app.id === id)?.label} active`);
  };

  const closeApp = (id: AppId) => {
    setOpenWindows((current) => ({ ...current, [id]: false }));
    if (activeApp === id) setActiveApp(null);
    setSystemMessage("Window closed · all changes retained");
  };

  const toggleMaximize = (id: AppId) => {
    bringToFront(id);
    setMaximized((current) => ({ ...current, [id]: !current[id] }));
  };

  const startDrag = (event: React.PointerEvent, id: AppId) => {
    if (maximized[id]) return;
    const windowEl = document.getElementById(`window-${id}`);
    const desktop = desktopRef.current;
    if (!windowEl || !desktop) return;
    const rect = windowEl.getBoundingClientRect();
    const bounds = desktop.getBoundingClientRect();
    dragRef.current = { id, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
    setPositions((current) => ({ ...current, [id]: { left: rect.left - bounds.left, top: rect.top - bounds.top } }));
    bringToFront(id);
  };

  const runTerminalCommand = (event: React.FormEvent) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;
    let response: string[] = [];
    if (command === "help") response = ["available → whoami · contact · resume · open [app] · clear · status"];
    else if (command === "whoami") response = ["alex.kim / systems builder / MIT '26 / human-scale optimist"];
    else if (command === "contact") response = ["signal route → hello@alexkim.dev  /  linkedin.com/in/alexkim"];
    else if (command === "resume") response = ["resume.pdf is staged in the portfolio vault → opening Projects.exe"];
    else if (command === "status") response = ["cpu 18% · memory 42% · uptime 47d 03h · curiosity 100%"];
    else if (command === "clear") {
      setTerminalLines([]);
      setTerminalInput("");
      return;
    } else if (command.startsWith("open ")) {
      const target = command.slice(5).trim();
      const match = appItems.find((app) => app.id === target || app.label.toLowerCase().startsWith(target));
      if (match) {
        openApp(match.id);
        response = [`launching ${match.label} …`];
      } else response = [`app not found: ${target}`];
    } else response = [`command not found: ${command} · type 'help'`];
    setTerminalLines((lines) => [...lines, `guest@mit-pov:~$ ${terminalInput}`, ...response, ""]);
    setTerminalInput("");
  };

  const saveNotes = () => {
    window.localStorage.setItem("mit-pov-notes", notes);
    setNotesSaved(true);
    setSystemMessage("Notes synced to local vault");
  };

  const fetchApod = async () => {
    setApodLoading(true);
    setApodError("");
    const key = nasaKey.trim() || "DEMO_KEY";
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(key)}`);
      if (!response.ok) throw new Error(response.status === 429 ? "NASA rate limit reached. Add a personal key for more requests." : "NASA feed unavailable right now.");
      const data = (await response.json()) as Apod;
      setApod(data);
      window.localStorage.setItem("mit-pov-nasa-key", nasaKey.trim());
      setSystemMessage("Orbital feed updated from NASA");
    } catch (error) {
      setApodError(error instanceof Error ? error.message : "Could not reach NASA.");
    } finally {
      setApodLoading(false);
    }
  };

  if (!entered) {
    return (
      <main className="welcome-screen">
        <div className="welcome-noise" />
        <div className="welcome-grid" />
        <div className="welcome-topline"><span>MIT POV OS / PERSONAL COMPUTING ENVIRONMENT</span><span>BUILD 26.09.22</span></div>
        <section className="welcome-layout">
          <div className="welcome-copy">
            <div className="eyebrow"><span className="pulse-dot" /> private portfolio instance · authorized visitor</div>
            <h1>Welcome to<br /><em>MIT POV OS</em></h1>
            <p className="welcome-lede">A sharp, quiet workstation for the work behind the wins — built from the point of view of an MIT systems builder.</p>
            <div className="welcome-actions">
              <button className="primary-action" onClick={() => setEntered(true)}>Initialize desktop <ChevronRight size={17} /></button>
              <span className="command-hint"><Command size={13} /> enter to explore</span>
            </div>
            <div className="welcome-meta">
              <span><ShieldCheck size={14} /> verified profile</span>
              <span><Wifi size={14} /> offline-first shell</span>
              <span><Zap size={14} /> zero filler</span>
            </div>
          </div>
          <div className="welcome-orbit" aria-hidden="true">
            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
            <div className="orbit-core"><span>AK</span><small>MIT / 26</small></div>
            <div className="orbit-label label-top">SYSTEMS<br /><strong>BUILDER</strong></div>
            <div className="orbit-label label-right">GPA<br /><strong>4.00</strong></div>
            <div className="orbit-label label-bottom">RESEARCH<br /><strong>07 CREDITS</strong></div>
            <div className="orbit-label label-left">HACKMIT<br /><strong>GRAND PRIZE</strong></div>
            <div className="orbit-line line-a" /><div className="orbit-line line-b" /><div className="orbit-line line-c" />
          </div>
        </section>
        <footer className="welcome-footer"><span>DESIGNED FOR FOCUS</span><span>↓ the desktop is the portfolio</span><span>© 2026 / ALEX KIM</span></footer>
      </main>
    );
  }

  return (
    <main className="os-shell">
      <header className="topbar">
        <div className="topbar-brand"><span className="brand-mark">M</span><span>MIT POV OS</span><span className="brand-version">v2.6</span></div>
        <div className="topbar-context"><span className="context-led" />{activeApp ? appItems.find((app) => app.id === activeApp)?.label : "desktop"}<span className="slash">/</span><span className="muted">focused workspace</span></div>
        <div className="topbar-right"><span className="topbar-date">{formatDate(time)}</span><span className="topbar-time">{formatTime(time)}</span><button className="topbar-command" onClick={() => setCommandOpen(true)} aria-label="Open command palette"><Command size={14} /><kbd>⌘ K</kbd></button></div>
      </header>

      <div className="desktop" ref={desktopRef} onPointerDown={() => setSelectedIcon(null)}>
        <div className="desktop-atmosphere atmosphere-one" /><div className="desktop-atmosphere atmosphere-two" />
        <div className="campus-silhouette" aria-hidden="true"><div className="dome" /><div className="dome-spire" /><div className="building building-a" /><div className="building building-b" /><div className="building building-c" /></div>
        <div className="desktop-header-note"><span className="eyebrow">MIT / CAMBRIDGE, MA</span><h2>Make the<br /><span>improbable</span><br />feel obvious.</h2><p>SELECT A MODULE TO INSPECT THE WORK.</p></div>
        <div className="desktop-metrics"><div><span>LOCAL TIME</span><strong>{formatTime(time).slice(0, 5)}</strong></div><div><span>FOCUS MODE</span><strong>DEEP WORK</strong></div><div><span>SESSION</span><strong>00:42:18</strong></div></div>

        <aside className="desktop-sidebar" onPointerDown={(event) => event.stopPropagation()}>
          <div className="sidebar-profile"><div className="profile-avatar">AK</div><div><strong>ALEX KIM</strong><span>MIT '26 · CS / EECS</span></div><CircleUserRound size={16} /></div>
          <div className="sidebar-section-label">WORKSPACE</div>
          <div className="app-icon-grid">
            {appItems.map(({ id, label, kicker, icon: Icon, tone }) => (
              <button key={id} className={`app-icon app-icon-${tone} ${selectedIcon === id ? "selected" : ""}`} onClick={(event) => { event.stopPropagation(); setSelectedIcon(id); }} onDoubleClick={(event) => { event.stopPropagation(); openApp(id); }} aria-label={`Select ${label}`}>
                <span className="app-icon-glyph"><Icon size={18} strokeWidth={1.7} /></span><span className="app-icon-label">{label}</span><span className="app-icon-kicker">{kicker}</span>
              </button>
            ))}
          </div>
          <div className="sidebar-tip"><Sparkles size={14} /><span>double-click to launch<br /><b>⌘ K</b> command palette</span></div>
        </aside>

        <div className="window-layer" onPointerDown={(event) => event.stopPropagation()}>
          <WindowFrame id="transcript" title="Transcript.exe" eyebrow="academic record / encrypted" icon={BookOpen} isOpen={openWindows.transcript} isMaximized={maximized.transcript} position={positions.transcript} zIndex={maximized.transcript ? topLayer + 2 : topLayer} onClose={closeApp} onMaximize={toggleMaximize} onBringToFront={bringToFront} onPointerDown={startDrag}>
            <div className="window-toolbar"><span className="toolbar-status"><span className="mini-led green" /> VERIFIED ACADEMIC RECORD</span><span className="toolbar-code">ID: AK-26-004</span></div>
            <div className="transcript-hero"><div><span className="micro-label">CUMULATIVE GPA</span><strong>4.00</strong><span className="transcript-rank">TOP 1% · CLASS OF 2026</span></div><div className="grade-ring"><span>4.0</span><small>/ 4.0</small></div></div>
            <div className="course-table"><div className="table-head"><span>TERM</span><span>COURSE / SIGNAL</span><span>GRADE</span></div><div className="course-row"><span>SP '25</span><span><b>6.033</b> Computer Systems Engineering</span><strong>A</strong></div><div className="course-row"><span>FA '24</span><span><b>6.006</b> Introduction to Algorithms</span><strong>A</strong></div><div className="course-row"><span>SP '24</span><span><b>18.06</b> Linear Algebra</span><strong>A</strong></div><div className="course-row"><span>FA '23</span><span><b>6.100A</b> Intro to Programming</span><strong>A</strong></div></div>
            <div className="transcript-footer"><span><ShieldCheck size={13} /> Registrar checksum verified</span><span>04 / 04 terms shown</span></div>
          </WindowFrame>

          <WindowFrame id="trophies" title="Trophy Case.exe" eyebrow="proof of work / 04 records" icon={Trophy} isOpen={openWindows.trophies} isMaximized={maximized.trophies} position={positions.trophies} zIndex={topLayer} onClose={closeApp} onMaximize={toggleMaximize} onBringToFront={bringToFront} onPointerDown={startDrag}>
            <div className="award-intro"><div><span className="micro-label">MOMENTUM INDEX</span><strong>97.4</strong></div><p>Not a collection of trophies.<br />A trail of difficult problems solved.</p></div>
            <div className="award-list">{awards.map((award) => <div className="award-row" key={award.badge}><span className="award-date">{award.date}</span><span className="award-badge">{award.badge}</span><div><strong>{award.title}</strong><span>{award.detail}</span></div><ChevronRight size={15} /></div>)}</div>
            <div className="window-note"><Award size={14} /><span>Each outcome started as a question worth staying up for.</span></div>
          </WindowFrame>

          <WindowFrame id="projects" title="Projects.exe" eyebrow="selected builds / open source" icon={FolderKanban} isOpen={openWindows.projects} isMaximized={maximized.projects} position={positions.projects} zIndex={topLayer} onClose={closeApp} onMaximize={toggleMaximize} onBringToFront={bringToFront} onPointerDown={startDrag}>
            <div className="projects-intro"><div><span className="micro-label">BUILD QUEUE</span><strong>03 SHIPPED</strong></div><a href="https://github.com/" target="_blank" rel="noreferrer">view github <ExternalLink size={13} /></a></div>
            <div className="project-list">{projectData.map((project, index) => <a className={`project-card project-${project.tone}`} href="https://github.com/" target="_blank" rel="noreferrer" key={project.title}><div className="project-number">0{index + 1}</div><div className="project-card-body"><span className="project-type">{project.type}</span><strong>{project.title}</strong><p>{project.desc}</p><span className="project-meta">{project.meta}</span></div><ExternalLink size={15} /></a>)}</div>
          </WindowFrame>

          <WindowFrame id="ocw" title="OCW / CS Tree" eyebrow="MIT open courseware / constellation" icon={TreePine} isOpen={openWindows.ocw} isMaximized={maximized.ocw} position={positions.ocw} zIndex={topLayer + 2} onClose={closeApp} onMaximize={toggleMaximize} onBringToFront={bringToFront} onPointerDown={startDrag}>
            <div className="ocw-intro"><div><span className="micro-label">COURSE CONSTELLATION</span><strong>THE CS TREE</strong></div><span className="ocw-sticker"><Star size={12} fill="currentColor" /> cute but rigorous</span></div>
            <div className="ocw-layout"><div className="ocw-tree">{ocwNodes.map((node) => <button key={node.id} className={`ocw-node ocw-${node.branch} ${ocwSelected === node.id ? "active" : ""}`} style={{ "--depth": node.depth } as React.CSSProperties} onClick={() => setOcwSelected(node.id)}><span className="tree-branch">{node.depth === 0 ? <TreePine size={14} /> : node.depth === 1 ? <span className="branch-joint">✦</span> : <span className="leaf-dot" />}</span><span className="ocw-node-copy"><strong>{node.label}</strong><small>{node.meta}</small></span>{node.depth === 2 && <span className="node-check">{node.meta.includes("completed") ? "✓" : "→"}</span>}</button>)}</div><div className={`ocw-detail ocw-detail-${ocwDetails[ocwSelected].accent}`}><span className="micro-label">{ocwDetails[ocwSelected].tags[0]}</span><h3>{ocwDetails[ocwSelected].title}</h3><p>{ocwDetails[ocwSelected].description}</p><div className="ocw-tags">{ocwDetails[ocwSelected].tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="https://ocw.mit.edu/search/?q=computer+science" target="_blank" rel="noreferrer">open MIT OCW <ExternalLink size={12} /></a></div></div>
          </WindowFrame>

          <WindowFrame id="terminal" title="Terminal.exe" eyebrow="command line / guest session" icon={TerminalIcon} isOpen={openWindows.terminal} isMaximized={maximized.terminal} position={positions.terminal} zIndex={topLayer} onClose={closeApp} onMaximize={toggleMaximize} onBringToFront={bringToFront} onPointerDown={startDrag} variant="terminal">
            <div className="terminal-screen">{terminalLines.map((line, index) => <div key={`${line}-${index}`} className={line.startsWith("guest") ? "terminal-command" : "terminal-output"}>{line || "\u00a0"}</div>)}<form className="terminal-form" onSubmit={runTerminalCommand}><span>guest@mit-pov:~$</span><input autoFocus value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} aria-label="Terminal command" autoComplete="off" /><span className="terminal-cursor" /></form></div><div className="terminal-status"><span><span className="mini-led green" /> shell ready</span><span>tab autocomplete · enter run</span></div>
          </WindowFrame>

          <WindowFrame id="notes" title="Notes.exe" eyebrow="field notes / local vault" icon={FileText} isOpen={openWindows.notes} isMaximized={maximized.notes} position={positions.notes} zIndex={topLayer} onClose={closeApp} onMaximize={toggleMaximize} onBringToFront={bringToFront} onPointerDown={startDrag}>
            <div className="notes-toolbar"><span><Hash size={14} /> DAILY / 001</span><button onClick={saveNotes}>{notesSaved ? "saved" : "save changes"} <Download size={13} /></button></div><textarea className="notes-editor" value={notes} onChange={(event) => { setNotes(event.target.value); setNotesSaved(false); }} aria-label="Editable personal notes" /><div className="notes-footer"><span>{notes.length} characters</span><span>{notesSaved ? "local vault synced" : "unsaved changes"}</span></div>
          </WindowFrame>

          <WindowFrame id="orbital" title="Orbital Brief.exe" eyebrow="NASA live feed / APOD" icon={Radar} isOpen={openWindows.orbital} isMaximized={maximized.orbital} position={positions.orbital} zIndex={topLayer + 1} onClose={closeApp} onMaximize={toggleMaximize} onBringToFront={bringToFront} onPointerDown={startDrag}>
            <div className="orbital-intro"><div><span className="micro-label">NASA / ASTRONOMY PICTURE OF THE DAY</span><strong>LOOK UP.</strong></div><button className="refresh-button" onClick={fetchApod} disabled={apodLoading}>{apodLoading ? <Loader2 size={14} className="spin" /> : <RefreshCw size={14} />} {apodLoading ? "syncing" : "fetch latest"}</button></div>
            <div className="nasa-key-row"><label htmlFor="nasa-key">API KEY</label><input id="nasa-key" type="password" value={nasaKey} onChange={(event) => setNasaKey(event.target.value)} placeholder="optional · DEMO_KEY works" /><span>stored locally only</span></div>
            {apod ? <div className="apod-content">{apod.media_type === "image" ? <img src={apod.url} alt={apod.title} /> : <div className="apod-video"><Play size={20} /> NASA video brief</div>}<div className="apod-copy"><span className="micro-label">{apod.date} {apod.copyright ? `· © ${apod.copyright}` : ""}</span><h3>{apod.title}</h3><p>{apod.explanation}</p><a href={apod.hdurl || apod.url} target="_blank" rel="noreferrer">open source image <ExternalLink size={13} /></a></div></div> : <div className="apod-empty"><Rocket size={26} /><strong>Mission control is standing by.</strong><p>Pull NASA's public APOD feed into this workspace. No key is required for a first look; a personal key improves rate limits.</p><button className="primary-action small" onClick={fetchApod}><Radar size={15} /> initialize feed</button>{apodError && <span className="error-message">{apodError}</span>}</div>}
          </WindowFrame>

          <WindowFrame id="collab" title="Collab.exe" eyebrow="team room / live sync" icon={Network} isOpen={openWindows.collab} isMaximized={maximized.collab} position={positions.collab} zIndex={topLayer + 2} onClose={closeApp} onMaximize={toggleMaximize} onBringToFront={bringToFront} onPointerDown={startDrag}>
            <div className="collab-intro">
              <div>
                <span className="micro-label">PROJECT ROOM / MIT-ALPHA</span>
                <strong>Shared build sprint</strong>
              </div>
              <button className="refresh-button">Invite</button>
            </div>

            <div className="collab-layout">
              <div className="collab-panel">
                <div className="panel-header">Active members</div>
                <div className="member-list">
                  <div className="member-row"><span className="member-avatar green">AK</span><div><strong>Alex Kim</strong><small>editing system logic</small></div><span className="member-status online">online</span></div>
                  <div className="member-row"><span className="member-avatar amber">LM</span><div><strong>Lena Moore</strong><small>reviewing notes</small></div><span className="member-status online">online</span></div>
                  <div className="member-row"><span className="member-avatar blue">JS</span><div><strong>Jules Smith</strong><small>commenting on tasks</small></div><span className="member-status idle">idle</span></div>
                </div>
              </div>

              <div className="collab-panel">
                <div className="panel-header">Shared tasks</div>
                <div className="task-list">
                  <div className="task-item"><div><strong>Finalize UI polish</strong><small>due in 45 mins</small></div><span className="task-tag done">done</span></div>
                  <div className="task-item"><div><strong>Sync collaboration room</strong><small>in progress</small></div><span className="task-tag live">live</span></div>
                  <div className="task-item"><div><strong>Review handoff notes</strong><small>queued</small></div><span className="task-tag queued">queued</span></div>
                </div>
              </div>
            </div>

            <div className="collab-feed">
              <div className="panel-header">Live activity</div>
              <ul>
                <li><span className="feed-dot" /> Alex shared a new design pass in the room.</li>
                <li><span className="feed-dot" /> Lena left a review comment on the project brief.</li>
                <li><span className="feed-dot" /> Jules updated the shared checklist to “ready for QA”.</li>
              </ul>
            </div>
          </WindowFrame>
        </div>

        <footer className="taskbar" onPointerDown={(event) => event.stopPropagation()}><div className="taskbar-left"><button className="taskbar-launch" onClick={() => setCommandOpen(true)}><Command size={15} /><span>LAUNCH</span></button><span className="taskbar-divider" /><span className="taskbar-status"><Activity size={14} /> {systemMessage}</span></div><div className="taskbar-apps">{appItems.filter((app) => openWindows[app.id]).map(({ id, label, icon: Icon }) => <button key={id} className={`taskbar-app ${activeApp === id ? "active" : ""}`} onClick={() => openApp(id)}><Icon size={14} />{label.replace(".exe", "")}</button>)}</div><div className="taskbar-right"><span><Cpu size={13} /> 18%</span><span><Network size={13} /> secure</span><button aria-label="Open settings"><Settings2 size={14} /></button></div></footer>
      </div>

      {commandOpen && <div className="command-overlay" onMouseDown={() => setCommandOpen(false)}><div className="command-palette" onMouseDown={(event) => event.stopPropagation()}><div className="command-search"><Search size={17} /><input autoFocus placeholder="Jump to an app or command..." value={commandQuery} onChange={(event) => setCommandQuery(event.target.value)} /><kbd>ESC</kbd></div><div className="command-list">{filteredApps.map(({ id, label, kicker, icon: Icon, tone }) => <button key={id} className="command-item" onClick={() => { openApp(id); setCommandOpen(false); setCommandQuery(""); }}><span className={`command-icon ${tone}`}><Icon size={16} /></span><span><strong>{label}</strong><small>{kicker}</small></span><ChevronRight size={15} /></button>)}{filteredApps.length === 0 && <div className="command-empty">No modules found. Try “terminal”, “notes”, or “NASA”.</div>}</div><div className="command-footer"><span><Command size={12} /> K to open anytime</span><span><ArrowHint /> select</span></div></div></div>}
    </main>
  );
}

function ArrowHint() {
  return <span className="arrow-hint">↵</span>;
}

type WindowFrameProps = {
  id: AppId;
  title: string;
  eyebrow: string;
  icon: typeof BookOpen;
  isOpen: boolean;
  isMaximized: boolean;
  position: WindowPosition;
  zIndex: number;
  variant?: string;
  children: React.ReactNode;
  onClose: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onBringToFront: (id: AppId) => void;
  onPointerDown: (event: React.PointerEvent, id: AppId) => void;
};

function WindowFrame({ id, title, eyebrow, icon: Icon, isOpen, isMaximized, position, zIndex, variant = "", children, onClose, onMaximize, onBringToFront, onPointerDown }: WindowFrameProps) {
  if (!isOpen) return null;
  return <section id={`window-${id}`} className={`os-window ${variant} ${isMaximized ? "is-maximized" : ""}`} style={{ left: position.left, top: position.top, zIndex }} onPointerDown={() => onBringToFront(id)} aria-label={title}>
    <header className="window-header" onPointerDown={(event) => onPointerDown(event, id)}><div className="window-title"><span className="window-icon"><Icon size={14} /></span><span><strong>{title}</strong><small>{eyebrow}</small></span></div><div className="window-controls"><button aria-label={`Minimize ${title}`} onPointerDown={(event) => event.stopPropagation()} onClick={() => onClose(id)}><Minus size={13} /></button><button aria-label={`Maximize ${title}`} onPointerDown={(event) => event.stopPropagation()} onClick={() => onMaximize(id)}><Maximize2 size={12} /></button><button className="close" aria-label={`Close ${title}`} onPointerDown={(event) => event.stopPropagation()} onClick={() => onClose(id)}><X size={13} /></button></div></header><div className="window-body">{children}</div></section>;
}

export default Home;

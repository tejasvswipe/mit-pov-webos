import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const staticPath = path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

app.get("/health", (_req, res) => {
  res.json({ ok: true, status: "healthy" });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

if (!process.env.VERCEL) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

export default app;

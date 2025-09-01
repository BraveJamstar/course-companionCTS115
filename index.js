import express from "express";
// Use native fetch (Node.js v18+)
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // load .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files (so index.html loads at /)
app.use(express.static(path.join(__dirname, "public")));

// Middleware: only allow API calls from index.html served by this server
// Middleware: only allow requests from the same host
app.use("/api", (req, res, next) => {
  const origin = req.get("origin");
  const referer = req.get("referer");
  const PORT = process.env.PORT || 3000; // fallback to 3000
  // Allow localhost, 127.0.0.1, or same host:PORT
  if (
    origin?.includes(`:${PORT}`) ||
    referer?.includes(`:${PORT}/index.html`)
  ) {
    return next();
  }

  return res.status(403).json({ error: "Forbidden" });
});

// API endpoint
app.post("/api/ask", async (req, res) => {
  const { prompt, model } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' in request body" });
  }

  try {
    const ollamaRes = await fetch(process.env.OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model || process.env.MODEL,
        prompt,
        stream: true,
      }),
    });

    if (!ollamaRes.ok) {
      const errorText = await ollamaRes.text();
      console.error("Ollama error:", ollamaRes.status, errorText);
      return res.status(502).json({ error: `Ollama error: ${ollamaRes.status} ${errorText}` });
    }

    // Set headers so client knows this is a stream
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const reader = ollamaRes.body.getReader();
    const decoder = new TextDecoder();
    let received = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) received = true;

      const chunk = decoder.decode(value, { stream: true });

      // Ollama sends JSON lines — parse each line separately
      chunk.split("\n").forEach((line) => {
        if (!line.trim()) return;
        try {
          const json = JSON.parse(line);
          if (json.response) {
            res.write(json.response);
          }
          if (json.content) {
            res.write(json.content);
          }
        } catch (e) {
          // ignore bad lines
        }
      });

      // flush partial data
      res.flush?.();
    }

    if (!received) {
      console.warn("No data received from Ollama.");
      if (!res.headersSent) {
        return res.status(204).end();
      }
    }

    res.end();
  } catch (err) {
    console.error("Server error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    } else {
      res.end();
    }
  }
});

const PORT = process.env.PORT || 3000; // fallback to 3000
const HOST = process.env.ServerIP || "localhost"; // fallback to localhost
app.listen(PORT, HOST, () => {
  console.log(`✅ Server + frontend running at http://${HOST}:${PORT}`);
});

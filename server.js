import express from "express";
import fetch from "node-fetch";
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

// API endpoint
app.post("/api/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' in request body" });
  }

  try {
    const ollamaRes = await fetch(process.env.OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.MODEL,
        prompt
      })
    });

    const textStream = await ollamaRes.text();

    let reply = "";
    textStream.split("\n").forEach(line => {
      if (line.trim()) {
        try {
          const json = JSON.parse(line);

          if (json.response) reply += json.response;
          if (json.content) reply += json.content;
        } catch {}
      }
    });

    if (!reply) {
      return res.status(500).json({ error: "No reply received from Ollama" });
    }

    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server + frontend running at http://localhost:${PORT}`)
);

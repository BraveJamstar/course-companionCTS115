import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Secure API endpoint
app.post("/api/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama2", // change to your model
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
        } catch {}
      }
    });

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

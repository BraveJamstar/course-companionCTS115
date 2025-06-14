import React, { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL?.endsWith("/ask")
    ? process.env.REACT_APP_BACKEND_URL
    : (process.env.REACT_APP_BACKEND_URL || "") + "/ask";

  const ask = async () => {
    if (!prompt.trim()) return setReply("Please enter a question.");
    setLoading(true);
    setReply("Thinking...");

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      setReply(data.reply || "No reply.");
    } catch (err) {
      console.error("Error in ask():", err);
      setReply(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Course Companion</h1>
      <textarea
        rows={4}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Ask a question..."
      />
      <br />
      <button onClick={ask} disabled={loading}>
        {loading ? "Thinking..." : "Ask GPT"}
      </button>
      <div style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>{reply}</div>
    </div>
  );
}

// src/Ask.jsx (or App.jsx)
import React, { useState } from "react";

export default function Ask() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = "https://chatbot-backendcts115.onrender.com";

  const handleAsk = async () => {
    if (!prompt.trim()) {
      setReply("Please enter a question.");
      return;
    }
    setLoading(true);
    setReply("Thinking...");
    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      // check HTTP status
      if (!res.ok) {
        throw new Error(`Server responded ${res.status}`);
      }
      const data = await res.json();
      if (data.reply) {
        setReply(data.reply);
      } else {
        setReply("No response from assistant.");
      }
    } catch (err) {
      console.error("Error fetching assistant:", err);
      setReply("Error: Unable to reach the assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Course Companion</h1>
      <textarea
        placeholder="Enter your academic question..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        style={{ width: "100%", padding: "0.5rem" }}
      />
      <button
        disabled={loading}
        onClick={handleAsk}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#004080",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Thinking..." : "Ask GPT"}
      </button>
      <div
        id="response"
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "#f9f9f9",
          minHeight: "4rem",
          borderRadius: "4px",
          whiteSpace: "pre-wrap",
        }}
      >
        {reply}
      </div>
    </div>
  );
}

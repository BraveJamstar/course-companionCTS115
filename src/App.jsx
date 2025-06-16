import React, { useState } from "react";
import "./App.css";

const API_BASE_URL = "https://chatbot-backendcts115.onrender.com";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (data.reply) {
        setResponse(data.reply);
      } else {
        setError("No reply received from assistant.");
      }
    } catch (err) {
      console.error("Error submitting prompt:", err);
      setError("Unable to reach the assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Course Companion</h1>
      <p>Information Systems Business Concepts</p>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question about MIS, DSS, ERP, or business systems..."
        />
        <br />
        <button type="submit" disabled={loading || !prompt.trim()}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {error && <div className="error">Error: {error}</div>}
      {response && (
        <div className="response">
          <h2>Assistant's Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;

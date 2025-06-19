import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await fetch("https://chatbot-backendcts115.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      console.error(err);
      setError("Error: Unable to reach the assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem", fontFamily: "Arial" }}>
      <h1>Course Companion</h1>
      <h2>Information Systems Business Concepts</h2>
      <p>
        Use this assistant to ask academic questions about MIS, DSS, ERP, analytics, and business systems.
      </p>
      <textarea
        rows="6"
        style={{ width: "100%", fontSize: "16px", marginBottom: "1rem" }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your question here..."
      />
      <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Ask GPT
      </button>
      <p style={{ color: "darkred", marginTop: "1rem" }}>
        ⚠️ This assistant does not support graded assignments, exams, or quizzes. Use for study and learning only.
      </p>
      {loading && <p>Loading...</p>}
      {error && (
        <div style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>{error}</div>
      )}
      {response && (
        <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap", backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "5px" }}>
          {response}
        </div>
      )}
    </div>
  );
}

export default App;

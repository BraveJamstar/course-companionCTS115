import React, { useState } from "react";
import "./App.css";

const BACKEND_URL = "https://chatbot-backendcts115.onrender.com";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse("");
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setResponse(data.reply);
      } else {
        setError("Unable to reach the assistant.");
      }
    } catch (err) {
      setError("An error occurred while trying to reach the assistant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Course Companion</h1>
        <p>Information Systems Business Concepts</p>
        <p className="warning">
          ⚠️ This assistant does not support graded assignments, exams, or
          quizzes. Use for study and learning only.
        </p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a question about MIS, DSS, ERP, or other course topics..."
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {response && <div className="response"><strong>Assistant:</strong> {response}</div>}
        {error && <div className="error">{error}</div>}
      </main>
    </div>
  );
}

export default App;

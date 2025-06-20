import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (!prompt.trim()) {
      setResponse("Please enter a question.");
      return;
    }

    try {
      setResponse("Loading...");
      const res = await fetch("https://chatbot-backendcts115.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json(); // Parse the response
      console.log("Backend response:", data); // Debug log
      setResponse(data.reply || "No reply received.");
    } catch (err) {
      console.error("Error reaching assistant:", err);
      setResponse("Error: Unable to reach the assistant.");
    }
  };

  return (
    <div className="App">
      <h1>Course Companion</h1>
      <h2>Information Systems Business Concepts</h2>
      <p>
        Use this assistant to ask academic questions about MIS, DSS, ERP,
        analytics, and business systems.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your question here..."
        rows={6}
      />

      <button onClick={handleAsk}>Ask GPT</button>

      <div className="warning">
        ⚠️ This assistant does not support graded assignments, exams, or
        quizzes. Use for study and learning only.
      </div>

      {response && (
        <div className="response">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default App;

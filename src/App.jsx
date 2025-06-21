import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');

  const handleAsk = async () => {
    setReply("Loading...");

    try {
      const response = await fetch("https://chatbot-backendcts115.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📦 Received from backend:", data);
      setReply(data.reply || "⚠️ Empty reply received.");
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setReply("Error: Unable to reach the assistant.");
    }
  };

  return (
    <div className="App">
      <h1>Course Companion</h1>
      <h2>Information Systems Business Concepts</h2>
      <p>
        Use this assistant to ask academic questions about MIS, DSS, ERP, analytics, and business systems.
      </p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask a question..."
      />
      <br />
      <button onClick={handleAsk}>Ask GPT</button>
      <p className="warning">
        ⚠️ This assistant does not support graded assignments, exams, or quizzes. Use for study and learning only.
      </p>
      <div className="response">
        {reply && <p><strong>Response:</strong> {reply}</p>}
      </div>
    </div>
  );
}

export default App;

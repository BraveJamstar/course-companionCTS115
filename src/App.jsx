import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function askPrompt() {
    if (prompt.trim() === "") {
      setResponse("Please enter a question.");
      return;
    }

    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch("https://chatbot-backendcts115.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setResponse(data.reply || "No response.");
    } catch (error) {
      console.error("❌ Error reaching backend:", error);
      setResponse("Error: Unable to reach the assistant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "700px",
      margin: "2rem auto",
      background: "#f4f4f4",
      padding: "2rem",
      borderRadius: "10px"
    }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="https://www.johnstoncc.edu/_resources/images/logos/logo.svg" alt="JCC Logo" style={{ maxWidth: "150px" }} />
        <h1>Course Companion</h1>
        <h2>Information Systems Business Concepts</h2>
      </header>

      <p>Use this assistant to ask academic questions about MIS, DSS, ERP, analytics, and business systems.</p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your course-related question (max 300 characters)..."
        maxLength={300}
        style={{ width: "100%", height: "100px" }}
      />
      <br />
      <button onClick={askPrompt} style={{
        padding: "10px 15px",
        background: "#004080",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px"
      }}>
        {loading ? "Thinking..." : "Ask GPT"}
      </button>
      <div className="warning" style={{ fontSize: "0.9em", color: "#800000", marginTop: "1rem" }}>
        ⚠️ This assistant does not support graded assignments, exams, or quizzes. Use for study and learning only.
      </div>
      <div id="response" style={{
        marginTop: "20px",
        background: "white",
        padding: "1rem",
        borderRadius: "5px",
        whiteSpace: "pre-wrap"
      }}>
        {response}
      </div>
    </div>
  );
}

export default App;

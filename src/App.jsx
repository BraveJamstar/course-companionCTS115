import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function askPrompt() {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      setResponse("Please enter a question.");
      return;
    }

    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });

      const data = await res.json();
      setResponse(data.reply || "No response.");
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error: Unable to reach the assistant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img
          src="https://www.johnstoncc.edu/_resources/img/jcc-logo.svg"
          alt="JCC Logo"
          style={styles.logo}
        />
        <h1>Course Companion</h1>
        <h2>Information Systems Business Concepts</h2>
      </header>

      <p>Use this assistant to ask academic questions about MIS, DSS, ERP, analytics, and business systems.</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your course-related question (max 300 characters)..."
        maxLength={300}
        style={styles.textarea}
      />
      <br />
      <button onClick={askPrompt} disabled={loading} style={styles.button}>
        Ask GPT
      </button>

      <div className="warning" style={styles.warning}>
        ⚠️ This assistant does not support graded assignments, exams, or quizzes. Use for study and learning only.
      </div>

      <div id="response" style={styles.response}>
        {response}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "700px",
    margin: "2rem auto",
    background: "#f4f4f4",
    padding: "2rem",
    borderRadius: "10px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  logo: {
    maxWidth: "150px",
  },
  textarea: {
    width: "100%",
    height: "100px",
  },
  button: {
    padding: "10px 15px",
    background: "#004080",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  warning: {
    fontSize: "0.9em",
    color: "#800000",
    marginTop: "1rem",
  },
  response: {
    marginTop: "20px",
    background: "white",
    padding: "1rem",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
  },
};

export default App;

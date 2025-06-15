import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!prompt.trim()) {
      setResponse("Please enter a question.");
      return;
    }

    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch("https://chatbot-backendcts115.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();
      console.log("Raw response JSON:", data);

      if (!data.reply) {
        throw new Error("No `reply` field in JSON");
      }

      setResponse(data.reply);
    } catch (err) {
      console.error("ERROR in ask():", err);
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <img src="https://www.johnstoncc.edu/_files/images/logo.svg" alt="JCC Logo" style={{ maxWidth: '150px' }} />
        <h1>Course Companion</h1>
        <h2>Information Systems Business Concepts</h2>
      </header>

      <p>Ask anything about MIS, DSS, ERP, analytics, and business systems.</p>
      <textarea
        style={textareaStyle}
        maxLength={300}
        placeholder="Enter your question..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={ask} disabled={loading} style={buttonStyle}>
        {loading ? "Thinking..." : "Ask GPT"}
      </button>
      <div style={warningStyle}>
        ⚠️ This tool is for study/help only—not for graded assignments.
      </div>
      <div id="response" style={responseStyle}>
        {response}
      </div>
    </div>
  );
}

// Inline styles for clarity
const containerStyle = { fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '2rem auto', background: '#f4f4f4', padding: '2rem', borderRadius: '10px' };
const headerStyle = { textAlign: 'center', marginBottom: '20px' };
const textareaStyle = { width: '100%', height: '100px' };
const buttonStyle = { padding: '10px 15px', background: '#004080', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' };
const warningStyle = { fontSize: '0.9em', color: '#800000', marginTop: '1rem' };
const responseStyle = { marginTop: '20px', background: 'white', padding: '1rem', borderRadius: '5px', whiteSpace: 'pre-wrap' };

export default App;

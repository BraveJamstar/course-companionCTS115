import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        "https://chatbot-backendcts115.onrender.com/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt })
        }
      );

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.reply || "No reply from assistant.");
    } catch (error) {
      console.error("❌ Frontend fetch error:", error);
      setResponse("Error: Unable to reach the assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Course Companion</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Type your question..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Thinking..." : "Ask GPT"}
      </button>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: 10 }}>
        {response}
      </pre>
    </div>
  );
}

export default App;

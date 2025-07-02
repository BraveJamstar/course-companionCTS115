import { useState } from 'react';
import './App.css';

console.log("Backend URL (from .env):", import.meta.env.VITE_BACKEND_URL);

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ask`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question }),
});

      if (!res.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await res.json();
      setResponse(data.reply || 'No reply received.');
    } catch (err) {
      console.error(err);
      setError('Error: Unable to reach the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <img
          src="https://www.johnstoncc.edu/_resources/images/logos/jcc-logo-header.svg"
          alt="Johnston Community College"
          style={{ height: '60px', marginBottom: '10px' }}
        />
        <h1>Course Companion</h1>
        <h2>Information Systems Business Concepts</h2>
      </header>

      <div className="input-area">
        <p>
          Use this assistant to ask academic questions about MIS, DSS, ERP,
          analytics, and business systems.
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="5"
          cols="60"
          placeholder="What is MIS?"
        />
        <br />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? 'Asking...' : 'Ask GPT'}
        </button>
        <p className="disclaimer">
          ⚠️ This assistant does not support graded assignments, exams, or
          quizzes. Use for study and learning only.
        </p>
      </div>

      {error && <div className="error">{error}</div>}
      {response && <div className="response">{response}</div>}
    </div>
  );
}

export default App;

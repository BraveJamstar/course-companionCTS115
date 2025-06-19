import React, { useState } from 'react';
import './App.css';

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
      const res = await fetch('https://chatbot-backendcts115.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.reply || 'No reply received.');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error: Unable to reach the assistant.');
    } finally {
      setLoading(false);
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
        rows="5"
        cols="60"
        placeholder="Type your question here..."
      />
      <br />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask GPT'}
      </button>
      <p style={{ color: 'darkred' }}>
        ⚠️ This assistant does not support graded assignments, exams, or quizzes. Use for study and learning only.
      </p>
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      {response && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
          <strong>Assistant:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default App;

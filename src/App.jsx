import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleAsk = async () => {
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
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.reply || 'No response from assistant.');
    } catch (err) {
      console.error('Error fetching response:', err);
      setError('Error: Unable to reach the assistant.');
    }
  };

  return (
    <div className="App">
      <h1>Information Systems Business Concepts</h1>
      <p>Use this assistant to ask academic questions about MIS, DSS, ERP, analytics, and business systems.</p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        cols={60}
        placeholder="Enter your question here..."
      />
      <br />
      <button onClick={handleAsk}>Ask GPT</button>
      <p style={{ color: 'red' }}>
        ⚠️ This assistant does not support graded assignments, exams, or quizzes. Use for study and learning only.
      </p>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {response && <div style={{ marginTop: '1em', whiteSpace: 'pre-wrap' }}>{response}</div>}
    </div>
  );
}

export default App;

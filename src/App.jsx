// src/App.jsx
import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const askAssistant = async () => {
    if (!prompt.trim()) {
      setError('Please enter a question.');
      return;
    }
    setError('');
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch(
        'https://chatbot-backendcts115.onrender.com/ask', // ← your deployed backend URL
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      if (data && data.reply) {
        setResponse(data.reply);
      } else {
        setError('No reply received from assistant.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to reach the assistant. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Course Companion</h1>
      <textarea
        rows={4}
        style={{ width: '100%' }}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Ask your question..."
      />
      <button onClick={askAssistant} disabled={loading} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}>
        {loading ? 'Thinking...' : 'Ask GPT'}
      </button>

      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          ⚠️ {error}
        </div>
      )}

      {response && (
        <div id="response" style={{ marginTop: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
          {response}
        </div>
      )}
    </div>
  );
}

export default App;

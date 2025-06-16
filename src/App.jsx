// src/App.jsx
import React, { useState } from 'react';

const BACKEND_URL = 'https://chatbot-backendcts115.onrender.com'; // 🔧 Replace with your actual backend URL

function App() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError('Please enter a question.');
      return;
    }
    setLoading(true);
    setError('');
    setReply('');

    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (!data.reply) throw new Error('No reply from assistant.');

      setReply(data.reply);
    } catch (err) {
      console.error('🔥 fetch error:', err);
      setError(`Error: Unable to reach the assistant. (${err.message})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Course Companion</h1>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: 10 }}
        placeholder="Ask a question..."
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 10,
          padding: '10px 20px',
          background: '#004080',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        {loading ? 'Thinking…' : 'Ask GPT'}
      </button>
      {error && (
        <p style={{ color: 'red', marginTop: 10 }}>{error}</p>
      )}
      {reply && (
        <div style={{ marginTop: 20, padding: 15, background: '#f9f9f9', borderRadius: 4 }}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{reply}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

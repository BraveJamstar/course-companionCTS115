import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update this URL to your live Render backend
  const BACKEND_URL = 'https://chatbot-backendcts115.onrender.com';

  async function onSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setReply('');

    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }

      const data = await res.json();
      if (!data.reply) {
        throw new Error('No reply from assistant');
      }

      setReply(data.reply);
    } catch (err) {
      console.error(err);
      setError('Unable to reach the assistant.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem', background: '#f4f4f4', borderRadius: 10 }}>
      <h1>Course Companion</h1>
      <form onSubmit={onSubmit}>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ask about MIS, ERP, DSS..."
          rows={4}
          style={{ width: '100%', padding: 10 }}
        />
        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: '10px 15px' }}>
          {loading ? 'Thinking...' : 'Ask GPT'}
        </button>
      </form>

      {error && <div style={{ marginTop: 20, color: '#800000' }}>{error}</div>}

      {reply && (
        <div id="response" style={{ marginTop: 20, background: 'white', padding: '1rem', borderRadius: 5, whiteSpace: 'pre-wrap' }}>
          {reply}
        </div>
      )}
    </div>
  );
}

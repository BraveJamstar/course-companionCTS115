import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('https://chatbot-backendcts115.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const data = await res.json();
      setResponse(data.reply ?? 'No reply received');
    } catch (err) {
      console.error('Fetching /ask failed:', err);
      setResponse('Error: Unable to reach the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: 'Arial', maxWidth: 700, margin: '2rem auto' }}>
      <h1>Course Companion</h1>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter your question..."
        rows={4}
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <button onClick={handleAsk} disabled={loading} style={{ marginTop: '0.5rem' }}>
        {loading ? 'Thinking…' : 'Ask GPT'}
      </button>
      <pre id="response" style={{ marginTop: '1rem', background: '#f4f4f4', padding: '1rem' }}>
        {response}
      </pre>
    </main>
  );
}

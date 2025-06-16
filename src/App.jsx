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
      setResponse(data.reply || "No reply field in JSON.");
    } catch (err) {
      console.error('Error fetching /ask:', err);
      setResponse('Error: Unable to reach the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Course Companion</h1>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter your question..."
        rows={4}
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <br />
      <button onClick={handleAsk} disabled={loading} style={{ marginTop: '0.5rem' }}>
        {loading ? 'Thinking…' : 'Ask GPT'}
      </button>
      <div id="response" style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '1rem', minHeight: '100px' }}>
        {response}
      </div>
    </div>
  );
}

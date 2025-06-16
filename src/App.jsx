import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        'https://chatbot-backendcts115.onrender.com/ask',  // ← full backend URL
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        }
      );
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setResponse(data.reply || 'No reply');
    } catch (err) {
      console.error('Fetch /ask failed:', err);
      setResponse('Error: Unable to reach the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Course Companion</h1>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Thinking…' : 'Ask GPT'}
      </button>
      <pre>{response}</pre>
    </main>
  );
}

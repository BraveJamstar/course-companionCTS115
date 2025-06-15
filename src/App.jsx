import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!prompt.trim()) {
      setResponse('Please enter a question.');
      return;
    }
    setLoading(true);
    setResponse('Thinking...');

    try {
      const res = await fetch('https://chatbot-backendcts115.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.reply || 'No response from assistant.');
    } catch (err) {
      console.error(err);
      setResponse('Error: Unable to reach the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <h1>Course Companion</h1>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter your question..."
        style={{ width: '100%', height: 100 }}
      />
      <button onClick={ask} disabled={loading} style={{ marginTop: 10 }}>
        Ask GPT
      </button>
      <div style={{ marginTop: 20, whiteSpace: 'pre-wrap', minHeight: 80 }}>
        {response}
      </div>
    </div>
  );
}

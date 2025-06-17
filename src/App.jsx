import React, { useState } from 'react';

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

      if (data.reply) {
        setResponse(data.reply);
      } else {
        setError('No response from assistant.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Unable to reach the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Course Companion Chatbot</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Ask a question..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />
      <br />
      <button onClick={handleAsk} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Ask
      </button>
      <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {response && <p>{response}</p>}
      </div>
    </div>
  );
}

export default App;

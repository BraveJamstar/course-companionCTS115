// src/App.jsx
import { useState } from 'react';
import { askPrompt } from './api';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reply = await askPrompt(input);
    setResponse(reply);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CTS 115 Course Companion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something about MIS, ERP, AI..."
          style={{ width: '300px', padding: '0.5rem' }}
        />
        <button type="submit" style={{ marginLeft: '1rem' }}>Ask</button>
      </form>
      {response && (
        <div style={{ marginTop: '1rem', backgroundColor: '#f3f3f3', padding: '1rem' }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;

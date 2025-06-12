// src/api.js
export async function askPrompt(prompt) {
  const res = await fetch('https://chatbot-backendcts115.onrender.com/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  return data.reply;
}

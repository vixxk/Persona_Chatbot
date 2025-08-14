const API_URL = import.meta.env.VITE_API_URL ;

export async function sendChatMessage(personaKey, history, message) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ persona: personaKey, history, message }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API Error');
  return data.reply;
}

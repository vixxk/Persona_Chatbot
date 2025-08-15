const API_URL = import.meta.env.VITE_API_URL;

export async function sendChatMessage(personaKey, history, message) {
  console.log('Sending to API:', { personaKey, historyLength: history?.length || 0, message });
  console.log('History being sent:', history);
  
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ persona: personaKey, history, message }),
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API Error');
  return data.reply;
}
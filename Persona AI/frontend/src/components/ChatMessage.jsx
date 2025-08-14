import React from 'react';
import './ChatMessage.css';

export default function ChatMessage({ role, text, isTyping }) {
  const classes = `chat-message ${role === 'user' ? 'user' : 'bot'}${isTyping ? ' typing' : ''}`;
  return (
    <div className={classes}>
      <div
        className="message-bubble"
        style={{ whiteSpace: 'pre-line' }}
      >
        {isTyping ? "Typing" : text.replace(/\*\*/g, '')}
      </div>
    </div>
  );
}

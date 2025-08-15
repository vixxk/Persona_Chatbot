import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import personas from "../personas";
import ChatMessage from "../components/ChatMessage";
import { sendChatMessage } from "../api";
import "./Chat.css";

const chatHistoryStore = {};

export default function Chat() {
  const { persona } = useParams();
  const navigate = useNavigate();
  const personaInfo = personas[persona];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!personaInfo) return;
    if (!chatHistoryStore[persona]) chatHistoryStore[persona] = [];
    setMessages([...chatHistoryStore[persona]]);
  }, [persona, personaInfo]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !personaInfo || isLoading) return;

    const messageToSend = input.trim();
    setInput("");
    setIsLoading(true);

    const userMsg = { role: "user", content: messageToSend };
    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    chatHistoryStore[persona] = currentHistory;

    try {
      // Pass the current message history (excluding the new user message)
      const reply = await sendChatMessage(persona, messages, messageToSend);
      const botMsg = { role: "assistant", content: reply };
      const newHistory = [...currentHistory, botMsg];
      setMessages(newHistory);
      chatHistoryStore[persona] = newHistory;
    } catch (err) {
      console.error(err);
      const errorMsg = { role: "assistant", content: "Error: " + err.message };
      const newHistory = [...currentHistory, errorMsg];
      setMessages(newHistory);
      chatHistoryStore[persona] = newHistory;
    } finally {
      setIsLoading(false);
    }
  };

  if (!personaInfo) return <div>Persona not found</div>;

  return (
    <div className="chat-page-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <button onClick={() => navigate("/")}>⬅ Back</button>
          <h2>{personaInfo.name}</h2>
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              role={msg.role === "assistant" ? "bot" : "user"}
              text={msg.content}
            />
          ))}
          {isLoading && (
            <ChatMessage role="bot" text="Typing..." isTyping={true} />
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()}>
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
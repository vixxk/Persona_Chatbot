import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import personas from '../personas';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <a
        href="https://github.com/vixxk"
        target="_blank"
        rel="noopener noreferrer"
        className="github-icon"
      >
        <FaGithub />
      </a>

      <h1>Choose Your Chatbot</h1>

      <p className="home-description">
        These chatbots are powered by advanced AI and designed to simulate real conversations. 
        Each persona has a unique style and tone. Select a chatbot, type your message, and experience 
        interactive conversations that feel natural, fun, and engaging. Perfect for learning, 
        exploring personalities, or just having a friendly chat!
      </p>

      <div className="persona-grid">
        {Object.entries(personas).map(([key, persona], index) => (
          <div key={key} className="persona-card-wrapper">
            <div
              className={`persona-card`}
              onClick={() => navigate(`/chat/${key}`)}
              style={{ backgroundImage: `url(${persona.image})` }}
            >
              <div className="overlay">
                <h2>{persona.name}</h2>
                <p>{persona.description}</p>
              </div>
            </div>

            <img
              src={index === 0 ? '/hitesh_sir.png' : '/piyush_sir.png'}
              alt="preview"
              className={`card-preview ${index === 0 ? 'left-card' : 'right-card'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

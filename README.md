# 🎭 Persona AI Chatbot

A fun and interactive **Persona Chatbot** that talks like **Hitesh Choudhary** and **Piyush Garg**, developed using **Gemini**.  
This chatbot is aware of their **social media handles**, **latest YouTube channel videos**, and **all playlists**, making conversations feel personal and up-to-date.

---

## 🚀 Tech Stack

**Frontend:** [Vite](https://vitejs.dev/) + React  
**Backend:** [Node.js](https://nodejs.org/)  
**AI Model:** Google Gemini  

---

## ✨ Features

- 🗣 **Persona-based conversation**: Talks like Hitesh Choudhary & Piyush Garg.
- 📢 **Social media awareness**: Knows about their social media handles.
- 🎥 **YouTube Integration**: Can mention latest videos and all playlists.
- ⚡ **Fast frontend**: Powered by Vite for blazing development.
- 🔗 **API-based backend**: Node.js for handling AI requests and data fetching.

---

## 📂 Project Structure

```
PERSONA AI
├── backend/               # Node.js backend
│   ├── index.js            # Backend entry point
│   ├── personas.js         # Persona definitions
│   ├── .env                # Environment variables
│   └── package.json
│
├── frontend/               # Vite + React frontend
│   ├── public/             
│   ├── src/
│   │   ├── assets/         
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main pages (Chat, Home)
│   │   ├── App.jsx         
│   │   ├── api.js          # API calls to backend
│   │   └── personas.js     
│   ├── index.html          
│   └── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/persona-ai.git
cd persona-ai
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file:
```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```
Start backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
```
Start frontend:
```bash
npm run dev
```

---

## 🎯 Usage
1. Open the frontend URL from terminal output (e.g., `http://localhost:5173`).
2. Choose a persona (**Hitesh Choudhary** or **Piyush Garg**).
3. Start chatting — the bot responds in their style and can reference latest YouTube & social media content.

---

## 📌 Notes
- The chatbot uses **Gemini API** for generating persona-specific responses.
- The YouTube and social media data is not fetched dynamically so it may not stay up-to-date.

---

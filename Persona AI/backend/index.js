import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { personas } from './personas.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY; 

if (!apiKey) {
  throw new Error("GEMINI_API_KEY missing in your .env file!");
}

const openai = new OpenAI({
  apiKey,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

app.post('/api/chat', async (req, res) => {
  try {
    const { persona, history, message } = req.body;
    
    if (!personas[persona]) {
      return res.status(400).json({ error: 'Invalid persona' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const messages = [
      { role: "system", content: personas[persona].systemPrompt },
      ...(Array.isArray(history) ? history.map(msg => ({
        role: msg.role,
        content: msg.text
      })) : []),
      { role: "user", content: message }
    ];

    // console.log('Sending to Gemini:', { model: "gemini-2.0-flash", messageCount: messages.length });

    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash", 
      messages
    });

    // console.log('Gemini response:', completion);

    let replyMsg;
    if (completion?.choices?.[0]?.message?.content) {
      replyMsg = completion.choices[0].message.content;
    } else {
      console.error('Invalid response structure:', completion);
      return res.status(500).json({ error: "No valid response from Gemini API" });
    }

    res.json({ reply: replyMsg });

  } catch (err) {
    console.error('Error calling Gemini:', err);
    
    if (err.status === 400) {
      return res.status(400).json({ error: `Gemini API error: ${err.message}` });
    }
    if (err.status === 401) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }
    
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at PORT: ${port}`); 
});

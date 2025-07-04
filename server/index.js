import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
const PORT = 5000;

// app.use(cors());
app.use(cors({
  origin: [
    'chrome-extension://jekdoopkpdbnechikfapkbgdleamlbkb', // Your actual extension ID
    'http://localhost:5173' // Optional: For local dev
  ]
}));

app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//replaccing /api/hint with https://dsa-helper-extension.vercel.app/
app.post('/api/hint', async (req, res) => {
    const { question, code } = req.body;

    if (!question || !code) {
        return res.status(400).json({ error: 'Missing question or code' });
    }

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash', // ✅ this is correct under v1
        });


        const prompt = `
You are a helpful assistant for solving DSA problems and you only provides Hint in just 1-2 lines.
Only provide **small hints** or direction — never give full code or direct solutions.
Also analyze the user code and mention if they are going in the right direction or not.

DSA Question:
"${question}"

User's Code:
\`\`\`
${code}
\`\`\`

Give only a helpful hint or feedback on next step.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const hint = response.text();

        res.json({ hint });
    } catch (err) {
        console.error('Gemini Error:', err);
        res.status(500).json({ error: 'Failed to get hint from Gemini' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

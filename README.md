# 🧠 DSA Buddy – Smart Hint Generator for Coding Platforms

DSA Buddy is a Chrome extension that helps you solve DSA problems smarter on platforms like **LeetCode** and **GeeksForGeeks**. Instead of giving full answers, it provides **context-aware hints** based on your current code and question — just like a mentor would.

> 🚀 Built with React + TailwindCSS + Gemini API

---

## ✨ Features

- 💡 Get smart hints instead of full solutions
- 🧠 Analyzes your **incomplete code** to guide you better
- ⚙️ Works on **LeetCode** and **GFG**
- 🌐 Gemini (Google AI) API integration for real-time suggestions
- 🧩 Lightweight popup UI with TailwindCSS
- 💬 Prevents unnecessary hints if your code is already correct

---


---

## 🛠 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini API](https://ai.google.dev/)
- Chrome Extension (Manifest v3)

---

## 🧩 Installation (For Developers)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dsa-helper-extension.git
cd dsa-helper-extension

```


### 2. **Install Dependencies**

```
cd popup
npm install
```

### 3. Start Dev Server (Optional for testing in browser)

```
npm run dev
```

### 4. Build for Chrome Extension

```
npm run build
```


---
### 🔌 Load Extension in Chrome
- Go to chrome://extensions/
- Enable Developer Mode
- Click Load unpacked
- Select the /dist folder inside your project
- The popup will now work as a Chrome extension!

---

###  **Environment Setup**

- Inside /server/.env:
- GEMINI_API_KEY=your_google_gemini_api_key

---


### 🚧 Known Limitations
- Works best in English-only questions/code.
- Requires Gemini API access.
- May show suggestions even if your code is correct (working to improve this).
- UI animation (e.g., fade-in) might not work if Tailwind is not fully purged.

---

### 🙌 Acknowledgements
- Gemini (Google AI) for powering the intelligent hints
- Open Source Chrome Extension examples for structure
- LeetCode & GFG communities for endless DSA inspiration

---

### 💬 Feedback
- Found a bug? Want a new feature?
- Feel free to open an issue or pull request.

---







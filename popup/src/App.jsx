import { useState } from 'react';

function App() {
  const [hint, setHint] = useState('');
  const [loading, setLoading] = useState(false);

  const getHint = async () => {
    setLoading(true);
    setHint('');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.tabs.sendMessage(
        tab.id,
        { action: 'get-question-and-code' },
        async (response) => {
          const { question, code } = response || {};

          if (!question || !code) {
            setHint('⚠️ Could not fetch question or code from the page.');
            setLoading(false);
            return;
          }

          // const res = await fetch('http://localhost:5000/api/hint', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({ question, code }),
          // });
          const res = await fetch('https://dsa-helper-extension.vercel.app/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, code }),
          });


          const data = await res.json();
          setHint(data.hint || "⚠️ Couldn't get hint.");
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Error:', error);
      setHint("⚠️ Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="w-80 p-4 bg-white min-h-[200px] font-sans">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-4">💡 DSA Buddy</h1>

      <button
        onClick={getHint}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Fetching Hint...' : 'Get Hint'}
      </button>

      {hint && (
        <div
          className={`mt-4 p-3 text-sm rounded-lg animate-fade-in transition-all duration-300 border ${hint.includes('✅')
              ? 'bg-green-50 text-green-800 border-green-300'
              : 'bg-yellow-50 text-yellow-800 border-yellow-300'
            }`}
        >
          {hint}
        </div>
      )}

      <p className="mt-6 text-xs text-center text-gray-400">Designed by Arsalan ⚡</p>
    </div>
  );

}

export default App;








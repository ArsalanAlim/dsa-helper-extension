console.log('✅ content.js is running on:', window.location.hostname);

//
// 🔍 LeetCode Question Extractor
//
function extractLeetCodeQuestion() {
  const el = document.querySelector('[data-track-load="description_content"]');
  if (el && el.innerText.trim()) {
    console.log('✅ Found LeetCode question using [data-track-load="description_content"]');
    return el.innerText.trim();
  }
  console.warn('❌ LeetCode question not found.');
  return '';
}

//
// 🛠 LeetCode Code Fallback Extractor from DOM
//
function extractLeetCodeCodeFallback() {
  const linesContainer = document.querySelector('.view-lines');
  if (!linesContainer) {
    console.warn('❌ No .view-lines found in DOM');
    return '';
  }

  const lines = Array.from(linesContainer.querySelectorAll('div'));
  const codeLines = lines.map(line => line.innerText).filter(Boolean);
  const finalCode = codeLines.join('\n').trim();

  if (finalCode.length > 0) {
    console.log('✅ Extracted code via .view-lines fallback');
  } else {
    console.warn('❌ Extracted code is empty');
  }

  return finalCode;
}

//
// ⏳ Wait for LeetCode code to render
//
async function waitForLeetCodeCode(maxWaitMs = 8000) {
  const interval = 300;
  let waited = 0;

  while (waited < maxWaitMs) {
    const code = extractLeetCodeCodeFallback();
    if (code.length > 10) {
      return code;
    }

    console.log(`⏳ Retrying code extraction (${(waited + interval) / 1000}s)...`);
    await new Promise(res => setTimeout(res, interval));
    waited += interval;
  }

  console.warn('❌ Could not extract code after waiting.');
  return '';
}

//
// 🔍 GFG Extractors
//
function extractGFGQuestion() {
  // ✅ Updated selector for GFG problem description
  const el = document.querySelector('.problems_problem_content__Xm_eO');
  if (el && el.innerText.trim()) {
    console.log('✅ Found GFG question using .problems_problem_content__Xm_eO');
    return el.innerText.trim();
  }

  console.warn('❌ GFG question not found.');
  return '';
}



function extractGFGCode() {
  // 1. ✅ Ace Editor (used on GFG now)
  const aceLines = document.querySelectorAll('.ace_content .ace_line');
  if (aceLines.length > 0) {
    const codeLines = Array.from(aceLines).map(line => line.innerText);
    const code = codeLines.join('\n').trim();
    if (code.length > 0) {
      console.log('✅ Extracted GFG code via .ace_content');
      return code;
    }
  }

  // 2. CodeMirror support (legacy/fallback)
  const codeMirror = document.querySelector('.CodeMirror');
  if (codeMirror) {
    const lines = codeMirror.querySelectorAll('.CodeMirror-line');
    const codeLines = Array.from(lines).map(line => line.innerText);
    const code = codeLines.join('\n').trim();
    if (code.length > 0) {
      console.log('✅ Extracted GFG code via .CodeMirror');
      return code;
    }
  }

  // 3. Raw textarea fallback
  const textarea = document.querySelector('#ideTextarea');
  if (textarea && textarea.value.trim()) {
    console.log('✅ Fallback: Found GFG code from #ideTextarea');
    return textarea.value.trim();
  }

  // 4. <pre> fallback
  const pre = document.querySelector('pre');
  if (pre && pre.innerText.trim().length > 0) {
    console.log('✅ Fallback: Extracted GFG code via <pre> tag');
    return pre.innerText.trim();
  }

  console.warn('❌ GFG code not found using known selectors.');
  return '';
}



//
// 📩 Main Message Listener
//
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'get-question-and-code') {
    (async () => {
      let question = '';
      let code = '';

      if (window.location.hostname.includes('leetcode.com')) {
        question = extractLeetCodeQuestion();
        code = await waitForLeetCodeCode();
      } else if (window.location.hostname.includes('geeksforgeeks.org')) {
        question = extractGFGQuestion();
        code = extractGFGCode();
      }

      if (question && code) {
        console.log('📤 Sending back question and code');
        console.log('🔍 Question:', question.slice(0, 100) + '...');
        console.log('🔍 Code:', code.slice(0, 100) + '...');
        sendResponse({ question, code });
      } else {
        console.warn('❌ Could not extract question or code');
        sendResponse({ question: '', code: '' });
      }
    })();

    // Tell Chrome this is an async response
    return true;
  }
});

// --- Configuration ---
// SECURITY WARNING: Hardcoding API keys in client-side code is a major security risk.
// Anyone can view your key and use it. For a real application, this API call
// should be made from a backend server where the key can be kept secret.
const API_KEY = "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"; // IMPORTANT: Invalidate this key and use a new one from a secure backend.
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-r1:free";

// --- DOM Elements ---
const userInput = document.getElementById("userInput");
const responseDiv = document.getElementById("response");
const askButton = document.getElementById("askButton");

// --- Event Listener ---
askButton.addEventListener("click", askMentor);

// --- Core Function ---
async function askMentor() {
  const input = userInput.value.trim();
  if (!input) {
    responseDiv.innerText = "Please enter a question first.";
    return;
  }

  // Update UI for loading state
  askButton.disabled = true;
  responseDiv.innerText = "Thinking...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        // Optional headers for OpenRouter ranking
        "HTTP-Referer": window.location.href,
        "X-Title": document.title
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are a helpful and encouraging AI career mentor." },
          { role: "user", content: input }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;
    responseDiv.innerText = message || "Sorry, I couldn't get a response. Please try again.";

  } catch (error) {
    console.error("Error during API call:", error);
    responseDiv.innerText = `An error occurred. Please check the console for details.`;
  } finally {
    // Restore UI after request is complete
    askButton.disabled = false;
  }
}
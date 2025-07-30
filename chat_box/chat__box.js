const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-r1:free";
const userInput = document.getElementById("userInput");
const chatHistory = document.getElementById("response"); 
const askButton = document.getElementById("askButton");

askButton.addEventListener("click", askMentor);
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); 
        askMentor();
    }
});

function appendMessage(text, className) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`; 
    messageElement.innerText = text;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function askMentor() {
    const input = userInput.value.trim();
    if (!input) {
        return;
    }
    const thinkingIndicator = document.createElement("div");
    appendMessage(input, "user-message");
    userInput.value = "";
    askButton.disabled = true;
    thinkingIndicator.className = "message ai-message thinking";
    thinkingIndicator.innerText = "Thinking...";
    thinkingIndicator.style.padding = "10px";
    thinkingIndicator.style.borderRadius = "5px";
    chatHistory.appendChild(thinkingIndicator);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
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
        thinkingIndicator.innerText = message || "Sorry, I couldn't get a response. Please try again.";
        thinkingIndicator.classList.remove("thinking");

    } catch (error) {
        console.error("Error during API call:", error);
        thinkingIndicator.innerText = `An error occurred. Please check the console for details.`;
        thinkingIndicator.classList.remove("thinking");
    } finally {
        askButton.disabled = false;
    }
}
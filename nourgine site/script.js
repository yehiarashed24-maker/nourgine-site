// Mouse Glow Effect
document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector(".background-glow");

  if (!glow) return;

  glow.style.left = e.clientX - 350 + "px";
  glow.style.top = e.clientY - 350 + "px";
});

// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, 3500);
});

// Welcome Message
const chatBoxElement = document.getElementById("chat-box");

if (chatBoxElement) {
  chatBoxElement.innerHTML = `
    <p><b>Nourgine AI:</b> Welcome! Ask me anything about Nourgine.</p>
  `;
}

// Chat Function
async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();

  if (!message) return;

  chatBox.innerHTML += `
    <p><b>You:</b> ${message}</p>
  `;

  input.value = "";

  chatBox.innerHTML += `
    <p id="typing"><b>Nourgine AI:</b> Typing...</p>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/api/chat",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    const typing = document.getElementById("typing");
    if (typing) typing.remove();

    console.log("SERVER RESPONSE:", data);

    chatBox.innerHTML += `
      <p><b>Nourgine AI:</b> ${
        data.reply || data.error || "Nourgine AI is busy right now. Please try again in a moment."
      }</p>
    `;

  } catch (error) {

    console.error(error);

    const typing = document.getElementById("typing");
    if (typing) typing.remove();

    chatBox.innerHTML += `
      <p><b>Error:</b> ${error.message}</p>
    `;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Chat Toggle
const toggle = document.getElementById("chat-toggle");
const popup = document.getElementById("chat-popup");

if (toggle && popup) {
  toggle.addEventListener("click", () => {
    popup.classList.toggle("hidden");
  });
}

// Send on Enter
const userInput = document.getElementById("user-input");

if (userInput) {
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}
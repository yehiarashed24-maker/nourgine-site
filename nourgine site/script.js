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

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    console.log("SERVER RESPONSE:", data);

    chatBox.innerHTML += `
      <p><b>Nourgine AI:</b> ${
        data.reply || data.error || "No response"
      }</p>
    `;

  } catch (error) {

    console.error(error);

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
// Mouse Glow Effect

document.addEventListener("mousemove", (e) => {

const glow = document.querySelector(".background-glow");

let x = e.clientX;
let y = e.clientY;

glow.style.left = x - 350 + "px";
glow.style.top = y - 350 + "px";

});
window.addEventListener("load", ()=>{

    setTimeout(()=>{

        document.getElementById("loader").style.display="none";

    },3500);

});
async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value;

    if(!message) return;

    chatBox.innerHTML += `
        <p><b>You:</b> ${message}</p>
    `;

    input.value = "";

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

chatBox.innerHTML += `
<p><b>Nourgine AI:</b> ${data.reply}</p>
`;
}
const toggle = document.getElementById("chat-toggle");
const popup = document.getElementById("chat-popup");

toggle.addEventListener("click", () => {
    popup.classList.toggle("hidden");
});
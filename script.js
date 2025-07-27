
const chatboxDiv = document.getElementById("chat-box-open-button");
const box=document.getElementById("chatbox");
function chat_box() {
    const isVisible = box.style.display === "flex";
    if (isVisible) {
        box.style.display = "none";
    } else {
        box.style.display = "flex";
    }
}

const chat = <HTMLDivElement> document.getElementById("chat");
const chat_form = <HTMLFormElement> document.getElementById("chat_form");
const chat_input = <HTMLInputElement> document.getElementById("chat_input");

chat_form.onsubmit = e => {
    e.preventDefault();

    if(!chat_input.value.replace(/\s+/gm, "")) return;

    if(chat_input.value.startsWith("/")) {
        socket.emit("sendCmd", chat_input.value.slice(1));
    } else {
        socket.emit("sendMsg", chat_input.value);
    }
    chat_input.value = "";
}

socket.on("newMsg", (data:string) => {
    const msg = document.createElement("div");
    msg.setAttribute("class", "chat-msg");
    msg.innerText = data;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
});

socket.on("newCmd", (cmd:any) => {
    console.log(cmd);
});
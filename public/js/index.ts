/// <reference path="../../node_modules/@types/socket.io-client/index.d.ts" />
/// <reference path="../../typings/interfaces.d.ts" />

const socket = io();

document.onkeydown = (e) => {
    if(chat_input == document.activeElement) return;
    switch (e.keyCode) {
        case 87: socket.emit("keyPress", { inputId: "up"   , state: true }); break; // W
        case 65: socket.emit("keyPress", { inputId: "left" , state: true }); break; // A
        case 83: socket.emit("keyPress", { inputId: "down" , state: true }); break; // S
        case 68: socket.emit("keyPress", { inputId: "right", state: true }); break; // D
    }
}

document.onkeyup = (e) => {
    if(chat_input == document.activeElement) return;
    switch (e.keyCode) {
        case 87: socket.emit("keyPress", { inputId: "up"    , state: false }); break; // W
        case 65: socket.emit("keyPress", { inputId: "left"  , state: false }); break; // A
        case 83: socket.emit("keyPress", { inputId: "down"  , state: false }); break; // S
        case 68: socket.emit("keyPress", { inputId: "right" , state: false }); break; // D
    }
}

document.oncontextmenu = e => e.preventDefault();
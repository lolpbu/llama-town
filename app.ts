/// <reference path="typings/interfaces.d.ts" />

import { Server } from "http";
import * as lol from "loppbbu";
import express from "express";
import SocketIo from "socket.io";
//import express = require("express");
//import SocketIo = require("socket.io");


import Llama from "./classes/Llama";

const app = express();
const server = new Server(app);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.use("/public", express.static(__dirname + "/public"));

server.listen(2000, () => console.log(":)"));

const io = new SocketIo(server, {});

let socket_list: { [ s: string ]: Socket; } = {};
let DEBUG:boolean = true;

io.sockets.on("connection", (socket: Socket) => {

    socket.id = "" + Math.random();
    socket_list[socket.id] = socket;

    Llama.onConnect(socket);

    socket.on("disconnect", () => {
        delete socket_list[socket.id];
        Llama.onDisconnect(socket);
    });

    socket.on("sendMsg", (msg: string) => {
        for(let i in socket_list){
            socket_list[i].emit("newMsg", `${Llama.list[socket.id].name}: ${msg}`);
        }
    });

    socket.on("sendCmd", (input:string) => {
        if(!DEBUG) return;
        let ev;
        try {
            ev = eval(input);
        } catch(e){
            ev = e.message;
        }
        socket.emit("newCmd", ev);
    });
});

const main = function(): void {
    
    const _package: SocketData.NewPosData = {
        llamas: Llama.getUpdList(),
    }

    for(let i in socket_list){
        let socket = socket_list[i];
        socket.emit("newPos", _package);
    }
}

setInterval(main, 1000/25);
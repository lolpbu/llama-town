/// <reference path="../typings/interfaces.d.ts" />

import { generateLetters } from "loppbbu";
import Entity from "./Entity"

class Llama extends Entity {

    //#region property declarations
    static list: { [ s: string ]: Llama; } = {};

    readonly id: string;
    readonly name: string;

    public maxSp: number;

    private isPressingRight: boolean;
    private isPressingLeft : boolean;
    private isPressingUp   : boolean;
    private isPressingDown : boolean;

    //#endregion

    constructor(id: string) {
        super();

        this.id = id;
        this.name = generateLetters(5);

        this.isPressingRight = false;
        this.isPressingLeft  = false;
        this.isPressingUp    = false;
        this.isPressingDown  = false;
        this.maxSp = 10;

        Llama.list[id] = this;
    }

    public update():void {
        this.updateSp();
        super.update();
    }

    protected updatePos():void {
        if (this.isPressingRight) this.x += this.maxSp;
        if (this.isPressingLeft ) this.x -= this.maxSp;
        if (this.isPressingDown ) this.y += this.maxSp;
        if (this.isPressingUp   ) this.y -= this.maxSp;
    }

    private updateSp():void {
        if (this.isPressingRight) this.hsp =  this.maxSp;
        if (this.isPressingLeft ) this.hsp = -this.maxSp;
        if (this.isPressingDown ) this.vsp =  this.maxSp;
        if (this.isPressingUp   ) this.vsp = -this.maxSp;
    }

    static onConnect(socket: Socket):void{
        const llama = new Llama(socket.id);

        console.log(`[${llama.name}] connected id:${llama.id}`);

        socket.on("keyPress", (data: SocketData.KeyPressData) => {
            switch(data.inputId){
                case "up"   : llama.isPressingUp    = data.state; break;
                case "down" : llama.isPressingDown  = data.state; break;
                case "right": llama.isPressingRight = data.state; break;
                case "left" : llama.isPressingLeft  = data.state; break;
            }
        });
    }

    static onDisconnect(socket: Socket):void {
        console.log(`[${Llama.list[socket.id].name}] desconnected id:${Llama.list[socket.id].id}`);
        delete Llama.list[socket.id];
    }

    static getUpdList():LlamaPack[] {
        const _package: LlamaPack[] = [];

        for(let i in Llama.list) {
            let llama = Llama.list[i];

            llama.update();

            _package.push({
                x: llama.x,
                y: llama.y,
                name: llama.name,
            });
        }

        return _package;
    }
}

export default Llama;
declare interface Socket extends SocketIO.Socket {
    x: number;
    y: number;
    name: string;
}

declare interface LlamaPack {
    x: number;
    y: number;
    readonly name: string;
}

declare namespace SocketData {
    interface NewPosData {
        llamas: LlamaPack[];
    }

    interface KeyPressData {
        readonly inputId: "up" | "down" | "right" | "left" | "click";
        state: boolean;
    }
}
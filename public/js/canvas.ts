const canvas = <HTMLCanvasElement> document.getElementById("canv");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

socket.on("newPos", (data: SocketData.NewPosData) => {
    ctx.clearRect(0,0, canvas.width,canvas.height);
    ctx.font = "25px Arial";

    for(const llama of data.llamas){
        ctx.fillText(llama.name, llama.x, llama.y);
    }
});
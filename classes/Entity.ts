abstract class Entity {
    x: number;
    y: number;
    hsp: number;
    vsp: number;

    readonly id: string;

    constructor(){
        this.x = 250;
        this.y = 250;

        this.hsp = 10;
        this.vsp = 10;

        this.id = "";
    }


    public update():void {
        this.updatePos();
    }

    protected updatePos(): void {
        this.x += this.hsp;
        this.y += this.vsp;
    }

    public getDistance(E1:Entity, E2:Entity): number {
        //d=√((x_2-x_1)²+(y_2-y_1)²)
        let x = (E2.x - E1.x) ** 2;
        let y = (E2.y - E1.y) ** 2;
        return Math.sqrt(x + y);
    }
}

export default Entity;
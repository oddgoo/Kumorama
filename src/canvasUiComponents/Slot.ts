import * as PIXI from "pixi.js";

export default class Slot {

    public static readonly size = 50;
    private container:PIXI.Container = new PIXI.Container();
    private bg:PIXI.Graphics;
    private sprite:PIXI.Sprite;

    constructor(parent: PIXI.Container, x: number, y: number) {

        this.bg = new PIXI.Graphics()
            .beginFill(0xdddddd)
            .drawRect(x, y,  Slot.size, Slot.size)
            .endFill();

        this.bg.alpha = 0.7;

        this.sprite = new PIXI.Sprite();

        this.container.addChild(this.bg);
        this.container.addChild(this.sprite);
        this.container.pivot.set(Slot.size, Slot.size/2)
        parent.addChild(this.container);

    }

    public select():void{
        this.container.scale.set(1.2, 1.2);
        null;
    }

    public deselect():void{
        this.container.scale.set(1, 1.);
        null;
    }

    public changeImage():void{
        null;
    }
}
import * as PIXI from "pixi.js";

export default class Slot {

    public static readonly size = 50;
    public container:PIXI.Container = new PIXI.Container();

    private readonly bg:PIXI.Graphics;
    private readonly sprite:PIXI.Sprite;
    private id!:number;

    constructor(parent: PIXI.Container, x: number, y: number, id: number) {

        this.id = id;

        this.bg = new PIXI.Graphics()
            .beginFill(0xdddddd)
            .drawRect(0, 0,  Slot.size, Slot.size)
            .endFill();

        this.bg.alpha = 0.7;

        this.sprite = new PIXI.Sprite();
        this.sprite.scale.set(3, 3);

        this.container.addChild(this.bg);
        this.container.addChild(this.sprite);
        this.container.position.set(x,y);
        this.container.pivot.set(Slot.size/2, Slot.size/2);
        this.container.interactive = true;
        parent.addChild(this.container);

        //this.sprite.on('pointerdown', this.select.bind(this))
    }

    public select():void{
        this.container.scale.set(1.3, 1.3);
        console.log("selected slot: " + this.id);
    }

    public deselect():void{
        this.container.scale.set(1, 1);
    }

    public changeImage(texture:PIXI.Texture):void{
        this.sprite.texture = texture;
    }
}

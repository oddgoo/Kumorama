import * as PIXI from "pixi.js";
import Main from "../index"

export default class HotBar {

    private size = 50;

    public init(stage:PIXI.Container): void {
        console.log("creating HotBar");
        const square = new PIXI.Graphics()
            .beginFill(0xffffff)
            .drawRect(Main.GAME_WIDTH/2, Main.GAME_HEIGHT - this.size,  this.size, this.size)
            .endFill();

        stage.addChild(square);
    }

}
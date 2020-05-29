import * as PIXI from "pixi.js";

import Main from "../index"
import Slot from "./Slot"

import Keyboard from "pixi.js-keyboard";

export default class HotBar {

    private container: PIXI.Container = new PIXI.Container();
    private slots: Slot[] = [];

    public init(stage:PIXI.Container, app:PIXI.Application): void {

        stage.addChild(this.container);
        this.container.y = Main.height - Slot.size;

        for (let i = 0; i < 9; i++) {
            this.slots.push( new Slot(this.container, (Slot.size + 5) * i  + Main.width/2 - ((Slot.size + 5) * 9) / 2, 0))
            this.slots[i].changeImage(new PIXI.Texture(Main.baseTexture, new PIXI.Rectangle(i * 16, 0, 16, 16)))
        }

        this.slots[0].select();
        app.ticker.add(delta => this.ticker(delta));

        for (let i = 0; i < 10; i++) {
            Keyboard.events.on('pressed_Digit'+i, null, (keyCode, event) => {
                this.deselectSlots();
                this.slots[i-1].select();
            });
        }
    }

    deselectSlots():void{
        for (const slot of this.slots)
            slot.deselect();
    }

    ticker(delta):void{
        Keyboard.update();
    }


}

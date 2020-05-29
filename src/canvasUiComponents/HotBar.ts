import * as PIXI from "pixi.js";

import Main from "../index"
import Slot from "./Slot"

import Keyboard from "pixi.js-keyboard";
import store from "../store/index";

export default class HotBar {

    private container: PIXI.Container = new PIXI.Container();
    private slots: Slot[] = [];

    public init(stage:PIXI.Container, app:PIXI.Application): void {

        stage.addChild(this.container);
        this.container.y = Main.height - Slot.size;

        for (let i = 0; i < 9; i++) {
            this.slots.push( new Slot(this.container, (Slot.size + 5) * i  + Main.width/2 - ((Slot.size + 5) * 9) / 2, 0, i));
            this.slots[i].changeImage(new PIXI.Texture(Main.baseTexture, new PIXI.Rectangle(i * 16, 0, 16, 16)));
            this.slots[i].container.on('pointerdown', () => {
                this.deselectSlots();
                store.commit('changeTileId', (i));
                this.slots[i].select();
                }
            );
        }

        app.ticker.add(() => this.ticker());

        for (let i = 1; i <10; i++) {
            Keyboard.events.on('pressed_Digit'+i, null, () => {
                this.deselectSlots();
                this.slots[i-1].select();
                store.commit('changeTileId', (i-1));
            });
        }
        this.slots[1].select();
    }

    deselectSlots():void{
        for (const slot of this.slots)
            slot.deselect();
    }

    ticker():void{
        Keyboard.update();
    }


}

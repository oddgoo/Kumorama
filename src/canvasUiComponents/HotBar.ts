import * as PIXI from "pixi.js";

import Main from "../index"
import Slot from "./Slot"

export default class HotBar {

    private container: PIXI.Container = new PIXI.Container();
    private slots: Slot[] = [];

    public init(stage:PIXI.Container): void {
        stage.addChild(this.container);
        this.container.y = Main.GAME_HEIGHT/2 - Slot.size;

        for (let i = 0; i < 10; i++) {
            this.slots.push( new Slot(this.container, (Slot.size + 5) * i  , 0))
        }

        this.slots[3].select();

        //Keyboard.events.on('pressed_KeyW', null, (keyCode, event) => { console.log(keyCode); });
    }

}
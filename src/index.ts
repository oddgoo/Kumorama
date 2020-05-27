import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';

import * as PIXI from "pixi.js";

import tilesImage from "./assets/Tileset.png";
import rabbitImage from "./assets/rabbit.png";


export class Main {
    private static readonly GAME_WIDTH = 1200;
    private static readonly GAME_HEIGHT = 900;

    private app!: PIXI.Application;

    private baseTexture:PIXI.BaseTexture;
    private stage:PIXI.Container;

    private layers:PIXI.Container[] = [];

    private static tileScale=4;

    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }

    // add for the test example purpose
    public helloWorld(): string {
        return "hello world";
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("tiles", tilesImage);
        loader.add("rabbit", rabbitImage);
        loader.add("spriteExample", "./spritesData.json"); // example of loading spriteSheet

        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        //
        loader.load();

    }


    private onAssetsLoaded(): void {

        this.createRenderer();
        this.stage = this.app.stage;

        this.baseTexture = PIXI.BaseTexture.from("tiles");
        this.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        this.layers.push(this.renderLayer());
        this.layers.push(this.renderLayer(10));
        this.layers[1].alpha =0.5;
        this.layers[1].x += 100;
        this.layers[1].y -= 20;

        this.app.ticker.add((delta) => {
            this.moveCamera(-0.3,-0.1, -0.1);
        });

    }

    private renderLayer(blur= 0): PIXI.Container {

        const layer= new PIXI.Container();

        const layerData:number[][] = [
            [0,0,6,0,0,0,6],
            [6,0,0,0,0,0,0],
            [0,0,5,4,5,2,4],
            [1,0,1,1,1,1,1]
        ];

        let row = 0;
        for (const i in layerData){
            let column = 0;
            for(const r of layerData[i]){
                this.drawTile(r,column,row,layer);
                column++;
            }
            row++;
        }

        if(blur != 0){
            const blurFilter1 = new PIXI.filters.BlurFilter(blur);
            layer.filters = [blurFilter1];
        }
        this.stage.addChild(layer);
        return layer;
    }

    private drawTile(tileId:number, x:number, y:number, layer:PIXI.Container): void {
        console.log("drawing tileId " + tileId);

        const tileTexture = new PIXI.Texture(this.baseTexture, new PIXI.Rectangle(tileId * 16, 0, 16, 16));
        //let newTexture = new PIXI.Texture(oldTexture.baseTexture, oldTexture.frame);

        const tile = new PIXI.Sprite(tileTexture);
        tile.scale.set(Main.tileScale, Main.tileScale);
        tile.position.set(x*16*Main.tileScale + 100, y*16*Main.tileScale + 100);
        layer.addChild(tile);
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0xd3d3d3,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        document.body.appendChild(this.app.view);

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        // this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        // this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
    }

    private moveCamera(x=0, y=0, z=0): void {

        let i = 1;
        for(const l of this.layers){
            l.x-=x/i*2;
            l.y-=y/i*2;
            let scale = l.scale.x;
            scale -= z/(500 * i/2);
            l.scale.x = l.scale.y = scale;
            i++;
        }
    }
}

const pixi = new Main();
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
    },
    actions: {
        increment (context) {
            context.commit('increment');
            pixi.addRandomSprite();
        }
    }
})

new Vue({ render: createElement => createElement(App) , store: store}).$mount('#app');

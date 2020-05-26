import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';

import * as PIXI from "pixi.js";

import tilesImage from "./assets/Tileset.png";
import rabbitImage from "./assets/rabbit.png";



export class Main {
    private static readonly GAME_WIDTH = 800;
    private static readonly GAME_HEIGHT = 600;

    private app!: PIXI.Application;



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

    private baseTexture:PIXI.BaseTexture;
    private stage:PIXI.Container;

    private onAssetsLoaded(): void {

        this.createRenderer();
        this.stage = this.app.stage;

        this.baseTexture = PIXI.BaseTexture.from("tiles");
        this.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        this.renderLayer();
        // const texture = PIXI.Texture.from("tiles");
        //
        // texture.frame = new PIXI.Rectangle(16, 0, 16, 16);
        // const bg = new PIXI.Sprite(texture);
        // bg.scale.set(10, 2);
        // bg.position.set(128,128);

        //this.addRandomSprite();
        //this.addRandomSprite();

        //this.stage.addChild(tile);

        //Filter
        const blurFilter1 = new PIXI.filters.BlurFilter(0.5);
        this.stage.filters = [blurFilter1];

    }

    private renderLayer(): void {

        const layerData:number[][] = [
            [0,0,6,0,0,0,6],
            [6,0,0,0,0,0,0],
            [0,0,5,4,5,2,4],
            [1,0,1,1,1,1,1]
        ];

        let row = 0;
        for (let i in layerData){
            let column = 0;
            for(let r of layerData[i]){
                this.drawTile(r,column,row);
                column++;
            }
            row++;
        }
    }

    private static tileScale=4;

    private drawTile(tileId:number, x:number, y:number): void {
        console.log("drawing tileId " + tileId);



        let tileTexture = new PIXI.Texture(this.baseTexture, new PIXI.Rectangle(tileId * 16, 0, 16, 16));
        //let newTexture = new PIXI.Texture(oldTexture.baseTexture, oldTexture.frame);

        let tile = new PIXI.Sprite(tileTexture);
        tile.scale.set(Main.tileScale, Main.tileScale);
        tile.position.set(x*16*Main.tileScale + 100, y*16*Main.tileScale + 100);
        this.stage.addChild(tile);
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0xd3d3d3,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        document.body.appendChild(this.app.view);

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
    }

    public addRandomSprite(): void {
        // const texture = PIXI.Texture.from("tiles");
        // texture.frame = new PIXI.Rectangle(32, 0, 16, 16);
        // const tile = new PIXI.Sprite(texture);
        // tile.scale.set(4, 4);
        // tile.position.set(Math.random() * Main.GAME_WIDTH, Math.random() * Main.GAME_HEIGHT);
        // tile.anchor.set(0.5,0.5);
        // this.app.stage.addChild(tile);
        //
        // this.app.ticker.add((delta) => {
        //     // rotate the container!
        //     // use delta to create frame-independent transform
        //     tile.rotation -= 0.01 * delta;
        // });

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

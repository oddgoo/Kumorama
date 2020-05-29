import Vue from 'vue';
import Vuex from 'vuex';
import * as PIXI from "pixi.js";


import App from './App.vue';

import tilesImage from "./assets/Tileset.png";
import rabbitImage from "./assets/rabbit.png";
import HotBar from "./canvasUiComponents/HotBar";


export default class Main {
    public static width = 1200;
    public static height = 900;

    public static baseTexture:PIXI.BaseTexture;

    private app!: PIXI.Application;
    private stage:PIXI.Container;
    private layers:PIXI.Container[] = [];

    private static tileScale=4;
    private currentLayer:PIXI.Container;

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

        Main.baseTexture = PIXI.BaseTexture.from("tiles");
        Main.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        this.layers.push(this.renderLayer());
        this.layers.push(this.renderLayer(10));
        this.layers[0].scale.set(Main.tileScale, Main.tileScale);
        this.layers[1].scale.set(Main.tileScale, Main.tileScale);
        this.layers[1].alpha =0.5;
        this.layers[1].x += 100;
        this.layers[1].y -= 20;

        this.currentLayer = this.layers[0];

         this.app.ticker.add((delta) => {
             this.moveCamera(-0.3,-0.1, -0.1);
         });

        const interactionManager = new PIXI.interaction.InteractionManager(this.app.renderer);
        interactionManager.on('mousedown', this.onClickStage.bind(this))

        const hotBar:HotBar = new HotBar();
        hotBar.init(this.stage, this.app);

    }

    private onClickStage(event):void {

        this.drawTile(
            1,
            Math.floor( (event.data.global.x - this.currentLayer.x)/16/this.currentLayer.scale.x) ,
            Math.floor((event.data.global.y - this.currentLayer.y)/16/this.currentLayer.scale.y) ,
            this.currentLayer);

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

        const tileTexture = new PIXI.Texture(Main.baseTexture, new PIXI.Rectangle(tileId * 16, 0, 16, 16));
        //let newTexture = new PIXI.Texture(oldTexture.baseTexture, oldTexture.frame);

        const tile = new PIXI.Sprite(tileTexture);
        // tile.scale.set(Main.tileScale, Main.tileScale);
        tile.position.set(x*16, y*16);
        layer.addChild(tile);
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0xc3c3cc,
            width: window.innerWidth,
            height: window.innerHeight,
        });

        document.body.appendChild(this.app.view);

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        Main.width = this.app.screen.width;
        Main.height = this.app.screen.height;

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

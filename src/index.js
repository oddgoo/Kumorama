"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vuex_1 = __importDefault(require("vuex"));
const App_vue_1 = __importDefault(require("./App.vue"));
const PIXI = __importStar(require("pixi.js"));
const Tileset_png_1 = __importDefault(require("./assets/Tileset.png"));
const rabbit_png_1 = __importDefault(require("./assets/rabbit.png"));
class Main {
    constructor() {
        this.layers = [];
        window.onload = () => {
            this.startLoadingAssets();
        };
    }
    // add for the test example purpose
    helloWorld() {
        return "hello world";
    }
    startLoadingAssets() {
        const loader = PIXI.Loader.shared;
        loader.add("tiles", Tileset_png_1.default);
        loader.add("rabbit", rabbit_png_1.default);
        loader.add("spriteExample", "./spritesData.json"); // example of loading spriteSheet
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        //
        loader.load();
    }
    onAssetsLoaded() {
        this.createRenderer();
        this.stage = this.app.stage;
        this.baseTexture = PIXI.BaseTexture.from("tiles");
        this.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.layers.push(this.renderLayer());
        this.layers.push(this.renderLayer(10));
        this.layers[1].alpha = 0.5;
        this.layers[1].x += 100;
        this.layers[1].y -= 20;
        this.app.ticker.add((delta) => {
            this.moveCamera(-0.3, -0.1, -0.1);
        });
    }
    renderLayer(blur = 0) {
        const layer = new PIXI.Container();
        const layerData = [
            [0, 0, 6, 0, 0, 0, 6],
            [6, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 4, 5, 2, 4],
            [1, 0, 1, 1, 1, 1, 1]
        ];
        let row = 0;
        for (const i in layerData) {
            let column = 0;
            for (const r of layerData[i]) {
                this.drawTile(r, column, row, layer);
                column++;
            }
            row++;
        }
        if (blur != 0) {
            const blurFilter1 = new PIXI.filters.BlurFilter(blur);
            layer.filters = [blurFilter1];
        }
        this.stage.addChild(layer);
        return layer;
    }
    drawTile(tileId, x, y, layer) {
        console.log("drawing tileId " + tileId);
        const tileTexture = new PIXI.Texture(this.baseTexture, new PIXI.Rectangle(tileId * 16, 0, 16, 16));
        //let newTexture = new PIXI.Texture(oldTexture.baseTexture, oldTexture.frame);
        const tile = new PIXI.Sprite(tileTexture);
        tile.scale.set(Main.tileScale, Main.tileScale);
        tile.position.set(x * 16 * Main.tileScale + 100, y * 16 * Main.tileScale + 100);
        layer.addChild(tile);
    }
    createRenderer() {
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
    moveCamera(x = 0, y = 0, z = 0) {
        let i = 1;
        for (const l of this.layers) {
            l.x -= x / i * 2;
            l.y -= y / i * 2;
            let scale = l.scale.x;
            scale -= z / (500 * i / 2);
            l.scale.x = l.scale.y = scale;
            i++;
        }
    }
}
exports.Main = Main;
Main.GAME_WIDTH = 800;
Main.GAME_HEIGHT = 600;
Main.tileScale = 4;
const pixi = new Main();
vue_1.default.use(vuex_1.default);
const store = new vuex_1.default.Store({
    state: {
        count: 0
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
    },
    actions: {
        increment(context) {
            context.commit('increment');
            pixi.addRandomSprite();
        }
    }
});
new vue_1.default({ render: createElement => createElement(App_vue_1.default), store: store }).$mount('#app');

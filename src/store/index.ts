import Vuex from 'vuex';
import Vue from "vue";
import {pixi} from "../index";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        selectedTileId: 1
    },
    mutations: {
        changeTileId: (state,id) => state.selectedTileId = id
    }
});

export default store;

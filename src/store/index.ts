import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        selectedTileId: 1
    },
    mutations: {
        changeTileId: (state,id):void => state.selectedTileId = id
    }
});

export default store;

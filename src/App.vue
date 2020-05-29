<template>
    <div class="MainContainer">
        <div class="MenuBar">Kumorama {{tileId}}</div>
<!--        <Notepad></Notepad>-->
    </div>

</template>

<script lang="ts">
    import Vue from "vue";
    import Notepad from "./uiComponents/Notepad.vue"
    import Hotbar from "./uiComponents/Hotbar.vue"

    export default Vue.extend({
        components: {
            Notepad,
            Hotbar
        },
        computed: {
            tileId () {
                return this.$store.state.selectedTileId;
            }
        },
        methods: {
            // click: function () {
            //     this.$store.dispatch('increment');
            // }
        }
    });
</script>

<style lang="scss" scoped>
    .MainContainer{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .MainStage{
        flex: auto;
        padding: 10px;
    }
    .MenuBar{
        padding: 10px;
        height: 40px;
        background-color: #555555;
        color:white;
    }
    .BottomBar{
        padding: 10px;
        height: 100px;
    }
</style>

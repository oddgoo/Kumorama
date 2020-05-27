<template>
    <div>
        Hello {{ count }} <br/>
        <button v-on:click="click">Click</button>
        <Notepad></Notepad>
    </div>

</template>

<script lang="ts">
    import Vue from "vue";
    import Notepad from "./uiComponents/Notepad.vue"

    export default Vue.extend({
        components: {
            Notepad
        },
        computed: {
            count () {
                return this.$store.state.count;
            }
        },
        methods: {
            click: function () {
                this.$store.dispatch('increment')
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>
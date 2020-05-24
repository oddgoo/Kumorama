<template>
    <div>
        Hello {{ count }} <br/>
        <button v-on:click="click">Click</button>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
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
    .container {
        color: green;
    }
</style>
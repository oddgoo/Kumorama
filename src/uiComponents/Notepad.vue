<template>
    <div>
        <h3>Notepad</h3>
        <textarea :value="input" @input="update"></textarea>
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import marked from "marked";
    import _ from "lodash";

    export default Vue.extend({
        data: () => {
            return {input: 'This is page 1'}
        },
        computed: {
            compiledMarkdown: function() {
                return marked(this.input, { sanitize: true });
            }
        },
        methods: {
            update: _.debounce(function(e) {
                this.input = e.target.value;
            }, 300)
        },
    });
</script>


<style lang="scss" scoped>
</style>
<template>
    <div>
        Hotbar
        <div class="slot"></div>
        <div class="slot"></div>
    </div>
</template>

<script>
    export default {
        name: "Hotbar"
    };
</script>

<style scoped>
    .slot{
        width: 80px;
        height: 80px;
        background-color: white;
        border-radius: 10px;
        margin: 10px;
    }
</style>
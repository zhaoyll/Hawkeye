<template>
    <div>
        <h1>{{ title }}</h1>
        <!-- <button @click="handleClick">点击</button> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('还没有设置付费功能')
const handleClick = () => {
    console.log('clicked')
}
</script>

<style scoped>
div {
    text-align: center;
}
</style>
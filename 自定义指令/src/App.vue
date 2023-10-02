<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
    // 文本内容应该与当前的 `count.value` 一致
    console.log(document.getElementById('count').textContent)
})
</script>

<template>
    <button id="count" @click="count++">{{ count }}</button>
</template>

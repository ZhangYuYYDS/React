<template>
    <VirtualListNo :listData="data" :estimatedItemSize="100" v-slot="slotProps">
        <Item :item="slotProps.item" />
    </VirtualListNo>
</template>

<script setup>
import VirtualListNo from './components/VirtualListNo.vue';
import Item from './components/Item.vue';

import { faker } from '@faker-js/faker';
import { reactive } from 'vue';

let data = reactive([]);
for (let id = 0; id < 1000; id++) {
    data.push({
        id,
        value: faker.lorem.sentences(), // 长文本
    });
}
</script>

<style>
html {
    height: 100%;
}
body {
    height: 100%;
    margin: 0;
}
#app {
    height: 100%;
}
</style>

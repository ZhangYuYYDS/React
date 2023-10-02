<template>
    <div class="app">
        <button @click="btnClick1" v-permission="['user:delete']">用户删除用户</button>
        <button @click="btnClick1" v-permission="['boss:add']">老板删除用户</button>
        <button @click="btnClick1" v-permission="['hr:edit']">人事删除用户</button>
    </div>
</template>

<script setup>
// 
import { vPermission } from './directives/vPermission'

function btnClick1() {
    console.log('11111111')
}
</script>

<style lang="less" scoped>


</style>

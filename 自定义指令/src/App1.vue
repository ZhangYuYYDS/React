<template>
    <input v-focus v-model="obj.hello" />
    <div v-reserve:foo.bar="obj"></div>
    <!-- <div v-reserve:foo.bar="{hello: obj.hello, world: obj.world}"></div> -->
    <button v-debounce="{ fn: handleClick, event: 'click', delay: 200 }">点击试试</button>

    <input v-throttle="{ fn: handleInput, event: 'input', delay: 1000 }" v-model="obj.hello" />

    <button @click.stop="showModal">点击显示弹窗</button>
    <div class="modal" v-hide="{ fn: cancleModal }" v-if="isShowModal">
        <p>我是弹窗</p>
        <button @click.stop="cancleModal">关闭</button>
    </div>
</template>

<script setup>
// 在模板中启用 v-focus
import { vFocus } from './directives/vFocus'
import { ref, reactive } from 'vue'
let hello = ref('')
const obj = reactive({
    hello: '',
    world: ''
})

const handleClick = () => {
    console.log('防抖点击')
}

const handleInput = () => {
    console.log('节流输入框的值：', obj.hello)
}

let isShowModal = ref(false)
const showModal = () => {
    isShowModal.value = true
}
const cancleModal = () => {
    console.log('cancleModal')
    isShowModal.value = false
}
</script>

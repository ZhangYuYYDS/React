<template>
    <div class="virtual-list" ref="virtualListRef" @scroll="handleScroll">
        <!-- 占位容器 高度和数据的真实高度一致 用于形成滚动条 phantom: 幻影 -->
        <div class="list-container-phantom" :style="{ height: `${dataTotalHeight}px` }"></div>

        <!-- 真实的列表容器 -->
        <div class="list-container">
            <div v-for="item in dataDisplay" :key="item.id">
                <span>
                    {{ item.content }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';

// 可视区域中渲染元素的起始下标
const state = reactive({
    data: [], // 要渲染的数据
    startIdx: 0, // 可视区域内的第一个元素在 data 中的下标
    endIdx: 0, // 可视区域内的最后一个元素在 data 中的下标
    itemHeight: 25, // 元素的高度
    visibleAreaHeight: 0, // 可视区域的高度
    offset: 0, // 可视区域在垂直方向上的偏移量
});
// 获取组件
const virtualListRef = ref();

const fetchData = (dataCount = 100000) => {
    return new Promise((resolve) => {
        const response = {
            code: 0,
            msg: 'success',
            data: [],
        };

        for (let i = 0; i < dataCount; i++) {
            response.data.push({
                id: i,
                content: `content-${i + 1}`,
            });
        }

        setTimeout(() => {
            resolve(response);
        }, 300);
    });
};

onMounted(async () => {
    // 获取接口数据
    const response = await fetchData();
    state.data = response.data;
    // 获取虚拟列表容器的高度
    state.visibleAreaHeight = virtualListRef.value.clientHeight;
    // 初始化 startIdx 和 endIdx
    state.startIdx = 0;
    state.endIdx = state.startIdx + visualAreaItemCount.value;
});

// 获取可视区域的数据
const dataDisplay = computed(() => state.data.slice(state.startIdx, state.endIdx));
// 数据的总高度
const dataTotalHeight = computed(() => state.itemHeight * state.data.length);
// 可视区域中的元素个数
const visualAreaItemCount = computed(() => Math.ceil(state.visibleAreaHeight / state.itemHeight));

// 监听滚动
const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    state.startIdx = ~~(scrollTop / state.itemHeight);
    state.endIdx = state.startIdx + visualAreaItemCount.value;
    state.offset = scrollTop;
};

const offsetStyle = computed(() => `${state.offset}px`);
</script>

<style lang="less" scoped>
.virtual-list {
    height: 500px;
    overflow: auto;
    position: relative;
    border: 1px solid #aaa;

    .list-container-phantom {
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
    }

    .list-container {
        transform: translateY(v-bind(offsetStyle));
    }
}
</style>

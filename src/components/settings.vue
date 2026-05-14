<template>
    <div class="settings-page">
        <div style="margin-bottom: 8px;">主题</div>
        <div class="theme-options">
            <div class="theme-item" :class="{ active: currentTheme === 'light' }" @click="setTheme('light')">
                <div><img :src="lightImg" alt="" /></div>
                <span>浅色</span>
            </div>
            <div class="theme-item" :class="{ active: currentTheme === 'dark' }" @click="setTheme('dark')">
                <div><img :src="darkImg" alt="" /></div>
                <span>深色</span>
            </div>
            <div class="theme-item" :class="{ active: currentTheme === 'system' }" @click="setTheme('system')">
                <div><img :src="systemImg" alt="" /></div>
                <span>跟随系统</span>
            </div>
        </div>

        <!-- <div>
            <div style="margin: 16px 0px 8px 0px">搜索设置</div>
            <div class="select">
                <div>搜索结果每页显示条数</div>
                <el-select v-model="value" placeholder="Select" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>

        </div> -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { setGlobalTheme } from '../composables/useTheme'

// 图片基础路径
const basePath = '../assets/'
// 当前主题
const currentTheme = ref(localStorage.getItem('theme') || 'system')

// 计算属性：自动切换图片（代码极度简洁）
const lightImg = computed(() => {
    return currentTheme.value === 'light'
        ? new URL(`${basePath}Light-sun-1.png`, import.meta.url).href
        : new URL(`${basePath}Light-sun.png`, import.meta.url).href
})
const darkImg = computed(() => {
    return currentTheme.value === 'dark'
        ? new URL(`${basePath}Light-moolight-1.png`, import.meta.url).href
        : new URL(`${basePath}Light-moolight.png`, import.meta.url).href
})
const systemImg = computed(() => {
    return currentTheme.value === 'system'
        ? new URL(`${basePath}Light-windows-1.png`, import.meta.url).href
        : new URL(`${basePath}Light-windows.png`, import.meta.url).href
})

// 切换主题
function setTheme(theme) {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    setGlobalTheme(theme)
}


const value = ref('')

const options = [
    {
        value: '10',
        label: '10',
    },
    {
        value: '20',
        label: '20',
    },
    {
        value: '30',
        label: '30',
    },
    {
        value: '40',
        label: '40',
    },
    {
        value: '50',
        label: '50',
    },
]

</script>

<style scoped>
.settings-page {
    padding: 8px 20px 20px 20px;
}

.theme-options {
    display: flex;
    gap: 12px;
}

.theme-item {
    flex: 1;
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 12px;
    cursor: pointer;
    background: var(--card);
    transition: all 0.3s ease;
    text-align: center;
}

.theme-item:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
}

/* 选中项背景 */
.theme-item.active {
    background: var(--primary);
    border-color: var(--primary);
}

/* 默认文字颜色：黑色 */
.theme-item span {
    font-size: 13px;
    display: block;
    color: #000;
}

/* 选中项文字：白色（优先级更高，覆盖黑色） */
.theme-item.active span {
    color: #fff !important;
}

.select {
    display: flex;
}
</style>
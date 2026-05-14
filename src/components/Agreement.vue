<template>
    <div class="policy-container">
        <div class="policy-item">
            <span class="label">用户协议</span>
            <button class="view-btn" @click="handleView('user')">查看</button>
        </div>
        <div class="divider"></div>
        <div class="policy-item">
            <span class="label">隐私政策</span>
            <button class="view-btn" @click="handleView('privacy')">查看</button>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleView = (type) => {
    console.log(`查看${type === 'user' ? '用户协议' : '隐私政策'}`)
    // 这里可以跳转到对应的协议页面，或者打开弹窗
    ElMessage.info('此时会跳转外部文章')

}
</script>

<style scoped>
.policy-container {
    background: var(--card);
    border-radius: 8px;
    overflow: hidden;
}

.policy-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    font-size: 15px;
}

.label {
    color: var(--text);
}

.view-btn {
    border: 1px solid var(--border);
    background: var(--card);
    border-radius: 999px;
    padding: 6px 20px;
    font-size: 13px;
    cursor: pointer;
    color: var(--text);
    transition: all 0.2s;
}

.view-btn:hover {
    border-color: var(--primary);
}

.divider {
    height: 1px;
    background-color: var(--border);
    margin: 0 16px;
}
</style>
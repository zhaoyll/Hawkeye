<script setup>
import { ref, onMounted, inject, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import Search from './Search.vue';


const show = ref(true)
const router = useRouter()

const sett = ref(false);
const username = localStorage.getItem('username')

const goToLogin = () => {
  const isLogin = !!localStorage.getItem('token')
  if (isLogin) {
    // 已登录
    sett.value = true
    username.value = username


  } else {
    router.push('/login')
  }
}
const isLogin = !!localStorage.getItem('token')
if (isLogin) {
  // 已登录

} else {
  router.push('/login')
}



const checkWidth = () => {
  show.value = window.innerWidth <= 1200;
};

onMounted(() => window.addEventListener('resize', checkWidth));
onUnmounted(() => window.removeEventListener('resize', checkWidth));


const list = ref([
  {
    name: '工作台',
    icon: new URL('../assets/Workbench.svg', import.meta.url).href
  }, {
    name: '用户画像',
    icon: new URL('../assets/UserIcon.svg', import.meta.url).href
  },
]);


const tabPosition = ref('left')
</script>


<template>
  <!-- 主布局页面 -->
  <div class="layout">
    <!-- 左侧边栏 -->
    <div :class="{ shrink: show }" class="left-layout">
      <!-- 左侧边栏上面logo -->
      <div class="logo-container">
        <img class="logo" src="../assets/H-logo.png" alt="" />
        <el-tooltip :show-after="1" :hide-after="1" class="box-item" effect="dark" content="收起边栏" placement="top-start">
          <div @click="show = !show" class="home-touchright">
            <img class="home-sides" src="../assets/Home-Sides.svg" alt="" />
          </div>
        </el-tooltip>
      </div>
      <!-- 这里是历史记录等内容 -->
      <div class="history-container">
        <!-- <div class="history-item">
          <div class="history-item-title">功能列表</div>
        </div> -->
        <!-- 历史记录和收藏的列表 -->
        <div class="left-container">
          <!-- 历史记录列表 -->
          <div class="left-half">
            <ul class="hiscolorf">
              <li @click="Listclick" class="HisColorr" v-for="(item, index) in list" :key="index">
                <img class="search_logo" :src="item.icon" alt="" />
                {{ item.name }}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
    <div class="riglt-layout">
      <!-- <div class="left-min-button" @click="Reduce">这个是缩小</div> -->
      <!-- 这个是定边栏 -->
      <div class="top-lan">
        <div v-if="show" class="right-logo">
          <!-- 这里可以更换为logo -->
          <img v-if="show" class="home-sides" src="../assets/logo.png" alt="" />
        </div>
        <el-tooltip class="box-item" :show-after="1" :hide-after="1" effect="dark" content="打开边栏" placement="top-start">
          <div v-if="show" @click="show = !show" class="top-one">
            <img v-if="show" class="home-sides" src="../assets/Home-Sides.svg" alt="" />
          </div>
        </el-tooltip>
        <!-- <div class="Right-Title">这个是标题</div> -->
        <div class="editor">
          <input type="text" value="哈哈哈哈" />
        </div>
        <div class="search">搜索</div>

        <div class="Userinfo">
          <el-avatar :icon="UserFilled" />
          <div class="username">
            {{ username }}
          </div>
        </div>
      </div>
      <div style="flex: 1;">
        <Search />
      </div>
    </div>
  </div>
</template>

<style scoped>
.Userinfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 35px;
}

.username {
  margin-left: 8px;
}

.demo-tabs {
  color: #020203;
  margin-top: 16px;
}

.editor {
  width: 300px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
  margin-left: 50px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.search {
  /* padding-top: 8px; */
  /* padding-right: 16px; */
  margin-left: 16px;
  cursor: pointer;
  border-radius: 8px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 15px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: black;
}

/* ------------- 直接在这里改颜色 ------------- */
/* 选中标签文字 + 下划线颜色 */
:deep(.custom-tab-color) .el-tabs__item.is-active {
  color: #000000 !important;
  /* 改这里 */
  font-weight: 600;
}

:deep(.custom-tab-color) .el-tabs__active-bar {
  background-color: #000000 !important;
  /* 改这里 */
}

/* 未选中文字颜色 */
:deep(.custom-tab-color) .el-tabs__item {
  color: #666;
}

/* 鼠标悬浮颜色 */
:deep(.custom-tab-color) .el-tabs__item:hover {
  color: #000000 !important;
}

.settings {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.settings-padding {
  overflow: hidden;
  width: 700px;
  box-sizing: border-box;
  height: 500px;
  background: var(--card);
  border-radius: 32px;
  padding: 25px;
  pointer-events: auto;
}

.username {
  margin-left: 8px;
}

.left-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.left-half {
  flex: 1;
}

.left-custom {
  cursor: pointer;
  display: flex;
  margin: 0;
  padding: 8px;
  padding-bottom: 8px;
  flex-shrink: 0;
  /* background-color: antiquewhite; */
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 8px;
  text-align: left;
  list-style: none;
  margin-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  color: #525252;
}

* {
  font-family: 'Arial', 'Microsoft YaHei', sans-serif;
}

.layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background: var(--bg);
}

html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.left-layout {
  width: 250px;
  margin-left: 0;
  height: 100%;
  transition: margin-left 0.4s, opacity 0.4s;
  background: var(--card);
  border-right: 0.2px solid var(--border);
  flex-shrink: 0;
  z-index: 880;
  display: flex;
  flex-direction: column;
}

.shrink {
  margin-left: -250px;
  opacity: 0;
  border-right: none;
}

.riglt-layout {
  flex: 1;
  min-width: 0;
  background: var(--card);
  padding-top: 18px;
  z-index: auto;
  flex-direction: column;
  display: flex;
  height: 100%;
}

.left-min-button {
  background: var(--card);
}

.logo-container {
  height: 30px;
  white-space: nowrap;
  display: block;
  margin: 0 auto;
  display: flex;
  margin: 20px;
}

.logo {
  left: 0px;
  /* height: 35px; */
  height: 28px;
  user-select: none;
  pointer-events: none;
}

.home-sides {
  /* padding: 5px; */
  width: 25px;
  height: 25px;
  border-radius: 80px;
  /* margin-left: auto; */
  cursor: pointer;
  margin-right: 0;
  text-align: right;
  user-select: none;
  pointer-events: none;
}

.search_logo {
  /* padding: 5px; */
  width: 18px;
  height: 18px;
  /* border-radius: 80px; */
  /* margin-left: auto; */
  cursor: pointer;
  text-align: right;
  user-select: none;
  pointer-events: none;
  margin-right: 6px;
}

.home-touchright {
  margin-left: 75px;
  width: 30%;
  display: flex;
  text-align: right;
  /* padding-right: 16px; */
  /* margin-right: 16px; */
}

.history-container {
  /* margin-top: 30px; */
  /* height: 100%; */
  flex-direction: column;
  display: flex;
  flex: 1;
}

.history-item-title {
  margin-left: 16px;
  color: #81858c;
  font-size: 14px;
}

.HisColorr {
  margin-top: 16px;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 8px;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
  list-style: none;
  font-size: 15px;
  background-color: #F2F3F4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.HisColor:hover,
.home-sides:hover,
.left-custom:hover {
  background-color: #F2F3F4;
  cursor: pointer;
}

.hiscolorf {
  padding: 0;
  /* background-color: black; */
}

.shrink .history-container {
  visibility: hidden;
  cursor: pointer;
}

.top-lan {
  /* cursor: pointer; */
  display: flex;
  margin: 0;
  /* padding-left: 16px; */
  padding-bottom: 2px;
  flex-shrink: 0;
  /* background-color: #81858c; */
}

.top-one {
  height: 38px;
  padding: 6px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #e5e5e5;
  cursor: pointer;
}

.right-logo {
  padding-top: 8px;
  padding-right: 16px;
  margin-left: 16px;
  cursor: pointer;
}

.Right-Title {
  margin-left: 16px;
  margin-top: 6px;
}

/* @media (max-width: 1200px) {
  .left-layout {
    display: none;
  }
} */
</style>
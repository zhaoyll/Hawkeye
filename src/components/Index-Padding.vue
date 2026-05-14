<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'



const router = useRouter()
const isActive = ref(false)
const show = ref(false)


const selected = ref('全网搜索')
const list = ref(['全网搜索', '抖音', '小红书', '微博', '知乎'])
// const goToLogin = () => router.push('/login')



const send = () => {
  router.push('/Search_Home')
}


</script>

<template>
  <div class="center-box">

    <div class="Right-Center">
      <img draggable="false" class="Right-logo" src="../assets/logo.png" alt="" />
      <div class="Right-center-title">使用快速模式开始对话</div>
    </div>
    <div class="Input-Div">
      <textarea class="search" type="text" placeholder="给 DeepSeek 发送消息"></textarea>
      <el-tooltip :show-after="1" :hide-after="1" class="box-item" effect="dark" content="先思考后搜索，完善关键词描述"
        placement="top-start">
        <div :class="{ active: isActive }" @click="isActive = !isActive" class="box">深度思考</div>
      </el-tooltip>
      <div class="select">
        <el-tooltip :show-after="1" :hide-after="1" class="box-item" effect="dark" content="需要搜索的平台"
          placement="top-start">
          <div @click="show = !show">{{ selected }}</div>
        </el-tooltip>
        <div v-show="show" class="options">
          <div v-for="item in list" @click="selected = item; show = false">
            {{ item }}
          </div>
        </div>
      </div>

      <!-- 发送按钮 -->
      <div class="send" @click="send">
        <img draggable="false" class="send-logo" src="../assets/sand.svg" alt="" />
      </div>
    </div>
  </div>



  <div></div>
</template>

<style scoped>
/* 父盒子：核心居中代码 */
* {
  font-family: 'Arial', 'Microsoft YaHei', sans-serif;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.select {
  width: 300px;
  position: relative;
  left: 110px;
  bottom: 50px;
  background-color: #020203;
  color: white;

}

.select>div {
  width: 100px;
  /* display: flex; */
  position: absolute;
  border-radius: 20px;
  padding: 8px 0px;
  border: 1px solid #020203;
  cursor: pointer;
  text-align: center;
  /* 文字居中 */
  margin-bottom: 16px;
  font-size: 14px;
  background-color: #020203;
  /* background: #fff; */

}

.select-xx {
  width: 100px;
  position: absolute;
  border-radius: 20px;
  padding: 8px 0px;
  border: 1px solid var(--border);
  cursor: pointer;
  text-align: center;
  margin-bottom: 16px;
  font-size: 14px;
  background-color: var(--card);
}

.options {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: var(--card);
  border: 1px solid var(--border);
  margin-bottom: 2px;
}

.options div {
  width: 100px;
  /* 每个选项固定 100px 宽 */
  padding: 8px 0px;
  text-align: center;
  /* 文字居中 */
  /* background: #fff; */
}

.center-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: #3964fe; */
}

.Right-logo {
  height: 25px;
  user-select: none;
  pointer-events: none;
}

.Right-center-title {
  margin-left: 16px;
  font-size: 20px;
  white-space: nowrap;
}

.Right-Center {
  display: flex;
  z-index: auto;
}

.search {
  padding: 8px;
  background-color: transparent;
  /* background-color: aqua; */
  z-index: auto;
  white-space: nowrap;
}

.Input-Div {
  width: 80vw;
  height: auto;
  position: relative;
  max-width: 750px;

  border-radius: 28px;
  margin-top: 32px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: auto;
}

textarea {
  padding: 16px !important;
  height: 150px;
  font-size: 16px;
  width: 100%;
  max-height: 500px;
  min-height: 50px;
  box-sizing: border-box;
  border: none;
  outline: none;
  resize: none;
  z-index: auto;
}

.send {
  /* 按钮最终大小：40px×40px（美观的悬浮按钮尺寸） */
  width: 40px;
  height: 40px;

  display: inline-flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */

  position: absolute;
  right: 0;
  bottom: 0;

  border: 1px solid var(--border);
  background-color: var(--primary);
  border-radius: 999px;
  /* 正圆 */

  cursor: pointer;
  user-select: none;

  /* 距离右下角间距 */
  margin: 0 12px 12px 0;
}

.send-logo {
  /* 图标大小 */
  width: 18px;
  height: 18px;

  /* 禁止交互 */
  user-select: none;
  pointer-events: none;
}

.deepseek {
  display: inline-block;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: 99px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-left: 12px;
  margin-bottom: 12px;
  cursor: pointer;
}

.box {
  display: inline-block;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: 99px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-left: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;

}

.box.active {
  user-select: none;
  display: inline-block;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 14px;
  border: 1px solid #020203;
  border-radius: 99px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-left: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: #020203;
  color: white;
}
</style>

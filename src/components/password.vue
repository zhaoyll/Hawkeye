<template>
    <div v-if="loginlayoutshow">
        <div class="title">修改密码</div>
        <div class="email">

            <input v-model="loginpuePhone" @focus="isFocus = true" @blur="isFocus = false" type="text" maxlength="11"
                placeholder="请输入手机号">
            <!-- <div class="phone">+86</div> -->
        </div>
        <div class="pass">
            <input v-model="reginputCode" class="code" type="text" maxlength="6" placeholder="请输入验证码">
            <div :class="{ infocode: disabled, infocode: true }" @click="!disabled && infocode()">{{ CodebuttonText }}
            </div>
        </div>
        <!-- <slide-verify :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" @success="onSuccess" @fail="onFail"
            @refresh="onRefresh"></slide-verify>
        <div>{{ msg }}</div> -->

        <!-- 登录按钮 -->
        <div @click="login" class="loginbutton">
            绑定
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// import SlideVerify from 'vue-monoplasty-slide-verify';
// Vue.use(SlideVerify);    
//获取登录页面的数据
const loginlayoutshow = ref(true)
const loginpuePhone = ref('') //邮箱
const reginputCode = ref('') //验证码

const CodebuttonText = ref('获取验证码')
const infocode = async () => {
    //获取验证码
    if (reginputEmail.value === '') {
        ElMessage.error('请输入邮箱')
    } else {
        if (isEmail(reginputEmail.value)) {

            if (disabled.value) return

            // 先请求
            try {
                const res = await fetch(globalData.value.Url + globalData.value.Send_Code, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: reginputEmail.value })
                })
                const data = await res.json()

                if (data.code === 200) {
                    ElMessage({
                        message: '请注意接收邮件验证码',
                        type: 'success',
                    })
                    // 请求成功后才开始倒计时
                    disabled.value = true
                    let seconds = 60
                    CodebuttonText.value = `${seconds}秒后重试`

                    timer = setInterval(() => {
                        seconds--
                        CodebuttonText.value = `${seconds}秒后重试`
                        if (seconds <= 0) {
                            clearInterval(timer)
                            disabled.value = false
                            CodebuttonText.value = '获取验证码'
                        }
                    }, 1000)
                } else {
                    ElMessage.error(data.message)
                }
            } catch (error) {
                ElMessage.error(error)
            }
        } else {/*  */
            ElMessage.error('邮箱格式错误')
        }
    }
} 
</script>

<style scoped>
.title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 25px;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.popup {
    background: var(--card);
    padding: 20px;
    border-radius: 8px;
    min-width: 200px;
}

.account-setting {
    background: var(--card);
    border-radius: 8px;
    overflow: hidden;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 16px;
    border-bottom: 1px solid #eee;
    font-size: 15px;
}

.setting-item:last-child {
    border-bottom: none;
}

.label {
    color: #333;
}

.right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.value {
    color: #666;
}

.link {
    color: #007aff;
    cursor: pointer;
}

.red-btn {
    border-radius: 999px;
    padding: 2px 20px;
    font-size: 15px;
}
</style>
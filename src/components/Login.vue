<script setup>
import { ref, h, inject, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

//获取登录页面的数据
const loginpueEmail = ref('') //邮箱
const loginputPass = ref('') //密码
//注册页面的数据
const reginputEmail = ref('') //邮箱
const reginputPass = ref('') //密码
const reginputPassw = ref('') //确认密码
const reginputCode = ref('') //确认密码
const globalData = inject('globalData') //获取App.vue里面保存的全局参数
const CodebuttonText = ref('获取验证码')
const disabled = ref(false)
const isFocus = ref(false) // 控制是否聚焦
const loginlayoutshow = ref(true)
const Registerlayoutshow = ref(false)
let timer = null

//Register_email

const isEmail = (reginputEmail) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reginputEmail)
}

const infocode = async () => {
  //获取验证码
  if (reginputEmail.value === '') {
    ElMessage.error('请输入邮箱')
  } else {
    if (isEmail(reginputEmail.value)) {

      if (disabled.value) return

      // 先请求
      try {
        const res = await fetch(globalData.value.UserUrl + globalData.value.Send_Code, {
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



//注册账号
const Register = async () => {
  //判断邮箱是否输入
  const inputs = {
    reginputEmail: reginputEmail.value,
    reginputPass: reginputPass.value,
    reginputPassw: reginputPassw.value,
    reginputCode: reginputCode.value
  }

  switch (true) {
    case !reginputEmail.value:
      ElMessage.error('请输入邮箱')
      break
    case !isEmail(reginputEmail.value):
      ElMessage.error('邮箱格式错误')
      break
    case !reginputPass.value:
      ElMessage.error('请输入密码')
      break
    case reginputPass.value.length < 6:
      ElMessage.error('密码长度不能小于6位')
      break
    case reginputPass.value !== reginputPassw.value:
      ElMessage.error('两次输入的密码不一致')
      break
    case !reginputCode.value:
      ElMessage.error('请输入验证码')
      break
    default:
      try {
        const response = await fetch(globalData.value.UserUrl + globalData.value.Register_email, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: reginputEmail.value,
            verification_code: reginputCode.value,
            password: reginputPass.value,
            username: "未设置昵称",
          })
        })
        const data = await response.json()
        if (data.code === 200) {
          ElMessage({
            message: '注册成功',
            type: 'success',
          })
          loginlayoutshow.value = true
          Registerlayoutshow.value = false
          loginpueEmail.value = reginputEmail.value
          loginputPass.value = reginputPass.value
        } else {
          ElMessage.error(data.message)
        }
      } catch (error) {
        ElMessage.error(error)
      }
  }
}
// }

const login = async () => {

  switch (true) {
    case !loginpueEmail.value:
      ElMessage.error('请输入邮箱')
      break
    case !loginputPass.value:
      ElMessage.error('请输入密码')
      break
    default:
      try {
        const res = await fetch(globalData.value.UserUrl + globalData.value.loginUser, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginpueEmail.value,
            password: loginputPass.value
          })
        })

        const data = await res.json()
        console.log(data)
        if (data.code === 200) {
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          const token = data.data.token
          const username = data.data.user_info.nickname
          const phone = data.data.user_info.phone
          const userid = data.data.user_info.user_id
          const timestamp = data.timestamp

          console.log(data.data.user_info.nickname)

          router.push('/')
          document.cookie = "token=" + token + "; path=/; max-age=86400"
          localStorage.setItem('token', token)
          localStorage.setItem('username', username)
          localStorage.setItem('phone', phone)
          localStorage.setItem('userid', userid)
          localStorage.setItem('loginpueEmail', loginpueEmail.value)
          localStorage.setItem('userid', userid)
          localStorage.setItem('timestamp', timestamp)

        } else {
          ElMessage.error(data.message)
        }

      } catch (error) {
        console.log(error)
        ElMessage.error(error)
      }

  }








}

const Forget = async () => {
  ElMessage('还没写好')
}
</script>

<template>
  <div class="layout">
    <img class="logo" src="../assets/H-logo.png" alt="" />
    <!-- 登录部分 -->
    <div v-if="loginlayoutshow">
      <div class="email">
        <input v-model="loginpueEmail" @focus="isFocus = true" @blur="isFocus = false" type="text" maxlength="30"
          placeholder="请输入邮箱">
        <!-- <div class="phone">+86</div> -->
      </div>
      <div class="pass">
        <input v-model="loginputPass" class="passinput" type="password" maxlength="20" placeholder="请输入密码">
      </div>
      <div class="agreement">
        注册登录即代表已阅读并同意我们的
        <a href="/user-agreement" class="link" target="_blank">用户协议</a>
        与
        <a href="/privacy-policy" class="link" target="_blank">隐私政策</a>，
      </div>
      <div class="userinfo">
        <div class="userinfopass" @click="Forget">
          <div style="cursor: pointer;">忘记密码</div>
        </div>
        <div class="userinfouser" @click="loginlayoutshow = !loginlayoutshow; Registerlayoutshow = !Registerlayoutshow">
          <div style="cursor: pointer;">注册账号</div>
        </div>
      </div>
      <!-- 登录按钮 -->
      <div @click="login" class="loginbutton">
        登录
      </div>
    </div>
    <!-- 注册部分 -->
    <div v-if="Registerlayoutshow">
      <div class="email">
        <input v-model="reginputEmail" @focus="isFocus = true" @blur="isFocus = false" type="email" maxlength="30"
          placeholder="请输入邮箱">
        <!-- <div class="phone">+86</div> -->
      </div>
      <div class="pass">
        <input v-model="reginputPass" class="passinput" type="password" maxlength="20" placeholder="请输入密码">
      </div>
      <div class="pass">
        <input v-model="reginputPassw" class="passinput" type="password" maxlength="20" placeholder="请再次输入密码">
      </div>
      <div class="pass">
        <input v-model="reginputCode" class="code" type="text" maxlength="6" placeholder="请输入验证码">
        <div :class="{ infocode: disabled, infocode: true }" @click="!disabled && infocode()">{{ CodebuttonText }}</div>
      </div>
      <div class="agreement">
        注册登录即代表已阅读并同意我们的
        <a href="/user-agreement" class="link" target="_blank">用户协议</a>
        与
        <a href="/privacy-policy" class="link" target="_blank">隐私政策</a>，
      </div>
      <!-- 登录按钮 -->
      <div @click="Register" class="loginbutton">
        注册
      </div>
      <div @click="loginlayoutshow = !loginlayoutshow; Registerlayoutshow = !Registerlayoutshow" class="userinfo">
        <div style="cursor: pointer;text-align: center;">返回登录</div>
      </div>
    </div>
  </div>

</template>

<style>
* {
  font-family: 'Arial', 'Microsoft YaHei', sans-serif;
}

:root {
  --border: #E0E1E1;
  --black: black;
  --blue: black;
  --font-black: #ffffff;
}

.disabled {
  pointer-events: none;
  opacity: 0.6;
}

/* 外层盒子样式 */
.input-box {
  width: 300px;
  border: 2px solid var(--border);
  /* 默认灰色边框 */
  border-radius: 6px;
  padding: 8px 12px;
  transition: border-color 0.2s ease;
  /* 平滑过渡 */
}



.link {
  font-size: 13px;
  color: black;
  text-decoration: underline;
  cursor: pointer;
}

.agreement {
  margin-top: 15px;
  width: 350px;
  font-size: 13px;
  color: #81858C;
}

.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.infocode {
  width: 150px;
  text-align: center;
  font-size: 13px;
  color: var(--blue);
  border-left: 1px solid #e5e5e5;
  cursor: pointer;
}

.logo {
  height: 45px;
  margin-bottom: 40px;
}

.email {
  width: 350px;
  height: 45px;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 99px;
  display: flex;
  align-items: center;
}

.pass {
  width: 350px;
  height: 45px;
  margin-top: 20px;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 99px;
  display: flex;
  align-items: center;
}

.phone {
  margin-left: 16px;
  margin-right: 12px;
  font-size: 15px;

}

input {
  border: none;
  width: 100%;
  margin-left: 16px;
  background: transparent;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;

}

input:focus {
  outline: none;
  background-color: transparent;

}

.loginbutton {
  width: 350px;
  height: 45px;
  margin-top: 25px;
  display: flex;
  align-items: center;
  border-radius: 99px;
  background-color: var(--primary);
  color: white;
  justify-content: center;
}

.userinfo {
  width: 330px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  border-radius: 99px;
  color: var(--blue);
  font-size: 14px;
}

.userinfopass {
  flex: 1;
}

.userinfouser {
  flex: 1;
  text-align: right;
}
</style>

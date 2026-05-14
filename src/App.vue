<script setup>
import './style.css';
import { ref, provide, onMounted } from 'vue'
import { setGlobalTheme } from './composables/useTheme'


const username = ref(localStorage.getItem('username') || '未登录')
provide('username', username)

const phone = ref(localStorage.getItem('phone') || '')
provide('phone', phone)

const globalData = ref({
  Url: 'http://yyfx.xiaobaibubai.com/',
  UserUrl: 'http://dc.system.xiaobaibubai.com/',
  Send_Code: 'api/auth/send-email-code',
  Register_email: 'api/auth/register-email',
  ExitUser: 'api/auth/logout',
  SetName: 'api/user/nickname',
  loginUser: 'api/auth/login-email'
})
provide('globalData', globalData)



onMounted(() => {
  const theme = localStorage.getItem('theme') || 'system'
  setGlobalTheme(theme)
})
</script>

<template>
  <router-view />
</template>
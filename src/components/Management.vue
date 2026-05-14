<script setup>
import { ElButton } from 'element-plus'
import { ref, inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import Phonesetting from './Phoneset.vue';
import Phoneset from './Phoneset.vue';
import password from './password.vue';
const router = useRouter()
const globalData = inject('globalData') //获取App.vue里面保存的全局参数
const userEmail = localStorage.getItem('loginpueEmail')
const timestampp = localStorage.getItem('timestamp')
const tokenp = localStorage.getItem('token')
const username = inject('username')
const show = ref(false)

const handleChangePhone = () => {
    console.log('变更手机号')

}

const handleBindWechat = () => {
    ElMessageBox.prompt('输入您的昵称', '修改昵称', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        // inputPattern:
        //     /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '请输入邮箱',
    })
        .then(async ({ value }) => {
            try {
                const res = await fetch(globalData.value.Url + globalData.value.SetName, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Token': tokenp,
                        'X-Timestamp': timestampp
                    },
                    body: JSON.stringify({
                        nickname: value,
                    })
                })
                const dataa = await res.json()
                console.log(dataa)
                if (dataa.code === 200) {
                    username.value = value
                    ElMessage.success('修改完成')
                    localStorage.setItem('username', value)
                } else {

                    ElMessage.error("修改失败" + dataa.msg)
                }
            } catch (error) {
                ElMessage.error(error.message)
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Input canceled',
            })
        })
}

const handleDeleteAccount = () => {
    ElMessageBox.prompt('如非误触请输入您的邮箱确认注销账号', '注销账号提醒', {
        confirmButtonText: '注销',
        cancelButtonText: '我还想用',
        inputPattern:
            /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '请输入邮箱',
    })
        .then(async ({ value }) => {
            if (value === userEmail) {
                try {
                    const res = await fetch(globalData.value.Url + globalData.value.ExitUser, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            token: tokenp,
                            timestamp: timestampp
                        })
                    })
                    const data = await res.json()
                    console.log(data)
                    if (data.code === 200) {
                        ElMessage.success('注销成功')
                        router.push('/login')
                    }
                } catch (error) {
                    ElMessage.error(error.message)
                }
            } else {
                ElMessage.error('邮箱错误,请重新验证！')
            }
        })
        .catch(() => {
            // ElMessage({
            //     type: 'info',
            //     message: 'Input canceled',
            // })
        })
    console.log('注销账号')
}
const ExitLogin = () => {
    localStorage.clear()
    router.push('/login')
    ElMessage({
        message: '登出成功',
        type: 'success',
    })
}

const phone = ref("")
const isLogin = !!localStorage.getItem('token')
if (isLogin) {
    // username.value = localStorage.getItem('username')
    if (localStorage.getItem('phone') === "null") {
        // phone.value = "未绑定"
    } else {
        phone.value = localStorage.getItem('phone')
    }

} else {
    router.push('/login')
}
</script>

<template>
    <div v-if="show" class="mask" @click="show = false">
        <div class="popup" @click.stop>
            <phoneset />
        </div>
    </div>

    <!-- <div v-if="password" class="mask" @click="password = false">
        <div class="popup" @click.stop>
            <password />
        </div>
    </div> -->

    <div class="account-setting">

        <div class="setting-item">
            <span class="label">用户昵称</span>
            <div class="right">
                <span class="value">{{ username }}</span>
                <span class="link" @click="handleBindWechat">修改</span>
            </div>
        </div>
        <!-- 
        <div class="setting-item">
            <span class="label">手机号码</span>
            <div class="right">
                <span class="value">{{ phone }}</span>
                <span class="link" @click="show = true">绑定</span>
            </div>
        </div> -->
        <!-- 
        <div class="setting-item">
            <span class="label">密码</span>
            <div class="right">
                <span class="value">{{ phone }}</span>
                <span class="link" @click="password = true">修改密码</span>
            </div>
        </div> -->

        <div class="setting-item">
            <span class="label">注销账号</span>
            <div class="right">
                <button class="view-btn" @click="handleDeleteAccount">注销</button>
                <!-- <div type=" round" plain class="red-btn" @click="handleDeleteAccount">
                    注销
            </div> -->
            </div>
        </div>

        <div class="setting-item">
            <span class="label">退出登录</span>
            <div class="right">
                <button class="view-btn" @click="ExitLogin">退出</button>
                <!-- <div type="round" plain class="red-btn" @click="ExitLogin">
                    退出
                </div> -->
            </div>
        </div>


    </div>
</template>

<style scoped>
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
    color: #383836;
    cursor: pointer;
    text-decoration: none;
}

.red-btn {
    border-radius: 999px;
    font-size: 13px;
    background-color: #E0E0E0;
    padding: 6px 20px 6px 20px;
}

html.dark {
    filter: invert(1) hue-rotate(180deg);
}

html.light {
    filter: none;
}
</style>
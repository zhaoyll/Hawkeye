<template>
    <div style="padding: 25px;">
        <!-- 内容 -->
        <div style="font-size: 25px;">搜索结果</div>
        <div style="font-size: 15px;color: #706D6F;margin-top: 15px;">找到相关评论12,543条</div>
        <div>
            <ul>
                <li v-for="(item, index) in GongNenglist" :key="index" class="HisColor"
                    :class="{ active: selectedIndex === index }" @click="handleSelect(index, item)">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div class="Portrait">
            用户画像区域
            <div style="display: flex;margin-top: 16px;">
                <div style=" min-width: 0;padding-right: 16px;width: 30%;min-width: 330px;">
                    <div style="font-size: 14px;color: #3D3D3D;">关键词匹配度</div>
                    <div style="font-size: 45px;color: #09B850;font-weight: bold;margin: 8px;">92%</div>
                    <div style="font-size: 14px;color: #3D3D3D;">搜索词:旅行vlog拍摄技巧</div>
                    <div style="font-size: 14px;color: #3D3D3D;margin-top: 8px;">匹配词库:蜡笔小新手办、IP玩具、日漫周边、儿童礼物、桌面摆件、IP授权产品
                    </div>
                </div>
                <div style="width: 1px;background-color: #D8D8D8;"></div>
                <div style=" min-width: 0;padding-right: 16px;padding-left: 16px;">
                    <div style="font-size: 14px;color: #3D3D3D;">关键词云</div>
                    <ul>
                        <li v-for="(item, index) in Tokenlist" :key="index" class="TokenColor"
                            :class="{ active: selectedIndex === index }" @click="handleSelect(index, item)">
                            {{ item.name }}
                        </li>
                    </ul>
                </div>

            </div>
            <div style="height: 1px;background-color: #D8D8D8;margin-top: 16px;"></div>
            <div style="font-size: 14px;color: #3D3D3D;margin-top: 16px;">用户需求洞察</div>
            <div style="padding-left: 16px;color: black;">
                <div style="font-size: 15px;margin-top: 8px;">主要需求：啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                <div style="font-size: 15px;margin-top: 8px;">潜在需求：啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                <div style="font-size: 15px;margin-top: 8px;">用户痛点：啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <ul>
                <li v-for="(item, index) in Userlist" :key="index" class="UserHisColor"
                    :class="{ active: UserlistIndex === index }" @click="UserlistSelect(index, item)">
                    {{ item.name }}
                </li>
            </ul>
            <div style="display: flex;">
                <div style="margin-right: 16px; display: flex; justify-content: flex-end; align-items: center;">
                    <el-switch v-model="value" active-text="显示视频信息" />
                </div>
                <div class="TokenColor">一键私信</div>
                <div class="TokenColor">导出表格</div>
            </div>
        </div>
        <div class="Comment">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="视频封面" width="100">
                    <template #default="{ row }">
                        <img :src="row.Cover" style="width: 55px; height: 55px; border-radius: 8px;" />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="视频标题" />
                <el-table-column label="视频作者">
                    <template #default="{ row }">
                        <div style="display: flex;flex-direction: row;">
                            <img :src="row.Cover" style="width: 35px; height: 35px; border-radius: 50%;" />
                            <div style="margin-left:8px;display: flex;flex-direction: column;">
                                <div style="font-size: 15px;font-weight: bold;">作者名称</div>
                                <div style="color: #8C8C8C;">粉丝1.2w</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="互动数据">
                    <template #default="{ row }">
                        <div style="display: flex;flex-direction: row;text-align: center;">
                            <img src="../assets/Platform/Like.png"
                                style="width: 18px; height: 20px;padding-top: 2px;" />
                            <div style="color: #8C8C8C;font-size: 17px;color: black;">150</div>
                            <img src="../assets/Platform/Mas.png"
                                style="width: 18px; height: 20px;padding-top: 2px;margin-left: 20px;" />
                            <div style="color: #8C8C8C;font-size: 17px;color: black;">150</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="平台" width="100">
                    <template #default="{ row }">
                        <img :src="row.avatar" style="width: 40px; height: 40px; border-radius: 50%;" />
                    </template>
                </el-table-column>
                <el-table-column label="精准度" width="100">
                    <template #default="{ row }">
                        <div style="color: #09B850; font-size: 20px; font-weight: 500;">
                            {{ row.Precision }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <div class="TokenColor">查看来源</div>
                        <div class="TokenColor">查看评论</div>
                        <div class="TokenColor">一键私信</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, onUnmounted } from 'vue';
import tiktokImg from '../assets/Platform/Tiktok.png'
import redbookImg from '../assets/Platform/RedBook.png'
import weiboImg from '../assets/Platform/Weibo.png'
import zhihuImg from '../assets/Platform/Zhihu.png'

const value = ref(true)

const tableData = ref([
    {
        Cover: 'https://p3-sign.douyinpic.com/tos-cn-i-dy/0832442d70374be0a8083938c16a18cc~tplv-dy-resize-walign-adapt-aq:540:q75.jpeg?lk3s=138a59ce&x-expires=1779987600&x-signature=wloLeAVdj7JYL%2F3pnp71G46dtEY%3D&from=327834062&s=PackSourceEnum_AWEME_DETAIL&se=false&sc=cover&biz_tag=aweme_video&l=20260515013407B622B20152CBA1042A4B',
        name: '原创末日故事连载【归墟】第一集-失踪',
        address: '泫九',
        avatar: tiktokImg,
        Precision: "99%"

    }, {
        Cover: 'https://p3-sign.douyinpic.com/tos-cn-i-dy/0832442d70374be0a8083938c16a18cc~tplv-dy-resize-walign-adapt-aq:540:q75.jpeg?lk3s=138a59ce&x-expires=1779987600&x-signature=wloLeAVdj7JYL%2F3pnp71G46dtEY%3D&from=327834062&s=PackSourceEnum_AWEME_DETAIL&se=false&sc=cover&biz_tag=aweme_video&l=20260515013407B622B20152CBA1042A4B',
        name: '原创末日故事连载【归墟】第一集-失踪',
        address: '泫九',
        avatar: tiktokImg,
        Precision: "99%"

    }, {
        Cover: 'https://p3-sign.douyinpic.com/tos-cn-i-dy/0832442d70374be0a8083938c16a18cc~tplv-dy-resize-walign-adapt-aq:540:q75.jpeg?lk3s=138a59ce&x-expires=1779987600&x-signature=wloLeAVdj7JYL%2F3pnp71G46dtEY%3D&from=327834062&s=PackSourceEnum_AWEME_DETAIL&se=false&sc=cover&biz_tag=aweme_video&l=20260515013407B622B20152CBA1042A4B',
        name: '原创末日故事连载【归墟】第一集-失踪',
        address: '泫九',
        avatar: tiktokImg,
        Precision: "99%"

    }, {
        Cover: 'https://p3-sign.douyinpic.com/tos-cn-i-dy/0832442d70374be0a8083938c16a18cc~tplv-dy-resize-walign-adapt-aq:540:q75.jpeg?lk3s=138a59ce&x-expires=1779987600&x-signature=wloLeAVdj7JYL%2F3pnp71G46dtEY%3D&from=327834062&s=PackSourceEnum_AWEME_DETAIL&se=false&sc=cover&biz_tag=aweme_video&l=20260515013407B622B20152CBA1042A4B',
        name: '原创末日故事连载【归墟】第一集-失踪',
        address: '泫九',
        avatar: tiktokImg,
        Precision: "99%"

    },
])
const selectedIndex = ref(0)
const UserlistIndex = ref(0)

const GongNenglist = ref([
    { name: '综合分析', type: 'analysis' },
    { name: '最新', type: 'latest' },
    { name: '最热', type: 'hot' }
])

const Userlist = ref([
    { name: '全部用户', type: 'analysis' },
    { name: '精准用户', type: 'latest' },
    { name: '潜在用户', type: 'hot' },
    { name: '一般用户', type: 'hot' },
])

const Tokenlist = ref([
    { name: '士大夫是', type: 'analysis' },
    { name: 'sd发额外', type: 'latest' },
    { name: '士大夫', type: 'hot' },
    { name: '士大夫是', type: 'analysis' },
    { name: 'sd发额外', type: 'latest' },
    { name: '士大夫', type: 'hot' },
])

const handleSelect = (index, item) => {
    selectedIndex.value = index
    // 执行其他代码
    console.log('选中了：', item.name, item.type)
    // 例如：加载不同数据
    loadData(item.type)
}

const UserlistSelect = (index, item) => {
    UserlistIndex.value = index
    // 执行其他代码
    console.log('选中了：', item.name, item.type)
    // 例如：加载不同数据
    loadData(item.type)
}

const loadData = (type) => {
    // 根据类型加载数据
    console.log('加载类型：', type)
}
</script>

<style>
.Comment {
    width: 100%;
    padding: 0;
    margin: 0;
    height: 500px;
    margin-top: 16px;
    /* background-color: black; */
}

.Portrait {
    background-color: #FFFFFF;
    border: 1px solid #e5e5e5;
    border-radius: 16px;
    padding: 16px;
    margin-top: 16px;
}

.TokenColor {
    display: inline-block;
    width: auto;
    padding: 10px 16px 10px 16px;
    margin-top: 8px;
    border-radius: 8px;
    list-style: none;
    font-size: 13px;
    background-color: #F3F3F2;
    margin-right: 16px;
    /* border: 1px solid #e5e5e5; */
}

.HisColor {
    display: inline-block;
    width: auto;
    padding: 10px 16px 10px 16px;
    margin-top: 32px;
    border-radius: 8px;
    list-style: none;
    font-size: 13px;
    background-color: #FBFBFB;
    margin-right: 16px;
    border: 1px solid #e5e5e5;
    cursor: pointer;
}

.HisColor.active {
    cursor: pointer;
    display: inline-block;
    width: auto;
    padding: 10px 16px 10px 16px;
    margin-top: 32px;
    border-radius: 8px;
    list-style: none;
    font-size: 13px;
    background-color: #F3F3F2;
    margin-right: 16px;
}


.UserHisColor {
    cursor: pointer;
    display: inline-block;
    width: auto;
    padding: 10px 16px 10px 16px;
    margin-top: 32px;
    border-radius: 8px;
    list-style: none;
    font-size: 13px;
    background-color: #FBFBFB;
    margin-right: 16px;
    border: 1px solid #e5e5e5;
}

.UserHisColor.active {
    cursor: pointer;
    display: inline-block;
    width: auto;
    padding: 10px 16px 10px 16px;
    margin-top: 32px;
    border-radius: 8px;
    list-style: none;
    font-size: 13px;
    color: white;
    background-color: black;
    margin-right: 16px;
}


ul {
    padding-left: 0;
    margin: 0;
    list-style: none;
}
</style>
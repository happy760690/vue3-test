<!--
 * @Author: xie bin
 * @Date: 2020-07-21 12:26:10
 * @LastEditTime: 2021-05-08 10:53:51
 * @LastEditors: Please set LastEditors
 * @Description: 菜单
 * @FilePath: /webapp_huijian/src/components/NavMenu.vue
-->
<template>
<!--1、无限循环导航，需要引用sub-menu-item组件
  2、导航内容直接在本组件内进行请求
  3、currenIndex根据后台返回进行动态设置，防止刷新时候丢失当前导航选种样式
  4、导航结构是ul和li结构，由于新封装了一个子组件，所以ul下面不再是紧跟li，设置的mode为无效的，
  使用el-container组件进行横向排列，同时给一个属性让导航自动换行 flex-flow: row wrap;-->
<div
    ref="bkMenu"
    :class="{'menu-wrapper mount-menu-wrapper': mounting, 'menu-wrapper': !mounting}">
    <div style="position: relative;">
        <el-menu
            ref="elMenu"
            :default-active="currenIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="selectMenu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-container>
                <sub-menu-item
                    v-for="(menu, index) in menuList"
                    :key="index + ''"
                    :item="menu"
                    v-bind:menuLevel='2'></sub-menu-item>
            </el-container>
        </el-menu>
    </div>
</div>
</template>

<script>
import SubMenuItem from './SubMenuItem';
import {
    mapState
} from 'vuex';
import commonApi from '../api/common';
export default {
    name: 'backend-menu',
    data() {
        return {
            menuList: [], // 导航数组
            trackInfo: {}, // 埋点信息
            mounting: true, // 是否正在加载中
            activeIndex: '' // 导航当前选中项
        };
    },
    components: {
        SubMenuItem
    },
    mounted() {
        this.getData();
    },
    computed: {
        ...mapState({
            trackInfos: state => state.trackInfos,
            backendApi: state => state.backendApi
        }),
        currenIndex() {
            return this.activeIndex;
        }
    },
    methods: {
        // 页面初始化
        async getData() {
            try {
                let result = await commonApi.getMenu();
                if (result.code === 0) {
                    // 获取导航信息
                    this.menuList = result.data.menu;
                    this.$nextTick(() => {
                        // 计算导航栏的高度，传给父组件，用于动态赋值center的paddingTop值
                        this.$emit('getHeight', this.$refs.bkMenu.offsetHeight);
                        // 导航当前选中项
                        this.activeIndex = result.data.active;
                        this.mounting = false;
                    });
                }
            } catch (error) {}
        },
        // 点击导航事件
        selectMenu(index, keyPath) {
            // 拿到选中项的菜单中的is_out_url字段，判断跳转方式
            let menuObj = JSON.parse(index);
            let isOut = menuObj ? menuObj.is_out_url : 2;
            let type = menuObj.type;
            if (type.toString() == '3') {
                // 如果为3，则在本页面跳转
                this.$router.push({
                    path: menuObj.menu_url
                });
            } else {
                window.location.href = menuObj.menu_url;
            }
        }
    }
};
</script>

<style scoped>
.menu-wrapper>>>.el-menu {
    padding: 0 10px;
}

.mount-menu-wrapper {
    min-height: 57px;
    background-color: rgb(84, 92, 100);
}

.menu-wrapper>>>.el-container {
    flex-flow: row wrap;
}

.menu-wrapper>>>.el-container {
    outline: 0;
}
</style>

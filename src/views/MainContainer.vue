<!--
 * @Author: xie bin
 * @Date: 2020-07-10 09:41:03
 * @Description: 
 * @FilePath: /webapp_huijian/src/views/MainContainer.vue
--> 
<!--
    @name: 主页面
    @description: 处顶部header外的主要页面内容
    @author: hewei
    @date: 2020-05-27
-->
<template>
<div class="menu-warper">
    <div
        class="menu-container"
        v-if="$route.meta.menu !== 'hide'">
        <NavMenu
            :class="{'backend-menu-box fixTop': isFixed, 'backend-menu-box': !isFixed}"
            ref="backMenu"></NavMenu>
    </div>
    <router-view
        class="main-center"
        ref="mainView" />
</div>
</template>

<script>
import NavMenu from '../components/NavMenu';
export default {
    name: 'MainContainer',
    components: {
        NavMenu,
    },
    data() {
        return {
            headHeight: 50, // 头部高度，由于长期不变化，不用动态获取
            isFixed: false, // 是否固定导航标志位初始化
        }
    },
    mounted() {
        window.addEventListener('scroll', this.fixMenu)
    },
    methods: {
        // 固定导航位置
        fixMenu() {
            // 获取页面滚动高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop >= this.headHeight) {
                this.isFixed = true
            } else {
                this.isFixed = false
            }
        },
    }
}
</script>

<style lang="less" scoped>
.menu-warper {
    position: relative;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    // padding-bottom: 116px;
}

.menu-container {
    min-height: 57px;
}

.backend-menu-box {
    width: 100%;
}

.fixTop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
}
</style>

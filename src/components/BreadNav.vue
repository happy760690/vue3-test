<!--
 * @Author: xie bin
 * @Date: 2020-07-29 09:54:39
 * @LastEditTime: 2021-05-08 10:53:42
 * @LastEditors: Please set LastEditors
 * @Description: 面包屑组件
 * @FilePath: /webapp_huijian/src/components/BreadNav.vue
--> 
<template>
<div class="bread-box">
    <!--面包屑导航-->
    <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="bread-nav">
        <el-breadcrumb-item :to="{ path: '/home/home' }">
            <!-- <a href="/">首页</a> -->
            首页
        </el-breadcrumb-item>
        <template v-for="(item, index) in breadArrList">
            <el-breadcrumb-item
                v-if="item.toPath"
                :key="index"
                :to="{ path: item.toPath }">
                {{ item.breadText }}
            </el-breadcrumb-item>
            <el-breadcrumb-item
                v-else
                :key="index">
                {{ item.breadText }}
            </el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
    props: {
        // 面包屑数据
        breadArrList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {};
    },
};
</script>

<style>
</style>

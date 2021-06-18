<!--
 * @Name: 面包屑组件
 * @Description: 面包屑组件
 * @Author: xueshuai
 * @Date: 2021-05-10 10:28:24
 * @Editors: xueshuai
-->

<template>
    <div class="bread-box">
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-nav">
            <el-breadcrumb-item>
                <a href="/">首页</a>
                <!-- 首页 -->
            </el-breadcrumb-item>
            <template v-for="(item, index) in breadArrList">
                <el-breadcrumb-item
                    v-if="item.toPath"
                    :key="index"
                    :to="{ path: item.toPath }"
                >
                    {{ item.breadText }}
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else :key="item.toPath">
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

<style lang="scss" scoped>
.bread-box {
    margin-top: 5px;
    background: #fff;
    padding: 10px 20px;
}
</style>

<!--
 * @Description: 列表页面
 * @Author: Mingjuan
 * @Date: 2021-06-02 19:10:51
 * @Editors: Mingjuan
-->
<template>
    <div v-show="haveAuthority" class="friends-introduce-manage-wrap">
        <!-- 面包屑 -->
        <BreadNav :breadArrList="breadListData"></BreadNav>
        <!-- 主要内容 -->
        <div class="content-wrap">
            <!-- 内容 -->
            <friends-introduce-list @changeAuthority="changeAuthority"></friends-introduce-list>
        </div>
    </div>
</template>
<script>
import BreadNav from "../../../components/BreadNav";
import friendsIntroduceList from "./components/friendsIntroduceList.vue"

export default {
    data() {
        return {
            // 面包屑
            breadListData: [{
                breadText: "友介管理",
                toPath: ""
            }],
            haveAuthority: false, // 用于权限判断
        }
    },
    components: {
        BreadNav,
        friendsIntroduceList
    },
    methods: {
        /**
         * @description: 更改权限
         * @param {Boolean} res
         * @return {*}
         */        
        changeAuthority(res) {
            this.haveAuthority = res;
        }
    }
};
</script>
<style lang="scss" scoped>
.friends-introduce-manage-wrap {
    font-size: 14px;

    .content-wrap {
        padding: 10px 20px;
    }

}
</style>

<!--
 * @Author: xie bin
 * @Date: 2020-07-21 12:26:10
 * @Description: 顶部栏
 * @FilePath: /webapp_huijian/src/components/HeaderBar.vue
-->
<template>
<div class="jl-header-warper">
    <div class="jl-header">
        <div class="jl-header-left">
            <a :href="logoninfo.menuUrl">
                <img src="../assets/images/logo.png" alt="" class="jl-respoinsive" />
            </a>
            <span class="jl-icon-text">欢迎登录居理买房网cms系统</span>
        </div>
        <div class="jl-header-right">
            <div class="jl-user-content">
                <i class="el-icon-user">
                    <ul
                        class="jl-selectdwon"
                        v-if="userinfo.length">
                        <li
                            v-for="(list, index) in userinfo"
                            :key="index">
                            <a :href="list.menuUrl">{{ list.menuName }}</a>
                        </li>
                    </ul>
                </i>
                <span class="jl-username">{{
                        this.username.employeeName
                    }}</span>
                <span class="jl-userroles-wrap" v-if="roleList.length > 1">
                    <el-menu
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="changeRole">
                        <el-submenu index="1">
                            <template slot="title">{{
                                    this.username.roleName
                                }}</template>
                            <el-menu-item
                                v-for="(elm, index) in roleList"
                                :key="index"
                                :index="elm.key">
                                {{ elm.value }}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </span>
                <a class="jl-quit" :href="quit.menuUrl">
                    {{ quit.menuName }}
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import apiObj from "@/api/common";
export default {
    name: "headerBar",
    data() {
        return {
            userListObj: null,
            username: "", // 用户名
            userinfo: [], // 用户下拉菜单
            quit: {}, // 退出用户
            logoninfo: {}, // logo
            // 角色列表
            roleList: [],
            // 角色信息
            roleInfo: {
                role: "",
                jobs: "",
            },
        };
    },
    mounted() {
        this.getheaderInfo();
        this.getRoleList();
    },
    computed: {
        ...mapState(["trackInfos"]),
    },
    methods: {
        async getheaderInfo() {
            try {
                let result = await apiObj.getUserInfo();
                if (result.code === 0) {
                    let resdata = result.data;
                    this.userListObj = result.data;
                    this.username = resdata.userInfo;
                    this.userinfo = resdata.personInfo;
                    this.quit = resdata.logout;
                    this.logoninfo = resdata.logo;
                    let roleInfo = {
                        role: resdata.userInfo.role,
                        jobs: resdata.userInfo.cityName,
                    };
                    this.roleInfo = roleInfo;
                    this.$store.dispatch("USER_LOGIN", this.username || []);
                }
            } catch (error) {
                console.log(error);
            }
        },
        // 获取角色列表
        async getRoleList() {
            try {
                let result = await apiObj.getRoleListData();
                if (result.code === 0) {
                    // 将角色列表数据方式 vuex state 的 roleList;
                    this.$store.dispatch("ROLE_LIST", result.data.data || []);
                    this.roleList = result.data.data || [];
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: 切换角色
         * @param {string} key角色权限
         * @return:
         */
        async changeRole(key) {
            if (key === this.roleInfo.role) {
                return;
            }
            let newRole = key;
            let params = {
                role_name: newRole,
            };
            let result = await apiObj.changeRoleListData(params);
            if (result.code === 0) {
                this.roleInfo.role = newRole;
                window.location.href = result.data.url;
            }
        },
    },
};
</script>

<style scoped>
.icon-header {
    position: relative;
}

.jl-header-warper {
    background-color: #fff;
}

.jl-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px;
    height: 50px;
}

.jl-header-left .jl-icon-text {
    font-size: 15px;
    line-height: 50px;
    margin-left: 10px;
    color: #888;
}

.icon-header {
    font-size: 20px;
    color: #8a9aad;
    margin-left: 12px;
    vertical-align: middle;
    text-decoration: none;
}

.jl-header-left a {
    display: inline-block;
}

.jl-username:after {
    content: "";
    position: absolute;
    top: 1px;
    right: -3px;
    height: 15px;
    width: 2px;
    background-color: #7a8897;
}

.jl-header-left .jl-respoinsive {
    vertical-align: middle;
    width: 134px;
}

.jl-username,
.jl-quit,
.jl-datework {
    font-size: 14px;
    color: #7a8897;
    position: relative;
    top: 1px;
    padding: 0 10px;
    cursor: pointer;
}

.jl-date-nopad {
    padding-left: 0;
    padding-right: 0;
}

.jl-user-content {
    position: relative;
    display: flex;
    align-items: center;
}

.el-icon-user {
    font-size: 20px;
}

.jl-user-content .iconicon {
    font-size: 32px;
    color: #cddae5;
}

.jl-selectdwon {
    width: 160px;
    position: absolute;
    top: 52px;
    left: -61px;
    background-color: #1662b3;
    z-index: 100;
    font-size: 14px;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
    display: none;
}

.jl-selectdwon::after {
    display: block;
    content: "";
    height: 0;
    width: 0;
    overflow: hidden;
    border: solid 8px #1662b3;
    border-left: solid 8px transparent;
    border-right: solid 8px transparent;
    border-top: solid 8px transparent;
    position: absolute;
    left: 70px;
    top: -16px;
}

.jl-selectdwon li a {
    height: 38px;
    line-height: 38px;
    text-align: center;
    display: block;
    color: #fff;
}

.jl-info {
    position: absolute;
    right: 43px;
    top: -5px;
    font-size: 10px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    width: 17px;
    height: 17px;
    line-height: 16px;
    border-radius: 50%;
    background: #f83d56;
    font-style: normal;
}

.jl-info-note {
    right: 12px;
    background-color: #ff781e;
}

.jl-username-icon:hover .jl-selectdwon {
    display: block;
}

.jl-userroles-list {
    width: 160px;
    position: absolute;
    top: 42px;
    left: -61px;
    background-color: #1662b3;
    z-index: 100;
    font-size: 14px;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
    display: none;
}

.jl-userroles-wrap {
    display: inline-block;
    vertical-align: middle;
    padding-top: 5px;
}

.jl-userroles-wrap>>>.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 50px;
    line-height: 50px;
}
</style>

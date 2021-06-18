/*
 * @Name: 文件名称
 * @Description: 该文件描述
 * @Author: Mingjuan
 * @Date: 2021-06-17 10:48:50
 * @Editors: Mingjuan
 */
import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'

// 首页
const App = () => import("../App.vue");

// 登录
const Login = () => import("../views/Login.vue");
const marketActiviesIndex = () => import("../views/marketActivies/marketActiviesIndex.vue");
const friendsIntroductionMange = () => import("../views/marketActivies/friendsIntroduction/manage.vue");
const addFriendsIntroduce = () => import("../views/marketActivies/friendsIntroduction/add.vue");
const preview = () => import("../views/marketActivies/friendsIntroduction/preview.vue");

const routes = [
    {
        path: "/",
        component: App
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            tit: "登录"
        }
    },
    {
        path: "/marketActivies",
        name: "marketActivies",
        component: marketActiviesIndex,
        children: [
            {
                path: "friendIntroduce/manage",
                name: "friendIntroduce/manage",
                meta: {
                    tit: "友介管理"
                },
                component: friendsIntroductionMange
            },
            {
                path: "friendIntroduce/add",
                name: "friendIntroduce/add",
                meta: {
                    tit: "新建友介",
                    active: "/marketActivies/friendIntroduce/manage"
                },
                component: addFriendsIntroduce
            },
            {
                path: "friendIntroduce/preview",
                name: "friendIntroduce/preview",
                meta: {
                    tit: "友介预览",
                    active: "/marketActivies/friendIntroduce/manage"
                },
                component: preview
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
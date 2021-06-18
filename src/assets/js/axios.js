import axios from "axios";
import qs from "qs";
import router from "../../router";
import Vue from "vue";
import store from "../../store";
// 响应时间
axios.defaults.timeout = 60000;
// 配置请求头
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";

// 新建一个axios请求，可用于上传图片等请求，需要时可以将instance输出
var instance = axios.create({
    baseURL: "",
    timeout: 5000,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
// 新建超时请求
let TimeAxios = axios.create({
    baseURL: "",
    timeout: 10000
});
TimeAxios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
// post请求参数序列化
TimeAxios.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        if (config.method === "post") {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        console.log("错误的传参", "fail");
        return Promise.reject(error);
    }
);
// 配置接口地址
var dataUrl = window.location.host;
let environment = process.env.NODE_ENV;
if (environment === "production") {
    // 根据环境来设置baseUrl   api_url
    /* if (dataUrl == 'test.ptwap.julive.com') {
	  dataUrl = 'test2.ptbwap.julive.com'
	}else{
	  dataUrl = 'ptbapi.julive.com'
	} */
    axios.defaults.baseURL = "//" + dataUrl;
    // 设置baseURL
} else {
    // 根据实际情况修改
    axios.defaults.baseURL = "";
}

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        if (config.method === "post") {
            config.data = qs.stringify(config.data);
        }
        /* else if (config.method === 'get') {
	   config.params = {
	     redirect_url: window.location.href.split('#')[1],
	     ...config.params
	   }
	 } */
        return config;
    },
    error => {
        console.log("错误的传参", "fail");
        return Promise.reject(error);
    }
);

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
    response => {
        const { code, msg, data } = response.data;
        // 添加跳转判断如果是本地开发环境则不进行跳转
        if (code === 1107) {
            if (environment === "development") {
                router.push({
                    path: "/login"
                });
                return;
            }
            if (data.type === 1) {
                router.push({
                    path: "/login",
                    query: {
                        errorInfo: "login"
                    }
                });
            } else if (data.type === 2) {
                // 未登录状态 跳转到登录页面
                window.location.href = data.url || "/site/login";
            }
        } else if (code === 1012) {
            // 没有权限
            store.commit("setAuthority", false);
        }
        if (code !== 0) {
            Vue.prototype.$message.error(msg);
        }
        return response.data;
    },
    error => {
        // Do something with response error
        if (
            error.code === "ECONNABORTED" &&
            error.message.indexOf("timeout") !== -1
        ) {
        } else {
            console.warn("axios response error");
            Vue.prototype.$message.error("服务器异常");
            return Promise.reject(error);
        }
    }
);

export { axios, TimeAxios, instance };

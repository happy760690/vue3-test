import { get, post } from './base'
//  import {
//     axios
// } from '@/assets/js/axios';

// 开发环境登陆接口,仅作开发时登录使用
const loginDevApi = '/api/dsp-user/login';

// 菜单接口
const getMenuApi = '/api/dsp-common/menu';

// 获取员工的基本信息接口
const getUserInfoApi = '/api/dsp-user/user-header-info';

// 退出登录接口
const logoutApi = '/api/dsp-user/logout';

// 退出登录接口
const getRoleListAPi = '/api/dsp-user/get-role-list';

// 切换员工角色列表
const changeRoleListApi = '/api/dsp-user/switch-role';

// 获取oss签名接口
const getOssAuthApi = '/api/dsp-common/get-oss-auth';

// 获取oss临时token接口
const getTempToken = '/api/dsp-common/get-temp-token';

/**
 * 测试环境登录
 * @param {String} options.mobile 手机号
 * @param {String} options.password 密码
 * @return {Promise}
 */
const loginDev = (options) => post(loginDevApi, options);

/**
 * 获取导航菜单数据
 * @return {Promise}
 */
const getMenu = () => post(getMenuApi);

/**
 * 获取员工基本信息
 * @return {Promise}
 */
const getUserInfo = () => get(getUserInfoApi);

/**
 * 获取员工角色列表
 * @return {Promise}
 */
const getRoleListData = () => get(getRoleListAPi);

/**
 * 切换员工角色列表
 * @return {Promise}
 */
const changeRoleListData = (params) => get(changeRoleListApi, {params});

/**
 * 退出登录
 * @return {Promise}
 */
const logout = () => get(logoutApi);

/**
 * @param {String} params.path 
 */
const getOssAuth = (params) => get(getOssAuthApi, {params});

/**
 * @description:  获取oss临时token 支持分片上传
 */
const getOssSign = (params) => get(getTempToken, {params});

export default {
    loginDev,
    getMenu,
    getUserInfo,
    logout,
    getRoleListData,
    changeRoleListData,
    getOssAuth,
    getOssSign
};
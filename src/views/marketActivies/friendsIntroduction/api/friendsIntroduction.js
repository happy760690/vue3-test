/*
 * @Description: 接口文档
 * @Author: Mingjuan
 * @Date: 2021-06-02 19:03:02
 * @Editors: Mingjuan
 */
import {
    axios
} from '@/assets/js/axios';

//--------------------友介api Info--start-------------------------
const getCmsFriendList = '/api/cms-friend/list-query'; // 获取列表信息
const postCmsFriendUpdate = '/api/cms-friend/update'; // 更新友介信息
const postCmsFriendInsert = '/api/cms-friend/insert'; // 新增友介信息
const getCmsFriendPreview = '/api/cms-friend/preview'; // 预览友介信息
const getCmsFriendLandingPage = '/api/cms-friend/query-feed-page' // 获取落地页信息
const getCmsFriendConfig = '/api/cms-friend/get-config-data'; // 获取配置信息--友介

const getCities = '/api/cms-common/get-city-info-list'; // 获取城市
//--------------------友介--end----------------------------------

/**
 * @description 获取列表信息
 * @param params
 * @return {Promise}
 */
export const getCmsFriendListData = (params) => axios.get(getCmsFriendList, { params })
    /**
     * @description 更新友介信息
     * @param {*} params
     * @returns
     */
export const postCmsFriendUpdateData = (params) => axios.post(postCmsFriendUpdate, {...params })
    /**
     * @description 新增友介信息
     * @param {*} params
     * @returns
     */
export const postCmsFriendInsertData = (params) => {
        return axios.post(postCmsFriendInsert, {...params })
    }
    /**
     * @description 预览友介信息
     * @param {*} params
     * @returns
     */
export const getCmsFriendPreviewData = (params) => axios.get(getCmsFriendPreview, { params })
    /**
     * @description 获取落地页信息
     * @param {*} params
     * @returns
     */
export const getCmsFriendLandingPageData = (params) => axios.get(getCmsFriendLandingPage, { params })
    /**
     * @description 获取配置信息--友介
     * @param {*} params
     * @returns
     */
export const getCmsFriendConfigData = (params) => axios.get(getCmsFriendConfig, { params })
    /**
     * @description 获取城市
     * @param {*} params
     * @returns
     */
export const getCitiesData = (params) => axios.get(getCities, { params })

export default {
    getCmsFriendListData,
    postCmsFriendUpdateData,
    postCmsFriendInsertData,
    getCmsFriendPreviewData,
    getCmsFriendLandingPageData,
    getCmsFriendConfigData,
    getCitiesData
}
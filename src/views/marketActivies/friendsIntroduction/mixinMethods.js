/*
 * @Description: 用于落地页部分和图片部分，（只限模板内引）
 * @Author: Mingjuan
 * @Date: 2021-06-02 19:03:02
 * @Editors: Mingjuan
 */
import { getCmsFriendLandingPageData } from "./api/friendsIntroduction.js"

export const mixinLP = {
    data() {
        return {
            landPageLoading: false,
            landPageOptions: [],
        }
    },
    methods: {
        /**
         * @description 获取落地页数据
         * @param {*} query
         */
        getCmsFriendLandingPageData,
        async getLandingPages(query) { // 获取落地页数据
            this.loadingText = '加载中...'
                // debugger
            console.log(query)
            if (typeof query != 'string') { // 如果没有数据时，默认传入空
                query = '';
            }
            this.landPageLoading = true;

            let routeQuery = this.$route.query;
            let requestId = routeQuery.id
            if (routeQuery.copy === '1') { // 获取落地页复制的时候不要携带id
                requestId = ''
            }

            let getData = await this.getCmsFriendLandingPageData({
                query: {
                    'page_name': query,
                    'friend_id': requestId || ''
                }
            });

            if (getData.code == 0) { // 成功返回结果      
                if (JSON.stringify(getData.data) == '{}') {
                    this.landPageOptions = []
                    this.loadingText = '无匹配结果'
                } else {
                    this.landPageOptions = getData.data
                }

                let exists = this.landPageOptions.find((item) => item.name == this.ruleForm.landingPage)

                if (this.landPageOptions.length > 0) { // 主要是解决没有数据的时候也展示loading问题
                    this.landPageLoading = false;
                }

                if (exists || !this.ruleForm.landingPage) return; // 如果存在不用再添加

                let selectLD = this.ruleForm.landingPage && this.ruleForm.landingPage.split('_');
                if (selectLD && selectLD.length === 2) {
                    this.landPageOptions.unshift({
                        id: selectLD[0],
                        name: selectLD.join('_')
                    })
                }
                if (this.landPageOptions.length > 0) {
                    this.landPageLoading = false;
                }
            }
        },
        /**
         * 修改图片地址
         * @param data
         */
        changeImageUrl(data) {
            // console.log(data, '上传后的图片')
            if (data.imgUrl) {
                this.ruleForm[data.imgVariable] = data.imgUrl; // 获取图片地址
                this.$refs.ruleForm.clearValidate(data.imgVariable); // 清除状态
            }
        },
        /**
         * 删除图片
         * @param imgName
         */
        handleDeleteImg(imgName) {
            this.ruleForm[imgName] = '';
            this.$refs.ruleForm.validateField(imgName);
        },
        /**
         * 切换落地页时触发
         * @param item
         */
        changeLandPage(item) {
            console.log('变了===', item)
            this.$refs.ruleForm.clearValidate('landingPage'); // 清除状态
            this.ruleForm.landingPage = item
            this.$forceUpdate()
        },
        // landingPageBlur(item){
        //     console.log('重来')
        //     this.$refs.ruleForm.clearValidate('landingPage'); // 清除状态
        // }
    },
    mounted() {
        // this.getLandingPages('')
    }
}
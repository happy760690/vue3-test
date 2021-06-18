<!--
 * @Description: 咨询师模板
 * @Author: Mingjuan
 * @Date: 2021-06-03 11:38:11
 * @Editors: Mingjuan
-->
<template>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="文案一："  prop="title">
            <el-input v-model="ruleForm.title" maxlength="16" placeholder="限16个字"></el-input>
        </el-form-item>
        <el-form-item label="文案二：" prop="sub_title">
            <el-input v-model="ruleForm.sub_title" maxlength="16" placeholder="限16个字"></el-input>
        </el-form-item>
        <el-form-item label="奖品1：" prop="prize1">
            <el-input v-model="ruleForm.prize1" maxlength="9" placeholder="限9个字，奖品至少填1个"></el-input>
        </el-form-item>
        <el-form-item label="奖品2：" prop="prize2">
            <el-input v-model="ruleForm.prize2" maxlength="9" placeholder="限9个字，奖品至少填1个"></el-input>
        </el-form-item>
        <el-form-item label="奖品3：" prop="prize3">
            <el-input v-model="ruleForm.prize3" maxlength="9" placeholder="限9个字，奖品至少填1个"></el-input>
        </el-form-item>
        <el-form-item  label="选择落地页(请搜索活动名称)：" prop="landingPage" label-width="500" class="replace-auto-style" >
            <el-select
                v-model="ruleForm.landingPage"
                filterable
                remote
                reserve-keyword
                no-data-text="无匹配结果"
                :loading-text="loadingText"
                placeholder=""
                @change="changeLandPage"
                @focus="getLandingPages"
                :remote-method="getLandingPages"
                :loading="landPageLoading">
                    <el-option
                    v-for="item in landPageOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文字描述-微信小程序卡片：" prop="wechat_desc"  label-width="300" class="replace-auto-style" >
        <el-input v-model="ruleForm.wechat_desc" maxlength="25" placeholder="限25个字"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="wechat_img_url" label-width="300" class="replace-auto-style" >
            <div class="img-wrap" v-show="ruleForm.wechat_img_url" >
                <!-- <el-image :src="ruleForm.wechat_img_url"></el-image> -->
                <img :src="ruleForm.wechat_img_url" alt="">
                <i class="el-icon-error img-delete" @click="handleDeleteImg('wechat_img_url')"></i>
            </div>

            <upload v-show="!ruleForm.wechat_img_url" @changeImageUrl="changeImageUrl" imageVariable="wechat_img_url" title="上传图片-微信小程序卡片"></upload>
        </el-form-item>
        <el-form-item label="排序：" label-width="300" class="replace-auto-style no-red-start"  >
            <el-input v-model="ruleForm.sort" placeholder="请输入数字，不同模板由小到大排序"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    import Upload from './upload'
    import { mixinLP }  from '../mixinMethods'

    export default {
        mixins: [mixinLP],
        props: {
            ruleForm:{
                type: Object,
                default: {}
            },
            propsData: {
                type: Object,
                default: {}
            }
        },
        components:{
            Upload
        },
        data(){

            /**
             * 奖品校验
             * @param rule
             * @param value
             * @param callback
             */
            const prizeValidate = (rule, value, callback)=> {
                if (value == '' && this.ruleForm.prize2 == '' && this.ruleForm.prize3 == '' ) {
                    callback(new Error('时间选择有误，请重新填写！'));
                } else {
                    callback();
                }
            };
            /**
             * 奖品2 3校验
             * @param rule
             * @param value
             * @param callback
             */
            const prizeValidateOther = (rule, value, callback)=>{
                if (value) { // 非空触发prize1的校验
                    this.$refs.ruleForm.clearValidate('prize1')
                    callback();
                } else {
                    callback();
                }
            };

            /**
             * 落地页校验
             */
            const landingPageValidate = (rule, value, callback) =>{
                console.log('landingPagevalue====',value);
                console.log('landingpage rule from ====',this.ruleForm);
                if(!this.ruleForm.landingPage){
                    callback(new Error('请选择落地页!'));
                } else {
                    callback();
                }
            }

            return {
                loadingText: '加载中...',
                // ruleForm: {
                //     title: '', // 方案一
                //     sub_title: '', // 方案二
                //     prize1: '', // 奖品一
                //     prize2: '', // 奖品二
                //     prize3: '', // 奖品三
                //     'wechat_url': '', // 小程序二维码的链接
                //     'wechat_desc': '', // 小程序文字卡片描述
                //     'wechat_img_url': '', // 微信小程序卡片图片
                //     'sort': '', // 排序
                // },
                rules: {
                    title: [
                        { required: true, message: '请填写文案一', trigger: 'blur' }
                    ],
                    sub_title: [
                        { required: true, message: '请填写文案二', trigger: 'blur' }
                    ],
                    prize1: [{ validator: prizeValidate, message: '至少填1个奖品', trigger: 'blur'}],
                    prize2: [{ validator: prizeValidateOther, trigger: 'blur' }],
                    prize3: [{ validator: prizeValidateOther, trigger: 'blur' }],
                    landingPage: [{ validator: landingPageValidate, message: '请选择落地页', trigger: 'blur' }],
                    'wechat_desc': [{required: true,  validator: prizeValidate, message: '请填写微信小程序卡片文案描述', trigger: 'blur' }],
                    wechat_img_url: [{ required: true, message: '请上传图片', trigger: 'blur' }],
                }
            }
        },
        methods: {
            // initData(){
            //     let newObj = {}
            //     let propsData = this.propsData;
            //     console.log('propsData--这是更新了多少次', propsData)
            //     for(let idx in propsData){ // 复制新对象
            //         newObj[idx] = propsData[idx];
            //     }
            //     let feed_page = {};
            //     feed_page.id = newObj.feed_page.id
            //     feed_page.name = newObj.feed_page.name
            //     feed_page.stitchedStr = feed_page.id + "_" + feed_page.name
            //     newObj.feed_page = feed_page
            //     // newObj['landingPage'] = newObj.feed_page && newObj.feed_page.stitchedStr;
            //     let prizes = newObj.prize
            //     let idx = 0
            //     for(let item of prizes){
            //         idx ++;
            //         newObj['prize'+ idx] = item.name;
            //     }
            //     Object.assign(this.ruleForm, newObj);
            //     this.$set(this.ruleForm, "landingPage", newObj.feed_page && newObj.feed_page.stitchedStr);
            // }
        },
        watch: {
            propsData: function(newVal,oldVal){ // 处理父组件传递过来的数据
                let newObj = {}
                for(let idx in newVal){ // 复制新对象
                    newObj[idx] = newVal[idx];
                }
                let prizes = newObj.prize
                let idx = 0
                for(let item of prizes){
                    idx ++;
                    newObj['prize'+ idx] = item.name;
                }
                if(this.$route.query.copy != '1'){
                    newObj['landingPage'] =  newObj.feed_page.id + '_' + newObj.feed_page.name
                } else {
                    newObj['landingPage'] = ''
                }
                Object.assign(this.ruleForm, newObj);
            },
            'ruleForm.landingPage': {
                handler(newVal, oldVal){
                    console.log(newVal, oldVal, '新旧')
                },
                deep: true
            }
        },
        mounted(){

        },
        beforeDestroy() {
            this.ruleForm = {};
        }
    }
</script>
<style lang="scss" scoped>
.replace-auto-style {
    display: flex;
    flex-direction: column;
    :deep() .el-form-item__content{
        margin-left: 0;
    }

    &.no-red-start :deep() .el-form-item__label::before{
        content: "",
    }

    :deep() .el-image{
        width:100%;
        height:100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    :deep() .el-form-item__label::before{
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
    }

    .img-wrap{
        width: 290px;
        height: 232px;
        overflow: hidden;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .img-delete {
            position: absolute;
            right: 5px;
            font-size: 30px;
            top: 5px;
            cursor:pointer;
        }
    }
}


</style>

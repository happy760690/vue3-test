<!--
 * @Description: 图片模板部分
 * @Author: Mingjuan
 * @Date: 2021-06-03 11:38:11
 * @Editors: Mingjuan
-->
<template>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="90px" label-position="left">
        <el-form-item label="上传图片" prop="img_url" label-width="300" class="replace-auto-style" >
            <div class="img-wrap top-img" v-show="ruleForm.img_url" >
                <!-- <el-image :lazy='true' :src="require(ruleForm.img_url)"></el-image> -->
                <!-- {{ruleForm.img_url}} -->
                <!-- <img v-if="ruleForm.img_url" :src="require(ruleForm.img_url)" alt=""> -->
                <img :src="ruleForm.img_url" alt="">
                <i class="el-icon-error img-delete" @click="handleDeleteImg('img_url')"></i>
            </div>

            <upload v-show="!ruleForm.img_url" @changeImageUrl="changeImageUrl" imageVariable="img_url" title="上传图片"></upload>
        </el-form-item>
        <el-form-item label="选择落地页(请搜索活动名称):" prop="landingPage" class="replace-auto-style" label-width="300">
            <el-select
                v-model="ruleForm.landingPage"
                filterable
                remote
                reserve-keyword
                no-match-text="无匹配结果"
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
        <el-form-item label="文字描述-微信小程序卡片：" prop="wechat_desc" label-width="300" class="replace-auto-style" >
            <el-input v-model="ruleForm.wechat_desc" placeholder="限25个字"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="wechat_img_url" label-width="300" class="replace-auto-style" >
            <div class="img-wrap" v-show="ruleForm.wechat_img_url" >
                <!-- <el-image :lazy='true' :src="ruleForm.wechat_img_url"></el-image> -->
                <img :src="ruleForm.wechat_img_url" alt="">
                <i class="el-icon-error img-delete" @click="handleDeleteImg('wechat_img_url')"></i>
            </div>

            <upload v-show="!ruleForm.wechat_img_url" @changeImageUrl="changeImageUrl" imageVariable="wechat_img_url" title="上传图片-微信小程序卡片"></upload>
        </el-form-item>
        <el-form-item label="排序：" label-width="300" class="replace-auto-style no-red-start" >
            <el-input v-model="ruleForm.sort" placeholder="请输入数字，不同模板由小到大排序"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
import Upload from './upload'
import { mixinLP }  from '../mixinMethods'

export default {
    name: 'ImageTemplate',
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
         * 落地页校验
         */
        const landingPageValidate = (rule, value, callback) => {
            // console.log('rule',rule);
            // console.log('value',value);
            if(!this.ruleForm.landingPage){
                callback(new Error('请选择落地页!'));
            } else {
                callback();
            }
        }

        return {
            loadingText: '加载中...',
            rules: {
                'wechat_desc':[{ required: true, message: '请填写微信小程序卡片文案描述', trigger: 'blur' }],
                wechat_img_url: [{ required: true, message: '请上传图片', trigger: 'blur' }],
                landingPage: [{ validator: landingPageValidate, message: '请选择落地页', trigger: 'blur' }],
                img_url: [{ required: true, message: '请上传图片', trigger: 'blur' }],
            }
        }
    },
    methods: {
    },
    watch: {
        propsData: function(newVal,oldVal){ // 处理父组件传递过来的数据
            let newObj = {}
            for(let idx in newVal){ // 复制新对象
                newObj[idx] = newVal[idx];
            }
            // let prizes = newObj.prize
            // let idx = 0
            // for(let item of prizes){
            //     idx ++;
            //     newObj['prize'+ idx] = item.name;
            // }
            if(this.$route.query.copy != '1'){
                newObj['landingPage'] =  newObj.feed_page.id + '_' + newObj.feed_page.name
            }
            // newObj['landingPage'] =  newObj.feed_page.id + '_' + newObj.feed_page.name
            Object.assign(this.ruleForm, newObj);
        }
    },
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
    .img-wrap.top-img{
        height: 178px;
    }
}
</style>

<!--
 * @Description: 用于包裹模板
 * @Author: Mingjuan
 * @Date: 2021-06-02 19:03:02
 * @Editors: Mingjuan
-->
<template>
    <div class="temp-wrap">
        <div class="collapse-item-content-left">
            <components :ref="colComponentName" :propsData="templateData" :ruleForm="formData" :is="colComponentName"></components>
        </div>
        <div class="collapse-item-content-right">
            <Phone :phoneName="colComponentName+'Phone'"></Phone>
        </div>
    </div>
</template>

<script>
import ConsultantTemplate from "./consultantTemplate";
import ImageTemplate from "./imageTemplate";
import CustomerTemplate from "./customerTemplate";
import Phone from "./phone/phone"

export default {
    props:{
        colComponentName: {
            type: String,
            default: 'ImageTemplate'
        },
        templateData: {
            type: Object,
            default: null
        }
    },
    data(){
        return {
            formData: {
                title: '', // 方案一
                sub_title: '', // 方案二
                prize1: '', // 奖品一
                prize2: '', // 奖品二
                prize3: '', // 奖品三
                img_url: '', // 图片（咨2、3，用2、3）
                'wechat_url': '', // 小程序二维码的链接
                'wechat_desc': '', // 小程序文字卡片描述
                'wechat_img_url': '', // 微信小程序卡片图片
                'sort': '', // 排序
            },
        }
    },

    mounted(){
        // console.log(this.templateData, '====数据!!!')
        // Object.assign(this.formData, this.p)
    },

    provide() {
      return {
          ruleForm: this.formData
      }
    },
    components:{
        CustomerTemplate,
        ImageTemplate,
        ConsultantTemplate,
        Phone
    }
}
</script>
<style lang="sass" scoped>
.temp-wrap{
    background: #fff;
    display: flex;
    padding: 30px;
}
.collapse-item-content-left{
    flex: 1;
    padding: 10px 30px 0 10px;
}
.collapse-item-content-right{
    width: 400px;
    //background: red;
    display: flex;
    padding-top: 10px;
    justify-content: center;
}
</style>

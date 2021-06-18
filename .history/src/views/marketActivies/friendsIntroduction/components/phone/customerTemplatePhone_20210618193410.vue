<!--
 * @Description: 用户模板--手机
 * @Author: Mingjuan
 * @Date: 2021-06-03 11:38:11
 * @Editors: Mingjuan
-->
<template>
    <div class="page flex-col">
        <div class="consultant-wrap">
            <img src="@/assets/images/phone-customer.jpg" alt="" class="bg-img">
            <div class="title">{{ ruleForm.title }}</div>
            <div class="sub-title">{{ ruleForm.sub_title }}</div>
            <ul class="prize-wrap" >
                <li class="prize" v-if="ruleForm.prize1">{{ruleForm.prize1}}</li>
                <li class="prize" v-if="ruleForm.prize2">{{ruleForm.prize2}}</li>
                <li class="prize" v-if="ruleForm.prize3">{{ruleForm.prize3}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            // default: '这位咨询师太棒啦九～'
        },
        prizeList: {
            type: Array,
            // default: ['1000元京东卡','百万保额专属家财险','免费专车看房券券券']
        }
    },
    inject: ['ruleForm'],
}
</script>

<style lang="scss" scoped>
.page {
    z-index: 1;
    position: relative;
    width: 375px;
    height: 667px;
    background-color: rgba(244, 244, 244, 1);
    overflow: hidden;

    .consultant-wrap {
        .bg-img {
            width: 100%;
        }
        .title{
            z-index: 18;
            position: absolute;
            top: 105px;
            width: 375px;
            height: 38px;
            text-align: center;
            font-size: 31px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 300;
            color: #FFFFFF;
            line-height: 38px;
            letter-spacing: 1px;
            text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
        }
        .sub-title{
            position:absolute;
            top: 301px;
            width: 375px;
            height: 18px;
            font-size: 14px;
            font-family: PingFangSC-Light, PingFang SC;
            font-weight: 150;
            color: #04B8DE;
            line-height: 18px;
            text-align: center;
            text-shadow: 0px 2px 20px rgba(0, 151, 211, 0.25);
        }
        .prize-wrap{
            position: absolute;
            padding: 0;
            left: 29px;
            top: 508px;
            display:flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            li{
                //list-style-type: disc;
                position: relative;
                height: 28px;
                font-size: 23px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 300;
                color: #FFFFFF;
                line-height: 28px;
                text-shadow: 0px 1px 4px rgba(14, 105, 177, 0.25);
                &:before{
                    content: '';
                    display: block;
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    background: white;
                    top: 12px;
                    left: -11px;
                    border-radius: 50%;
                }
            }
        }
    }
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.flex-row {
    display: flex;
    flex-direction: row;
}
</style>

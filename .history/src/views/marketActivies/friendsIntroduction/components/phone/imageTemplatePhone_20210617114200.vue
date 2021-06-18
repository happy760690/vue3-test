<!--
 * @Description: 图片模板--手机
 * @Author: Mingjuan
 * @Date: 2021-06-02 19:03:02
 * @Editors: Mingjuan
-->
<template>
    <div class="page flex-col">
        <div class="consultant-wrap">
            <img src="@/assets/images/phone-image.png" alt="" class="bg-img">
            <img :src="ruleForm.img_url" alt="" class="activity-img">
        </div>
    </div>
</template>
<script>
export default {
    props:{
        activityImg:{
            type: String,
        }
    },
    inject: ['ruleForm'],
}
</script>
<style lang="less" scoped>
.page {
    z-index: 1;
    position: relative;
    width: 375px;
    height: 667px;
    background-color: rgba(244, 244, 244, 1);
    overflow: hidden;
    .consultant-wrap {
        .bg-img{
            width:100%;
            position:absolute;
            bottom: 0;
            z-index: 4
        }
        .activity-img{
            width: 100%;
            position: absolute;
            top: 0;
        }
    }
}
</style>

<!--
 * @Description: 手机模块
 * @Author: Mingjuan
 * @Date: 2021-05-26 16:49:47
 * @Editors: Mingjuan
-->
<template>
    <div class="phone-wrap">
        <component :is="phoneName"></component>
    </div>
</template>

<script>
import ConsultantTemplatePhone from './consultantTemplatePhone'
import ImageTemplatePhone from './imageTemplatePhone'
import CustomerTemplatePhone from "./customerTemplatePhone";
export default {
    props:{
        phoneName:{
            type: String,
            default: 'consultantTemplatePhone'
        }
    },
    components: {
        ConsultantTemplatePhone,
        ImageTemplatePhone,
        CustomerTemplatePhone
    },
    data(){
        return {};
    }
}
</script>

<style lang="scss" scoped>
    .phone-wrap{
        width: 375px;
        height: 667px;
        background-color: white;
        border: 1px solid #DCDFE6;
        border-radius: 2px;
    }
</style>

<!--
 * @Description: 上传
 * @Author: Mingjuan
 * @Date: 2021-06-02 19:03:02
 * @Editors: Mingjuan
-->
<template>
    <div v-loading="saveLoading">
        <el-upload
            class="image-uploader"
            ref="upload"
            :drag="false"
            :action="ossHost"
            :data="ossData"
            :multiple="false"
            :show-file-list="false"
            :on-change="onChange"
            :on-error="onError"
            :auto-upload="true"
            :limit="1"
            :on-success="handleSuccess"
            :before-upload="beforeUpload">
            <span class="image-uploader-icon">
            <em>{{ title }}</em>
            <storng class="strong-text">点击选择图片(限制一张，小于1M)</storng>
        </span>
        </el-upload>
    </div>
</template>

<script>
import commonApi from '@/api/common';

export default {
    props: {
        title: {
            type: String,
            default: '上传图片'
        },
        imageVariable: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            ossData: {}, //阿里云签名
            ossHost: "",
            fileName: "", //上传文件名称
            saveLoading: false, // 保存时的loading
            imgKey: '', // 保存的图片地址
            isAbort: false, // 是否被终止
        };
    },
    methods: {
        onError(err, file, fileList) {
            console.log(err, '--:--', file, '==>==', fileList)
        },
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */        
        async updateBaseInfo() {
            console.log('updateInfo===========')
            try {
                this.saveLoading = true;
                const {
                    code,
                    data
                } = await commonApi.getOssAuth({
                    type: 'img'
                });
                if (code === 0) {
                    let now = new Date();
                    let nowDay = now.getDate(); //当前日
                    let nowMonth = now.getMonth() + 1; //当前月
                    let nowYear = now.getFullYear(); //当前年
                    let nowDate = `${nowYear}${nowMonth}${nowDay}`;
                    let key = `${data.dir}${nowDate}/${new Date().getTime()}${this.fileName}`;
                    let obj = {
                        OSSAccessKeyId: data.accessid,
                        policy: data.policy,
                        signature: data.signature,
                        key
                    }
                    this.ossHost = data.host;
                    this.ossData = obj;
                    this.imgKey = this.ossHost + '/' + key
                }
            } catch (error) {
                console.log(error);
            }
        },
        handleSuccess(res, file) {
            this.saveLoading = false;
            console.log(this.imgKey, 'url')
            if(this.imgKey){
                this.$emit('changeImageUrl', {
                    imgVariable: this.imageVariable,
                    imgUrl: this.imgKey
                })
            }
            this.$refs.upload.clearFiles(); // 清空文件
        },
        async beforeUpload(file) {
            
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
            const isLt1M = file.size / 1024 / 1024 < 1;

            this.imgKey = ''; //清掉url路径
            
            if (!isJPG) {
                this.$message.error('上传图片只能是jpg、jpeg、png 格式!');
                this.$refs.upload.clearFiles(); // 清空文件
                this.$refs.upload.abort();
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传图片大小不能超过 1MB!');
                this.$refs.upload.clearFiles(); // 清空文件
                this.$refs.upload.abort();
                return  false;
            }

            let isAbort = isJPG && isLt1M;
            this.isAbort = isAbort;

            if(isAbort){
                console.log('进来了，合格的文件')
                await this.updateBaseInfo();
            } else {
                this.ossHost = '/';
                this.ossData = '';
                this.imgKey = '';
                this.$refs.upload.clearFiles(); // 清空文件
            }
            return isAbort;
        },
        //获取文件名称
        async onChange(file) {
            this.fileName = file.name;
        },
    }
}
</script>

<style lang="less" scoped>
.image-uploader {
    padding: 0 0 20px;

    em{
        font-style: normal;
    }

    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .el-upload:hover {
        border-color: #409EFF;
    }

    .image-uploader-icon {
        font-size: 20px;
        display: inline-block;
        width: 290px;
        height: 178px;
        line-height: 78px;
        text-align: center;
        border: 1px dashed #9c9c9c;
        color: #434446;

        .strong-text {
            border-radius: 5px;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            font-size: 14px;
            text-align: center;
            background-color: #409EFF;
            color: white;
        }
    }
}
</style>

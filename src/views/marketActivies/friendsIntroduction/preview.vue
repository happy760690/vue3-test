<!--
 * @Name: 友介-预览页
 * @Description: 友介-预览页
 * @Author: gaoyanlong
 * @Date: 2021-05-28 14:56:57
 * @Editors: gaoyanlong
-->
<template>
    <div class="friends-introduce-manage-wrap" v-if="renderFlag">
        <!-- 面包屑 -->
        <BreadNav :breadArrList="breadListData"></BreadNav>
        <div class="content-wrap">
            <el-table
                :data="list"
                :show-header="false"
                :fit="true"
                :stripe="true"
                border
            >
                <el-table-column prop="label" width="200"> </el-table-column>
                <el-table-column prop="value"> </el-table-column>
            </el-table>
            <el-button type="primary" @click="edite">修改</el-button>
        </div>
    </div>
</template>

<script>
import BreadNav from "../../../components/BreadNav";
import { getCmsFriendPreviewData } from "./api/friendsIntroduction";

export default {
    data() {
        return {
            // 面包屑
            breadListData: [
                {
                    breadText: "友介管理",
                    toPath: "/marketActivies/friendIntroduce/manage",
                },
                {
                    breadText: this.$route.query.id
                        ? "ID: " + this.$route.query.id
                        : "ID: ",
                },
            ],
            //加载变量
            renderFlag: false,
            //传给table的数据
            list: [
                {
                    key: "id",
                    label: "ID",
                },
                {
                    key: "name",
                    label: "友介名称",
                },
                {
                    key: "remark",
                    label: "友介备注",
                },
                {
                    key: "city",
                    label: "城市",
                },
                {
                    key: "share_status",
                    label: "状态",
                },
                {
                    key: "valid_time",
                    label: "生效时间",
                },
                {
                    key: "creator",
                    label: "创建人",
                },
                {
                    key: "create_datetime",
                    label: "创建时间",
                },
                {
                    key: "updator",
                    label: "最近更新人",
                },
                {
                    key: "update_datetime",
                    label: "最近更新时间",
                },
            ],
        };
    },
    components: {
        BreadNav,
    },
    created() {
        this.getData();
    },
    methods: {
        /**
         * @description:跳转编辑页面
         * @param {*}
         * @return {*}
         */
        edite() {
            this.$router.push({
                path: "/marketActivies/friendIntroduce/add",
                query: {
                    id: this.$route.query.id,
                },
            });
        },
        /**
         * @description:获取数据，将数据处理为数组
         * @param {*}
         * @return {*}
         */
        async getData() {
            try {
                let res = await getCmsFriendPreviewData({
                    id: this.$route.query.id,
                });
                if (res.code === 0) {
                    this.list = this.list.map((item) => {
                        item.value = res.data[item.key] || "";
                        return item;
                    });
                    this.renderFlag = true;
                }
            } catch (error) {
                this.renderFlag = true;
                console.log(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.content-wrap {
    margin: 10px auto 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.el-button--primary {
    display: block;
    margin: 20px auto;
}

:deep().el-table_1_column_1 {
    font-weight: bolder;
}
</style>

<!--
 * @Description: 列表页面
 * @Author: Mingjuan
 * @Date: 2021-06-02 19:03:02
 * @Editors: Mingjuan
-->
<template>
    <div v-if="cities.length" class="friends-introduce-list-wrap">
        <div class="filter">
            <div class="filter-zone">
                <el-button
                    type="primary"
                    @click="goAdd"
                    size="small">新建友介</el-button>
            </div>
        </div>
        <el-table
        :data="dataList"
        ref="table"
        v-loading="tableLoading"
        style="width: 100%"
        border>
            <el-table-column
                align="center"
                prop="id"
                width="80"
                fixed
                label="ID">
                <template slot-scope="{row, $index}">
                    <el-input  v-if="$index === 0"   @keypress.native.enter="searchData" @blur="searchData" v-model="formSearch.id"></el-input>
                    <span v-else>{{row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                fixed
                width="120"
                prop="city_id"
                label="城市">
                <template slot-scope="{row, $index}">
                    <el-select
                        v-if="$index === 0"
                        placeholder="请选择"
                        v-model="formSearch.city_id"
                        @change="searchData">
                        <el-option
                            v-for="item of cities"
                            :key="item.id"
                            :label="item.name_cn"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span v-else>{{row.city_id}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                min-width="120"
                label="友介名称">
                <template slot-scope="{row, $index}">
                    <el-input  v-if="$index === 0"  @keypress.native.enter="searchData"  @blur="searchData" v-model="formSearch.name"></el-input>
                    <span v-else>{{row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="remark"
                label="友介备注">
                <template slot-scope="{row, $index}">
                    <el-input v-if="$index === 0"  @keypress.native.enter="searchData"  @blur="searchData" v-model="formSearch.remark"></el-input>
                    <span v-else>{{row.remark}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                width="95"
                prop="share_status"
                label="状态" style="display: flex">
                <template slot-scope="{row, $index}">
                    <el-select
                        v-if="$index === 0"
                        placeholder="状态"
                        width="90"
                        v-model="formSearch.share_status"
                        @change="searchData">
                        <el-option
                            v-for="(item, key) of statusList"
                            :key="key"
                            :label="item"
                            :value="key">
                        </el-option>
                    </el-select>
                    <span v-else>{{row.share_status}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="creator"
                label="创建人">
                <template slot-scope="{row, $index}">
                    <el-input  v-if="$index === 0"   @keypress.native.enter="searchData" @blur="searchData"  v-model="formSearch.creator"></el-input>
                    <span v-else>{{row.creator}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="create_datetime"
                width="250"
                label="创建时间">
                <template slot-scope="{row, $index}">
                    <el-date-picker
                        v-if="$index === 0"
                        v-model="formSearch.create_datetime"
                        width="120"
                        type="date"
                        value-format="yyyy-MM-dd"
                        @change="searchData">
                    </el-date-picker>
                    <span v-else>{{row.create_datetime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                width="180"
                label="操作">
                <template slot-scope="{row, $index}">
                    <span  v-if="$index === 0"  ></span>
                    <div v-else class="flex-between">
                        <i class="el-icon-view" @click="handleView(row.id)"></i>
                        <i class="el-icon-edit" @click="handleEdit(row.id)"></i>
                        <i class="el-icon-document-copy" @click="handleCopy(row.id)"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <span class="table-empty-text" v-if="dataList.length == 1">{{emptyText}}</span>
        <div class="page-ination">
            <el-pagination
                background
                :hide-on-single-page="true"
                layout="prev, pager, next"
                :total="pagination.total"
                :current-page="pagination.page"
                :page-size="pagination.pageSize"
                @current-change="handleChangePage">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getCmsFriendListData, getCitiesData} from "../api/friendsIntroduction";

export default {
    data(){
        return {
            formSearch: {
                id: '', // id
                city_id: '', // 	城市id
                name: '', // 友介名称
                remark: '', // 备注
                share_status: '0', // 状态
                creator: '', // 创建人
                create_datetime: '', // 创建时间
            },
            emptyText: "暂无数据，请创建友介计划", // 没有找到数据，请清除条件重新筛选
            dataList: [], // 列表数据
            tableLoading: true, // 加载状态
            statusList: {
                0: '全部',
                1: '启用',
                2: '终止',
            }, // 状态列表
            cities: [],
            pagination:{ // 分页相关
                total: 0, // 总条数
                page: 1, // 当前第几页
                pageSize: 20, // 一页多少条
                pageCount: 1, // 一共多少页
            }
        }
    }, 
    mounted() {
        this.moutedGetData();
    },
    methods: {
        /**
         * @description: 加获取页面数据，先获取城市数据判断有无权限再获取列表数据
         */   
        async moutedGetData(){
            let resData = await getCitiesData({})
            if(resData.code == 0){
                this.$emit('changeAuthority', true)
                console.log(resData)
                this.cities = resData.data && resData.data.list || [];

                this.pagination.page = 1; // 搜索时，将页面设为第一页
                this.emptyText = '暂无数据，请创建友介计划';
                this.getData();
            }
        },
        /**
         * @description: 跳转到查看详情页面
         * @param {*} id
         * @return {*}
         */        
        handleView(id){
            this.$router.push('/marketActivies/friendIntroduce/preview?id=' + id)
        },
        /**
         * @description: 编辑并跳转
         * @param {*} id
         * @return {*}
         */        
        handleEdit(id){
            this.$router.push('/marketActivies/friendIntroduce/add?id=' + id)
        },
        /**
         * @description: 复制数据并跳转
         */        
        handleCopy(id){
            this.$router.push('/marketActivies/friendIntroduce/add?id=' + id + "&copy=1")
        },
        /**
         * @description: 搜索时调用
         */        
        searchData(){
            this.pagination.page = 1; // 搜索时，将页面设为第一页
            this.emptyText = '没有找到数据，请清除条件重新筛选';
            this.getData();
        },
        /**
         * @description: 获取数据
         */        
        async getData(){
            this.tableLoading = true;
            let resData = await getCmsFriendListData({query: this.formSearch, page: this.pagination.page, page_size: this.pagination.pageSize})
            if(resData.code == 0){
                this.dataList = resData.data.list;
                this.dataList.unshift({});
                this.pagination.total = Number(resData.data.total) || 0;
                this.pagination.page = Number(resData.data.page) || 0;
                this.pagination.pageSize = Number(resData.data.page_size) || 0;
                this.pagination.pageCount = Number(resData.data.page_count) || 0;
            }
            this.tableLoading = false;
        },
        /**
         * 跳转到添加页面
         */
        goAdd(){
            this.$router.push('/marketActivies/friendIntroduce/add')
        },
        /**
         * 处理分页
         */
        handleChangePage(page){
            this.pagination.page = page
            this.getData();
        },
    }
}
</script>
<style lang="less" scoped>
.friends-introduce-list-wrap{
    .filter-zone{
        padding: 10px 0;
    }

    :deep() .page-ination {
        margin-top: 20px;
        text-align: center;
    }
    .flex-between{
        display: flex;
        justify-content: space-around;
        i{
            cursor: pointer;
        }
    }
    .table-empty-text{
        margin-top: 90px;
        display:inline-block;
        line-height: 50px;
        height: 50px;
        text-align: center;
        color: #909399;
        width: 100%;
    }
}
</style>

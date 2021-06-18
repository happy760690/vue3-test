<!--
 * @Description: 添加、修改、复制
 * @Author: Mingjuan
 * @Date: 2021-06-03 11:38:11
 * @Editors: Mingjuan
-->
<template>
<div
    v-if="cities.length"
    v-loading="loading"
    class="add-friend-introduce-wrap">
    <!-- 面包屑 -->
    <BreadNav :breadArrList="breadListData"></BreadNav>
    <!-- 主要内容 -->
    <div class="content-wrap">
        <el-form
            ref="ruleFormBase"
            :rules="rules"
            :model="ruleFormBase"
            label-width="140px">
            <!--   城市选择   -->
            <el-form-item
                label="城市："
                prop="checkedCities">
                <el-checkbox
                    label="全国"
                    size="small"
                    v-model="checkAllCityButtonVal"
                    @change="checkAllCity"></el-checkbox>
                <el-checkbox-group
                    v-model="ruleFormBase.checkedCities"
                    @change="selectCities">
                    <el-checkbox
                        v-for="item in cities"
                        size="mini"
                        :key="item.id"
                        :label="item.id"
                        name="checkedCities">{{ item.name_cn }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!--  友介名称  -->
            <el-form-item
                label="友介名称："
                prop="name">
                <el-input
                    v-model="ruleFormBase.name"
                    maxlength="10"
                    placeholder="限10个字"></el-input>
            </el-form-item>
            <!-- 友介备注 -->
            <el-form-item label="友介备注：">
                <el-input
                    v-model="ruleFormBase.remark"
                    maxlength="15"
                    placeholder="限15个字"></el-input>
            </el-form-item>
            <!-- 生效开始时间 -->
            <el-form-item
                label="生效开始时间："
                prop="valid_start_time">
                <el-date-picker
                    v-model="ruleFormBase.valid_start_time"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    :picker-options="{
                            disabledDate(time) {
                                return time.getTime() <= Date.now() - 8.64e7;
                            },
                        }"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <!-- 生效结束时间 -->
            <el-form-item
                label="生效结束时间："
                prop="valid_end_time">
                <el-date-picker
                    v-model="ruleFormBase.valid_end_time"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期时间"
                    :picker-options="{
                            disabledDate(time) {
                                return time.getTime() <= Date.now() - 8.64e7;
                            },
                        }">
                </el-date-picker>
            </el-form-item>

            <!-- 是否有咨询师分享 -->
            <el-form-item
                label="是否有咨询师分享："
                prop="is_header_share">
                <el-switch
                    active-value="1"
                    inactive-value="2"
                    v-model="ruleFormBase.is_header_share"
                    @change="
                            handleChangeShareOpt(
                                'consultantActiveNames',
                                $event
                            )
                        "></el-switch>
            </el-form-item>
            <el-collapse
                v-show="ruleFormBase.is_header_share === '1'"
                class="padding-side"
                v-model="consultantActiveNames">
                <el-collapse-item
                    disabled
                    v-for="item in consultantCollapseType"
                    title="一致性 Consistency"
                    :key="item.idValue"
                    :name="item.idValue">
                    <template slot="title">{{ item.templateName }}&nbsp;&nbsp;
                        <el-checkbox
                            :ref="
                                    ruleFormBase[
                                        item.collapseName +
                                            'Checked' +
                                            item.idValue
                                    ]
                                "
                            v-model="
                                    ruleFormBase[
                                        item.collapseName +
                                            'Checked' +
                                            item.idValue
                                    ]
                                "
                            @change="
                                    changeCheckbox(
                                        item.idValue,
                                        'consultantActiveNames',
                                        $event,
                                        item.collapseName
                                    )
                                "></el-checkbox>
                        <span v-if="
                                    collapseOption(
                                        'consultantActiveNames',
                                        item.idValue
                                    )
                                " 
                                 @click="
                                    changeCheckbox(
                                        item.idValue,
                                        'consultantActiveNames',
                                        true
                                    )
                                "
                                class="collapse-flex-center">展开配置<i class="el-icon-download"></i>
                        </span>
                    </template>
                    <TemplateWrap
                        :ref="item.collapseName + item.idValue"
                        :colComponentName="item.typeName"
                        :templateData="item.templateData"></TemplateWrap>
                    <p
                        class="collapse-item-control"
                        @click="
                                changeCheckbox(
                                    item.idValue,
                                    'consultantActiveNames',
                                    false
                                )
                            ">
                        收起<i class="el-icon-upload2"></i>
                    </p>
                </el-collapse-item>
            </el-collapse>

            <!-- 是否有用户分享 -->
            <el-form-item label="是否有用户分享：">
                <el-switch
                    active-value="1"
                    inactive-value="2"
                    v-model="ruleFormBase.is_user_share"
                    @change="
                            handleChangeShareOpt('customerActiveNames', $event)
                        "></el-switch>
            </el-form-item>
            <el-collapse
                v-show="ruleFormBase.is_user_share == '1'"
                class="padding-side"
                v-model="customerActiveNames">
                <el-collapse-item
                    disabled
                    v-for="item in customerCollapseType"
                    title="一致性 Consistency"
                    :key="item.idValue"
                    :name="item.idValue">
                    <template slot="title">{{ item.templateName }}&nbsp;&nbsp;
                        <el-checkbox
                            :ref="
                                    ruleFormBase[
                                        item.collapseName +
                                            'Checked' +
                                            item.idValue
                                    ]
                                "
                            v-model="
                                    ruleFormBase[
                                        item.collapseName +
                                            'Checked' +
                                            item.idValue
                                    ]
                                "
                            @change="
                                    changeCheckbox(
                                        item.idValue,
                                        'customerActiveNames',
                                        $event,
                                        item.collapseName
                                    )
                                "></el-checkbox>
                        <span v-if="
                                    collapseOption(
                                        'customerActiveNames',
                                        item.idValue
                                    )
                                " 
                                @click="
                                    changeCheckbox(
                                        item.idValue,
                                        'customerActiveNames',
                                        true
                                    )
                                "
                                class="collapse-flex-center">展开配置<i class="el-icon-download"></i>
                        </span>
                    </template>
                    <TemplateWrap
                        :ref="item.collapseName + item.idValue"
                        :colComponentName="item.typeName"
                        :templateData="item.templateData"></TemplateWrap>
                    <p
                        class="collapse-item-control"
                        @click="
                                changeCheckbox(
                                    item.idValue,
                                    'customerActiveNames',
                                    false
                                )
                            ">
                        收起<i class="el-icon-upload2"></i>
                    </p>
                </el-collapse-item>
            </el-collapse>

            <!-- 分享状态 -->
            <el-form-item
                label="分享状态："
                prop="share_status">
                <el-radio
                    v-model="ruleFormBase.share_status"
                    label="1">启用
                </el-radio>
                <el-radio
                    v-model="ruleFormBase.share_status"
                    label="2">终止
                </el-radio>
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    @click="onSubmit">发布
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
// 面包屑
import BreadNav from "../../../components/BreadNav";
import TemplateWrap from "./components/templateWrap";

import {
    postCmsFriendUpdate,
    postCmsFriendInsertData,
    getCitiesData,
    getCmsFriendConfigData,
    postCmsFriendUpdateData,
} from "./api/friendsIntroduction";

const delay = (function () {
    let timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

export default {
    data() {
        // 开始时间校验
        const startDateValidate = (rule, value, callback) => {
            console.log(value, "====时间===start");
            console.log(new Date(value).valueOf(), "====时间===start,getTime");
            if (!value || !this.ruleFormBase.valid_end_time) {
                // 有一个空都算校验通过
                callback();
            } else if (
                value &&
                new Date(value) > new Date(this.ruleFormBase.valid_end_time)
            ) {
                console.log(typeof value, "类型");
                callback(new Error("时间选择有误，请重新填写！"));
            } else {
                this.$refs.ruleFormBase.clearValidate("valid_end_time");
                callback();
            }
        };
        // 结束时间校验
        const endDateValidate = (rule, value, callback) => {
            console.log(value, "====时间===end");
            if (!value || !this.ruleFormBase.valid_start_time) {
                // 有一个空都算校验通过
                callback();
            } else if (
                value &&
                new Date(value) < new Date(this.ruleFormBase.valid_start_time)
            ) {
                callback(new Error("时间选择有误，请重新填写！"));
            } else {
                this.$refs.ruleFormBase.clearValidate("valid_start_time");
                callback();
            }
        };

        return {
            // 咨询师分享激活哪些模板
            consultantActiveNames: [1],
            // 咨询分享师模板部分
            consultantCollapseType: [{
                    typeName: "consultantTemplate",
                    collapseName: "consultantActiveNames",
                    idValue: 1,
                    templateName: "咨询师模板",
                    templateData: {},
                },
                {
                    typeName: "imageTemplate",
                    collapseName: "consultantActiveNames",
                    idValue: 2,
                    templateName: "图片模板1",
                    templateData: {},
                },
                {
                    typeName: "imageTemplate",
                    collapseName: "consultantActiveNames",
                    idValue: 3,
                    templateName: "图片模板2",
                    templateData: {},
                },
            ],
            // 用户分享激活哪些模板
            customerActiveNames: [1],
            // 用户分享模板部分
            customerCollapseType: [{
                    typeName: "customerTemplate",
                    collapseName: "customerActiveNames",
                    idValue: 1,
                    templateName: "咨询师模板",
                    templateData: {},
                },
                {
                    typeName: "imageTemplate",
                    collapseName: "customerActiveNames",
                    idValue: 2,
                    templateName: "图片模板1",
                    templateData: {},
                },
                {
                    typeName: "imageTemplate",
                    collapseName: "customerActiveNames",
                    idValue: 3,
                    templateName: "图片模板2",
                    templateData: {},
                },
            ],
            hasErr: false, // 校验是否通过
            // 面包屑
            breadListData: [],
            // 用于面包屑，本页的标题展示
            pageTitle: "",
            cities: [], // 城市
            landingPages: [], // 获取落地页用于默认显示
            checkAllCityButtonVal: false, // 全国
            ruleFormBase: {
                // 表单
                consultantActiveNamesChecked1: true, // 咨询师分享--咨询师模板
                consultantActiveNamesChecked2: false, // 咨询师分享--图片模板1
                consultantActiveNamesChecked3: false, // 咨询师分享--图片模板2
                customerActiveNamesChecked1: true, // 用户分享--咨询师模板
                customerActiveNamesChecked2: false, // 用户分享--图片模板1
                customerActiveNamesChecked3: false, // 用户分享--图片模板2
                checkedCities: [], // 选中的城市
                name: "", // 友介名称
                remark: "", // 友介备注
                valid_start_time: "", // 生效开始时间
                valid_end_time: "", // 生效结束时间
                is_header_share: "1", // 是否有咨询师分享 1有 2无 （elementui中）
                is_user_share: "1", // 是否有用户分享 1有  2无
                share_status: "1", // 分享状态 1启用  2终止
            },
            rules: {
                // 规则
                checkedCities: [{
                    type: "array",
                    required: true,
                    message: "请选择城市",
                    trigger: "change",
                }],
                name: [{
                    required: true,
                    message: "请填写友介名称",
                    trigger: "blur",
                }],
                valid_start_time: [{
                    validator: startDateValidate,
                    trigger: ["blur", "change"],
                }],
                valid_end_time: [{
                    validator: endDateValidate,
                    trigger: ["blur", "change"]
                }],
            },
            remoteData: {},
            loading: true, // 加载中
            stitchedData: {}, // 合并后的数据，用于提交
        };
    },
    components: {
        BreadNav,
        TemplateWrap,
    },
    watch: {},
    methods: {
        /**
         * 保存数据
         * */
        async saveData() {
            this.loading = true;
            try {
                let query = this.$route.query;
                let resData = null;

                if (query && query.id) {
                    if (query && query.copy == "1") {
                        let params = this.stitchedData;
                        
                        // 复制友介，走新建接口
                        resData = await postCmsFriendInsertData({
                            ...params
                        });
                        console.log(resData);
                        if (resData.code === 0) {
                            this.$router.push(
                                "/marketActivies/friendIntroduce/manage"
                            );
                        }
                    } else {
                        let params = this.stitchedData;
                        params.id = query.id;
                        // 编辑友介（调用编辑后的保存接口）
                        resData = await postCmsFriendUpdateData({
                            ...params
                        });
                        console.log(resData);
                        if (resData.code === 0) {
                            this.$router.push(
                                "/marketActivies/friendIntroduce/manage"
                            );
                        }
                    }
                } else {
                    // 默认新建友介（调用保存接口）
                    resData = await postCmsFriendInsertData({
                        ...this.stitchedData,
                    });
                    console.log(resData);
                    if (resData.code === 0) {
                        this.$router.push(
                            "/marketActivies/friendIntroduce/manage"
                        );
                    }
                }
                this.loading = false;
            } catch (e) {
                this.loading = false;
                console.log(e);
            }
        },
        /**
         * 获取城市
         */
        async getCities() {
            try {
                let resData = await getCitiesData({});
                if (resData.code == 0) {
                    console.log(resData);
                    let remoteCities =
                        (resData.data && resData.data.list) || [];
                    for (let item of remoteCities) {
                        if (item.id != 0) {
                            item.id += ""; // 转化为字符串
                            this.cities.push(item);
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        /**
         * 用于打开与隐藏咨询师模板
         * @param templateName 模板类型 String
         * @param value 值 Boolean
         * */
        handleChangeShareOpt(templateName, value) {
            if (value === false) {
                // 取消咨询师分享
                this[templateName].splice(0); // 清空选中项
            } else {
                // 打开默认选中项
                if (templateName.indexOf("customer") !== -1) {
                    // 用户模块
                    this.changeCollpaseStatus(
                        templateName,
                        "customerCollapseType"
                    );
                } else if (templateName.indexOf("consultant") !== -1) {
                    // 咨询师模块
                    this.changeCollpaseStatus(
                        templateName,
                        "consultantCollapseType"
                    );
                }
            }
        },
        /**
         * @description 展开所有选中项
         * @param templateName 模板名称
         * @param collpaseList 用于展开的列表
         */
        changeCollpaseStatus(templateName, collapseList) {
            let list = this[collapseList];
            for (let item of list) {
                // 展开已经选中的项
                if (
                    this.ruleFormBase[templateName + "Checked" + item.idValue]
                ) {
                    this[templateName].push(item.idValue);
                }
            }
        },
        /**
         * 选中模板总数统计
         */
        currentTemplateCount(templateName) {
            let count = 0;
            for (let i = 1; i <= 3; i++) {
                if (this.ruleFormBase[templateName + "Checked" + i] == true) {
                    count++;
                }
            }
            return count;
        },
        /**
         * @description 切换checkbox时触发
         * @param change 改变的是哪一项
         * @param whichCollapse 哪个模板
         * @param value 值
         * @param collapseType 是咨询师模板还是用户模板（选填，主要用于区分checkbox时添加）
         * */
        changeCheckbox(change, whichCollapse, value, collapseType) {
            let count = this.currentTemplateCount(collapseType);
            if (collapseType && count === 0) {
                // 如果模板选中0个，需要提示，不能取消这个模板
                this.$message.error("至少选中一个模板");
                this.ruleFormBase[collapseType + "Checked" + change] = true;
                value = true; // 还原值
            }

            if (value && this[whichCollapse].indexOf(value) == -1) {
                this[whichCollapse].push(change);
            } else {
                this[whichCollapse] = this[whichCollapse].filter((item) => {
                    return item != change;
                });
            }
        },
        /**
         * 选中全国
         * */
        checkAllCity(val) {
            let getAllCity = this.cities.map((item, key) => {
                return item.id;
            });
            this.ruleFormBase.checkedCities = val ? getAllCity : [];
        },
        /**
         * 选中城市
         * */
        selectCities(value) {
            let checkedCount = value.length;
            this.checkAllCityButtonVal = checkedCount === this.cities.length;
        },
        /**
         * 发布
         */
        onSubmit() {
            delay(() => {
                this.validateData(); // 校验数据
            }, 600);
        },
        /**
         * 校验数据
         * */
        validateData() {
            this.hasErr = false;
            this.$refs["ruleFormBase"].validateField(
                [
                    "name",
                    "checkedCities",
                    "valid_start_time",
                    "valid_end_time",
                    "is_header_share",
                    "is_user_share",
                ],
                (valid) => {
                    if (valid) {
                        this.hasErr = true;
                    }
                }
            );

            this.childFormValidate(); // 子组件校验
        },
        /**
         * 子组件校验
         */
        childFormValidate() {
            if (
                this.ruleFormBase.is_header_share === "2" &&
                this.ruleFormBase.is_user_share === "2"
            ) {
                // 如果两个模板都未选中
                this.$message.error("请配置模板！");
                return;
            }
            this.callValidate()
                .then(
                    (res) => {
                        if (!res) {
                            this.$message.error("请填写必填项");
                        } else {
                            if (!this.hasErr) {
                                // this.$message.success("校验成功");
                                this.getChildData();
                                // TODO 1.保存数据

                                // TODO 2. 跳到列表页
                            } else {
                                this.$message.error("请填写必填项");
                            }
                        }
                    },
                    (err) => {
                        this.hasErr = true;
                        this.$message.error("请填写必填项!");
                    }
                )
                .catch((err) => {
                    console.log("失败", err);
                    this.$message.error("请填写必填项0000");
                });
        },

        /**
         * 调用校验
         */
        async callValidate() {
            let colType = Array.from(this.consultantCollapseType); // 咨询师相关模板
            let tempArr = [];

            colType.push(...this.customerCollapseType); // 添加用户模板

            // 添加页面最上边的信息
            // tempArr.push(this.checkForm(this.$refs['ruleFormBase'], {})) // hasErr

            for (let item of colType) {
                // 循环遍历collpase
                // 如果没有这个ref不放入promise队列
                if (!this.$refs[item.collapseName + item.idValue]) {
                    continue;
                }
                // 如果咨询师分享关闭，则咨询师分享部分不进行校验
                if (
                    this.ruleFormBase.is_header_share === "2" &&
                    item.collapseName === "consultantActiveNames"
                ) {
                    // 清掉模板状态
                    this.$refs[item.collapseName + item.idValue][0].$refs[
                        item.typeName
                    ].$refs["ruleForm"].clearValidate();
                    continue;
                }
                // 如果用户分享关闭，则用户分享部分不进行校验
                if (
                    this.ruleFormBase.is_user_share === "2" &&
                    item.collapseName === "customerActiveNames"
                ) {
                    this.$refs[item.collapseName + item.idValue][0].$refs[
                        item.typeName
                    ].$refs["ruleForm"].clearValidate();
                    continue;
                }
                // 如果模板未被勾选，则不进行校验
                if (
                    this.ruleFormBase[
                        item.collapseName + "Checked" + item.idValue
                    ] === false
                ) {
                    // 清掉模板的状态
                    this.$refs[item.collapseName + item.idValue][0].$refs[
                        item.typeName
                    ].$refs["ruleForm"].clearValidate();
                    continue;
                }

                let formInfo = this.$refs[item.collapseName + item.idValue][0]
                    .$refs[item.typeName].$refs["ruleForm"];
                tempArr.push(this.checkForm(formInfo, item));
            }

            return Promise.all(tempArr);
        },
        /**
         * 校验通过后获取数据
         * */
        async getChildData() {
            try {
                let colType = Array.from(this.consultantCollapseType); // 咨询师相关模板
                let headerTemplate = []; // 存放咨询师模板
                let userTemplate = []; // 存放用户模板

                await this.getData(colType, headerTemplate);
                colType = Array.from(this.customerCollapseType); // 用户相关模板
                await this.getData(colType, userTemplate);

                console.log(this.ruleFormBase, "父组件的数据");
                console.log(headerTemplate, "子组件咨询模板结果");
                console.log(userTemplate, "子组件用户模板结果");
                let ruleFormBase = this.ruleFormBase;
                let valid_start_time =
                    (ruleFormBase.valid_start_time &&
                        new Date(ruleFormBase.valid_start_time).getTime()) ||
                    "";
                let valid_end_time =
                    (ruleFormBase.valid_end_time &&
                        new Date(ruleFormBase.valid_end_time).getTime()) ||
                    "";
                let cityIds = '';
                if(this.checkAllCityButtonVal){ // 如果全选，表示全国
                    cityIds = '0'; // 全国时只传0
                } else {
                    cityIds = ruleFormBase.checkedCities.join(",");
                }

                let stitchData = {
                    city_id: cityIds, // 城市
                    name: ruleFormBase.name, // 友介称称
                    remark: ruleFormBase.remark, // 友介备注
                    valid_start_time: valid_start_time ?
                        valid_start_time / 1000 : "", // 生效开始时间
                    valid_end_time: valid_end_time ? valid_end_time / 1000 : "", // 生效结束时间
                    is_header_share: ruleFormBase.is_header_share, // 是否有咨询师分享
                    is_user_share: ruleFormBase.is_user_share, // 是否有用户分享
                    share_status: ruleFormBase.share_status, // 分享状态
                    header_template: headerTemplate, // 咨询师分享配置
                    user_template: userTemplate, // 用户分享配置
                };

                Object.assign(this.stitchedData, stitchData); // 拼接好的数据

                this.saveData(); //  保存数据
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: 获取填写的数据
         */
        async getData(colType, result) {
            let sequence = 0;
            for (let item of colType) {
                // 循环遍历collpase
                sequence++; // 序号加1---用来标示模板样式类型1.咨询师模板 2.图片模板 3.图片模板2
                // 如果没有这个ref不放入promise队列
                if (!this.$refs[item.collapseName + item.idValue]) {
                    continue;
                }
                // 如果咨询师分享关闭，则咨询师分享部分不进行存储
                if (
                    this.ruleFormBase.is_header_share === "2" &&
                    item.collapseName === "consultantActiveNames"
                ) {
                    continue;
                }
                // 如果用户分享关闭，则用户分享部分不进行存储
                if (
                    this.ruleFormBase.is_user_share === "2" &&
                    item.collapseName === "customerActiveNames"
                ) {
                    continue;
                }
                // 如果模板未被勾选，则不进行校验
                if (
                    this.ruleFormBase[
                        item.collapseName + "Checked" + item.idValue
                    ] === false
                ) {
                    continue;
                }

                let formInfo = this.$refs[item.collapseName + item.idValue][0]
                    .$refs[item.typeName].ruleForm;

                let inputRes = {
                    template_style_type: sequence, // 模板类型
                }; // 有咨询师时，咨询师模块的数据

                Object.assign(inputRes, formInfo); // 整合数据

                let landPageInfo =
                    formInfo.landingPage && formInfo.landingPage.split("_"); // 处理落地页
                let splitWeChatUrl =
                    (formInfo.wechat_img_url &&
                        formInfo.wechat_img_url.match(/(Upload\/cms.*)/)) ||
                    ""; // 微信卡片
                let splitUrl =
                    (formInfo.img_url &&
                        formInfo.img_url.match(/(Upload\/cms.*)/)) ||
                    ""; // 图片

                inputRes.feed_page = {
                    // 落地页
                    id: landPageInfo && landPageInfo[0],
                    name: landPageInfo && landPageInfo[1],
                };

                inputRes.wechat_img_url = splitWeChatUrl && splitWeChatUrl[0]; // 微信图片
                inputRes.img_url = splitUrl && splitUrl[0]; // 图片

                if (sequence == 1) {
                    inputRes.prize = [{
                            name: formInfo.prize1 || ""
                        },
                        {
                            name: formInfo.prize2 || ""
                        },
                        {
                            name: formInfo.prize3 || ""
                        },
                    ]; // 奖品信息
                }

                result.push(inputRes);
            }
        },
        /**
         * 校验表单
         * @param formName
         * @param item
         * @returns {Promise<unknown>}
         */
        checkForm(formName, item) {
            return new Promise((resolve, reject) => {
                formName.validate((valid) => {
                    console.log("校验的结果==========", valid);
                    if (valid) {
                        resolve();
                    } else {
                        if (item && item.typeName) {
                            this.changeCheckbox(
                                item.idValue,
                                item.collapseName,
                                true
                            );
                        }
                        // resolve(false)
                        reject(false);
                    }
                });
            });
        },
        collapseOption(item, val) {
            return this[item].indexOf(val) == -1;
        },
        async initData() {
            try {
                let query = this.$route.query;

                if (query.id) {
                    let resLPData = await getCmsFriendConfigData({
                        id: query.id,
                    });
                    if (resLPData.code == 0) {
                        this.remoteData = resLPData.data;
                    }
                    if (query.copy == "1") {
                        // copy==1表示复制，
                        // 获取到数据后清空id，保存时走保存逻辑
                        this.pageTitle = "复制友介";
                    } else {
                        this.pageTitle = "编辑友介";
                    }
                } else {
                    this.pageTitle = "新建友介"; // 默认新建友介
                }

                document.title = this.pageTitle;
                // 设置title
                this.breadListData = [{
                        breadText: "友介管理",
                        toPath: "/marketActivies/friendIntroduce/manage",
                    },
                    {
                        breadText: this.pageTitle,
                        toPath: "",
                    },
                ];

                await this.getCities(); // 获取城市信息

                this.loading = false;
                if (!query.id) return; // 如果没有传id不用执行下方逻辑

                // ----------------------回显数据--------
                let remoteData = this.remoteData;
                remoteData.is_header_share += ""; // 转成字符串格式
                remoteData.is_user_share += ""; // 转成字符串格式
                remoteData.share_status += ""; // 转成字符串格式
                console.log(
                    remoteData.valid_start_time,
                    "::::",
                    remoteData.valid_end_time
                );
                if (remoteData.valid_start_time) {
                    // remoteData.valid_start_time = new Date(remoteData.valid_start_time * 1000).getTime();
                    remoteData.valid_start_time *= 1000;
                }
                if (remoteData.valid_end_time) {
                    // remoteData.valid_end_time = new Date(remoteData.valid_end_time * 1000).getTime();
                    remoteData.valid_end_time *= 1000;
                }

                this.ruleFormBase.checkedCities = this.remoteData.city_id.split(
                    ","
                );
                
                if(this.ruleFormBase.checkedCities.length === this.cities.length){
                    this.checkAllCityButtonVal = true; // 如果是全国需要让全国按钮选中
                }

                // 遍历咨询师模板列表，将数据存到collapse中并展开已选中的模板
                for (let item of this.remoteData.header_template) {
                    // 咨询师模板
                    this.consultantActiveNames.push(
                        Number(item.template_style_type)
                    ); // 1. 展开
                    this.ruleFormBase[
                        "consultantActiveNamesChecked" +
                        item.template_style_type
                    ] = true; // 2. 勾选
                    this.consultantCollapseType[
                        item.template_style_type - 1
                    ].templateData = item; // 3. 将数据对就到模板
                }

                // 遍历用户模板列表，将数据存到collapse中并展开已选中的模板
                for (let item of this.remoteData.user_template) {
                    // 用户模板
                    this.customerActiveNames.push(
                        Number(item.template_style_type)
                    ); // 1. 展开
                    this.ruleFormBase[
                        "customerActiveNamesChecked" + item.template_style_type
                    ] = true; // 2. 勾选
                    this.customerCollapseType[
                        item.template_style_type - 1
                    ].templateData = item; // 3. 将数据对就到模板
                }

                Object.assign(this.ruleFormBase, this.remoteData); // 父组件中的基本数据
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.initData();
    },
};
</script>

<style lang="scss" scoped>
.add-friend-introduce-wrap {
    flex: 1;
    //background: #fff;
    display: flex;
    flex-direction: column;
    color: #606266;

    /* 主要内容 */

    .content-wrap {
        padding: 10px 20px;

        .padding-side {
            padding: 0 50px;
        }
    }
    :deep() .el-collapse-item.is-disabled .el-collapse-item__header{
        cursor:default;
    }

    :deep() .el-checkbox.el-form-item__content {
        line-heigh: 15px;
        //margin-top: 10px;
    }

    /* collapse */

    :deep() .el-collapse-item__arrow {
        // margin-right: 50%;
        visibility: hidden;
    }

    :deep() .el-collapse-item {
        position: relative;
    }

    .collapse-item-control {
        text-align: center;
        margin-bottom: -20px;
        //padding-left: 57px;
        cursor: pointer;

        &:hover {
            color: #409eff;    
            background: rgba(234, 238,244,0.2);
        }
    }

    .collapse-flex-center {
        position: absolute;
        width: 100%;
        flex: 1;
        text-align: center;
        cursor: pointer;

        &:hover {
            color: #409eff;
            background: rgba(234, 238,244,0.2);
        }
    }
}
</style>

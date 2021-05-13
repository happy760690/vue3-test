<template>
<!--用于无限循环导航-->
<!--引用自身来实现无限循环，所以样式不太可控-->
<div
    v-if="item.child"
    class="sub-menu-box">
    <template v-if="item.child.length === 0">
        <el-menu-item :index="JSON.stringify(item)">{{item.menu_name}}</el-menu-item>
    </template>
    <el-submenu
        v-else
        :index="JSON.stringify(item)"
        @mouseover.native="openMenu"
        :popper-class="activeMenu"
        ref="openMenuItem">
        <template slot="title">{{item.menu_name}}</template>
        <template v-for="subChild in item.child">
            <sub-menu-item
                v-if="subChild.child && subChild.child.length > 0"
                :item="subChild"
                :key="subChild.menu_name + '_' + subChild.track_id"
                :menuLevel="menuLevel + 1" />
            <el-menu-item
                v-else
                :key="subChild.menu_name + '_' + subChild.track_id"
                :index="JSON.stringify(subChild)">
                {{subChild.menu_name}}
            </el-menu-item>
        </template>
    </el-submenu>
</div>
</template>

<script>
var secondMenuLocation = false; // 二级子菜单打开后距右面是否不足320, 因为是递归组件，放在data里会被初始化
export default {
    name: 'sub-menu-item',
    props: {
        item: {
            type: Object,
            default: function () {
                return {};
            }
        },
        menuLevel: {
            type: Number,
            default: 2
        }
    },
    data() {
        return {
            activeMenu: ''
        };
    },
    methods: {
        // 子菜单展开
        openMenu() {
            // 二级菜单展开
            if (this.menuLevel === 2) {
                // 如果页面offsetHeight / 二级子菜单的数量 < 36(36是每一个二级子菜单的高度) 二级子菜单顶部就会被挡住
                if (document.body.offsetHeight / this.item.child.length < 36) {
                    this.activeMenu = 'openActiveSecond';
                }
                var target = this.$refs.openMenuItem.$el;
                // 二级打开后据页面右边缘不足320（二级和三级子菜单需要的宽度）则给级子菜单添加一个类名
                if (document.body.offsetWidth - target.offsetLeft < 320) {
                    secondMenuLocation = true;
                } else {
                    secondMenuLocation = false;
                }
            }
            //  三级菜单展开
            if (this.menuLevel === 3 && secondMenuLocation) {
                setTimeout(() => {
                    this.$refs.openMenuItem.popperElm.classList.add('openActiveThird');
                }, 300)
            }
        }
    }
};
</script>

<style>
.openActiveSecond {
    position: absolute;
    top: 5px !important;
}

.openActiveThird {
    position: absolute;
    left: -160px !important;
}

.el-menu--popup {
    min-width: 160px;
}

.el-submenu .el-menu-item {
    min-width: 160px;
}
</style>
<style scoped>
.sub-menu-box>>>.el-submenu .el-submenu__title .el-submenu__icon-arrow {
    right: 0;
}

.sub-menu-box>>>.el-submenu .el-submenu__title {
    padding: 0 16px 0 10px;
}
</style>

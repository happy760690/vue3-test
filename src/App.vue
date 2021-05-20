<template>
  <div>
    <!--顶部栏-->
    <header-bar />
    <!-- 顶部栏下方主要内容，包括侧边栏和主内容区域 -->
    <main-container />
    <!-- <router-view/> -->
  </div>
</template>

<script>

import HeaderBar from './components/HeaderBar';
import MainContainer from './views/MainContainer';
export default {
  components: {
    HeaderBar, 
    MainContainer
  }
}
</script>
<style lang="scss" scoped>
#app {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>

<template>
  <div class="wrap">
    <!-- 顶部 -->
    <Header />
    <!-- 侧边导航栏 -->
    <Nav />
    <!-- 核心内容区 -->
    <Main />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Nav from "./components/nav.vue";
import Main from "./components/main.vue";
export default {
  name: "layout",
  components: {
    Header,
    Nav,
    Main,
  },
};
</script>

<style>
.wrap {
  background-color: #f5f5f7;
  height: 100%;
}
</style>

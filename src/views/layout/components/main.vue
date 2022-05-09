<template>
  <div class="content-wrap">
    <div class="content">
      <!-- 路由出口 -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// 导航栏以下部分
.content-wrap {
  height: 100%;
  padding-top: 50px;
  overflow: hidden;
}

.content {
  height: 100%;
  margin-left: 15vw;
  padding: 50px 3vw 0 2vw;
  // background-color: aqua;
}
</style>
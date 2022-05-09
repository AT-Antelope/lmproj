<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <!-- 网站标题 -->
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">评奖评优系统</a>
      </div>

      <!-- 顶部栏 其他功能 -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <!-- search 搜索框 -->
        <form class="navbar-form navbar-left searchBar">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="请输入关键字"
            />
          </div>
          <button type="submit" class="btn btn-default">搜索</button>
        </form>

        <!-- 退出登录 -->
        <ul class="nav navbar-nav navbar-right">
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "review",
  setup(props, { root }) {
    const router = useRouter();
    const data = reactive({});

    const logout = () => {
      router.replace({
        name: "Login",
      });
      localStorage.clear();
    };

    return {
      /* data */
      data,
      /* function */
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
// 导航栏按钮部分
.nav > li {
  border-right: solid rgba($color: grey, $alpha: 0.1) 1px;
  width: 130px;
  font-size: 20px;
  text-align: center;
  &:last-child {
    border-right: none;
  }
}
// 导航栏按钮背景
.nav-bg {
  background-color: rgba($color: #d6f2f3, $alpha: 0.7);
}

// 搜索框
.searchBar {
  margin-left: 25%;
  div {
    width: 25vw;
    margin-right: 5px;
    input {
      width: 100%;
    }
  }
}
</style>

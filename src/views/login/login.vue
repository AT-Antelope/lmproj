<template>
  <div class="outter-wrap">
    <div class="inner-wrap">
      <form class="form-horizontal login-wrap">
        <!-- 用户名 -->
        <div class="form-group">
          <div class="inputLabel">用户名:</div>
          <div class="col-sm-14">
            <input
              type="text"
              class="form-control"
              placeholder="请输入用户名"
              v-model="data.form.inputUsername"
            />
          </div>
        </div>

        <!-- 密码 -->
        <div class="form-group inputLabel">
          <div class="inputLabel">密码:</div>
          <div class="col-sm-14">
            <input
              type="password"
              class="form-control"
              placeholder="请输入密码"
              v-model="data.form.inputPassword"
            />
          </div>
        </div>

        <!-- 登录按钮 -->
        <div class="form-group p-l-50">
          <div class="col-offset-1 col-sm-10">
            <button
              type="button"
              @click="btnLogin"
              class="btn btn-lg btn-success"
              style="padding: 7px 20px"
            >
              登录
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- 警告框 Alert -->
    <div class="p-l-70vw">
      <!-- 登录成功 -->
      <div
        v-show="data.alertSuccessShow"
        class="alert alert-warning alert-dismissible"
        role="alert"
      >
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>登录成功！欢迎进入系统！</strong>
      </div>

      <!-- 警告框，登录失败 -->
      <div
        v-show="data.alertFailShow"
        class="alert alert-warning alert-dismissible"
        role="alert"
      >
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>账号或密码错误，请重试！</strong>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * admin:admin
 *
 * 2018121314:123
 */
/**
 * ! TODO 暂未使用 TOKEN 和 路由守卫，无法防止直接通过url跳过登录
 */
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { Login } from "../../utils/api";
export default defineComponent({
  name: "login",
  setup(props, { root }) {
    // tips: 必须提前声明，否则useRouter()为undefined，无法获取到useRouter().push()
    const router = useRouter();

    // v-model
    let data = reactive({
      alertSuccessShow: false, // 登录成功 警告框显示flag
      alertFailShow: false, // 登录失败 警告框显示flag
      form: {
        inputUsername: "",
        inputPassword: "",
      },
    });

    // 登录按钮
    const btnLogin = async () => {
      /**
       * 离线方式
       */
      // // 验证用户名,密码
      // if (
      //   data.form.inputUsername == "admin" &&
      //   data.form.inputPassword == "123"
      // ) {
      //   // 执行登录，0 管理员，1 学生权限
      //   userLogin(0);
      // } else if (
      //   data.form.inputUsername == "student" &&
      //   data.form.inputPassword == "123"
      // ) {
      //   // 执行登录
      //   userLogin(1);
      // } else {
      //   // 登录失败
      //   data.alertFailShow = true;
      //   setTimeout(() => {
      //     // 隐藏警告框
      //     data.alertFailShow = false;
      //   }, 1500);
      // }

      /**
       * 在线方式
       */
      // 执行登录
      userLogin();
    };

    // 登录，角色判断(自定义)，0:管理员，1:学生
    const userLogin = async () => {
      // 请求参数
      const params = {
        uid: data.form.inputUsername,
        password: data.form.inputPassword,
      };
      // 请求接口，登录
      // CHECK 使用接口代替
      const res = await Login(params);

      // 登录失败时，中断
      if (isNaN(res.data.data.power)) {
        data.alertFailShow = true;
        setTimeout(() => {
          // 隐藏警告框
          data.alertFailShow = false;
        }, 1500);
        return;
      }

      const userPermission = res.data.data.power;
      // 储存用户权限，用于判断是否是管理员，决定侧边栏显示的按钮等
      localStorage.setItem("userPermission", userPermission);
      // 储存登录成功的用户名，用于后续请求数据
      localStorage.username = data.form.inputUsername;
      // ! DANGER 储存密码，后端接口获取主页信息需要密码，莫名其妙
      localStorage.password = data.form.inputPassword;

      // TIP 显示登录成功通知，采用replace的路由跳转时，会被页面跳转时打断，无法携带至下个页面
      data.alertSuccessShow = true;

      // 用户权限为0 管理员时，直接跳转至 评奖列表页
      if (userPermission == 0)
        // 页面跳转
        router.replace({
          name: "ApplyItemDetail",
        });
      // 用户权限为1 学生时，正常跳转至 首页
      else
        router.replace({
          name: "Index",
        });

      // 延迟1.5秒跳转
      setTimeout(() => {
        // 隐藏警告框
        data.alertSuccessShow = false;
      }, 1500);
    };

    return {
      /* data */
      data,
      /* function */
      btnLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.outter-wrap {
  width: 100vw;
  height: 100vh;
  background-color: #344a5f;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: require("../../static/Desert1.jpg") no-repeat 0px 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.inner-wrap {
  /* 原布局 */
  // width: 400px;
  // height: 300px;
  // float: left;
  // background-color: rgb(163, 235, 163);
  margin-top: 50vh;
  margin-left: 50vw;
  transform: translate(-50%, -50%);

  /* 后采用布局 */
  width: 37%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 380px;
  background-color: rgba(75, 81, 95, 0.3);
  box-shadow: 7px 7px 17px rgba(52, 56, 66, 0.5);
  border-radius: 5px;
}
.login-wrap {
  padding: 40px 40px 40px 90px;
}
.form-group {
  margin: 15px 0;
  &:last-child {
    margin: 30px 0;
  }
  .inputLabel {
    float: left;
    position: relative;
    left: -70px;
    font-size: 18px;
    top: 30px;
  }
}
label {
  width: 30px;
}
.p-l-50 {
  padding-left: 20%;
}
.p-l-70vw {
  padding: 30px 30px 0 77vw;
}

// 提示框
.alert {
  position: absolute;
  top: 30px;
}
</style>

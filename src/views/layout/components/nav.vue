<template>
  <!-- tab 标签栏 -->
  <div class="nav-outter-wrap">
    <div class="nav-inner-wrap">
      <ul class="nav nav-tabs nav-stacked">
        <!-- 根据登录权限，循环显示对应 侧边导航栏 -->
        <li
          v-for="(itemTab, index) in data.tabActiveState"
          :key="index"
          role="presentation"
        >
          <!-- @click="tabApplyItemChange(index)" -->
          <!-- :class="itemTab.activeFlag ? 'active' : ''" -->

          <!-- 根据引入的json数据，实现不同功能的侧边导航栏按钮 -->
          <a @click="clickNav(itemTab)">{{ itemTab.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { userPermission } from "../../../static/json/json.js";
export default {
  name: "nav",
  setup() {
    const router = useRouter();
    /**
     * data
     */
    let data = reactive({
      // 侧边栏数据，从json获取
      tabActiveState: [],
    });

    /**
     * function
     */
    // tab导航栏点击事件
    let clickNav = (item) => {
      // console.log(item.routeName);

      // 转到对应页，根据传入的routeName
      router.push({
        name: item.routeName,
      });
    };

    /**
     * 生命周期
     */
    onMounted(() => {
      // 根据登录时储存的角色权限，来决定给导航栏列表的值，0 管理员，1 学生
      data.tabActiveState =
        localStorage.userPermission == 0
          ? userPermission.data.admin
          : userPermission.data.student;
    });

    // 已取消激活状态，暂弃用
    // // 表格顶部，标签栏状态改变事件，index: 当前点击按钮的下标
    // let tabApplyItemChange = (index) => {
    //   // 循环遍历标签栏，清空激活状态
    //   data.tabActiveState.forEach((e) => {
    //     e.activeFlag = false;
    //   });
    //   // 设置当前点击按钮为激活状态
    //   data.tabActiveState[index].activeFlag = true;
    // };

    return {
      /* data */
      data,
      /* function */
      // tabApplyItemChange,
      clickNav,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-outter-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 12vw;
  // height: 30vh;
  background-color: rgba($color: aquamarine, $alpha: 0.3);
  margin-top: 17vh;
  margin-left: 3vw;
}
.nav-inner-wrap {
  text-align: center;
}

ul li {
  background-color: rgba($color: #e8e8e8, $alpha: 1);
  margin: 15px 10%;
  border-top: dashed rgba($color: black, $alpha: 0.3) 1px;
  border-bottom: solid rgba($color: black, $alpha: 0.2) 2px;
  a {
    color: black;
    cursor: pointer;
  }
}
</style>

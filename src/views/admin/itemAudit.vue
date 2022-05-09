<template>
  <!-- 路径导航 面包屑 -->
  <ol class="breadcrumb">
    <span
      class="glyphicon glyphicon-chevron-left"
      aria-hidden="true"
      @click="routerBack"
    ></span>
    <li><a href="/index">主页</a></li>
    <li><a href="/applyItemDetail">评奖列表</a></li>
    <li class="active">项目审核</li>
  </ol>

  <!-- table 表格 -->
  <div>
    <div class="itemNameSpan">
      <span>项目名称</span>
    </div>
    <span class="itemName">{{ data.itemInfo.itemName }}</span>
  </div>

  <div class="table-responsive tb">
    <table class="table table-bordered">
      <tr class="table-top">
        <td>姓名</td>
        <td>学号</td>
        <td>班级</td>
        <td>通过</td>
        <td>退回</td>
      </tr>
      <tr v-for="item in data.userList" :key="item.studentId">
        <td>{{ item.name }}</td>
        <td>{{ item.uid }}</td>
        <td>{{ item.classname }}</td>
        <td>
          <a href="#" @click="evePass(item.uid, data.currentCategoryID)"
            >通过</a
          >
        </td>
        <td>
          <a href="#" @click="eveReturn(item.uid, data.currentCategoryID)"
            >退回</a
          >
        </td>
      </tr>
    </table>
  </div>

  <!-- 警告框 -->
  <div
    class="alert alert-success alert-dismissible alert-box"
    ref="alertBoxRef"
    v-show="data.alertBoxFlag"
    role="alert"
  >
    操作成功，
    <strong>{{ data.alertBoxText }}</strong>
  </div>
</template>

<script>
import {
  GetAwardList,
  GetApplyList,
  ApplyPass,
  ApplyReturn,
} from "@/utils/api.js";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// 获取模拟json数据
// import { notApplyItemJson, studentInfo } from "../../static/json/json.js";
export default {
  // 管理员，项目审核
  name: "itemAudit",
  setup() {
    const router = useRouter();
    const route = useRoute();

    /**
     * data
     */
    // 提示框Ref
    const alertBoxRef = ref();
    let data = reactive({
      itemInfo: [], // 项目详情
      userList: [], // 用户列表
      currentCategoryID: null, // 当前项目ID
      alertBoxFlag: false, // 操作成功提示框，是否显示
      // alertBoxStyle: {}, // 操作成功提示框，样式
      alertBoxText: "已通过",
    });

    /**
     * function
     */
    // 路由跳转，退回到路由栈里上一个页面
    const routerBack = () => {
      router.go(-1);
    };

    // 显示提示，警告框，传入 对象ref
    const alertBoxShow = (itemRef) => {
      itemRef.value.style.transition = "";
      itemRef.value.style.opacity = "1";
      itemRef.value.style.top = "165px";

      data.alertBoxFlag = true;

      setTimeout(() => {
        itemRef.value.style.transition = "linear .5s";
        itemRef.value.style.top = "140px";
        itemRef.value.style.opacity = "0";
      }, 500);
    };

    // 删除当前学生
    const handleOperation = (id) => {
      // 获取当前学生在数据数组中的下标
      const currentStudent = data.userList.findIndex((item) => item.uid === id);
      // 根据下标删除数据数组中元素
      data.userList.splice(currentStudent, 1);
    };

    // 通过事件
    const evePass = async (uid, pid) => {
      // CHECK 用通过接口代替
      const res = await ApplyPass({ uid, pid });

      // 接口请求出问题时，中断并返回
      if (res.code != 200) {
        alert("出错了，请稍后再试!");
        return;
      }

      data.alertBoxText = "已通过";
      // 显示提示框(成功)
      alertBoxShow(alertBoxRef);

      // 删除当前学生
      handleOperation(uid);
    };

    // 退回事件
    const eveReturn = async (uid, pid) => {
      // CHECK 用退回接口代替
      const res = await ApplyReturn({ uid, pid });

      // 接口请求出问题时，中断并返回
      if (res.code != 200) {
        alert("出错了，请稍后再试!");
        return;
      }

      data.alertBoxText = "已退回";
      // 显示提示框(成功)
      alertBoxShow(alertBoxRef);

      // 删除当前学生
      handleOperation(uid);
    };

    /**
     * 生命周期
     */
    onMounted(async () => {
      // 从跳转传参获取，当前项目ID
      data.currentCategoryID = route.params.currentID;

      /**
       * 在线方式
       */
      // 获取学生报名列表信息
      // CHECK 接口返回数据
      const resList = await GetApplyList({ pid: data.currentCategoryID });
      data.userList = resList.data.data.adminStudentVos;
      // console.log(data.userList);

      /**
       * 离线方式
       */
      // 获取当前项目数据，从列表根据项目ID筛选
      // for (let index = 0; index < notApplyItemJson.data.length; index++) {
      //   const element = notApplyItemJson.data[index];
      //   if (element.categoryId == data.currentCategoryID)
      //     data.itemInfo = element;
      // }

      // data.userList = studentInfo.data;
    });

    return {
      /* data */
      alertBoxRef,
      data,
      /* function */
      routerBack,
      evePass,
      eveReturn,
    };
  },
};
</script>

<style lang="scss" scoped>
// table里的a，"通过" "退回"
td {
  a {
    color: rgba($color: #23527c, $alpha: 0.7);
  }
}

/* 路径导航 面包屑 */
ol {
  background-color: rgba($color: #dbf3de, $alpha: 0.5);
  span {
    font-size: 18px;
    margin-right: 20px;
    cursor: pointer;
  }
}

/* 项目名称 */
.itemNameSpan {
  float: left;
  width: 300px;
  height: 65px;
  border: 1px solid black;
  text-align: center;
  span {
    font-size: 28px;
    &::after {
      // 使用伪元素实现垂直居中，以下属性缺一不可
      content: "";
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }
}
.itemName {
  float: left;
  margin-left: 20px;
  font-size: 22px;
  margin-top: 20px;
}

/* 表格 */
.tb {
  margin-top: 105px;
}
table tr {
  background-color: rgba($color: #d9edf7, $alpha: 0.5);
  td {
    padding: 15px;
    font-size: 18px;
    text-align: center;
    border-right: solid 1px rgba($color: black, $alpha: 0.3);
    border-bottom: solid 1px rgba($color: black, $alpha: 0.3);
    &:last-child {
      border-right: none;
    }
  }
}
.table-top {
  background-color: #e8e8e8;
}

// 操作成功提示框
.alert-box {
  position: absolute;
  width: 250px;
  top: 165px;
  right: 40px;
  padding-left: 30px;
}
</style>

<template>
  <!-- 管理员权限时，取消 顶部导航栏(面包屑) 显示 -->
  <div v-if="data.userPermission != 0">
    <!-- 路径导航 面包屑 -->
    <ol class="breadcrumb">
      <span
        class="glyphicon glyphicon-chevron-left"
        aria-hidden="true"
        @click="routerBack"
      ></span>
      <li><a href="/index">主页</a></li>
      <li class="active">评奖列表</li>
    </ol>
  </div>

  <!-- 添加项目，管理员权限才显示 -->
  <p v-if="data.userPermission == 0" style="height: 45px">
    <button
      @click="eveAddItem"
      style="float: left"
      class="btn btn-default btn-lg"
      type="submit"
    >
      添加项目
    </button>
    <!-- 小提示 -->
    <span class="tips">点击项目名称进入项目详情</span>
  </p>

  <!-- table 表格 -->
  <div class="table-responsive">
    <table class="table table-bordered">
      <tr class="table-top">
        <td>项目名称</td>
        <td>项目类别</td>
        <td>金额</td>
        <td>限制条件</td>
        <td>开关状态</td>
        <!-- 申请人数 / 申请状态，管理员权限 才显示，比学生界面多一列 -->
        <td v-if="data.userPermission == 0">申请人数</td>
        <!-- 申请状态，管理员权限 显示空列名(第一行列头为 项目审核 按钮，不需要列名)，学生 则显示申请状态 -->
        <td v-if="data.userPermission == 0"></td>
        <td v-else>申请状态</td>
      </tr>
      <!-- table 数据栏 -->
      <tr v-for="item in data.tableList" :key="item.pid">
        <!-- 项目名称，可点击，进入项目详情页 -->
        <td @click="eveGotoItemDetail(item.pid)" class="tdCategoryName">
          {{ item.pname }}
        </td>
        <td>{{ item.pgenre }}</td>
        <td>{{ item.pmoney }}</td>
        <!-- 限制条件，循环遍历当前项目的 limitCondition，是个数组 -->
        <td class="limitCondition">
          <!-- 限制条件每一条前面加上序号，下标从0开始，所以 +1 就是当前序号 -->
          <!-- <p v-for="(pItem, index) in item.limitCondition" :key="index"> -->
          <!-- {{ index + 1 }}.{{ pItem }} -->
          <!-- </p> -->

          <p>{{ item.pcondition }}</p>
        </td>

        <!-- 开关状态，0 管理员 显示 开启/关闭申请，否则为学生 显示 申请中/不可申请 -->
        <!-- <td v-if="data.userPermission == 0">
          {{ item.switchState ? "开启申请" : "关闭申请" }}
        </td>
        <td v-else>
          {{ item.applyState ? "申请中" : "不可申请" }}
        </td> -->
        <td>
          {{
            item.pstate == 1 ? "可申请" : item.pstate == 2 ? "审核中" : "不通过"
          }}
        </td>

        <!-- 申请人数 -->
        <td v-if="data.userPermission == 0">
          {{ item.pnum }}
        </td>

        <!-- 0 管理员 显示项目审核，1 学生 显示 申请 -->
        <td>
          <!-- :disabled="item.pstate != 1" -->
          <button
            class="btn btn-default btn-lg"
            type="submit"
            @click="btnSubmit(item.pid)"
            :disabled="item.pstate != 1"
          >
            <span v-if="data.userPermission == 0">项目审核</span>
            <span v-else-if="data.userPermission != 0">
              <!-- 0 不通过，1 可申请，2 审核中 -->
              <!-- {{
                item.pstate == 1
                  ? "申请"
                  : item.pstate == 2
                  ? "审核中"
                  : "不通过"
              }} -->
              申请
            </span>
            <span v-else>申请</span>
          </button>
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
    <strong>{{ data.alertBoxText }}</strong>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
// 获取模拟json数据
// import { notApplyItemJson } from "../../static/json/json.js";
import { GetAwardList, StuApplyAward } from "../../utils/api.js";
export default {
  // 审评列表
  name: "applyItemDetail",
  setup() {
    const router = useRouter();
    /**
     * data
     */
    // 用于控制提示框的显示
    const alertBoxRef = ref();
    let data = reactive({
      tableList: {}, // 表格数据
      userPermission: null, // 从localStorage取出的用户权限，0 管理员，1 学生
    });

    /**
     * function
     */
    // 路由跳转，退回到路由栈里上一个页面
    const routerBack = () => {
      router.back(-1);
    };
    // 跳转到项目详情
    // 传参: fromAddItem 是否因为点击 添加项目 进入项目详情，0 否(默认)，1 是
    // currentId 当前项目id，默认-1，需要传id时再赋值覆盖默认值
    const routerToItemDetail = (fromAddItem = false, currentId = -1) => {
      router.push({
        name: "ItemDetail",
        params: { fromAddItem, currentId },
      });
    };

    // 添加项目，按钮
    const eveAddItem = () => {
      routerToItemDetail(true);
    };

    // 转到项目详情，点击项目名称
    const eveGotoItemDetail = (currentID) => {
      // 非管理员直接中断，阻止跳转
      if (localStorage.userPermission != 0) return;
      routerToItemDetail(false, currentID);
    };

    // 显示提示框，传入 对象ref
    const alertBoxShow = (itemRef) => {
      itemRef.value.style.transition = "";
      itemRef.value.style.opacity = "1";
      itemRef.value.style.top = "70px";

      // 显示提示框
      data.alertBoxFlag = true;

      setTimeout(() => {
        itemRef.value.style.transition = "linear .5s";
        itemRef.value.style.top = "30px";
        itemRef.value.style.opacity = "0";
      }, 1500);
    };

    // 按钮，转到项目审核页(管理员) / 申请(学生)
    const btnSubmit = async (currentID) => {
      // 管理员，转到项目审核页
      if (data.userPermission == 0) gotoItemAudit(currentID);
      else {
        // 学生，申请

        /**
         * 在线方式
         */
        // 弹出确认提示框
        if (confirm("是否确认")) {
          // CHECK 用接口发送数据，改变项目详情参数
          const res = await StuApplyAward({
            stuId: localStorage.getItem("username"),
            pid: currentID,
          });
          // console.log(res);

          // 请求失败，则中断并返回
          if (res.data.code != 200) {
            alert("出错了，请稍后重试！");
            return;
          }

          data.alertBoxText = "操作成功，申请成功！";
          // 显示提示框(成功)
          alertBoxShow(alertBoxRef);

          // 不可申请时，中断并返回
          // TODO 根据返回的isok，判断是否通过操作 接口还未完善
          if (res.data.data.isok != 1) {
            data.alertBoxText = "操作失败，条件不符合！";
            return;
          }

          // 更新本地页面，改变申请状态标识为2 审核中
          // 修改tableList中当前数据的申请状态
          const currentItem = data.tableList.filter(
            (item) => item.pid === currentID
          )[0];
          currentItem.pstate = 2;

          // // 禁用申请按钮标识为true
          // // DONE 原使用页面中flag，手动控制按钮禁用状态，已改为按实际返回数据判断是否禁用按钮
          // currentItem.btnDisabledFlag = true;
        }
      }

      /**
       * 离线方式
       */
      // // DELETE/INSTEAD 暂固定id为2的学生不通过
      // if (currentID == 2) {
      //   alert("您的条件不符合");
      //   return;
      // }
    };

    // 管理员，转到项目审核页
    const gotoItemAudit = (currentID) => {
      router.push({
        name: "ItemAudit",
        params: { currentID },
      });
    };

    /**
     * 生命周期
     */
    onMounted(async () => {
      /**
       * 离线方式
       */
      // // 获取列表数据
      // data.tableList = notApplyItemJson.data;

      /**
       * 在线方式
       */
      // CHECK: 用接口获取数据代替
      const res = await GetAwardList();
      data.tableList = res.data.data.projectsEntities;
      // console.log(data.tableList);

      // 从本地储存，获取当前用户权限，分辨是管理员还是学生
      data.userPermission = localStorage.userPermission;
    });

    return {
      /* data */
      alertBoxRef,
      data,
      /* function */
      routerBack,
      btnSubmit,
      eveAddItem,
      eveGotoItemDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  color: black;
}

/* 导航 面包屑 */
ol {
  background-color: rgba($color: #dbf3de, $alpha: 0.5);
  span {
    font-size: 18px;
    margin-right: 20px;
    cursor: pointer;
  }
}

/* 表格 */
table {
  // 消除可选中文字的鼠标图标
  cursor: default;
}

.tdCategoryName {
  cursor: pointer;
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
.limitCondition {
  text-align: left;
  padding-left: 40px;
}
.tips {
  position: absolute;
  transform: translate(15px, 20px);
  color: grey;
  font-size: 16px;
  line-height: 20px;
}

// 操作成功提示框
.alert-box {
  position: absolute;
  width: 250px;
  top: 130px;
  right: 40px;
  padding-left: 30px;
}
</style>

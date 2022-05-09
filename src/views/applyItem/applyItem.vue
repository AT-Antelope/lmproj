<template>
  <!-- 个人信息 -->
  <div class="information">
    <p>
      <span> 姓名: </span><strong>{{ data.name }}</strong>
    </p>
    <p>
      <!-- 0 管理员 显示工号，1 学生 显示学号 -->
      <span> {{ data.userPermission == 0 ? "工号" : "学号" }}: </span>
      <strong>{{ data.id }}</strong>
    </p>
  </div>

  <!-- 加分管理 -->
  <div class="item-group">
    <!-- 评奖评优 -->
    <p>加分管理</p>
    <div class="table-wrap">
      <table class="table table-striped">
        <tr class="table-top">
          <td>加分名称</td>
          <td>申请状态</td>
        </tr>
        <tr v-for="itemTable in data.pointPlusManageList" :key="itemTable.id">
          <td>{{ itemTable.oname }}</td>
          <!-- 0:不可申请,1:可申请,2:审核中 -->
          <td>
            {{
              itemTable.ostate == 1
                ? "可申请"
                : itemTable.ostate == 2
                ? "审核中"
                : "不通过"
            }}
          </td>
        </tr>
      </table>
    </div>

    <!-- 评奖评优 -->
    <p>评奖评优</p>
    <div class="table-wrap">
      <table class="table table-striped">
        <tr class="table-top">
          <td>项目名称</td>
          <td>申请状态</td>
        </tr>
        <tr v-for="itemTable in data.ItemList" :key="itemTable.categoryId">
          <td>{{ itemTable.pname }}</td>
          <td>
            {{
              itemTable.applystate == 1
                ? "可申请"
                : itemTable.applystate == 2
                ? "审核中"
                : "不通过"
            }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { notApplyItemJson, userInfo } from "../../static/json/json.js";
import { pointPlusManageList } from "../../static/json/json.js";
import { GetAwardJudgeData } from "../../utils/api.js";
export default {
  // 主页
  name: "applyItem",
  setup(props, { root }) {
    /**
     * data
     */
    const data = reactive({
      name: "", // 姓名
      id: "", // 工号/学号
      pointPlusManageList: [
        {
          title: "暂无",
        },
      ],
      ItemList: [],
      userPermission: -1, // 用户权限，0 管理员，1 学生
    });

    /**
     * 生命周期
     */
    onMounted(async () => {
      // 提取用户权限，从localStorage
      data.userPermission = localStorage.userPermission;

      /**
       * 在线方式
       */
      // CHECK 接口完成后调整
      const res = await GetAwardJudgeData();
      // console.log(res);  

      // 判断储存起来的用户权限，0管理员，1学生
      if (localStorage.userPermission == 1) {
        data.name = res.data.data.studentInfoVo.name;
        data.id = res.data.data.studentInfoVo.studnetId;
      } else {
        data.name = "admin";
        data.id = "0001";
      }

      data.pointPlusManageList = res.data.data.studentInfoVo.stuAddPoints;
      data.ItemList = res.data.data.studentInfoVo.stuAppraisingInfos;

      /**
       * 离线方式
       */
      // // 初始化个人信息
      // if (localStorage.userPermission == 0) {
      //   data.name = userInfo.data.admin.username;
      //   data.id = userInfo.data.admin.jobNumber;
      // } else {
      //   data.name = userInfo.data.student.username;
      //   data.id = userInfo.data.student.studentId;
      // }

      // // 模拟获取项目信息
      // data.ItemList = notApplyItemJson.data;
      // data.pointPlusManageList = pointPlusManageList.data;
    });
    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
/* 个人信息 */
.information {
  width: 60vw;
  margin: 0 100px;
  padding: 50px 100px;
  border: double black 3px;
  p {
    font-size: 32px;
  }
}

/* 加分管理，评奖评优 */
.item-group {
  > p {
    margin-top: 30px;
    font-size: 24px;
  }
  table tr {
    td {
      padding-left: 50px;
      font-size: 18px;
      height: 50px;
      border: solid 1px rgba($color: black, $alpha: 0.3);
    }
  }
  .table-wrap {
    height: 20rem;
    overflow-y: scroll;
    border-bottom: 1px dashed rgba($color: black, $alpha: 0.3);
  }
}
.table-top {
  td {
    font-weight: bold;
    background-color: #e8e8e8;
    border-top: dashed 1px rgba($color: black, $alpha: 0.3) !important;
  }
}
</style>

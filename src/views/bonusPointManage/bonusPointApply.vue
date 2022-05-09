<template>
  <!-- 路径导航 面包屑 -->
  <ol class="breadcrumb">
    <span
      class="glyphicon glyphicon-chevron-left"
      aria-hidden="true"
      @click="routerBack"
    ></span>
    <li><a href="/index">主页</a></li>
    <li class="active">加分申请</li>
  </ol>

  <!-- 表单 main -->
  <div class="mainWrap">
    <div class="mainForm">
      <form class="form-horizontal">
        <!-- 加分名称 -->
        <div class="form-group form-group-lg">
          <label for="itemName" class="col-sm-3 control-label">加分名称</label>
          <div class="col-sm-3">
            <select class="form-control" v-model="data.form.name">
              <option v-for="item in data.itemInfo" :key="item.pid">
                {{ item.pname }}
              </option>
            </select>
          </div>
        </div>

        <!-- 加分类别 -->
        <div class="form-group form-group-lg">
          <label for="itemName" class="col-sm-3 control-label">加分类别</label>
          <div class="col-sm-3">
            <select class="form-control" v-model="data.form.category">
              <option v-for="item in data.itemInfo" :key="item.pid">
                {{ item.pgenre }}
              </option>
            </select>
          </div>
        </div>

        <!-- 分数 -->
        <div class="form-group form-group-lg">
          <label for="money" class="col-sm-3 control-label">分数</label>
          <div class="col-sm-2">
            <input
              type="text"
              v-model="data.form.point"
              class="form-control"
              placeholder="分数"
            />
          </div>
        </div>

        <!-- 申请自述文件 -->
        <div class="form-group form-group-lg">
          <label for="limitCondition" class="col-sm-3 control-label"
            >申请理由</label
          >
          <div class="col-sm-4 inputFile" style="margin-top: 10px">
            <!-- <input type="file" accept=".docx,.doc" /> -->
            <textarea
              class="form-control"
              rows="5"
              style="resize: vertical"
              v-model="data.form.limitCondition"
            ></textarea>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-group form-group-lg" style="margin-top: 3vh">
          <div class="col-sm-offset-3 col-sm-1">
            <button
              type="button"
              @click="eveSubmit"
              class="btn btn-success btn-lg"
            >
              确认申请
            </button>
          </div>

          <div class="col-sm-1" style="margin-left: 3vw">
            <button
              type="button"
              @click="eveCancel"
              class="btn btn-info btn-lg"
            >
              取消申请
            </button>
          </div>
        </div>
      </form>
    </div>
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
import { notApplyItemJson } from "../../static/json/json.js";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GetAwardApplyData, StuApplyPointPlus } from "@/utils/api.js";
export default {
  // 学生，加分申请
  name: "bonusPointApply",
  setup() {
    const route = useRoute();
    const router = useRouter();

    /**
     * data
     */
    const alertBoxRef = ref();
    const data = reactive({
      form: {
        itemName: [], // 加分名称
        itemCategory: [], // 加分类别
        name: "", // 加分名称下拉框的model绑定值
        category: "", // 加分类别下拉框的model绑定值
        point: 0, // 分数
        limitCondition: "", // 限制条件
      },
      // 当前项目信息
      itemInfo: [],
      // 当前项目ID
      currentCategoryID: null,
    });

    /**
     * function
     */
    // 路由跳转，退回到路由栈里上一个页面
    const routerBack = () => {
      router.back(-1);
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

    // 确认修改，按钮
    const eveSubmit = async () => {
      // 请求用的参数
      const params = {
        oname: data.form.name,
        ogenre: data.form.category,
        onum: Number.parseInt(data.form.point),
        ofile: data.form.limitCondition,
      };
      // CHECK 用接口发送数据，改变项目详情参数
      const res = await StuApplyPointPlus(params, localStorage.username);
      
      // 请求成功/失败的反馈
      if (res.data.code == 200) {
        data.alertBoxText = "已通过";
        alertBoxShow(alertBoxRef);
      } else {
        alert("出错了，请稍后再试！");
      }
    };

    // 取消修改，按钮
    const eveCancel = () => {
      routerBack();
    };

    /**
     * 生命周期
     */
    onMounted(async () => {
      // 从跳转传参获取，当前项目ID
      data.currentCategoryID = route.params.currentId;

      /**
       * 在线方式
       */
      // 获取当前项目数据，从列表根据项目ID筛选
      // CHECK 用接口获取数据代替，后端按ID筛选？
      const res = await GetAwardApplyData();
      data.itemInfo = res.data.data.projectsEntities;
      // console.log(data.itemInfo);

      // 初始化两个下拉框值，显示为数据第一项
      data.form.name = data.itemInfo[0].pname;
      data.form.category = data.itemInfo[0].pgenre;

      /**
       * 离线方式
       */
      // for (let index = 0; index < notApplyItemJson.data.length; index++) {
      //   const element = notApplyItemJson.data[index];
      //   if (element.categoryId == data.currentCategoryID) {
      //     data.itemInfo = element;
      //   }
      // }

      // // 从 审评列表页-添加项目 进来时中断初始化，实现空白表单状态
      // console.log(route.params.fromAddItem);
      // if (route.params.fromAddItem == true) return;

      // // 数据初始化到v-model，从当前项目信息获取
      // if (data.itemInfo.categoryId >= 0) {
      //   data.form.itemName = data.itemInfo.itemName;
      //   data.form.itemCategory = data.itemInfo.category;
      //   data.form.money = data.itemInfo.money;
      //   // 把 限制条件数组 每项组件加入换行符，转成字符串
      //   data.form.limitCondition = data.itemInfo.limitCondition.join("\r\n");
      // }
    });

    return {
      /* data */
      alertBoxRef,
      data,
      /* function */
      routerBack,
      eveSubmit,
      eveCancel,
    };
  },
};
</script>

<style lang="scss" scoped>
/* 路径导航 面包屑 */
ol {
  background-color: rgba($color: #dbf3de, $alpha: 0.5);
  span {
    font-size: 18px;
    margin-right: 20px;
    cursor: pointer;
  }
}

/* 表单 */
.mainWrap {
  margin-top: 5vh;
  // padding-right: 15vw;
}

// 申请自述文件
.inputFile {
  font-size: 18px;
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

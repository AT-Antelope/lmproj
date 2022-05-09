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
    <li class="active">
      {{ data.pageFromAddItem == "true" ? "添加项目" : "项目详情" }}
    </li>
  </ol>

  <!-- 表单 main -->
  <div class="mainWrap">
    <div class="mainForm">
      <form class="form-horizontal">
        <!-- 项目名称 -->
        <div class="form-group form-group-lg">
          <label for="itemName" class="col-sm-3 control-label">项目名称</label>
          <div class="col-sm-5">
            <input
              type="text"
              v-model="data.form.itemName"
              class="form-control"
              placeholder="项目名称"
            />
          </div>
        </div>

        <!-- 项目类别 -->
        <div class="form-group form-group-lg">
          <label for="itemCategory" class="col-sm-3 control-label"
            >项目类别</label
          >
          <div class="col-sm-5">
            <input
              type="text"
              v-model="data.form.itemCategory"
              class="form-control"
              placeholder="项目类别"
            />
          </div>
        </div>

        <!-- 金额 -->
        <div class="form-group form-group-lg">
          <label for="money" class="col-sm-3 control-label">金额</label>
          <div class="col-sm-5">
            <input
              type="text"
              v-model="data.form.money"
              class="form-control"
              placeholder="金额"
            />
          </div>
        </div>

        <!-- 限制条件 -->
        <div class="form-group form-group-lg">
          <label for="limitCondition" class="col-sm-3 control-label"
            >限制条件</label
          >
          <div class="col-sm-9 limitCondition">
            <!-- 无违纪情况 -->
            <div class="radio">
              <label>
                <input
                  type="checkbox"
                  name="optionsRadios"
                  id="optionsRadios1"
                  value="0"
                  checked
                />
                <!-- v-model="data.form.limitCondition" -->
                <span>无违纪情况</span>
              </label>
            </div>

            <!-- 在校期间 -->
            <div class="radio">
              <label>
                <input
                  type="checkbox"
                  name="optionsRadios"
                  id="optionsRadios2"
                  value="1"
                  checked
                />
                <!-- v-model="data.form.limitCondition" -->
                <span>在校期间</span>
              </label>
              &nbsp;

              <!-- 学年，下拉框 -->
              <select v-model="data.form.limitTime">
                <option
                  v-for="item in data.limitConditionDatas.limitTime"
                  :key="item.id"
                >
                  {{ item.time }}
                </option>
              </select>
              &nbsp;

              <!-- 科目，下拉框 -->
              <select
                v-model="data.form.limitCategory"
                style="padding-bottom: 3px"
              >
                <option
                  v-for="item in data.limitConditionDatas.limitCategory"
                  :key="item.id"
                >
                  {{ item.categoryName }}
                </option>
              </select>

              &nbsp;
              <span>大于等于</span>

              &nbsp;
              <input
                type="text"
                v-model="data.form.limitPoint"
                style="width: 50px"
              />
              &nbsp;
              <span>分</span>
            </div>
          </div>
        </div>

        <!-- 开关状态 -->
        <div class="form-group form-group-lg">
          <label for="switchState" class="col-sm-3 control-label"
            >开关状态</label
          >
          <div class="col-sm-5 switchStateWrap">
            <input
              type="checkbox"
              v-model="data.form.switchState"
              id="radioOpen"
            />
            <label for="radioOpen">开启申请</label>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-group form-group-lg">
          <!-- 确认修改，按钮 -->
          <div class="col-sm-offset-4 col-sm-1">
            <button
              type="button"
              @click="eveSubmit"
              class="btn btn-success btn-lg"
            >
              <!-- 从添加项目来的则显示"添加项目"，否则就是点击项目名称进来的显示"确认修改" -->
              {{ data.pageFromAddItem == "true" ? "添加项目" : "确认修改" }}
            </button>
          </div>
          <!-- 取消修改，按钮 -->
          <div class="col-sm-1">
            <button
              type="button"
              @click="eveCancel"
              class="btn btn-info btn-lg"
            >
              {{ data.pageFromAddItem == "true" ? "取消添加" : "取消修改" }}
            </button>
          </div>
          <!-- 删除项目，按钮 -->
          <!-- ! TIP 转成字符串后正常实现值对比，否则被进行 判断data下是否有pageFromAddItem这个属性，无论怎样都返回false -->
          <div v-if="data.pageFromAddItem == 'false'" class="col-sm-1">
            <button
              type="button"
              @click="eveDeleteItem"
              class="btn btn-danger btn-lg"
            >
              删除项目
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  notApplyItemJson,
  limitConditionData,
} from "../../static/json/json.js";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AddProject, deleteProject, GetAwardList } from "@/utils/api.js";
export default {
  // 管理员，项目详情
  name: "itemDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();

    /**
     * data
     */
    const data = reactive({
      form: {
        itemName: "", // 项目名称
        itemCategory: "", // 项目类别
        money: 0, // 金额
        switchState: false, // 开关状态
        limitCondition: 0, // 限制条件model
        limitTime: "", // 限制条件 学年model
        limitCategory: "", // 限制条件 科目model
        limitPoint: "", // 限制条件 分数model
      },
      limitConditionDatas: {
        limitTime: [
          {
            id: "18",
            time: "2018.08 ~ 2019.06",
          },
          {
            id: "19",
            time: "2019.08 ~ 2020.06",
          },
          {
            id: "20",
            time: "2020.08 ~ 2021.06",
          },
          {
            id: "21",
            time: "2021.08 ~ 2022.06",
          },
        ],
        limitCategory: [
          {
            id: "category1",
            categoryName: "科目一",
          },
          {
            id: "category2",
            categoryName: "科目二",
          },
          {
            id: "category3",
            categoryName: "科目三",
          },
        ],
      },
      // 当前项目信息
      itemInfo: [],
      // 当前项目ID
      currentCategoryID: null,
      // 入口来源，从什么页面进来的
      pageFromAddItem: null,
    });

    /**
     * function
     */
    // 路由跳转，退回到路由栈里上一个页面
    const routerBack = () => {
      router.back(-1);
    };

    // 确认修改，按钮
    const eveSubmit = async () => {
      const conditionData =
        data.form.limitCondition == 1
          ? `无违纪情况，在校期间${data.form.limitTime}${data.form.limitCategory}大于等于${data.form.limitPoint}分`
          : "无违纪情况";

      // 请求用的参数
      // CHECK 限制条件参数调整
      if (confirm("是否确认")) {
        const form = data.form;
        const params = {
          pname: data.form.itemName,
          pgenre: data.form.itemCategory,
          pmoney: data.form.money,
          // pcondition: conditionData,
          pcondition: `无违纪情况，在校期间${data.form.limitTime}${data.form.limitCategory}大于等于${data.form.limitPoint}分`,
          pstate: data.form.switchState ? 1 : 0,
        };
        console.log(params);
        // 请求接口
        // CHECK 用接口发送数据，改变项目详情参数
        const res = await AddProject(params);

        // 修改成功后提示，并返回
        if (res.data.code === 200)
          setTimeout(() => {
            // 确认
            alert("添加成功");
            router.push("/applyItemDetail");
          }, 300);
      }
    };

    // 取消修改，按钮
    const eveCancel = () => {
      routerBack();
    };

    // 删除项目，按钮
    const eveDeleteItem = async () => {
      if (confirm("是否删除项目")) {
        // CHECK 用接口发送数据，根据当前项目ID，删除项目详情参数
        const res = await deleteProject(data.currentCategoryID);
        // console.log(res);

        if (res.data.code != 200) {
          alert("修改失败，请稍后重试！");
          return;
        }

        // 确认
        alert("删除成功");
        router.push("/applyItemDetail");
      }
    };

    /**
     * 生命周期
     */
    onMounted(async () => {
      // 从跳转传参获取，当前项目ID
      data.currentCategoryID = route.params.currentId;

      // 缓存进入页面的方式，决定是否继续初始化表单内容
      data.pageFromAddItem = route.params.fromAddItem;

      // 从 添加项目 进来时中断初始化实现空白页面
      // 发现从添加项目按钮进来时，得到undefined，现无须判断也能达到预期效果
      if (data.pageFromAddItem == "true") return;

      /**
       * 在线方式
       */
      // 获取当前项目数据，从列表根据项目ID筛选
      // CHECK 用接口获取数据代替，后端按ID筛选？
      const res = await GetAwardList();
      data.itemInfo = res.data.data.projectsEntities.find(
        (item) => item.pid == data.currentCategoryID
      );

      // 未获取到当前项目，中断并返回，添加项目进来时没有当前id
      if (!data.itemInfo) return;
      // 拿一份当前项目数据
      const formData = data.itemInfo;
      data.form.itemName = formData.pname;
      data.form.itemCategory = formData.pgenre;
      data.form.money = formData.pmoney;
      // TODO 限制条件格式确定后，进行数据处理成页面要显示的方式
      data.form.limitCondition = formData.pcondition ? 1 : 0;
      data.form.switchState = formData.pstate == 1 ? true : false;

      // // 初始化 学年 下拉框
      data.form.limitTime = data.limitConditionDatas.limitTime[0].time;

      // 初始化 下拉框 科目
      const categoryString = data.itemInfo.pcondition.charAt(
        data.itemInfo.pcondition.indexOf("科目") + 2
      );
      data.form.limitCategory = "科目" + categoryString;

      // 初始化 输入框 分数
      // // 下标截取版，只能固定2位数
      // const indexPoint = data.itemInfo.pcondition.lastIndexOf("分");
      // data.form.limitPoint = data.itemInfo.pcondition.substring(
      //   indexPoint - 2,
      //   indexPoint
      // );
      // console.log(data.form.limitPoint);
      // ! TIP 正则表达式版，可任意位数，g标识: 返回所有匹配的组成数组，否则只返回最初匹配的组成数组
      const indexPoint = data.itemInfo.pcondition.match(/[0-9]\d*/g);
      data.form.limitPoint = indexPoint[indexPoint.length - 1];

      /**
       * 离线方式
       */
      // for (let index = 0; index < notApplyItemJson.data.length; index++) {
      //   const element = notApplyItemJson.data[index];
      //   if (element.categoryId == data.currentCategoryID) {
      //     data.itemInfo = element;
      //   }
      // }

      // // 数据初始化到v-model，从当前项目信息获取
      // if (data.itemInfo.categoryId >= 0) {
      //   data.form.itemName = data.itemInfo.itemName;
      //   data.form.itemCategory = data.itemInfo.category;
      //   data.form.money = data.itemInfo.money;
      //   // 把 限制条件数组 每项组件加入换行符，转成字符串
      //   data.form.limitCondition = data.itemInfo.limitCondition;
      //   data.form.switchState = data.itemInfo.switchState;
      // }
      // console.log(data.form);

      // // 获取限制条件参数，下拉框数据
      // data.limitConditionDatas = limitConditionData.data;
      // // console.log(data.limitConditionDatas);
    });

    return {
      /* data */
      data,
      /* function */
      routerBack,
      eveSubmit,
      eveCancel,
      eveDeleteItem,
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

.mainWrap {
  margin-top: 5vh;
}

.limitCondition {
  span {
    font-size: 18px;
  }
}

.switchStateWrap {
  font-size: 18px;
  line-height: 47px;
  input {
    width: 16px;
    height: 16px;
    /* 圆形 radio */
    // appearance: radio;
  }
  label {
    padding-left: 5px;
  }
}
</style>

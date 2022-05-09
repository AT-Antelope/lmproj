// 评奖列表数据
// 限制条件: 采用数组的形式，通过覆盖来改写数据
export const notApplyItemJson = {
  data: [
    {
      itemName: "毕业生甲等奖学金", // 项目名称
      category: "荣誉称号", // 项目类别
      categoryId: 0, // 项目ID
      money: "300", // 金额
      limitCondition: [
        '在校期间"2020-2021"无违纪情况',
        '在校期间"2020-2021各科成绩"大于等于75分',
      ], // 限制条件
      applyState: false, // 申请状态
      btnDisabledFlag: true, // 申请按钮禁用状态
      switchState: false, // 开关状态
      appliedCount: 0, // 申请人数
    },
    {
      itemName: "毕业生乙等奖学金",
      category: "荣誉称号",
      categoryId: 1,
      money: "200",
      limitCondition: [
        '在校期间"2020-2021"无违纪情况',
        '在校期间"2020-2021各科成绩"大于等于70分',
      ],
      applyState: false,
      btnDisabledFlag: false,
      switchState: true,
      appliedCount: 13,
    },
    {
      itemName: "考研奖学金",
      category: "奖金",
      categoryId: 2,
      money: "500",
      limitCondition: [
        '在校期间"2020-2021"无违纪情况',
        '在校期间"2020-2021各科成绩无不合格科目"',
      ],
      applyState: false,
      btnDisabledFlag: false,
      switchState: true,
      appliedCount: 7,
    },
  ],
};

// 限制条件参数
export const limitConditionData = {
  data: {
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
};

// 用户权限
export const userPermission = {
  data: {
    admin: [
      // { title: "个人信息", activeFlag: true },
      { title: "评奖列表", routeName: "ApplyItemDetail" },
      { title: "加分管理", routeName: "BonusPointManage" },
    ],
    student: [
      { title: "评奖列表", routeName: "ApplyItemDetail" },
      { title: "加分申请", routeName: "BonusPointApply" },
    ],
  },
};

// 账户信息，权限
export const userInfo = {
  data: {
    admin: {
      username: "admin",
      jobNumber: "0001",
    },
    student: {
      username: "student",
      studentId: "2018121314",
    },
  },
};

// 学生信息
export const studentInfo = {
  data: [
    {
      name: "刘大", // 姓名
      studentId: "20181314", // 学号
      class: "软工1班", // 班级
      applyReason:
        "20181314.docxaskefkakefjoiasjedmiopfjaeopiswjfoipaesdjfoipjaseoipfjasoeipjfopaisejfopiasejdfoip", // 申请理由
      point: "11", // 分数
    },
    {
      name: "刘大1",
      studentId: "20221111",
      class: "软工2班",
      applyReason: "20221111.docx",
      point: "22",
    },
    {
      name: "刘大22",
      studentId: "20221222",
      class: "软工3班",
      applyReason: "20221222.docx",
      point: "33",
    },
    {
      name: "刘大333",
      studentId: "20221333",
      class: "软工4班",
      applyReason: "20221333.docx",
      point: "44",
    },
  ],
};

// 学生信息
export const pointPlusManageList = {
  data: [
    {
      bounsname: "德育分", // 姓名
      applystate: "已通过", // 学号
    },
    {
      bounsname: "社会劳动分",
      applystate: "审核中",
    },
  ],
};

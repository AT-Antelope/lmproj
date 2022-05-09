import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

service.interceptors.request.use((config) => {
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

/**
 * 登录
 * {
 *    *uid:""
 *    *password:""
 * }
 */
export function Login(data) {
  return service.request({
    method: "post",
    url: "/users/login",
    data,
  });
}

/**
 * 评奖评优数据
 */
export function GetAwardJudgeData() {
  return service.request({
    method: "post",
    url: `/users/getStudentInfo/${localStorage.getItem("username")}`,
  });
}

/**
 * 获取评奖列表
 */
export function GetAwardList() {
  return service.request({
    method: "get",
    url: `/award/list`,
    cancelToken: new axios.CancelToken((c) => {
      console.log(c);
    }),
  });
}

/**
 * 添加项目
 * {
 *    *pname  	  是	string	项目名称
 *    *pgenre	    是	string	项目类别
 *    *pmoney	    是	number	项目金额
 *    *pcondition	是	string	申请条件(文本形式)
 *    *pstate	    是	number	申请开关状态 0关1开
 *  }
 */
export function AddProject(data) {
  return service.request({
    method: "post",
    url: `/admin/addProject`,
    data,
  });
}

/**
 * 删除项目
 * pid  项目ID
 */
export function deleteProject(pid) {
  return service.request({
    method: "post",
    url: `/admin/del/${pid}`,
  });
}

/**
 * 项目审核列表
 * {
 *    pid 项目ID
 * }
 */
export function GetApplyList({ pid }) {
  return service.request({
    method: "post",
    url: `/admin/auditItems/${pid}`,
  });
}

/**
 *项目审核_通过
 {
   uid  学生ID
   pid  项目id
 }
 */
export function ApplyPass({ uid, pid }) {
  return service.request({
    method: "post",
    url: `/admin/adoptItems/${uid}/${pid}`,
  });
}

/**
 *项目审核_退回
 {
   uid  学生ID
   pid  项目id
 }
 */
export function ApplyReturn({ uid, pid }) {
  return service.request({
    method: "post",
    url: `/admin/returnItems/${uid}/${pid}`,
  });
}

/**
 * 学生加分列表
 */
export function GetPointList() {
  return service.request({
    method: "get",
    url: `/admin/getPointList`,
  });
}

/**
 * 加分管理_通过
 {
   uid  学生ID
   oid  加分申请表中的id
 }
 */
export function PointPlusPass({ uid, oid }) {
  return service.request({
    method: "post",
    url: `/admin/adoptPoint/${uid}/${oid}`,
  });
}

/**
 * 加分管理_退回
 {
   uid  学生ID
   oid  加分申请表中的id
 }
 */
export function PointPlusReturn({ uid, oid }) {
  return service.request({
    method: "post",
    url: `/admin/returnPoint/${uid}/${oid}`,
  });
}

/**
 * 加分管理 查询学生信息
 * ERROR 两个参数缺一不可，否则报错
 {
   uname   用户名
   uid     学生ID
 }
 */
export function ApplyManageSearchStudent({ uname, uid }) {
  return service.request({
    method: "post",
    url: `/admin/reOne/${uname}/${uid}`,
  });
}

/**
 * 加分管理_加分按钮
 {
   uid   学生ID
   num   分数
 }
 */
export function EditPoint({ uid, num }) {
  return service.request({
    method: "post",
    url: `/admin/addPonit/${uid}/${num}`,
  });
}

/**
 * 学生
 * 申请项目
 * {
 *    stuId	  学生ID
 *    pid     项目ID
 * }
 */
export function StuApplyAward({ stuId, pid }) {
  return service.request({
    method: "post",
    url: `/award//applyAward/${stuId}/${pid}`,
  });
}

/**
 * 学生
 * 获取加分申请，下拉框数据
 */
export function GetAwardApplyData() {
  return service.request({
    method: "get",
    url: `/admin/getAppraisingInfo`,
  });
}

/**
 * 学生
 * 学生申请加分
 * {
 *    uid     学生ID
      oname   项目名称
      ogenre  项目类型
      onum    分数
      ofile   申请理由
 * }
 */
export function StuApplyPointPlus(data, uid) {
  return service.request({
    method: "post",
    url: `/award/applyPoint/${uid}`,
    data,
  });
}

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/login.vue"),
  },
  {
    path: "/index",
    name: "Index",
    redirect: "/applyItem",
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        // 主页
        path: "/applyItem",
        name: "ApplyItem",
        component: () => import("../views/applyItem/applyItem.vue"),
      },
      {
        // 评价列表
        path: "/applyItemDetail",
        name: "ApplyItemDetail",
        component: () => import("../views/applyItem/applyItemDetail.vue"),
      },
      {
        // 管理员，项目审核
        path: "/itemAudit",
        name: "ItemAudit",
        component: () => import("../views/admin/itemAudit.vue"),
      },
      {
        // 管理员，项目详情
        path: "/itemDetail",
        name: "ItemDetail",
        component: () => import("../views/admin/itemDetail.vue"),
      },
      {
        // 管理员，加分管理
        path: "/bonusPointManage",
        name: "BonusPointManage",
        component: () =>
          import("../views/bonusPointManage/bonusPointManage.vue"),
      },
      {
        // 学生，加分申请
        path: "/bonusPointApply",
        name: "BonusPointApply",
        component: () =>
          import("../views/bonusPointManage/bonusPointApply.vue"),
      },
    ],
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;

import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: () => import("../windows/BlankWindow.vue"),
  },
  {
    path: "/MainWindow",
    component: () => import("../windows/main/MainWindow.vue"),
    children: [
      {
        path: "mw-overview",
        name: "mw-overview",
        component: () => import("../windows/main/views/IndexView.vue"),
      },
      {
        path: "mw-setting",
        name: "mw-setting",
        component: () => import("../windows/BlankWindow.vue"),
      },
    ],
  },
  {
    path: "/TextAlertWindow",
    component: () => import("../windows/text-alert/TextAlertWindow.vue"),
    props: (route) => ({ text: route.query.spuuid }),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

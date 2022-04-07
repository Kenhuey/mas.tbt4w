import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../windows/BlankWindow.vue"),
  },
  {
    path: "/MainWindow",
    component: () => import("../windows/main/MainWindow.vue"),
    children: [
      {
        path: "",
        component: () => import("../windows/main/views/IndexView.vue"),
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

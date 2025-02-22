import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";
if (!window.VueRouter) {
    Vue.use(VueRouter); // 使用一个 vue 插件
}

const router = new VueRouter({
    // 配置
    routes, // 路由匹配规则
    mode: "history", // 路由模式
});

router.afterEach((to, from) => {
    if (to.meta.title) {
        titleController.setRouteTitle(to.meta.title)
    }
})

export default router;
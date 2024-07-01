// 入口文件
// import '@/mock';
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
// 路由配置
import router from "./router";
// 将方法挂载到 vue 原型
import showMessage from "./utils/showMessage";
Vue.prototype.$showMessage = showMessage; // 将弹出消息的方法挂到 Vue 的原型上
// 注册全局指令
import vLoading from "@/directives/loading";
import vLazy from "@/directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);
// 事件总线
import './eventBus';
// 数据仓库
import store from './store';
store.dispatch('setting/fetchSetting');
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
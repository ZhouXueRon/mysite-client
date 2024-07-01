// 事件总线
import Vue from 'vue';
const app = new Vue({});
/**
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：
 * - 滚动的 dom 元素
 * - 如果 dom 为 undefined，则表示切换了页面，重置滚动条
 */

/**
 * 事件名：setMainScroll
 * 含义：当需要设置主区域滚动条位置时触发
 * 参数：
 * - 滚动的高度
 */
Vue.prototype.$bus = app; // 方便 vue 实例调用，挂载到 vue 的原型上

export default app; // 方便 js 模块调用，进行导出
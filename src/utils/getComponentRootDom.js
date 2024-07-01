import Vue from 'vue';
/**
 * 获取某个组件渲染的 Dom 根元素
 * @param {*} comp 组件名
 * @param {*} props 组件需要的属性
 * @returns 组件根元素的原生 dom
 */
export default function getComponentRootDom(comp, props) {
    const vm = new Vue({
        render: h => h(comp, {
            props
        })
    })
    vm.$mount();
    return vm.$el;
}
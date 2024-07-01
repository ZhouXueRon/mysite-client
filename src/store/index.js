// 数据仓库
import Vue from 'vue';
import Vuex from 'vuex';
import banner from './banner';
import setting from './setting';
import about from './about';
import project from './project';

// 使用 vuex
if (!window.Vuex) {
    Vue.use(Vuex);
}

export default new Vuex.Store({
    modules: {
        banner,
        setting,
        about,
        project
    },
    strict: true,
});
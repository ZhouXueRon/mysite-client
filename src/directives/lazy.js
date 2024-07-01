import eventBus from '@/eventBus';
import {
    debounce
} from '@/utils';
import imgDefault from "@/assets/default.gif";

let imgs = [];

function setImage(img) {
    img.dom.src = imgDefault;
    // 判断图片是否在可视区内
    const clientHeight = document.documentElement.clientHeight;
    const imgRect = img.dom.getBoundingClientRect();
    const height = 150;
    if (imgRect.top < clientHeight && imgRect.top > -height) {
        const tempImg = new Image();
        // 等待图片加载完成
        tempImg.onload = function () {
            img.dom.src = img.src;
        }
        tempImg.src = img.src;
        imgs = imgs.filter(i => i !== img);
    }

}

/**
 * 调用该函数，在可视区加载图片
 */
function setImages() {
    for (let img of imgs) {
        setImage(img)
    }
}

function handleScroll() {
    setImages();
}

eventBus.$on('mainScroll', debounce(handleScroll, 50))

export default {
    // 被绑定元素插入父节点时调用
    inserted(el, bindings) {
        const img = {
            dom: el,
            src: bindings.value
        }
        imgs.push(img);
        setImage(img);
    },
    // 只调用一次，指令与元素解绑时调用
    unbind(el) {
        imgs = imgs.filter(img => img.dom !== el);
    }
};
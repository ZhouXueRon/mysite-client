import loadingSrc from '@/assets/loading.svg';
import styles from './loading.module.less';
/**
 * 获取元素下面的 img loading 元素
 * @param {HTMLElement} el 
 * @returns 
 */
const getImgLoading = (el) => {
    return el.querySelector('img[data-role="loading"]');
}
/**
 * 创建 img 元素
 * @returns 
 */
const createImgLoading = () => {
    const img = document.createElement('img');
    img.dataset.role = 'loading';
    img.className = styles.loading;
    img.src = loadingSrc;
    return img;
}

/**
 * 自定义 loading 指令
 * @param {HTMLElement} el 绑定指令的真实dom元素
 * @param {Object} binding 对象，描述指令提供的一下信息
 */
export default function (el, binding) {
    const currImg = getImgLoading(el);
    if (binding.value) {
        if (!currImg) { // 如果 img loading 不存在，创建 img 元素
            const img = createImgLoading();
            el.appendChild(img);
        }
    } else {
        currImg && currImg.remove();
    }
}
import getComponentRootDom from './getComponentRootDom';
import Icon from '@/components/Icon';
import styles from './showMessage.module.less';

/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则显示到页面的正中
 */
export default function showMessage(options = {}) {
    const {
        content,
        type = 'info',
        duration = 2000,
        container = document.body,
        callback
    } = options;
    // 创建消息元素
    const div = document.createElement("div");
    // 设置样式
    div.className = `${styles.message} ${styles['message-' + type]}`;
    const iconDom = getComponentRootDom(Icon, {
        type
    });
    div.innerHTML = `<span class=${styles.icon}>${iconDom.outerHTML}</span><div>${content}</div>`;
    if (options.container) {
        // 如果父容器没有设置定位，将其定为属性设置为 relative
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
    }
    container.appendChild(div);
    // 浏览器强行渲染（利用重排和重绘）
    div.clientHeight; // 导致 reflow

    // 回到指定位置
    div.style.transform = 'translate(-50%, -50%)';
    div.style.opacity = 1;

    // 等待一段事件，提示消息消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = 'translate(-50%, -50%) translateY(-25px)';
        // 过渡动画结束，销毁 div
        div.addEventListener('transitionend', function () {
            div.remove();
            callback && callback();
        }, {
            once: true
        })
    }, duration);
}
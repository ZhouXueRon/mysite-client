let routeTitle = '';
let siteTitle = '';

function setTitle() {
    if (!routeTitle && !siteTitle) {
        document.title = '加载中...';
    } else if (!routeTitle && siteTitle) {
        document.title = siteTitle;
    } else if (routeTitle && !siteTitle) {
        document.title = routeTitle;
    } else {
        document.title = `${routeTitle} - ${siteTitle}`;
    }
}

export default {
    /**
     * 设置路由标题
     * @param {*} title 
     */
    setRouteTitle(title) {
        routeTitle = title;
        setTitle();
    },
    /**
     * 设置网站标题
     * @param {*} title 
     */
    setSiteTitle(title) {
        siteTitle = title;
        setTitle();
    }
} 

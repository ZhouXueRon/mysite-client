import request from './request';

/**
 * 分页获取博客
 * @param {Number} page 当前页码
 * @param {Number} limit 页容量
 * @param {Number} categoryid 所属分类，-1表示全部
 * @returns 
 */
export const getBlogList = async (page = 1, limit = 10, categoryid = -1) => {
    return await request.get('/api/blog', {
        params: {
            page,
            limit,
            categoryid
        }
    })
}

/**
 * 获取所有博客分类
 * @returns 
 */
export async function getBlogtype() {
    return await request.get('/api/blogtype');
}

/**
 * 获取单个博客
 * @param {String} id 博客id
 * @returns 
 */
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`);
}

/**
 * 提交评论
 * @param {Object} commentInfo 评论信息
 * @returns 
 */
export async function postComment(commentInfo) {
    return await request.post('/api/comment', commentInfo);
}

/**
 * 分页获取评论
 * @param {*} blogid 所属文章，-1表示不限
 * @param {*} page 页码
 * @param {*} limit 页容量
 * @returns 
 */
export async function getComments(blogid, page = 1, limit = 10) {
    return await request.get('/api/comment', {
        params: {
            blogid,
            page,
            limit
        }
    });
}
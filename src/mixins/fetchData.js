/**
 * 处理通过接口调用数据
 * @param {*} defaultData 
 * @returns 
 */
export default function (defaultData) {
    return {
        data() {
            return {
                isLoading: true,
                data: defaultData
            }
        },
        async created() {
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }
}
/**
 * 处理主滚动条滚动事件
 * @param {*} dom 
 * @returns 
 */
export default function mainScroll(refVal) {
    return {
        mounted() {
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refVal].addEventListener("scroll", this.handleMainScroll);
        },
        beforeDestroy() {
            this.$refs[refVal].removeEventListener("scroll", this.handleMainScroll);
            this.$bus.$emit("mainScroll");
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
        },
        methods: {
            handleMainScroll() {
                this.$bus.$emit("mainScroll", this.$refs[refVal]);
            },
            handleSetMainScroll(toTop) {
                this.$refs[refVal].scrollTop = toTop;
            },
        }
    }
}
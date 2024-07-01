
export default function sendComment({ page, limit }) {
    return {
        data() {
            return {
                page,
                limit,
            }
        },
        computed: {
            hasMore() {
                return this.data.rows.length < this.data.total;
            },
        },
        created() {
            this.$bus.$on("mainScroll", this.handleScroll);
        },
        destoryed() {
            this.$bus.$off("mainScroll", this.handleScroll);
        },
        methods: {
            async fetchMore() {
                if (!this.hasMore) return;
                this.isLoading = true;
                this.page++;
                const moreData = await this.fetchData();
                this.isLoading = false;
                this.total = moreData.total;
                this.data = {
                    total: moreData.total,
                    rows: this.data.rows.concat(moreData.rows),
                };
            },
            async handleSubmit(formData, callback) {
                const resp = await this.fetchPostMessage(formData)
                this.data.rows.unshift(resp);
                this.data.total++;
                callback && callback("评论成功！");
            },
            handleScroll(dom) {
                if (this.isLoading || !dom) return;
                const range = 100;
                const dec = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
                if (dec < range) {
                    this.fetchMore();
                }
            },
        }
    }
}
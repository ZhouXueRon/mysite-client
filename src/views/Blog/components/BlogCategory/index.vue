<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleClick" />
  </div>
</template>

<script>
import RightList from "./../RightList";
import { getBlogtype } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      return this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        {
          name: "全部",
          id: -1,
          articleCount: totalArticleCount,
        },
        ...this.data,
      ];
      return result.map((it) => ({
        ...it,
        selected: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogtype();
    },
    handleClick(item) {
      this.$router.push({
        name: item.id === -1 ? "Blog" : "CategoryBlog",
        params:
          item.id === -1
            ? {}
            : {
                categoryId: item.id,
              },
        query: {
          page: 1,
          limit: this.limit,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 300px;
  padding: 20px;
  height: 100%;
  position: relative;
  overflow: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    line-height: 50px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
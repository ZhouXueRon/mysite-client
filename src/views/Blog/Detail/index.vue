<template>
  <div class="detail-container" v-loading="isLoading">
    <Layout>
      <div class="main" ref="mainContainer">
        <BlogDetail v-if="data" :blog="data" />
        <BlogComment v-if="!isLoading" />
      </div>
      <template #right>
        <BlogTOC :toc="data.toc" v-if="data" />
      </template>
    </Layout>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import Layout from "@/components/Layout";
import BlogDetail from "./../components/BlogDetail";
import BlogTOC from "./../components/BlogTOC";
import BlogComment from "./../components/BlogComment";
import { getBlog } from "@/api/blog";
import { titleController } from "@/utils";
export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  computed: {
    blogId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async fetchData() {
      const resp = await getBlog(this.blogId);
      if (!resp) {
        // 访问文章不存在
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style lang="less" scoped>
.detail-container {
  width: 100%;
  height: 100%;
  position: relative;
  .main {
    overflow-y: scroll;
    height: 100%;
    padding: 20px 40px;
    scroll-behavior: smooth;
  }
}
</style>
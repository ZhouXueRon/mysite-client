<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import sendComment from "@/mixins/sendComment";
import { getComments, postComment } from "@/api/blog";
export default {
  mixins: [
    fetchData({ total: 0, rows: [] }),
    sendComment({ page: 1, limit: 10 }),
  ],
  components: {
    MessageArea,
  },
  methods: {
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    async fetchPostMessage(formData) {
      return await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
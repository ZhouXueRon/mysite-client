<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
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
import { getMessages, postMessage } from "@/api/message";
import mainScroll from "@/mixins/mainScroll";
import sendComment from "@/mixins/sendComment";
export default {
  mixins: [
    fetchData({ total: 0, rows: [] }),
    mainScroll("messageContainer"),
    sendComment({ page: 1, limit: 10 }),
  ],
  components: {
    MessageArea,
  },
  methods: {
    async fetchData() {
      return await getMessages(this.page, this.limit);
    },
    async fetchPostMessage(formData) {
      return await postMessage({
        ...formData,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
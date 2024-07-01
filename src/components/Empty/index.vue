<template>
  <div class="empty-container">
    <Icon type="empty" />
    <div class="text">{{ text }}</div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.empty-container {
  .self-center();
  .icon-container {
    font-size: 80px;
    color: @gray;
  }
  .text {
    margin-top: 20px;
    text-align: center;
    color: @gray;
  }
}
</style>
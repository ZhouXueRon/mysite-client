<template>
  <img class="loading-container" :src="loading" alt="" />
</template>

<script>
import loading from "@/assets/loading.svg";
export default {
  data() {
    return {
      loading,
    };
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/mixin.less";
.loading-container {
  .self-center();
}
</style>
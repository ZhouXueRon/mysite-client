<template>
  <div class="test-container">
    <Loading v-if="isLoading" />
    <button @click="toggleLoading">显示/隐藏</button>
  </div>
</template>

<script>
import Loading from "./";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    toggleLoading() {
      this.isLoading = !this.isLoading;
    },
  },
};
</script>

<style lang='less' scoped>
</style>
<template>
  <div class="test-container">
    <Empty />
  </div>
</template>

<script>
import Empty from "./";
export default {
  components: {
    Empty,
  },
};
</script>

<style scoped>
.test-container {
  position: relative;
  width: 100%;
  height: 1000px;
}
</style>
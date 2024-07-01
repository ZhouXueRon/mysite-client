<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./";
import "@/styles/global.less";
export default {
  components: {
    SiteAside,
  },
};
</script>

<style lang="less" scoped>
.test-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 250px;
  height: 100%;
}
</style>
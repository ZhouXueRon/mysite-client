<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="left"></div>
      </template>
      <div class="main"></div>
      <template #right>
        <div class="right"></div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";
import "@/styles/global.less";
export default {
  components: {
    Layout,
  },
};
</script>

<style lang='less' scoped>
.test-container {
  width: 100%;
  height: 100vh;
  white-space: nowrap;
  .left {
    width: 450px;
    height: 100%;
    background-color: lightcoral;
  }
  .main {
    height: 100%;
    background-color: lightblue;
  }
  .right {
    width: 250px;
    height: 100%;
    background-color: lightgreen;
  }
}
</style>
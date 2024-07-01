<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <routerView />
      <template #right>
        <div class="right"></div>
      </template>
    </Layout>
    <ScrollTop />
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import ScrollTop from "@/components/ScrollTop";
export default {
  components: {
    Layout,
    SiteAside,
    ScrollTop,
  },
};
</script>

<style lang='less' scoped>
@import url(~@/styles/mixin.less);
.app-container {
  .self-fill(fixed);
  .aside {
    width: 250px;
    height: 100%;
  }
}
</style>
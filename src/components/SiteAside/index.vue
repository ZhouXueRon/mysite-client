<template>
  <div class="siteAside-container" v-loading="loading">
    <template v-if="data">
      <Avatar :url="data.avatar" :size="150" />
      <h1 class="title">{{ data.siteTitle }}</h1>
      <Menu />
      <Contact />
      <p class="footer">{{ data.icp }}</p>
    </template>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";
import { SERVER_URL } from "@/urlConfig";
export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  data() {
    return {
      SERVER_URL,
    };
  },
  computed: {
    ...mapState("setting", ["loading", "data"]),
  },
};
</script>

<style lang='less' scoped>
@import url("~@/styles/var.less");
.siteAside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  overflow-y: auto;
  position: relative;
  .avatar-container {
    margin: 0 auto;
  }
  .title {
    color: #fff;
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
  }
  .footer {
    text-align: center;
    font-size: 12px;
  }
}
</style>
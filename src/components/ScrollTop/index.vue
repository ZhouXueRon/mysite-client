<template>
  <div v-show="show" class="scroll-top-container" @click="handleClick">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destoryed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop > 500;
    },
    handleClick() {
      this.$bus.$emit("setMainScroll", 0);
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/var.less";
.scroll-top-container {
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 22;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background: @primary;
  cursor: pointer;
}
</style>
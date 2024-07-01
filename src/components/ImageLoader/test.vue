<template>
  <div class="test-container">
    <ImageLoader
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
      @load="load"
    />
  </div>
</template>

<script>
import ImageLoader from "./";
export default {
  components: {
    ImageLoader,
  },
  methods: {
    load() {
      console.log("加载完成后的后续处理");
    },
  },
};
</script>

<style lang='less' scoped>
.test-container {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
}
</style>
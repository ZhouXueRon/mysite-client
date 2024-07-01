<template>
  <div class="image-loader-container">
    <img v-if="!everything" :src="placeholder" alt="" class="placeholder" />
    <img
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
      :src="src"
      alt=""
      class="origin"
      @load="imgLoad"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },

  data() {
    return {
      isLoad: false, // 原图是否加载完成
      everything: false, // 原图是否加载变化完成
    };
  },

  computed: {
    originOpacity() {
      return this.isLoad ? 1 : 0;
    },
  },

  methods: {
    imgLoad() {
      this.isLoad = true;
      setTimeout(() => {
        this.everything = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
    &.origin {
      opacity: 0;
    }
    &.placeholder {
      filter: blur(2vw);
    }
  }
}
</style>
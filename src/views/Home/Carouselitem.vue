<template>
  <div
    class="carouselitem-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-item" ref="inner" :style="imgPosition">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="handleLoad"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
import { SERVER_URL } from "@/urlConfig";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      // 容器尺寸
      containerSize: null,
      // 内容尺寸
      innerSize: null,
      mouseX: 0, // 鼠标很坐标
      mouseY: 0, // 鼠标纵坐标
      SERVER_URL,
    };
  },
  computed: {
    // 计算图片坐标
    imgPosition() {
      if (!this.containerSize || !this.innerSize) {
        return;
      }
      const { width, height } = this.containerSize;
      const { width: innerWidth, height: innerHeight } = this.innerSize;
      const extraWidth = innerWidth - width; // 图片超出容器的宽度
      const extraHeight = innerHeight - height; // 图片超出容器的高度
      const left = -(extraWidth / width) * this.mouseX;
      const top = -(extraHeight / height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    // 获取容器和内容尺寸
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.Y;
    // 监听窗口改变
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    // 组件销毁取消监听
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    // 图片加载完成
    handleLoad() {
      this.showWords(this.$refs.title, this.titleWidth, "1s");
      this.showWords(this.$refs.desc, this.descWidth, "1s 1s");
    },
    // 显示文字
    showWords(el, width, transition) {
      el.style.transition = "none";
      el.style.opacity = 0;
      el.clientWidth; // reflow（强制渲染）
      el.style.opacity = 1;
      el.style.width = 0;
      el.clientWidth; // reflow（强制渲染）
      el.style.transition = transition;
      el.style.width = width + "px";
    },
    // 计算容器尺寸
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.inner.clientWidth,
        height: this.$refs.inner.clientHeight,
      };
    },
    // 鼠标移动
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      // 鼠标距离视口的宽度 - 容器距离视口的宽度为鼠标坐标
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    // 鼠标离开
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.carouselitem-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .carousel-item {
    width: 110%;
    height: 110%;
    left: 0;
    top: 0;
    position: absolute;
    transition: 0.3s;
  }
  .title,
  .desc {
    position: absolute;
    letter-spacing: 3px;
    left: 30px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    opacity: 0;
    white-space: nowrap;
    overflow: hidden;
  }
  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }
  .desc {
    top: calc(50% + 20px);
    font: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>
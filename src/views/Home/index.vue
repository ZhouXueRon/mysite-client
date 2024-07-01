<template>
  <div
    v-loading="loading"
    class="home-container"
    ref="container"
    @wheel="hanleWheel"
  >
    <ul
      class="carousel-container"
      :style="{ marginTop }"
      @transitionend="handleTransitionend"
    >
      <li v-for="item in data" :key="item.id">
        <Carouselitem ref="carouse" :carousel="item" />
      </li>
    </ul>
    <div v-show="index > 0" @click="switchTo(index - 1)" class="icon icon-up">
      <Icon type="arrowUp" />
    </div>
    <div
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
      class="icon icon-down"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        :class="{ active: i === index }"
        v-for="(item, i) in data"
        @click="switchTo(i)"
        :key="item.id"
      ></li>
    </ul>
  </div>
</template>

<script>
import Carouselitem from "./Carouselitem";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Carouselitem,
    Icon,
  },
  data() {
    return {
      index: 0, // 当前显示的是第几张轮播图
      containerHeight: 0, // 整个容器的高度
      switching: false, // 是否正在翻页中
    };
  },
  computed: {
    ...mapState("banner", ["loading", "data"]),
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
  },
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 切换到对应索引的图片
    switchTo(index) {
      this.index = index;
    },
    hanleWheel(e) {
      if (this.switching) {
        return;
      }
      const { deltaY } = e;

      if (deltaY < 0 && this.index > 0) {
        this.index--;
        this.$refs.carouse[this.index].handleLoad();
        this.switching = true;
      }
      if (deltaY > 0 && this.index < this.data.length - 1) {
        this.index++;
        this.$refs.carouse[this.index].handleLoad();
        this.switching = true;
      }
    },
    handleTransitionend() {
      this.switching = false;
    },
    handleResize() {
      // 获取当前容器高度
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    @gaps: 25px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
    color: @gray;
    cursor: pointer;
    &.icon-up {
      top: @gaps;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      bottom: @gaps;
      animation: jump-down 2s infinite;
    }
  }
  .indicator {
    .self-center(fixed);
    left: auto;
    right: 20px;
    transform: translate(0, -50%);
    li {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: @words;
      border: 1px solid #fff;
      margin: 10px 0;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
  @jump: 8px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}
</style>
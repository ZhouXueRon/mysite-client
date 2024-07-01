<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleClick" />
  </div>
</template>

<script>
import RightList from "./../RightList";
import { debounce } from "@/utils";
export default {
  props: {
    toc: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    RightList,
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    // 处理toc数据，添加selected属性
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((it) => ({
          ...it,
          selected: it.anchor === this.activeAnchor,
          children: getTOC(it.children),
        }));
      };
      return getTOC(this.toc);
    },
    // 根据 toc 得到它们对应的元素数组
    doms() {
      const doms = [];
      const addDoms = (toc) => {
        for (const item of toc) {
          doms.push(document.getElementById(item.anchor));
          if (item.children && item.children.length) {
            addDoms(item.children);
          }
        }
      };
      addDoms(this.toc);
      return doms;
    },
  },
  created() {
    this.setSelectedDebounce = debounce(this.setActiveAnchor, 50);
    this.$bus.$on("mainScroll", this.setSelectedDebounce);
  },
  methods: {
    handleClick(item) {
      location.hash = item.anchor;
    },
    // 设置 activeAnchor
    setActiveAnchor(_dom) {
      if (!_dom) return;
      const range = 200;
      for (const dom of this.doms) {
        if (!dom) continue;
        // 得到元素距离顶部的距离
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= 200) {
          // 在规定范围内
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定范围下方
          return;
        } else {
          // 在规定范围上方
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  destoryed() {
    this.$bus.$off("mainScroll", this.setSelectedDebounce);
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  overflow: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    line-height: 50px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
<template>
  <div class="right-list-container">
    <div
      class="list-item"
      v-for="(it, i) in list"
      :key="i"
      @click="handleClick(it)"
    >
      <span class="text" :class="{ active: it.selected }">{{ it.name }}</span>
      <span v-if="it.aside" class="aside" :class="{ active: it.selected }">{{
        it.aside
      }}</span>
      <RightList :list="it.children" @select="handleClick" />
    </div>
  </div>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-list-container {
  .right-list-container {
    margin-left: 1em;
  }
  .list-item {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    .aside {
      margin-left: 1em;
      font-size: 12px;
      color: @gray;
    }
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
</style>
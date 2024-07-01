<template>
  <div class="menu-container">
    <div class="menu-list">
      <router-link
        :exact="m.exact"
        v-for="(m, i) in menus"
        :key="i"
        class="menu-item"
        :to="{ name: m.name }"
        active-class="selected"
      >
        <Icon :type="m.icon" />
        <span class="text">{{ m.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      menus: [
        { title: "首页", icon: "home", name: "Home", exact: true },
        { title: "文章", icon: "blog", name: "Blog", exact: false }, // exact 是否精确匹配
        { title: "关于我", icon: "about", name: "About", exact: true },
        { title: "项目&效果", icon: "code", name: "Project", exact: true },
        { title: "留言板", icon: "chat", name: "Message", exact: true },
      ],
    };
  },

  methods: {},
};
</script>

<style lang='less' scoped>
.menu-container {
  width: 100%;
  color: #b4b8bc;
  margin: 24px 0;
  .menu-list {
    .menu-item {
      display: flex;
      align-items: center;
      padding: 0 50px;
      height: 45px;
      cursor: pointer;
      .icon-container {
        width: 24px;
      }
      &.selected {
        color: #fff;
        background: #2f2f2f;
      }
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
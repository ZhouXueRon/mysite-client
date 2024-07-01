<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb">
          <routerLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img
              v-if="item.thumb"
              v-lazy="item.thumb"
              :alt="item.title"
              :title="item.title"
            />
          </routerLink>
        </div>
        <div class="main">
          <routerLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </routerLink>
          <div class="aside">
            <span>日期：{{ item.createDate }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论{{ item.commentNumber }}</span>
            <routerLink
              v-if="item.category"
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >{{ item.category.name }}</routerLink
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import { getBlogList } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import Pager from "@/components/Pager";
import Empty from "@/components/Empty";
import { SERVER_URL } from "@/urlConfig";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  components: {
    Pager,
    Empty,
  },
  data() {
    return {
      SERVER_URL,
    };
  },
  computed: {
    routeInfo() {
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const categoryid = this.$route.params.categoryId || -1;
      return {
        page,
        limit,
        categoryid,
      };
    },
  },
  methods: {
    async fetchData() {
      const { page, limit, categoryid } = this.routeInfo;
      return await getBlogList(page, limit, categoryid);
    },
    handlePageChange(newPage) {
      const { limit, categoryid } = this.routeInfo;
      if (categoryid === -1) {
        // 查看全部分类
        this.$router.push({
          name: "Blog",
          query: {
            page: newPage,
            limit,
          },
        });
      } else {
        // 查看对应分类
        this.$router.push({
          name: "CategoryBlog",
          params: {
            categoryId: categoryid,
          },
          query: {
            page: newPage,
            limit,
          },
        });
      }
    },
  },
  watch: {
    // 监控路由变化
    async $route() {
      this.isLoading = true;
      // 滚动条归 0
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>


<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>

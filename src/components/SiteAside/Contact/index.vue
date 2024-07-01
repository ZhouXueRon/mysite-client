<template>
  <div class="contact-container">
    <div class="contact-list">
      <a class="contact-item" :href="data.github">
        <Icon type="github" />
        <span class="text">{{ data.githubName }}</span>
      </a>
      <a class="contact-item" href="mailto:zxr6758@163.com">
        <Icon type="mail" />
        <span class="text">{{ data.mail }}</span>
      </a>
      <a
        class="contact-item"
        href="tencent://message/?Menu=yes&uin=1809178201&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45"
      >
        <Icon type="qq" />
        <span class="text">{{ data.qq }}</span>
        <div class="contact-pop">
          <img :src="data.qqQrCode" alt="" />
        </div>
      </a>
      <a class="contact-item" href="#">
        <Icon type="weixin" />
        <span class="text">{{ data.weixin }}</span>
        <div class="contact-pop">
          <img :src="data.weixinQrCode" alt="" />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
import { SERVER_URL } from "@/urlConfig";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      SERVER_URL,
    };
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style lang='less' scoped>
@import url("~@/styles/var.less");
.contact-container {
  width: 100%;
  padding: 20px;
  @itemHeight: 30px;
  .contact-list {
    color: @gray;
    .contact-item {
      height: @itemHeight;
      line-height: @itemHeight;
      margin: 14px 0;
      display: flex;
      cursor: pointer;
      position: relative;
      .icon-container {
        width: 36px;
        font-size: 26px;
      }
      .text {
        font-size: 14px;
      }
      .contact-pop {
        position: absolute;
        background: #fff;
        left: 0;
        bottom: @itemHeight + 5px;
        padding: 10px 15px;
        border-radius: 5px;
        transform: scaleY(0);
        transition: all 0.3s;
        transform-origin: center bottom;
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: #fff;
          bottom: -4px;
        }
        img {
          width: 150px;
          height: 150px;
        }
      }
      &:hover {
        color: @primary;
        .contact-pop {
          transform: scaleY(1);
        }
      }
    }
    .contact-item:last-child {
      .contact-pop {
        bottom: auto;
        top: @itemHeight + 5px;
        transform-origin: center top;
        &::before {
          transform: translateX(-50%) rotate(-45deg);
          width: 8px;
          height: 8px;
          background: #fff;
          top: -4px;
        }
      }
    }
  }
}
</style>
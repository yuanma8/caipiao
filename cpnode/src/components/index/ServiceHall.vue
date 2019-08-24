<template>
  <div>
    <header>
      <h1>服务大厅</h1>
    </header>
    <section class="has-bottom">
      <div class="kefu-list">
        <a :href="info.onlineClientServerUrl" target="_blank">
          <i></i>
          <span>在线客服</span>
        </a>
        <a
          :href="'http://wpa.qq.com/msgrd?v=3&uin=' +info.serviceQQ+ '&site=qq&menu=yes'"
          target="_blank"
        >
          <i></i>
          <span>QQ客服</span>
        </a>
        <router-link :to="{path:'/wx',query:{url:info.webChatQRCodeUrl}}">
          <i></i>
          <span>微信客服</span>
        </router-link>
      </div>
      <div class="list">
        <router-link to="agent" class="red">
          <i class="icon"></i>
          <span class="text">
            <span class="title">独家代理</span>
            <span class="info">点击在线申请独家代理</span>
          </span>
          <i class="iconfont icon-jiantou"></i>
        </router-link>
        <router-link :to="{path:'/youhui/0',query:{url:info.discountUrl}}">
          <i class="icon"></i>
          <span class="text">
            <span class="title">优惠大厅</span>
            <span class="info">丰富活动已全新上线</span>
          </span>
          <i class="iconfont icon-jiantou"></i>
        </router-link>
        <a href="../../static/pages/question.html">
          <i class="icon"></i>
          <span class="text">
            <span class="title">常见问题</span>
            <span class="info">常见问题都汇总在这里</span>
          </span>
          <i class="iconfont icon-jiantou"></i>
        </a>
        <router-link to="Feedback">
          <i class="icon"></i>
          <span class="text">
                <span class="title">投诉建议</span>
                <span class="info">让我们为您提供更好的服务</span>
              </span>
          <i class="iconfont icon-jiantou"></i>
        </router-link>
        <a target="_blank" :href="'tel:'+info.phoneNumber">
          <i class="icon"></i>
          <span class="text">
            <span class="title">联系电话</span>
            <span class="info">{{info.phoneNumber}}</span>
          </span>
          <i class="iconfont icon-jiantou"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.getCompany();
  },
  methods: {
    getCompany() {
      this.$http.post("/user/GetCompanyInfo", "").then(
        res => {
          this.info = res;
          this.$setCookie("chatUrl", res["chatUrl"], 1000 * 60 * 60 * 24 * 30);
          this.$setCookie(
            "agentUrl",
            res["agentUrl"],
            1000 * 60 * 60 * 24 * 30
          );
        },
        e => {
          console.log(e);
        }
      );
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.callback {
  color: #fff;
  font-size: 1rem;
  line-height: 4rem;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 1rem;
  min-width: 4rem;
  text-align: center;
}

.kefu-list {
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  background-color: #fff;
  margin-bottom: 1.2rem;
  i {
    display: block;
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
  }
  span {
    font-size: 12px;
  }
  a:first-child i {
    background: url("../../assets/icons/kefu-ol.svg");
  }
  a:nth-child(2) i {
    background: url("../../assets/icons/kefu-qq.svg");
  }
  a:nth-child(3) i {
    background: url("../../assets/icons/kefu-wx.svg");
  }
}

.list a {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: #fff;
  margin-bottom: 0.8rem;
  .icon {
    display: block;
    width: 36px;
    height: 36px;
    margin-right: 1rem;
  }
  .text {
    flex: 1;
    .title {
      display: block;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .info {
      font-size: 12px;
    }
  }
    &:nth-child(1) .icon {
      background: url("../../assets/icons/agent.svg") no-repeat center;      
    }
    &:nth-child(2) .icon {
      background: url("../../assets/icons/youhui.svg") no-repeat center;
    }
    &:nth-child(3) .icon {
      background: url("../../assets/icons/questions.svg") no-repeat center;
    }
    &:nth-child(4) .icon {
      background: url("../../assets/icons/tousu.svg") no-repeat center;
    }
    &:nth-child(5) .icon {
      background: url("../../assets/icons/telephone.svg") no-repeat center;      
    }
}
</style>


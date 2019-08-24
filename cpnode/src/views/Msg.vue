<template>
  <div>
    <header>
      <a @click="goBack()" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>消息中心</h1>
    </header>
    <section class="letter">
      <router-link to="Znx" tag="div">
        <aside>
          <span v-if="num>0">{{num}}</span>
          <i class="icon"></i>
        </aside>
        <span>站内信</span>
        <i class="iconfont icon-jiantou"></i>
      </router-link>
      <router-link to="Gg" tag="div">
        <aside>
          <i class="icon"></i>
        </aside>
        <span>公告</span>
        <i class="iconfont icon-jiantou"></i>
      </router-link>
      <router-link :to="{path:'/youhui/1',query:{url:info.discountUrl}}" tag="div">
        <aside>
          <span v-if="klq > 0">{{klq}}</span>
          <i class="icon"></i>
        </aside>
        <span>可领取活动</span>
        <i class="iconfont icon-jiantou"></i>
      </router-link>
    </section>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      num: 0,
      klq: 0,
      showDetail: false,
      detail: {},
      info: {}
    };
  },
  created() {
    this.getNotices();
    this.getCompany();
  },
  methods: {
    getCompany() {
      this.$http.post("/user/GetCompanyInfo", "").then(
        res => {
          this.info = res;
          console.log(this.info)
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
    },
    getNotices() {
      this.$loading.show("加载中");
      this.$http.post("/activity/avaCount", "").then(
        res => {
          this.num = res.unReadMsgCount;
          this.klq = res.avaActivityCount;
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    show(item) {
      this.showDetail = true;
      this.detail = item;
    },
    goBack() {
      if (this.showDetail) {
        this.showDetail = false;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style scoped>
.letter div {
  font-weight: bold;
  padding: 1.5rem;
  background-color: #fff;
  margin-bottom: 0.8rem;
}

.letter div .icon {
  width: 28px;
  height: 20px;
  float: left;
}

aside {
  position: relative;
}

aside span {
  min-width: 15px;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  top: -5px;
  color: #fff;
  font-size: 12px;
  background-color: red;
  border: 1px solid red;
}

.letter div span {
  margin-left: 1rem;
}

.letter div:nth-child(1) .icon {
  background: url("../assets/icons/znx.svg");
  background-size: 100%;
}

.letter div:nth-child(2) .icon {
  background: url("../assets/icons/gg.svg");
  background-size: 100%;
}

.letter div:nth-child(3) .icon {
  background: url("../assets/icons/lq.svg");
  background-size: 100%;
}

.letter div .iconfont {
  font-size: 12px;
  float: right;
}
</style>

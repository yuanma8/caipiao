<template>
  <div>
    <router-view></router-view>
    <!--下载-->
    <Download></Download>
    <!-- 签到 -->
    <Sign v-if="(navStatus === 0)&&(isLogin)&&(!isGuest)"></Sign>
    <!--  抢红包 -->
    <RobRedbag v-if="(isLogin)&&($route.name == 'lotery')" ref="redBag"></RobRedbag>
    <!--通知弹窗-->
    <NoticeDialog :notices="notices"></NoticeDialog>
    <!--底部nav-->
    <nav>
      <router-link to="lottery" active-class="active" :chaturl="chaturl">
        <i></i>彩票
      </router-link>
    <!--  <router-link to="chess" active-class="active">
        <i></i>棋牌
      </router-link>  -->
      <router-link to="payment" active-class="active">
        <i></i>充值
      </router-link>
      <router-link to="ServiceHall" active-class="active">
        <i></i>服务
      </router-link>
      <router-link to="my" active-class="active">
        <i>
          <span v-if="(num > 0)&&(klq > 0)">{{num+klq}}</span>
        </i>我
      </router-link>
    </nav>
  </div>
</template>
<script>
import Download from "../components/index/Download.vue";
import RobRedbag from "../components/index/robRedbag.vue";
import Sign from "../components/index/Sign.vue";
import NoticeDialog from "../components/index/NoticeDialog.vue";
import api from "../api";
import axios from "../http";
export default {
  data() {
    return {
      isLogin: !!this.$getCookie("username"),
      isGuest: !!this.$getCookie("isGuest"),
      timer1: null,
      timer: null,
      lotteryList: [],
      banners: {},
      notices: [],
      navStatus: 0,
      info: {},
      num: 0,
      klq: 0,
      chaturl: this.$getCookie("chatUrl"),
    };
  },
  created() {
    this.getCompany();
    if (this.isLogin) {
      this.getNotices();
      this.timer = setInterval(() => {
        this.getNotices();
      }, 20000);
    }
    let i = 0;
    for (const item of api.cdnList) {
      this.$http.get(item + "/system/testSpeed").then(
        res => {
          i += 1;
          if (i === 1) {
            axios.defaults.baseURL = item;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearTimeout(this.timer1);
  },
  methods: {
    getCompany() {
      this.$http.post("/user/GetCompanyInfo", "").then(
        res => {
          this.info = res;
          console.log(this.info);
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
      this.$http.post("/activity/avaCount", "").then(
        res => {
          this.num = res.unReadMsgCount;
          this.klq = res.avaActivityCount;
        },
        e => {}
      );
    }
  },
  components: {
    Download,
    NoticeDialog,
    RobRedbag,
    Sign
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
/*导航*/
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
  border-top: 0.1rem solid #d6d6d6;
  z-index: 99;
  background: #fff;
  display: flex;
  justify-content: space-between;
  > a {
    display: block;
    width: 20%;
    font-size: 10px;
    text-align: center;
    background: #fff;
    > i {
      width: 2.2rem;
      height: 2.3rem;
      display: block;
      margin: 0.3rem auto 0.1rem;
      position: relative;
      font-style: normal;
      span {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid #fff;
        background-color: red;
        position: absolute;
        right: -7px;
        color: #fff;
      }
    }
    &:nth-child(1) {
      > i {
        background: url("../assets/icons/tab1.svg") no-repeat;
        background-size: 100%;
      }
      &.active > i {
        background-image: url("../assets/icons/tab1-1.svg");
        background-size: 100%;
      }
    }
    &:nth-child(2) {
      > i {
        width: 2.5rem;
        height: 2.3rem;
        background: url("../assets/icons/tab2.svg") no-repeat;
        background-size: 100% 105%;
      }
      &.active > i {
        background-image: url("../assets/icons/tab2-2.svg");
        background-size: 100% 105%;
      }
    }
    &:nth-child(3) {
      > i {
        background: url("../assets/icons/tab3.svg") no-repeat;
        background-size: 100%;
      }
      &.active > i {
        background-image: url("../assets/icons/tab3-3.svg");
        background-size: 100%;
      }
    }
    &:nth-child(4) {
      > i {
        background: url("../assets/icons/tab4.svg") no-repeat;
        background-size: 100%;
      }
      &.active > i {
        background-image: url("../assets/icons/tab4-4.svg");
        background-size: 100%;
      }
    }
    &:nth-child(5) {
      > i {
        background: url("../assets/icons/tab5.svg") no-repeat;
        background-size: 100%;
      }
      &.active > i {
        background-image: url("../assets/icons/tab5-5.svg");
        background-size: 100%;
      }
    }

    &.active {
      color: #d91d37;
    }
  }
}
</style>


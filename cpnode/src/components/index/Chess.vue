<template>
  <div>
    <header>
      <h1>{{name}}</h1>
      <div class="login-reg" v-if="!isLogin">
        <a @click="visitorLogin()">试玩</a>
      </div>
      <router-link class="loginlink" to="login" v-if="!isLogin">登录</router-link>
      <router-link to="msg" class="msgbox" v-if="isLogin">
        <i class="iconfont icon-youxiang">
          <span v-if="(num > 0)&&(klq > 0)">
            <em>{{num+klq}}</em>
          </span>
        </i>
      </router-link>
    </header>
    <section class="has-bottom" :class="{'blur':showMask}">
      <div class="banner">
        <Swipe class="my-swipe">
          <SwipeItem v-for="(slide, index) in banners.imageList" :key="index">
            <img :src="slide.imageUrl">
          </SwipeItem>
        </Swipe>
      </div>
      <div class="indexWarp">
        <div class="indexContent">
          <!-- 滚动公告 -->
          <div class="noticeBg">
            <p class="notice">
              <marquee behavior="scroll" direction="left" height="25">
                <span
                  v-for="(item,index) in notices"
                  :key="index"
                  style="margin-right:20px"
                >{{item.noticeContent}}</span>
              </marquee>
            </p>
          </div>
        </div>
      </div>
      <aside>
        <a
          href="javascript:void(0);"
          v-for="(item,i) in gameList"
          :key="i"
          @click="getUrl(item.id)"
          :class="'g'+item.id"
        >
          <p>{{item.name}}</p>
        </a>
      </aside>
    </section>
    <transition>
      <div class="mask" v-if="showMask" @click="showMask = false">
        <div class="game" @click="$event.stopPropagation()" v-if="!isGuest">
          <nav>
            额度转换
            <span @click="showMask = false">×</span>
          </nav>
          <div class="bottom">
            <div>
              <span style="color:#929292;">棋牌账户</span>
              <span
                style="margin:0 3px 2px 8px;display: flex;width: 15px;height: 15px;align-items: center;justify-content: center;font-weight: 700;color: #fff;background-color: rgb(255, 162, 62);border-radius: 50%;border: 2px solid rgb(255, 237, 0);"
              >G</span>
              <span>{{kyBalance}}</span>
            </div>
            <input type="text" placeholder="输入金额" v-model="getmoney">
            <i>单笔充值金额最低1元,最高100000元</i>
            <b>快捷方式</b>
            <div>
              <span @click="getmoney = 10">10</span>
              <span @click="getmoney = 100">100</span>
              <span @click="getmoney = 1000">1000</span>
              <span @click="getmoney = 10000">10000</span>
              <i></i>
              <span @click="getmoney = balance">全部</span>
            </div>
            <p>
              <a :href="href" target="_blank" @click="link()">直接进入游戏</a>
              <a @click="enter()" target="_blank">转入并进入游戏</a>
            </p>
          </div>
        </div>
        <div class="validate" @click="$event.stopPropagation()" v-if="isGuest">
          <div>是否进入游戏</div>
          <p>
            <a @click="showMask = false" href="javascript:void(0);">否</a>
            <a :href="href" target="_blank" @click="link()">是</a>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import api from "../../api.js";
import { Swipe, SwipeItem } from "vue-swipe";
import { constants } from "crypto";
export default {
  data() {
    return {
      num: 0,
      klq: 0,
      notices: [],
      banners: {},
      name: api.name,
      isGuest: !!this.$getCookie("isGuest"),
      isLogin: !!this.$getCookie("username"),
      timer: 0,
      gameList: [],
      // 弹窗显示
      showMask: false,
      href: "",
      // ky余额
      kyBalance: 0,
      payType: 1,
      getmoney: null
    };
  },
  created() {
    if (this.isLogin) {
      this.getNotices();
      this.timer1 = setInterval(() => {
        this.getNotices();
      }, 20000);
    }
    this.getBanner();
    this.getNotice();
    this.getKyList();
  },
  methods: {
    // 试玩
    visitorLogin() {
      this.$loading.show("登录中");
      this.$http.post("user/login/temp", "").then(
        res => {
          this.$loading.hide();
          this.$setCookie(
            "username",
            res["userName"],
            1000 * 60 * 60 * 24 * 30
          );
          this.$setCookie("token", res["token"], 1000 * 60 * 60 * 24 * 30);
          this.$setCookie(
            "comid",
            res["companyPlatformID"],
            1000 * 60 * 60 * 24 * 30
          );
          this.$setCookie(
            "headphoto",
            res["headPhoto"],
            1000 * 60 * 60 * 24 * 30
          );
          this.$setCookie("isGuest", 1, 1000 * 60 * 60 * 24 * 30);
          this.$setCookie("userid", res["id"], 1000 * 60 * 60 * 24 * 30);
          this.isLogin = true;
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    // 获取在线用户
    getBanner() {
      this.$http.get("/adver/find/1").then(
        res => {
          this.banners = res;
        },
        e => {}
      );
    },
    // 获取公告
    getNotice() {
      this.$http.post("/notice/find", { size: 4 }).then(
        res => {
          this.notices = res;
        },
        e => {}
      );
    },
    //未读信息
    getNotices() {
      this.$http.post("/activity/avaCount", "").then(
        res => {
          this.num = res.unReadMsgCount;
          this.klq = res.avaActivityCount;
        },
        e => {}
      );
    },
    // 转换金额
    enter() {
      if (this.getmoney === null) {
        alert("转换金额不能为空!");
        return;
      }
      this.$loading.show("转换中");
      const body = { Money: this.getmoney, PayType: this.payType };
      this.$http.post("/chessCard/payOrWithdraw", body).then(
        res => {
          this.getBalance();
          this.$loading.hide();
          this.getmoney = null;
          this.showMask = false;
          window.open(this.href);
        },
        err => {
          this.$loading.hide();
        }
      );
      return true;
    },
    // 阻止冒泡
    stopPropagation(event) {
      e.stopPropagation();
    },
    // 获取余额
    getBalance() {
      this.$loading.show("请求中");
      this.$http.get("/chessCard/getBalance").then(
        res => {
          this.kyBalance = res["kyFreeBalance"];
          this.balance = res["accountBalance"];
          this.$loading.hide();
        },
        err => {
          console.log(err);
          this.$loading.hide();
        }
      );
    },
    stopPropagation(e) {
      e.stopPropagation();
    },
    getKyList() {
      this.$loading.show("请求中");
      this.$http.get("/chessCard/findGameList").then(
        res => {
          this.gameList = res;
          this.$loading.hide();
        },
        err => {
          console.log(err);
          this.$loading.hide();
        }
      );
    },
    getUrl(id) {
      this.getBalance();
      this.$loading.show("请求中");
      this.$http.get("/chessCard/login/" + id).then(
        res => {
          this.href = res.url;
          this.$loading.hide();
          this.showMask = true;
        },
        err => {
          this.$loading.hide();
        }
      );
    },
    link() {
      this.showMask = false;
    },
    pay() {
      this.showMask = false;
    }
  },
  components: {
    Swipe,
    SwipeItem
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.blur {
  filter: blur(5px);
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.loginlink {
  width: 4rem;
  height: 40px;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  font-size: 16px;
}

.banner {
  position: relative;
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  .zaixian {
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 4;
    font-size: 10px;
    padding: 3px 8px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 6px;
  }
}
.my-swipe {
  min-height: 37vw;
  width: 100%;
  margin: auto;
  overflow: hidden;
}
.mint-swipe,
.mint-swipe-items-wrap {
  overflow: hidden;
  position: relative;
  height: 100%;
  border-radius: 5px;
}

.mint-swipe-items-wrap {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.mint-swipe-items-wrap > div {
  position: absolute;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  width: 100%;
  height: 100%;

  display: none;
}

.mint-swipe-items-wrap > div.is-active {
  display: block;
  -webkit-transform: none;
  transform: none;
}
.noticeBg {
  border-radius: 5px;
  margin: 0.5rem;
  border-bottom: 1px solid rgb(222, 227, 233);
}

.notice {
  padding-left: 3rem;
  border-radius: 5px;
  height: 36px;
  font-size: 16px;
  line-height: 36px;
  background: url("../../assets/3.png") no-repeat 5px center;
  background-size: 25px 20px;
  animation: iconmove 3s infinite;
}

@keyframes iconmove {
  0% {
    background: url("../../assets/1.png") no-repeat 5px center;
    background-size: 25px 20px;
  }
  50% {
    background: url("../../assets/2.png") no-repeat 5px center;
    background-size: 25px 20px;
  }
  100% {
    background: url("../../assets/3.png") no-repeat 5px center;
    background-size: 25px 20px;
  }
}
.login-reg {
  color: #ffffff;
  position: absolute;
  right: 10px;
  top: 0;
  height: 40px;
  line-height: 40px;
  a {
    color: #ffffff;
    font-size: 16px;
  }
}

.msgbox {
  width: 4rem;
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  i {
    color: #fff;
    font-size: 2.5rem;
    span {
      width: 14px;
      line-height: 14px;
      background-color: #fb2351;
      border-radius: 50%;
      border: 1.5px solid #fff;
      position: absolute;
      right: 3px;
      top: 1px;
      display: flex;
      justify-content: center;
      em {
        display: block;
        font-style: normal;
        transform: scale(0.8);
        font-size: 12px;
        color: #fff;
      }
    }
  }
}
aside {
  width: 100%;
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #fff;
  a {
    width: 24vw;
    height: 24vw;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    p {
      font-size: 1rem;
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .game {
    z-index: 2;
    border-radius: 10px;
    width: 85%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 8px #ccc;
    overflow: hidden;
    text-align: center;
    nav {
      line-height: 3rem;
      font-size: 1.2rem;
      color: #fff;
      box-shadow: 0 2px 4px rgb(177, 177, 177);
      background: linear-gradient(90deg, #ff4b3e, #fb2351);
      position: relative;
      span {
        position: absolute;
        right: 3px;
        font-size: 3rem;
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      div:nth-of-type(1) {
        display: flex;
        align-items: center;
        line-height: 40px;
      }
      input {
        margin: 5px 0;
        border: 1px solid #aaa;
        line-height: 24px;
        padding: 2px 5px;
        background-color: rgba(000, 000, 000, 0);
        border-radius: 24px;
        color: red;
      }
      i {
        font-style: normal;
        text-align: left;
        color: rgb(128, 128, 128);
      }
      b {
        text-align: left;
        color: rgb(68, 67, 67);
        padding: 20px 0 5px;
      }
      div:nth-of-type(2) {
        display: flex;
        padding: 10px 0;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid #ccc;
        span {
          width: 15%;
          line-height: 18px;
          border: 1px solid rgb(255, 115, 0);
          border-radius: 35px;
          &:active {
            background-color: rgba(255, 115, 0, 1);
          }
        }
        span + span {
          margin-left: 10px;
        }
        i {
          flex: 1;
        }
      }
      p {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        a {
          width: 45%;
          line-height: 2.5rem;
          border: 1px solid #aaa;
          border-radius: 2.5rem;
          color: #333;
          font-size: 14px;
        }
        a + a {
          color: #fff;
          border: 0;
          background: linear-gradient(90deg, #ff4b3e, #fb2351);
        }
      }
    }
  }
  .validate {
    border-radius: 10px;
    width: 70%;
    height: 13rem;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    overflow: hidden;
    div {
      margin: auto 0;
      font-size: 16px;
      color: rgb(78, 78, 78);
    }
    p {
      line-height: 35px;
      background-color: #eee;
      padding-top: 1px;
      display: flex;
      justify-content: space-between;
      a {
        font-size: 15px;
        color: rgb(43, 151, 227);
        background-color: #fff;
        width: 49.8%;
      }
    }
  }
}
.g0 {
  background: #fff url("../../assets/chess/chess_0.png") no-repeat center 5px;
  background-size: 65%;
}
.g220 {
  background: #fff url("../../assets/chess/chess_220.png") no-repeat center 5px;
  background-size: 65%;
}
.g230 {
  background: #fff url("../../assets/chess/chess_230.png") no-repeat center 5px;
  background-size: 65%;
}
.g600 {
  background: #fff url("../../assets/chess/chess_600.png") no-repeat center 5px;
  background-size: 65%;
}
.g610 {
  background: #fff url("../../assets/chess/chess_610.png") no-repeat center 5px;
  background-size: 65%;
}
.g620 {
  background: #fff url("../../assets/chess/chess_620.png") no-repeat center 5px;
  background-size: 65%;
}
.g630 {
  background: #fff url("../../assets/chess/chess_630.png") no-repeat center 5px;
  background-size: 65%;
}
.g720 {
  background: #fff url("../../assets/chess/chess_720.png") no-repeat center 5px;
  background-size: 65%;
}
.g730 {
  background: #fff url("../../assets/chess/chess_730.png") no-repeat center 5px;
  background-size: 65%;
}
.g830 {
  background: #fff url("../../assets/chess/chess_830.png") no-repeat center 5px;
  background-size: 65%;
}
.g860 {
  background: #fff url("../../assets/chess/chess_860.png") no-repeat center 5px;
  background-size: 65%;
}
.g870 {
  background: #fff url("../../assets/chess/chess_870.png") no-repeat center 5px;
  background-size: 65%;
}
.g900 {
  background: #fff url("../../assets/chess/chess_900.png") no-repeat center 5px;
  background-size: 65%;
}
.g910 {
  background: #fff url("../../assets/chess/chess_910.png") no-repeat center 5px;
  background-size: 65%;
}
.g920 {
  background: #fff url("../../assets/chess/chess_920.png") no-repeat center 5px;
  background-size: 65%;
}
.g930 {
  background: #fff url("../../assets/chess/chess_930.png") no-repeat center 5px;
  background-size: 65%;
}
</style>


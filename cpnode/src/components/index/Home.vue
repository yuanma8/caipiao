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
    <section class="has-bottom">
      <div class="banner">
        <!-- <p class="zaixian">注册人数：{{banners.personNum}}</p> -->
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
          <!--彩种列表-->
          <GameList :lotteryList="lotteryList"></GameList>
        </div>
        <!-- 领工资 -->
        <router-link
          tag="div"
          to="Salary"
          @click="$event.stopPropagation()"
          class="salary"
          style=" left:0; top:400px;"
          v-touch:start="startHandler"
          v-touch:moving="movingHandler"
          v-touch:end="endHandler"
        ></router-link>
      </div>
    </section>
  </div>
</template>

<script>
// import Banner from "./Banner.vue";
import api from "../../api.js";
import GameList from "./GameList.vue";
import { Swipe, SwipeItem } from "vue-swipe";
// import { setTimeout, clearTimeout } from 'timers';
export default {
  data() {
    return {
      lotteryList: [],
      banners: {},
      notices: [],
      num: 0,
      klq: 0,
      name: api.name,
      isLogin: !!this.$getCookie("username"),
      timer: 0,
      timer1: 0,
      timer2: 0,
      //悬浮球定义变量
      _x_start: 0,
      _y_start: 0,
      left_start: 0,
      top_start: 0,
      _x_move: 0,
      _y_move: 0,
      bodyW: 0,
      bodyH: 0,
      _x_end: 0,
      _y_end: 0,
      divH: 0,
      divW: 0
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
    this.getList();
    this.getNotice();
  },
  beforeDestroy(){
    clearTimeout(this.timer)
    clearInterval(this.timer1)
    clearInterval(this.timer2)
  },
  methods: {
    // 获取banner
    getBanner() {
      this.$http.get("/adver/find/1").then(
        res => {
          this.banners = res;
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
    // 获取公告
    getNotice() {
      this.$http.post("/notice/find", { size: 4 }).then(
        res => {
          this.notices = res;
        },
        e => {}
      );
    },
    getList() {
      this.$http.post("lottery/info/all/1", "",{
						withCredentials: true //打开cookie
					}).then(
        res => {
          clearInterval(this.timer2);
          this.lotteryList = res;
          for (let item of this.lotteryList) {
            const timeLeft = item.remainTime - item.sysTime - item.blockTime;
            // 数组监测
            this.$set(item, "timeLeft", timeLeft);
            this.$set(item, "timeString", this.$countdown(timeLeft));
            // 处理开奖号码
            this.$set(item, "openNum", item.openResult.opencode.split(/[,+]/));
          }
          // 倒计时
          this.timer2 = setInterval(() => {
            for (let item of this.lotteryList) {
              item.timeLeft--;
              item.timeString = this.$countdown(item.timeLeft);
            }
          }, 1000);
        },
        err => {
          console.log(err);
        }
      );
      this.timer = setTimeout(() => {
        this.getList();
      }, 20000);
    },

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
    stopPropagation(e) {
      e.stopPropagation();
    },
    // 点击开始
    startHandler(e) {
      e.target.style.transition = "all 0s ease";
      this._x_start = e.touches[0].pageX; //起始点击位置
      this._y_start = e.touches[0].pageY; //起始点击位置
      this.left_start = parseInt(e.target.style.left); //元素左边距
      this.top_start = parseInt(e.target.style.top); //元素上边距
    },
    movingHandler(e) {
      // e.preventDefault(); //取消事件的默认动作。
      this._x_move = e.touches[0].pageX; //当前屏幕上所有触摸点的集合列表
      this._y_move = e.touches[0].pageY; //当前屏幕上所有触摸点的集合列表
      //左边距=当前触摸点-鼠标起始点击位置+起始左边距
      e.target.style.left =
        parseFloat(this._x_move) -
        parseFloat(this._x_start) +
        parseFloat(this.left_start) +
        "px";
      //上边距=当前触摸点-鼠标起始点击位置+起始上边距
      e.target.style.top =
        parseFloat(this._y_move) -
        parseFloat(this._y_start) +
        parseFloat(this.top_start) +
        "px";
    },
    endHandler(e) {
      e.target.style.transition = "all .5s ease";
      this.bodyW = document.documentElement.offsetWidth / 2; //屏幕宽的一半
      this.bodyH = document.documentElement.clientHeight; //屏幕高
      this._x_end = e.changedTouches[0].pageX; //松开位置
      this._y_end = e.changedTouches[0].pageY; //松开位置
      this.divH = e.target.offsetHeight; //元素高
      this.divW = e.target.offsetWidth; //元素宽
      //当最终位置在屏幕左半部分
      if (this._x_end < this.bodyW) {
        e.target.style.left = 0 + "px";
      } else if (this._x_end >= this.bodyW) {
        //当最终位置在屏幕右半部分
        e.target.style.left =
          document.documentElement.offsetWidth - parseFloat(this.divW) + "px";
      }
      //当元素顶部在屏幕外时
      if (parseFloat(e.target.style.top) < 40) {
        //置于顶部
        e.target.style.top = 40 + "px"; //置于顶部
      }
      //当元素底部在屏幕外时
      if (this.bodyH - this._y_end < parseFloat(this.divH) / 2 + 60) {
        //置于底部
        e.target.style.top = this.bodyH - parseFloat(this.divH) - 60 + "px";
      }
    }
  },
  components: {
    GameList,
    Swipe,
    SwipeItem
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
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
  background: #f2f2f2;
  margin: 0.5rem;
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

.indexWarp {
  background-color: #fff;
}

.indexContent {
  background: #fff;
  border-radius: 2.9rem 2.9rem 0.6rem 0.6rem;
  width: 100%;
  padding-top: 0.5rem;
}

.salary {
  position: fixed;
  width: 70px;
  height: 70px;
}

.salary::before {
  content: " ";
  position: absolute;
  width: 70px;
  height: 70px;
  background-size: contain;
  background-image: url("../../assets/salary-bg.png");
  animation: change 1.5s linear infinite;
}

.salary::after {
  content: " ";
  position: absolute;
  width: 70px;
  height: 70px;
  background-size: contain;
  background-image: url("../../assets/salary.png");
  animation: change2 1s infinite;
}

@keyframes change {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes change2 {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
</style>


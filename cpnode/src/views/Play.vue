<template>
  <div>
    <!--侧滑菜单-->
    <transition name="slide">
      <keep-alive>
        <GameList v-if="showSlide" :balance="balance"></GameList>
      </keep-alive>
    </transition>
    <!--遮罩-->
    <transition name="fade">
      <div class="shadow" v-if="showSlide" @click="showSlide=false"></div>
    </transition>
    <header>
      <a class="return" @click="showSlide=!showSlide"></a>
      <h1>{{lotteryName}}</h1>
      <div class="right">
        <router-link :to="'/result/'+lotteryId+'/0'" class="history"></router-link>
        <router-link :to="{name:'Order',params:{order:JSON.stringify(orderList)}}" class="order"></router-link>
      </div>
    </header>
    <section>
      <OpenInfo :lottery-id="lotteryId" :lottery-main="lotteryMain"></OpenInfo>
      <div class="top">
        <a :class="{active:state===0}" @click="state=0">投注区</a>
        <a :class="{active:state===2}" @click="state=2">聊天室</a>
      </div>
      <!--投注区-->
      <keep-alive>
        <PlayList
          :menu-list="menuList"
          :lottery-id="lotteryId"
          :balance="balance"
          :lottery-main="lotteryMain"
          v-if="state===0"
        ></PlayList>
      </keep-alive>
      <!--聊天室-->
      <keep-alive>
        <Chat :chaturl="chaturl" :userid="userid" v-if="state===2"></Chat>
      </keep-alive>
    </section>
  </div>
</template>

<script>
import GameList from "../components/play/GameList.vue";
import PlayList from "../components/play/PlayList.vue";
import OpenInfo from "../components/play/OpenInfo.vue";
import Chat from "../components/play/Chat.vue";

export default {
  data() {
    return {
      state: 0,
      lotteryName: this.$route.params.name,
      lotteryId: this.$route.params.id,
      menuList: JSON.parse(this.$route.params.data),
      userid: this.$getCookie("userid"),
      chaturl: this.$getCookie("chatUrl"),
      showSlide: false,
      balance: "",
      lotteryMain: {
        lotteryName: "彩种名称",
        curPeriodNum: 100,
        openNum: [0, 0, 0, 0, 0],
        openResult: {
          openPeriod: "",
          zodiac: "",
          resultColor: ""
        }
      },
      orderList: []
    };
  },
  created() {
    this.getList(this.lotteryId);
    this.getBalance();
  },
  beforeDestroy() {
    window.clearTimeout(this.timer1);
    window.clearInterval(this.timer);
  },
  // 路由改变
  beforeRouteUpdate(to, from, next) {
    this.showSlide = false;
    next();
    this.lotteryName = this.$route.params.name;
    this.lotteryId = this.$route.params.id;
    this.getList(this.lotteryId);
    this.menuList = JSON.parse(this.$route.params.data);
  },
  methods: {
    // 切换聊天室
    changeState(i) {
      this.state = i;
    },
    // 开奖
    getList(id) {
      this.$http.post("/lottery/info/" + id, "",{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          window.clearTimeout(this.timer1);
          window.clearInterval(this.timer);
          if (
            (res["lotteryInfo"]["curPeriodNum"] - 1).toString() !==
            res["lotteryInfo"]["openResult"]["openPeriod"]
          ) {
            this.timer1 = setTimeout(() => {
              this.getList(id);
            }, 4053);
          }
          this.lotteryMain = res.lotteryInfo;
          this.orderList = res.orderList;
          // 处理开奖号码
          this.lotteryMain.openNum = this.lotteryMain["openResult"]["opencode"]
            .split(/[+,]/)
            .map(Number);
          //计算和值
          if (
            this.lotteryId === "50" ||
            this.lotteryId === "81" ||
            this.lotteryId === "80" ||
            this.lotteryId === "55" ||
            this.lotteryId === "88" ||
            this.lotteryId === "89" ||
            this.lotteryId === "92" ||
            this.lotteryId === "93"
          ) {
            this.lotteryMain.total =
              this.lotteryMain.openNum[0] + this.lotteryMain.openNum[1];
          } else {
            this.lotteryMain.total = this.lotteryMain.openNum.reduce(
              (prev, next) => prev + next
            );
          }
          // 时时彩顺子
          if (
            this.lotteryId === "5" ||
            this.lotteryId === "4" ||
            this.lotteryId === "1" ||
            this.lotteryId === "82" ||
            this.lotteryId === "83" ||
            this.lotteryId === "84" ||
            this.lotteryId === "94" ||
            this.lotteryId === "95"
          ) {
            this.lotteryMain.one = this.getResult([
              this.lotteryMain.openNum[0],
              this.lotteryMain.openNum[1],
              this.lotteryMain.openNum[2]
            ]);
            this.lotteryMain.two = this.getResult([
              this.lotteryMain.openNum[1],
              this.lotteryMain.openNum[2],
              this.lotteryMain.openNum[3]
            ]);
            this.lotteryMain.three = this.getResult([
              this.lotteryMain.openNum[2],
              this.lotteryMain.openNum[3],
              this.lotteryMain.openNum[4]
            ]);
          }
          //倒计时
          const timeLeft =
            this.lotteryMain.remainTime -
            this.lotteryMain.sysTime -
            this.lotteryMain.blockTime;
          this.$set(this.lotteryMain, "timeLeft", timeLeft);
          this.$set(this.lotteryMain, "timeString", this.$countdown(timeLeft));
          this.timer = setInterval(() => {
            this.lotteryMain.timeLeft--;
            this.lotteryMain.timeString = this.$countdown(
              this.lotteryMain.timeLeft
            );
            if (
              this.lotteryMain.remainTime > 0 &&
              this.lotteryMain.timeLeft < -this.lotteryMain.blockTime
            ) {
              window.clearInterval(this.timer);
              this.getList(id);
            }
          }, 1000);
        },
        err => {
          console.log(err);
        }
      );
    },
    getResult(arr) {
      arr = arr.sort();
      let one = arr[0],
        two = arr[1],
        three = arr[2];
      if (one === two && one === three) {
        return "豹子";
      } else if (
        (one + 1 === two && one + 2 === three) ||
        arr.toString() === "0,8,9" ||
        arr.toString() === "0,1,9"
      ) {
        return "顺子";
      } else if (one === two || two === three || one === three) {
        return "对子";
      } else if (
        one + 1 === two ||
        two + 1 === three ||
        (one === 0 && three === 9)
      ) {
        return "半顺";
      } else {
        return "杂六";
      }
    },
    // 获取余额
    getBalance() {
      const body = {
        lotteryId: this.lotteryId
      };
     this.$http.post("/user/balance", { username: this.$getCookie("username") },{ 
       withCredentials: true  //打开cookie
     }).then(
        res => {
          this.balance = res["accountBalanceStr"];
        },
        err => {}
      );
    }
  },
  components: {
    GameList,
    OpenInfo,
    PlayList,
    Chat
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.shadow {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
header {
  .return {
    background: url("../assets/icons/list.svg") no-repeat center;
    background-size: 50%;
  }
  .order {
    width: 40px;
    height: 40px;
    background: url("../assets/icons/order.png") no-repeat center;
    background-size: 50%;
    position: absolute;
    right: 40px;
    top: 0;
  }
  .history {
    width: 40px;
    height: 40px;
    background: url("../assets/icons/kaijiang@2x.png") no-repeat center;
    background-size: 50%;
    position: absolute;
    right: 0;
    top: 0;
  }
}

section {
  display: flex;
  flex-direction: column;
  // height: 100vh;
}
.top {
  display: flex;
  height: 4rem;
  border-bottom: 1px solid #fbfdea;
  background-color: #f1f1f1;
   a {
    display: block;
    flex-grow: 1;
    text-align: center;
    line-height: 4rem;
    color: #616161;
    font-size: 14px;
    border-right: 1px solid #fbfdea;
    &.active {
      color: #d91d37;
      font-weight: 900;
      border-bottom: 2px solid #d91d37;
    }
  }
}
</style>

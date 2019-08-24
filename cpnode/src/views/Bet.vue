<template>
  <div>
    <header>
      <a class="return" @click="$router.go(-1)">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>确定注单</h1>
    </header>
    <section style="padding-bottom:7rem">
      <div class="top">
        <p>
          当前期号:
          <span>{{periods}}</span>
        </p>
        <p>
          截止投注:
          <span>{{timeString}}</span>
        </p>
      </div>
      <div class="money">目前余额:{{balance}}</div>
      <div class="list-wrap">
        <div class="title">
          <p>模式:{{gameName}}</p>
          <p class="right">
            <label>投注金额</label>
            <input type="number" min="0" pattern="[0-9]*" v-model="amount">
          </p>
        </div>
        <ul class="list" v-if="gameName !== '直选' && gameName !== '二字定位' && gameName !== '三字定位'">
          <li v-for="(item,idx) in betList" :key="idx">
            <div class="left">
              <i @click="remove(idx)">×</i>
              <span class="remark">{{item.remark}}{{nameList.toString()}}</span>
              <span class="odds">赔率: {{item.odds}}</span>
            </div>
            <div class="right" v-if="nameList.length===0">{{amount}}元</div>
            <div class="right" v-if="nameList.length!==0">{{betAmount}}组</div>
          </li>
        </ul>
        <ul class="list" v-else>
          <li v-for="(item,idx) in betList" :key="idx">
            <div class="left">
              <i @click="remove(idx)">×</i>
              <span class="remark">{{item.remark}}{{item.betinfo.toString()}}</span>
              <span class="odds">赔率: {{item.odds}}</span>
            </div>
            <div class="right">{{amount}}元</div>
          </li>
        </ul>
        <div class="clear" @click="clear()">
          <i class="iconfont icon-qingchu"></i>清空
        </div>
      </div>
      <p class="sure">
        <i></i>我已阅读并同意《委托投注规则》
      </p>
    </section>
    <div class="bot">
      <p>单注最低：￥1 单注最高￥500000 单场最高：￥1000000</p>
      <div>
        <span>
          总下注金额:
          <em>{{totalMoney}}元</em>
        </span>
        <a @click="bet()">确定</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lotteryId: this.$route.params.id,
      amount: this.$route.params.amount,
      betList: JSON.parse(this.$route.params.betlist),
      balance: this.$route.params.balance,
      betAmount: this.$route.params.betamount,
      periods: this.$route.params.periods,
      timeLeft: this.$route.params.timeleft,
      gameName: this.$route.params.gamename,
      timeString: "",
      timer: null,
      nameList: []
    };
  },
  created() {
    this.timeString =
      this.timeLeft > 0 ? this.$countdown(this.timeLeft) : "已封盘";
    this.setTimer();
    this.getBetList();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    totalMoney() {
      if (this.nameList.length === 0) {
        return this.amount * this.betList.length;
      } else {
        return this.amount * this.betAmount;
      }
    }
  },
  methods: {
    getBetList() {
      // 处理连肖连尾
      if (this.gameName === "连肖" || this.gameName === "连尾") {
        this.nameList = this.betList.map(item => {
          return item.name;
        });
        const list = this.betList.map(item => {
          return item.playId;
        });
        this.betList[0].betinfo = list.toString();
        this.betList = this.betList.splice(0, 1);
      } else if (this.betList[0].betinfo) {
        this.nameList = this.betList[0].betinfo.split(",");
      }
    },
    setTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--;
        this.timeString =
          this.timeLeft > 0 ? this.$countdown(this.timeLeft) : "已封盘";
        if (this.timeLeft < 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    // 获取余额
    remove(idx) {
      this.betList.splice(idx, 1);
      if (this.betList.length === 0) {
        // alert("清除成功,点击返回选择投注项目");
        this.$router.go(-1);
      }
    },
    clear() {
      this.betList = [];
      // alert("清除成功,点击返回选择投注项目");
      this.$router.go(-1);
    },
    bet() {
      if (this.betList.length === 0) {
        return;
      }
      if (this.amount === "" || this.amount < 1 || this.amount % 1 !== 0) {
        alert("金额输入错误!");
        return;
      }
      if (this.totalMoney > this.balance) {
        alert("投注金额不能大于余额!");
        return;
      }
      if (this.timeLeft <= 0) {
        alert("已封盘!");
        return;
      }
      const body = {
        PeriodNumber: this.periods,
        data: []
      };
      if (this.betList[0].betinfo) {
        for (let item of this.betList) {
          body.data.push({
            money: this.amount,
            playId: item.playId,
            betInfo: item.betinfo
          });
        }
      } else {
        for (let item of this.betList) {
          body.data.push({ money: this.amount, playId: item.playId });
        }
      }
      body.data = JSON.stringify(body.data);
      this.$loading.show("提交中");
      this.$http.post("/order/bet/" + this.$route.params.id, body,{ 
        withCredentials: true  //打开cookie
      } ).then(
        res => {
          this.$loading.hide();
          alert("投注成功!");
          this.$router.go(-1);
        },
        e => {
          this.$loading.hide();
        }
      );
    }
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
section {
  padding-bottom: 7rem;
  > .top {
    display: flex;
    background-color: #fff;
    margin-bottom: 0.5rem;
    > p {
      flex: 1;
      font-size: 1rem;
      line-height: 2.4rem;
      text-align: center;
      > span {
        color: #d91d37;
      }
    }
  }
  > .money {
    height: 4.5rem;
    font-size: 1.4rem;
    color: #d91d37;
    text-align: center;
    padding: 1rem;
    background: #fff url(../assets/color_line@2x.png) no-repeat left bottom;
    background-size: 100% 0.2rem;
  }
  > .list-wrap {
    padding: 1.5rem 1.3rem;
    position: relative;
    &:before {
      height: 1rem;
      width: calc(100% - 1.8rem);
      content: "";
      background: #a09e95;
      border-radius: 0.4rem;
      position: absolute;
      left: 0.9rem;
      top: 0.6rem;
      z-index: 1;
    }
    &:after {
      height: 1rem;
      width: calc(100% - 2.6rem);
      content: "";
      background: #f2f2f1;
      border-radius: 0.4rem;
      position: absolute;
      left: 1.3rem;
      top: 1rem;
      z-index: 2;
    }
    > .title {
      font-size: 1rem;
      color: #363636;
      min-height: 3.2rem;
      padding: 1rem;
      line-height: 3.2rem;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > .right {
        text-align: right;
        font-weight: bold;
      }
      input {
        width: 5rem;
        border: 0.1rem solid #e3e3e3;
        padding: 0.5rem;
        border-radius: 0.2rem;
        margin-left: 15px;
      }
    }
    > .list {
      max-height: 19rem;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      > li {
        background-color: #fff;
        height: 4rem;
        padding: 1.5rem 1rem;
        border-top: 0.1rem dashed #e3e3e3;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .left {
          display: flex;
          align-items: center;
          > i {
            width: 1.6rem;
            height: 1.6rem;
            font-size: 18px;
            line-height: 1.5rem;
            text-align: center;
            border-radius: 50%;
            display: inline-block;
            background-color: #ccc;
            color: #fff;
            margin-right: 10px;
          }
          > .remark {
            font-weight: bold;
            margin-right: 10px;
          }
          > .odds {
            color: #d91d37;
            font-weight: bold;
          }
        }
      }
    }
    > .clear {
      text-align: center;
      font-size: 1rem;
      height: 3rem;
      line-height: 3rem;
      border-top: 0.1rem solid #e3e3e3;
      background-color: #fff;
      position: relative;
      &:after {
        background: url(../assets/wave_line@2x.png) no-repeat left bottom;
        background-size: 100% 0.75rem;
        width: 100%;
        height: 0.75rem;
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.75rem;
      }
      > i {
        margin-right: 10px;
        vertical-align: center;
      }
    }
  }
  > .sure {
    text-align: center;
  }
}

.bot {
  border-top: 0.1rem solid #e3e3e3;
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  height: 6.8rem;
  z-index: 99;
  > p {
    line-height: 2.4rem;
    background: #fff;
    text-align: center;
    font-size: 1rem;
  }
  > div {
    width: 100%;
    height: 4.4rem;
    background: #363636;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      display: block;
      color: #fff;
      font-size: 1.2rem;
      > em {
        color: #d91d37;
      }
    }
    > a {
      display: block;
      width: 8.8rem;
      height: 3.6rem;
      background-color: #d91d37;
      border-radius: 0.4rem;
      font-size: 1.5rem;
      text-align: center;
      line-height: 3.6rem;
      color: #fff;
    }
  }
}
</style>

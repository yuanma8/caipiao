<template>
  <div class="bet-wrap" :class="{'active':betAmount>=1}">
    <p class="total">
      <span>共{{betAmount}}注{{betMoney}}元</span>
      <span>可用余额:{{balance}}元</span>
    </p>
    <div class="bet-form">
      <label>
        <input type="number" min="0" pattern="[0-9]*" v-model.trim="amount">
        <a @click="clearAmount">清空</a>
      </label>
      <a @click="submitBet()">确认下注</a>
    </div>
    <div class="quick-bet">
      <span @click="setAmount(item)" :class="'chip'+item" v-for="item in chipsTable" :key="item">
        {{item===10000?'1w':item===50000?'5w':item}}
        <i class="iconfont icon-yihaochouma"></i>
      </span>
      <a @click="openTable()">筹码设定</a>
    </div>
    <!--筹码设定弹出框-->
    <Chips :chips-table="chipsTable" v-if="showchips"></Chips>
  </div>
</template>

<script>
import Chips from "./Chips.vue";

export default {
  props: ["balance", "betList", "lotteryMain", "secondName"],
  data() {
    return {
      amount: 10,
      // 筹码表
      chipsTable: [1, 5, 10],
      showchips: false
    };
  },
  computed: {
    betAmount() {
      if (this.betList.length > 0 && this.betList[0]["betinfo"]) {
        let n = this.betList[0]["betinfo"].split(",").length;
        // 三中二,三全中
        switch (this.secondName) {
          case "三中二":
          case "三全中":
          case "前三组选":
          case "三字定位":
            if (n > 2) {
              return (n * (n - 1) * (n - 2)) / 6;
            } else {
              return 0;
            }
          case "二全中":
          case "二中特":
          case "特串":
          case "前二组选":
          case "二字定位":
            return (n * (n - 1)) / 2;
          case "四全中":
            if (n === 4) {
              return 1;
            } else {
              return 0;
            }
          case "二中二":
            if (n === 2) {
              return 1;
            } else {
              return 0;
            }
          case "三中三":
            if (n === 3) {
              return 1;
            } else {
              return 0;
            }
          case "四中四":
            if (n === 4) {
              return 1;
            } else {
              return 0;
            }
          case "五中五":
            if (n === 5) {
              return 1;
            } else {
              return 0;
            }
          case "六中五":
            if (n === 6) {
              return 1;
            } else {
              return 0;
            }
          case "七中五":
            if (n === 7) {
              return 1;
            } else {
              return 0;
            }
          case "八中五":
            if (n === 8) {
              return 1;
            } else {
              return 0;
            }
          case "自选不中":
          case "组选三":
            if (n >= 5) {
              return 1;
            } else {
              return 0;
            }
          case "组选六":
            if (n >= 4) {
              return 1;
            } else {
              return 0;
            }
          default:
            return this.betList.length;
        }
      } else {
        let m = this.betList.length;
        // 二连尾
        switch (this.secondName) {
          case "二连尾":
          case "二连肖":
            return (m * (m - 1)) / 2;
          case "三连尾":
          case "三连肖":
            if (m > 2) {
              return (m * (m - 1) * (m - 2)) / 6;
            } else {
              return 0;
            }
          case "四连尾":
          case "四连肖":
            if (m > 3) {
              return (m * (m - 1) * (m - 2) * (m - 3)) / 24;
            } else {
              return 0;
            }
          case "五连尾":
          case "五连肖":
            if (m > 3) {
              return (m * (m - 1) * (m - 2) * (m - 3) * (m - 4)) / 120;
            } else {
              return 0;
            }
          default:
            return m;
        }
      }
    },
    betMoney() {
      if (this.amount !== "") {
        return this.amount * this.betAmount;
      } else {
        return 0;
      }
    }
  },
  methods: {
    // 快捷投注
    setAmount(n) {
      if (this.amount === "") {
        this.amount = n;
      } else {
        this.amount = parseInt(this.amount);
        this.amount += n;
      }
    },
    // 清空
    clearAmount() {
      this.$parent.$data.betList = [];
      this.$parent.$data.nameList = [];
      this.$parent.$data.numberList = [[], [], []];
      this.amount = "";
    },
    submitBet() {
      if (this.amount === "" || this.amount < 1 || this.amount % 1 !== 0) {
        alert("金额输入错误!");
        return;
      }
      if (this.betMoney > this.balance) {
        alert("投注金额不能大于余额!");
        return;
      }
      if (this.betAmount === 0) {
        return;
      }
      this.$router.push({
        name: "bet",
        params: {
          id: this.lotteryMain.lotteryId,
          balance: this.balance,
          amount: this.amount,
          periods: this.lotteryMain.curPeriodNum,
          timeleft: this.lotteryMain.timeLeft,
          betlist: JSON.stringify(this.betList),
          betamount: this.betAmount,
          gamename: this.$parent.$data.gameName
        }
      });
    },
    // 打开设置筹码
    openTable() {
      this.showchips = true;
    }
  },
  components: {
    Chips
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.bet-wrap {
  height: 2rem;
  overflow-y: hidden;
  background-color: #efefef;
  transition: height 0.3s ease;
  &.active {
    height: 10rem;
  }
  > .total {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    > span {
      display: inline-block;
    }
  }
  > .bet-form {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > label {
      background-color: #d91d37;
      border-radius: 4px;
      padding: 0.3rem;
      width: 60%;
      display: flex;
      justify-content: space-between;
      input {
        display: block;
        width: 65%;
        height: 2.2rem;
        border-radius: 4px;
        text-align: center;
      }
      a {
        display: inline-block;
        padding: 0.3rem;
        color: #fff;
        background-color: #b42035;
      }
    }
    > a {
      display: inline-block;
      color: #fff;
      background-color: #d91d37;
      width: 30%;
      padding: 0.5rem 0;
      border-radius: 4px;
      text-align: center;
    }
  }
  > .quick-bet {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    > span {
      display: flex;
      width: 3.5rem;
      height: 3.5rem;
      position: relative;
      justify-content: center;
      line-height: 3.5rem;
      color: #919800;
      font-size: 2rem;
      font-weight: bold;
      &.chip5 {
        color: #52b322;
      }
      &.chip10 {
        color: #e20073;
        font-size: 1.8rem;
      }

      &.chip50 {
        color: #eba600;
        font-size: 1.8rem;
      }

      &.chip100 {
        color: #e03f39;
        font-size: 1.6rem;
      }

      &.chip500 {
        color: #3dbaf0;
        font-size: 1.6rem;
      }

      &.chip1000 {
        color: #235cc7;
        font-size: 1rem;
      }

      &.chip5000 {
        color: #8b43aa;
        font-size: 1rem;
      }

      &.chip10000 {
        color: #74a507;
        font-size: 1.4rem;
      }

      &.chip50000 {
        color: #ae8420;
        font-size: 1.4rem;
      }
      > i {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 3.5rem;
        color: inherit;
      }
    }
    > a {
      display: block;
      color: #fff;
      background-color: #d91d37;
      width: 30%;
      padding: 0.5rem 0;
      border-radius: 4px;
      text-align: center;
    }
  }
}
</style>

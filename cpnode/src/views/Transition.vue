<template>
  <div class="transition_box">
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>额度转换</h1>
    </header>
    <div class="top">
      <div class="avatar">
        <router-link :src="userdata.headphoto" to="userinfo" tag="img"></router-link>
        <span>{{userdata.username}}</span>
      </div>
      <div class="balance">总余额：{{totalBalance}}</div>
    </div>
    <div class="tab_balance">
      <span :class="{'active':balanceActive == 0}" @click="balanceActive = 0">
        <em></em>额度转换
      </span>
      <span :class="{'active':balanceActive == 1}" @click="getChange()">
        <em></em>转换记录
      </span>
    </div>
    <div class="con_balance" v-if="balanceActive == 0">
      <ul>
        <li>
          <span>余额查询</span>
          <router-link tag="span" style="color: orange; font-weight:500;" to="pay">充值</router-link>
        </li>
        <li>
          <span>彩票账户</span>
          <div>
            <span class="con_money">￥</span>
            <span>{{balance}}</span>
            <span class="con_refresh">⭮</span>
            <span
              @click="recycle()"
              style="color: red; border-radius:3px;border:1px solid red;line-height:25px;padding:0 5px;"
            >一键回收</span>
          </div>
        </li>
        <li>
          <span>开元账户</span>
          <div>
            <span class="con_money">G</span>
            <span>{{kyBalance}}</span>
            <span class="con_refresh">⭮</span>
          </div>
        </li>
      </ul>
      <ul>
        <li>转账金额</li>
        <li>
          <span>转出账户</span>
          <aside>{{payType?'主账户':'开元账户'}}</aside>
          <div class="image" @click="change()"></div>
        </li>
        <li>
          <span>转入账户</span>
          <aside>{{payType?'开元账户':'主账户'}}</aside>
        </li>
        <li>
          <span>转账金额</span>
          <input type="text" placeholder="1" v-model="getMoney">
        </li>
      </ul>
      <p>单笔充值金额最低1元，最高100000元</p>
      <div class="btn">
        <div :class="{'btnActive':btnActive == 0}" @click="shift()">全部转入</div>
        <div :class="{'btnActive':btnActive == 1}" @click="chessCard()">确认转换</div>
      </div>
    </div>
    <div class="record" v-if="balanceActive == 1">
      <ul>
        <li v-for="(item,id) in forChange" :key="id">
          <div class="left">
            <i></i>
            <div>
              <p>转出账户:{{item.inputName}}</p>
              <p>转入账户:{{item.outputName}}</p>
              <span>{{item.createdTime}}</span>
            </div>
          </div>
          <div class="right">{{item.money}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      balanceActive: 0,
      btnActive: 1,
      userdata: {
        headphoto: this.$getCookie("headphoto") || "",
        username: this.$getCookie("username") || ""
      },
      // ky余额
      kyBalance: '0.00',
      // 棋牌余额
      balance: '0.00',
      payType: 1,
      getMoney: null,
      // 转换记录
      forChange: [],     
    };
  },
  created() {
    // this.getBalance();
    this.getKyBalance();
  },
  computed:{
      // 总余额
      totalBalance:function() {
       return (parseFloat(this.balance)*100 + parseFloat(this.kyBalance)*100)/100;
      }
  },
  methods: {
    // 获取余额
    // getBalance() {
    //   this.$loading.show("请求中");
    //   this.$http.post("/user/balance", { lotteryId: this.lotteryId }).then(
    //     res => {
    //       // this.kyBalance = res["kyFreeBalance"];
    //       this.balance = res["accountBalanceStr"];
    //       this.$loading.hide();
    //     },
    //     err => {
    //       console.log(err);
    //       this.$loading.hide();
    //     }
    //   );
    // },
    // 获取棋牌余额
    getKyBalance() {
      this.$loading.show("请求中");
      this.$http.get("/chessCard/getBalance").then(
        res => {
          this.balance = res["accountBalanceStr"];
          this.kyBalance = res["kyFreeBalanceStr"];
          this.$loading.hide();
        },
        err => {
          this.$loading.hide();
        }
      );
    },
    change() {
      this.payType = this.payType ? 0 : 1;
    },
    // 转换金额
    chessCard() {
      this.$loading.show("转换中");
      this.btnActive = 1;
      const body = { Money: this.getMoney, PayType: this.payType };
      this.$http.post("/chessCard/payOrWithdraw", body).then(
        res => {
          this.getKyBalance();
          this.$loading.hide();
          alert("转换成功");
          this.getMoney = null;
        },
        err => {
          this.$loading.hide();
        }
      );
    },
    // 一键回收
    recycle() {
      this.$loading.show("转换中");
      this.$http.get("/chessCard/withdrawAll").then(
        res => {
          this.getKyBalance();
          this.$loading.hide();
          alert("转换成功");
        },
        err => {
          this.$loading.hide();
        }
      );
    },
    // 全部转入
    shift() {
      // this.$loading.show("转换中");
      this.btnActive = 0;
      this.getMoney = this.payType ? this.balance : this.kyBalance;
      const body = {
        Money: this.getMoney,
        PayType: this.payType
      };
      // this.$http.post("/chessCard/payOrWithdraw", body).then(
      //   res => {
      //     this.$loading.hide();
      //   },
      //   err => {
      //     this.$loading.hide();
      //   }
      // );
    },
    // 转入转出记录
    getChange() {
      this.balanceActive = 1;
      this.$http.post("/chessCard/payHistory", { size: 20 }).then(
        res => {
          this.forChange = res;
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
.transition_box {
  padding-top: 50px;
  height: 100%;
  background-color: #fff;
  color: rgb(140, 140, 140);
  .top {
    padding: 0 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar {
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 5rem;
        margin-right: 1rem;
      }
      span {
        font-size: 1.3rem;
        line-height: 2rem;
      }
    }
    .balance {
      font-size: 1.3rem;
      color: rgb(255, 81, 0);
    }
  }
  .tab_balance {
    width: 100%;
    display: flex;
    border-bottom: 4px solid rgb(235, 235, 235);

    span {
      font-size: 1.25rem;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      em {
        display: block;
        font-style: normal;
        width: 26px;
        height: 26px;
        margin-bottom: 4px;
      }
      &:nth-of-type(1) em {
        background: url("../assets/icons/edu1.svg") no-repeat center;
        background-size: 26px;
      }
      &:nth-of-type(2) em {
        background: url("../assets/icons/jilu2.svg") no-repeat center;
        background-size: 35px;
      }
    }
    .active {
      color: red;
      &:nth-of-type(1) em {
        background: url("../assets/icons/edu1-1.svg") no-repeat center;
        background-size: 26px;
      }
      &:nth-of-type(2) em {
        background: url("../assets/icons/jilu2-2.svg") no-repeat center;
        background-size: 35px;
      }
    }
  }
  .con_balance {
    ul:first-child {
      border-bottom: 4px solid rgb(235, 235, 235);
      font-size: 1.2rem;
      li:first-child {
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
      }
      li {
        padding: 0 15px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        div {
          width: 75%;
          display: flex;
          align-items: center;
          span {
            margin-right: 10px;
          }
          .con_refresh {
            width: 25px;
            line-height: 25px;
            text-align: center;
            border-radius: 5px;
            color: red;
            font-size: 20px;
            transform: rotate(90deg);
          }
          .con_money {
            display: flex;
            width: 20px;
            height: 20px;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #fff;
            background-color: rgb(255, 162, 62);
            border-radius: 50%;
            border: 2px solid rgb(255, 237, 0);
          }
        }
      }
      li + li {
        border-top: 1px solid rgb(235, 235, 235);
      }
    }
    ul:nth-of-type(2) {
      font-size: 1.2rem;
      li:first-child {
        // color: #797777;
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
      }
      li {
        padding: 0 15px;
        line-height: 40px;
        border-bottom: 1px solid rgb(235, 235, 235);
        display: flex;
        justify-content: space-between;
        position: relative;
        aside {
          width: 75%;
        }
        .image {
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 0;
          background: #fff url("../assets/icons/change.png") no-repeat center;
          background-size: 40px;
          z-index: 10;
        }
        input {
          width: 75%;
          color: red;
        }
      }
    }
    p {
      color: red;
      text-align: center;
      line-height: 50px;
    }
    div.btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        width: 40%;
        line-height: 40px;
        font-size: 1.3rem;
        border: 1.5px solid #b6afaf;
        border-radius: 401px;
        text-align: center;
        font-weight: 700;
      }
      .btnActive {
        background: linear-gradient(90deg, #ff4b3e, #fb2351);
        color: #fff;
        border: 0;
      }
    }
  }
  .record {
    height: calc(100vh - 160px);
    overflow: hidden;
    ul {
      height: 100%;
      overflow: auto;
      li {
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(235, 235, 235);
        .left {
          display: flex;
          align-items: center;
          width: 60%;
          color: rgb(165, 165, 165);
          line-height: 20px;
          i {
            font-style: normal;
            display: inline-block;
            width: 44px;
            height: 44px;
            margin-right: 1rem;
            background: url("../assets/icons/Symbol_small.svg") no-repeat center;
            background-size: 44px;
          }
          p {
            font-size: 1.2rem;
            color: #535353;
          }
        }
        .right {
          display: flex;
          font-size: 1.2rem;
          align-items: center;
          color: rgb(255, 106, 7);
        }
      }
    }
  }
}
</style>

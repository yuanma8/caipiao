<template>
  <div>
    <header>
      <h1>充值提现</h1>
      <a @click="goView('/mywallet')" class="detail">明细</a>
    </header>
    <section class="has-bottom">
      <div class="pay-balance">
        <h2 class="title">
          账户余额(元)
          <i
            @click="shMoney()"
            :class="'iconfont icon-'+(showMoney=='true'?'zhengyan':'biyan')"
          ></i>
        </h2>
        <div class="money">
          <!-- <span>{{showMoney?balance:'恭喜发财'}}</span> -->
          <span v-if="showMoney=='true'">{{balance}}</span>
          <span v-if="showMoney=='false'">恭喜发财</span>
        </div>
      </div>
      <ul class="pay-content">
        <li @click="goView('/pay')">
          <div class="left">
            <i class="icon"></i>
          </div>
          <div class="right">
            <h2>账户充值</h2>
            <p>多种充值方式可选</p>
            <p>银行卡、支付宝、财付通、微信支付</p>
          </div>
          <i class="iconfont icon-jiantou"></i>
        </li>
        <li @click="goView('/withdraw')">
          <div class="left">
            <i class="icon"></i>
          </div>
          <div class="right">
            <h2>提现</h2>
            <p>多种提现方式可选</p>
            <p>银行卡、支付宝、财付通、微信支付</p>
          </div>
          <i class="iconfont icon-jiantou"></i>
        </li>
        <li @click="goView('/mywallet')">
          <div class="left">
            <i class="icon"></i>
          </div>
          <div class="right">
            <h2>充提记录</h2>
            <p>查询充值，提现交易记录</p>
            <p>交易明细</p>
          </div>
          <i class="iconfont icon-jiantou"></i>
        </li>
        <li @click="goView('/Transition')">
          <div class="left">
            <i class="icon"></i>
          </div>
          <div class="right">
            <h2>额度转换</h2>
            <p>支持彩票额度、棋牌额度相互转换</p>
          </div>
          <i class="iconfont icon-jiantou"></i>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance: "",
      showMoney: false,
      showMoney:this.$getCookie("showMoney")||'false',
      isGuest: !!this.$getCookie("isGuest")
    };
  },
  created() {
    this.getBalance();
  },
  methods: {
    // 页面跳转
    shMoney(){
      if(this.showMoney == 'false'){
        this.showMoney = 'true'
        this.$setCookie('showMoney','true')
      }else{
        this.showMoney = 'false'
        this.$setCookie('showMoney','false')
      }
    },
    goView(v) {
      if (this.isGuest) {
        if (confirm("游客账号无权访问,去注册?")) {
          this.$router.push("/register");
        }
      } else {
        this.$router.push(v);
      }
    },
    // 获取余额
    getBalance() {
      this.$http.post("/user/balance", { lotteryId: this.lotteryId },{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          this.balance = res["accountBalanceStr"];
          this.lockbalance = res["lockBalanceStr"];
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
.detail {
  color: #fff;
  font-size: 1.2rem;
  line-height: 40px;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 1rem;
  min-width: 4rem;
  text-align: center;
}

.pay-balance {
  height: 10rem;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  padding: 0 2rem;
  .title {
    height: 4.2rem;
    font-size: 1.6rem;
    color: #f7f7f7;
    font-weight: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      font-size: 2.5rem;
    }
  }
  .money {
    font-size: 2.5rem;
    color: #fff;
  }
}

.pay-content li {
  height: 9.5rem;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #cacaca;
  background: #fff;
  display: flex;
  align-items: center;
  .right {
    flex-grow: 1;
  }
  .left i {
    display: block;
    width: 54px;
    height: 54px;
    background: url("../../assets/icons/symbol1.svg") no-repeat center;
    background-size: 100%;
    margin-right: 1rem;
  }
  h2 {
    font-size: 1.6rem;
    color: #404040;
    margin-bottom: 0.5rem;
    font-weight: normal;
  }
  p {
    font-size: 1.2rem;
    color: #909090;
  }
  &:nth-child(2) .left i {
    background: url("../../assets/icons/symbol2.svg") no-repeat center;
    background-size: 100%;
  }
  &:nth-child(3) .left i {
    background: url("../../assets/icons/symbol3.svg") no-repeat center;
    background-size: 100%;
  }
  &:nth-child(4) .left i {
    background: url("../../assets/icons/symbol4.svg") no-repeat center;
    background-size: 100%;
  }
}
</style>

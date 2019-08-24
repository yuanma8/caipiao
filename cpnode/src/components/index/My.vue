<template>
  <div>
    <div class="user-header">
      <div class="top">
        <div class="avatar">
          <img :src="userdata.headphoto" @click="goView('/userinfo')">
          <span>{{userdata.isGuest?'游客':userdata.username}}</span>
        </div>
        <div class="setting">
          <!--TODO:-->
          <a class="server" :href="info.onlineClientServerUrl" target="_blank"></a>
          <router-link to="setting" class="option">
            <i class="iconfont icon-chilun"></i>
          </router-link>
        </div>
      </div>
    </div>
    <section class="padding">
      <div class="card">
        <div class="balance">
          <div>
            <p>{{balance}}</p>
            <span>
              可用余额
              <i class="refresh" @click="getBalance()"></i>
            </span>
          </div>
          <div>
            <p>{{lockbalance}}</p>
            <span>未结金额</span>
          </div>
        </div>
        <div class="pay">
          <a @click="goView('/pay')">
            <i></i>
            <span>充值</span>
          </a>
          <a @click="goView('/withdraw')">
            <i></i>
            <span>提现</span>
          </a>
        </div>
      </div>
      <div class="record card">
        <div class="title">
          <i class="jilu"></i>
          <span class="content">投注记录</span>
          <i class="iconfont icon-jiantou"></i>
        </div>
        <div class="record-item">
          <router-link to="/record/0">
            <i></i>待开奖
          </router-link>
          <router-link to="/record/1">
            <i></i>已中奖
          </router-link>
          <router-link to="/record/2">
            <i></i>未中奖
          </router-link>
        </div>
      </div>
      <div class="common-list card">
        <li @click="goView('/mywallet')">
          <i class="wallet"></i>
          <span class="content">我的钱包</span>
          <span class="check">查看交易明细</span>
          <i class="iconfont icon-jiantou"></i>
        </li>
        <li @click="goView('/userinfo')">
          <i class="usericon"></i>
          <span class="content">个人中心</span>
          <i class="iconfont icon-jiantou"></i>
        </li>
        <li @click="goView('/checkdetail')">
          <i class="checkdetail"></i>
          <span class="content">实时稽核</span>
          <i class="iconfont icon-jiantou"></i>
        </li>
        <router-link to="/msg" tag="li">
          <i class="mssg"></i>
          <span class="content">消息中心</span>
          <span
            v-if="(num > 0)&&(klq > 0)"
            style="width: 1.2rem;height: 1.2rem;display: flex;justify-content: center;align-items: center;background-color: red; border-radius: 250%;color:#fff; font-size:12px;"
          >{{num+klq}}</span>
          <i class="iconfont icon-jiantou"></i>
        </router-link>
        <router-link to="/level" tag="li" v-if="!userdata.isGuest">
          <i class="level"></i>
          <span class="content">等级查询</span>
          <i class="iconfont icon-jiantou"></i>
        </router-link>
        <router-link to="/Transition" tag="li" v-if="!userdata.isGuest">
          <i class="Symbol_small"></i>
          <span class="content">额度转换</span>
          <i class="iconfont icon-jiantou"></i>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance: "",
      lockbalance: "",
      info: {},
      num: 0,
      klq: 0,
      userdata: {
        headphoto: this.$getCookie("headphoto") || "",
        username: this.$getCookie("username") || "",
        isGuest: !!this.$getCookie("isGuest")
      }
    };
  },
  created() {
    this.getBalance();
    this.getNotices();
    this.getCompany();
  },
  methods: {
    // 页面跳转
    goView(v) {
      if (this.userdata.isGuest) {
        if (confirm("游客账号无权访问,去注册?")) {
          this.$router.push("/register");
        }
      } else {
        this.$router.push(v);
      }
    },
    getNotices() {
      this.$http.post("/activity/avaCount", "").then(
        res => {
          this.num = res.unReadMsgCount;
          this.klq = res.avaActivityCount;
        },
        e => {}
      );
    },
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
    },
    // 获取余额
    getBalance() {
      this.$http.post("/user/balance", { username: this.userdata.username },{ 
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
.user-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  height: 15rem;
  .top {
    padding: 1.8rem 1rem 1.8rem 2rem;
    display: flex;
    justify-content: space-between;
    .avatar {
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 5rem;
        height: 5rem;
        border-radius: 5rem;
        margin-right: 1.5rem;
        border: 2px solid #fff;
      }
      span {
        color: #fff;
        font-size: 1.3rem;
        line-height: 2rem;
        font-weight: bold;
      }
    }
  }
  .setting {
    height: 36px;
    width: 85px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .server {
      display: block;
      width: 36px;
      height: 36px;
      background: url("../../assets/icons/server.svg") no-repeat center;
      background-size: 75%;
    }
    .option {
      i {
        font-size: 36px;
        color: #fff;
      }
    }
  }
}

.padding {
  margin-top: 5rem;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 11;
  .common-list {
    margin-bottom: 56px;
  }
  .card {
    background-color: #fff;
    position: relative;
    z-index: 11;
  }
  .balance {
    padding: 1rem 0;
    display: flex;
    position: relative;
    border-bottom: 1px solid #e3e3e3;
    div {
      flex: 1;
      text-align: center;
      p {
        font-size: 18px;
        color: #d91d37;
        height: 1.8rem;
        font-weight: bold;
      }
      span {
        color: #48484c;
        font-size: 12px;
      }
      .refresh {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: url("../../assets/icons/refresh.svg") no-repeat center;
        background-size: cover;
      }
    }
    &:before {
      display: block;
      width: 0.1rem;
      height: 2.3rem;
      content: "";
      background: #e3e3e3;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -0.8rem;
    }
  }
  .pay {
    position: relative;
    background: #fff;
    display: flex;
    &:before {
      width: 0.1rem;
      height: 60%;
      content: "";
      background: #e3e3e3;
      position: absolute;
      left: 50%;
      top: 20%;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 4.3rem;
      line-height: 4.3rem;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      i {
        display: block;
        width: 26px;
        height: 26px;
        margin-right: 12px;
      }
      &:first-child {
        color: #f39800;
        i {
          background: url("../../assets/icons/pay.svg") no-repeat center;
        }
      }
      &:last-child {
        color: #1d83d9;
        i {
          background: url("../../assets/icons/withdraw.svg") no-repeat center;
        }
      }
    }
  }
  .record {
    margin: 1rem 0;
    position: relative;
    background: #fff;
    .title {
      padding: 0.8rem 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e3e3e3;
      .content {
        display: block;
        flex-grow: 1;
      }
      .jilu {
        display: inline-block;
        width: 26px;
        height: 26px;
        margin-right: 1rem;
        background: url("../../assets/icons/jilu.svg") no-repeat center;
      }
      .icon-jiantou {
        color: #ccc;
        font-size: 15px;
      }
    }
    .record-item {
      display: flex;
      margin: 0 -20px;
      a {
        display: block;
        flex: 1;
        text-align: center;
        font-size: 14px;
        margin: 1rem 0 1rem;
        position: relative;
        i {
          display: block;
          width: 26px;
          height: 26px;
          margin: 0 auto 0.5rem auto;
        }
        &:after {
          display: block;
          width: 0.1rem;
          height: 3.5rem;
          content: "";
          background: #e3e3e3;
          position: absolute;
          right: 0;
          top: 10%;
        }
        &:first-child i {
          background: url("../../assets/icons/clock.svg") no-repeat center;
        }
        &:nth-child(2) i {
          background: url("../../assets/icons/youhui.svg") no-repeat center;
        }
        &:nth-child(3) i {
          background: url("../../assets/icons/sad.svg") no-repeat center;
        }
        &:last-child:after {
          display: none;
        }
      }
    }
  }
}

.check {
  font-size: 12px;
  color: #f44747;
}

.message,
.mssg,
.level,
.wallet,
.usericon,
.Symbol_small,
.checkdetail {
  display: inline-block;
  width: 26px;
  height: 26px;
  margin-right: 1rem;
}

.message {
  background: url("../../assets/icons/message.svg") no-repeat center;
}

.level {
  background: url("../../assets/icons/level.svg") no-repeat center;
}

.Symbol_small {
  background: url("../../assets/icons/Symbol_small.svg") no-repeat center;
}

.mssg {
  background: url("../../assets/icons/me_message_icon.png") no-repeat center;
  background-size: contain;
}

.wallet {
  background: url("../../assets/icons/wallet.svg") no-repeat center;
}

.usericon {
  background: url("../../assets/icons/usericon.svg") no-repeat center;
}

.checkdetail {
  background: url("../../assets/icons/checkout.svg") no-repeat center;
}
</style>

<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>账户充值</h1>
      <router-link to="/onlineserver" class="contact">联系客服</router-link>
    </header>
    <section>
      <p class="cur-user">
        当前账号:
        <span style="color: #d91d37">{{username}}</span>
      </p>
      <div class="first-step">
        <p class="padding">
          <b>●</b> 请输入充值金额
        </p>
        <input type="number" min="0" pattern="[0-9]*" v-model="amount">
        <div class="quick-select">
          <a v-for="m in money" :key="m" @click="setAmount(m)" :class="{'active':amount===m}">{{m}}</a>
        </div>
      </div>
      <div class="second-step">
        <p class="padding">
          <b>●</b> 选择支付方式
        </p>
        <ul>
          <li @click="getPayList(3)">
            <div class="left">
              <i class="ysf"></i>
            </div>
            <div class="right">
              <p>云闪付转账</p>
              <span>汇聚产业各方之力的移动支付统一入口平台</span>
            </div>
          </li>
          <li @click="getPayList(1)">
            <div class="left">
              <i class="iconfont icon-unionpay"></i>
            </div>
            <div class="right">
              <p>网银转账</p>
              <span>大额支付专用绿色通道,实时到账</span>
            </div>
          </li>
          <li @click="getPayList(2)">
            <div class="left">
              <i class="iconfont icon-zhuanzhang"></i>
            </div>
            <div class="right">
              <p>支付宝/微信转账</p>
              <span>支付宝/微信转账绿色专用通道</span>
            </div>
          </li>
          <li @click="getScanList()">
            <div class="left">
              <i class="iconfont icon-scanpay"></i>
            </div>
            <div class="right">
              <p>扫码支付</p>
              <span>包含支付宝,微信,QQ钱包等线下二维码支付</span>
            </div>
          </li>
          <li @click="getOnlineList()">
            <div class="left">
              <i class="iconfont icon-onlinepay"></i>
            </div>
            <div class="right">
              <p>在线支付</p>
              <span>包含银联,微信,支付宝,QQ钱包等在线支付</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="tip">温馨提示:所有二维码和银行账户都是不定期更换的,请勿保存账户进行转账,以页面显示的最新账户为准.</div>
    </section>
    <div class="dialog-wrap" v-if="status!=0">
      <div class="pay-wrap">
        <div class="pay-head">
          <a @click="status=0">×</a>
          {{payTitle}}
        </div>
        <div class="pay-body">
          <ul v-if="status==1">
            <li
              v-for="(item, index) in bankPayList"
              @click="pay=item"
              :key="index"
              :class="{'active':pay == item}"
            >
              <span :class="'bank bank_'+item.BankCode"></span>
              <span class="name">{{item.Name}}</span>
              <i>√</i>
            </li>
          </ul>
          <ul v-if="status==2">
            <li
              v-for="(item, index) in scanPayList"
              @click="pay=item"
              :key="index"
              :class="{'active':pay == item}"
            >
              <span :class="'scanpay spay_'+item.Type"></span>
              <span class="name">{{typeName(item.Type)}}</span>
              <i>√</i>
            </li>
          </ul>
          <ul v-if="status==3">
            <li
              v-for="(item, index) in onlinePayList"
              @click="pay=item"
              :key="index"
              :class="{'active':pay == item}"
            >
              <span :class="'online opay_'+item.Type"></span>
              <span class="name">{{typeName2(item.Type)}}</span>
              <i>√</i>
            </li>
          </ul>
          <span class="tip" style="height:30px;">
            单笔最低充值金额{{pay.MinMoney}}元,最高充值金额{{pay.MaxMoney}}
            元
          </span>
        </div>
        <div class="pay-foot">
          <a @click="goPay()">提交支付</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sha256 from "crypto-js/sha256";
import api from "../api.js";
export default {
  data() {
    return {
      username: this.$getCookie("username"),
      amount: 101,
      money: [101, 301, 502, 2002, 3001, 5001],
      constData: {
        username: this.$getCookie("username"),
        url: "",
        apikey: "EAED40601BEE463AABCF13CAA36AC1AF",
        comid: this.$getCookie("comid"),
        clientip: "47.91.252.160",
        version: "1.0"
      },
      status: 0,
      bankPayList: [],
      scanPayList: [],
      onlinePayList: [],
      pay: "",
      payTitle: ""
    };
  },
  created() {
    this.status = 0;
    let i = 0;
    for (const item of api.payList) {
      this.$http.get(item + "/api/Test/Get").then(
        res => {
          i += 1;
          if (i === 1) {
            this.constData.url = item + "/api/Payment";
            api.payApi = item + "/api/Payment";
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  methods: {
    setAmount(i) {
      this.amount = i;
    },
    // 银行转账&支付宝转账
    getPayList(i) {
      this.$loading.show("加载中");
      this.bankPayList = [];
      this.status = 1;
      switch (i) {
        case 1:
          this.payTitle = "网银转账";
          break;
        case 2:
          this.payTitle = "支付宝/微信转账";
          break;
        case 3:
          this.payTitle = "云闪付转账";
          break;
      }
      const time = new Date()
        .getTime()
        .toString()
        .substr(0, 10);
      const sign = sha256(
        "apikey=" +
          this.constData.apikey +
          "&companyid=" +
          this.constData.comid +
          "&loginname=" +
          this.constData.username +
          "&timestamp=" +
          time +
          "&type=" +
          i +
          "&version=" +
          this.constData.version
      ).toString();
      const body = {
        ApiKey: this.constData.apikey,
        CompanyId: this.constData.comid,
        LoginName: this.constData.username,
        SignData: sign,
        TimeStamp: time,
        type: i,
        Version: this.constData.version
      };
      this.$http.post(this.constData.url + "/GetPayTransferList", body).then(
        res => {
          this.bankPayList = res.Data.BankCardPayList;
          this.pay = this.bankPayList[0];
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    // 选择银行
    changePay(item) {
      this.pay = item;
    },
    // 获取扫码列表
    getScanList() {
      this.$loading.show("加载中");
      this.payTitle = "扫码支付";
      this.status = 2;
      const time = new Date()
        .getTime()
        .toString()
        .substr(0, 10);
      const sign = sha256(
        "apikey=" +
          this.constData.apikey +
          "&companyid=" +
          this.constData.comid +
          "&loginname=" +
          this.constData.username +
          "&timestamp=" +
          time +
          "&version=" +
          this.constData.version
      ).toString();
      const body = {
        ApiKey: this.constData.apikey,
        CompanyId: this.constData.comid,
        LoginName: this.constData.username,
        SignData: sign,
        TimeStamp: time,
        Version: this.constData.version
      };
      // 扫码接口
      this.$http.post(this.constData.url + "/GetPayScan", body).then(
        res => {
          this.scanPayList = res.Data.PayScanList;
          this.pay = this.scanPayList[0];
          // console.log(this.pay.MaxMoney,this.pay.MinMoney)
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    // 在线支付
    getOnlineList() {
      this.$loading.show("加载中");
      this.payTitle = "在线支付";
      this.status = 3;
      const time = new Date()
        .getTime()
        .toString()
        .substr(0, 10);
      const sign = sha256(
        "apikey=" +
          this.constData.apikey +
          "&companyid=" +
          this.constData.comid +
          "&loginname=" +
          this.constData.username +
          "&paysource=H5" +
          "&timestamp=" +
          time +
          "&version=" +
          this.constData.version
      ).toString();
      const body = {
        ApiKey: this.constData.apikey,
        CompanyId: this.constData.comid,
        LoginName: this.constData.username,
        PaySource: "H5",
        SignData: sign,
        TimeStamp: time,
        Version: this.constData.version
      };
      this.$http
        .post(this.constData.url + "/GetPayConfigDetailList", body)
        .then(
          res => {
            this.onlinePayList = res.Data;
            this.pay = this.onlinePayList[0];
            this.$loading.hide();
          },
          e => {
            this.$loading.hide();
          }
        );
    },
    // 前往支付
    goPay() {
      if (!this.pay) {
        alert("请先选择账户!");
        return;
      }
      if (this.amount < this.pay.MinMoney || this.amount > this.pay.MaxMoney) {
        alert(
          "充值金额应该在" +
            this.pay.MinMoney +
            "元到" +
            this.pay.MaxMoney +
            "元之间"
        );
        return false;
      }
      // TODO: 最大最小金额限制
      switch (this.status) {
        case 1:
          this.$router.push({
            name: "bankpay",
            params: { amount: this.amount, pay: this.pay }
          });
          break;
        case 2:
        case 3:
          this.$router.push({
            name: "scanpay",
            params: { amount: this.amount, pay: this.pay }
          });
          break;
      }
    },
    // 修改支付方式显示
    typeName(t) {
      switch (t) {
        case 1:
          return "微信";
        case 2:
          return "QQ";
        case 3:
          return "支付宝";
        case 4:
          return "百度钱包";
        case 5:
          return "云闪付";
      }
    },
    typeName2(t) {
      switch (t) {
        case 1:
          return "微信";
        case 2:
          return "QQ";
        case 3:
          return "网银";
        case 4:
          return "支付宝";
        case 5:
          return "花呗";
        case 6:
          return "京东";
        case 7:
          return "百度钱包";
        case 8:
          return "银联扫码";
        case 9:
          return "云闪付";
      }
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.contact {
  color: #fff;
  position: absolute;
  top: 1rem;
  right: 0.5rem;
}

.cur-user {
  padding: 0.5rem;
  border-bottom: 4px solid #d91d37;
}

section {
  padding-bottom: 0;
}

.padding {
  padding: 0.5rem;
  b {
    color: #d91d37;
  }
}

.first-step {
  border-bottom: 4px solid #d91d37;
  input {
    display: block;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    background: #fff;
    padding: 0 2rem;
  }
}

.quick-select {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  a {
    display: block;
    width: 30%;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    background-color: #fff;
    margin-bottom: 1rem;
    color: #d91d37;
    border: 1px solid #fff;
    &.active {
      border-color: #d91d37;
      background: #fff url("../assets/icons/redtri@2x.png") no-repeat right top;
      background-size: 15px 15px;
    }
  }
}

.second-step ul {
  border-bottom: 1px solid #999;
  li {
    height: 5rem;
    border-top: 1px solid #999;
    display: flex;
    align-items: center;
    background-color: #fff;
    .left {
      margin: 0 0.5rem 0 1rem;
      i {
        font-size: 3rem;
        color: #d91d37;
      }
      .ysf {
        display: block;
        width: 3rem;
        height: 3rem;
        background: url("../assets/payment/yunshanfu.svg") no-repeat center;
        background-size: contain;
      }
    }
    .right {
      p {
        font-size: 16px;
        color: #000;
      }
      span {
        font-size: 12px;
        color: #666;
      }
    }
  }
}

.tip {
  height: 6rem;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: #fff3ba;
}

.dialog-wrap {
  flex-direction: column;
  justify-content: flex-end;
}

.pay-wrap {
  width: 100%;
  background-color: #fff;
  .pay-head {
    height: 4rem;
    line-height: 4rem;
    border-bottom: 1px solid #ddd;
    background-color: #eee;
    text-align: center;
    font-size: 16px;
    position: relative;
    a {
      position: absolute;
      left: 2rem;
      top: 0;
      font-size: 30px;
      color: #666;
    }
  }
  .pay-body {
    height: 20rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    li {
      height: 4rem;
      line-height: 4rem;
      border-bottom: 1px solid #e3e3e3;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      .name {
        flex-grow: 1;
        padding: 0 1rem;
      }
      i {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: #eee;
        color: #fff;
        line-height: 2rem;
        text-align: center;
        font-weight: bold;
        border-radius: 50%;
      }
      &.active i {
        background: #4ca80f;
      }
      .bank {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background-size: 100%;
        display: block;
        background: url("../assets/payment/elsebank.svg") no-repeat center;
        background-size: contain;
      }
      .bank_ABC {
        background-image: url("../assets/payment/abc.png");
      }
      .bank_HXB {
        background-image: url("../assets/payment/hxb.png");
      }
      .bank_CCB {
        background-image: url("../assets/payment/ccb.png");
      }
      .bank_CMB {
        background-image: url("../assets/payment/cmb.png");
      }
      .scanpay,
      .online {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: url("../assets/payment/defaultpay.png") no-repeat center;
        vertical-align: middle;
        background-size: 100%;
      }
      .spay_1,
      .opay_1 {
        background-image: url("../assets/payment/wxpay.png");
      }
      .spay_2,
      .opay_2 {
        background-image: url("../assets/payment/qqpay.png");
      }
      .spay_3,
      .opay_4,
      .opay_5 {
        background-image: url("../assets/payment/alipay1.png");
      }
      .opay_9 {
        background-image: url("../assets/payment/ysf.png");
        background-size: 120%;
      }
    }
  }
  .pay-foot {
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: block;
      width: 95%;
      height: 4rem;
      line-height: 4rem;
      background-color: #d91d37;
      text-align: center;
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
    }
  }
}
</style>



// WEBPACK FOOTER //
// Pay.vue
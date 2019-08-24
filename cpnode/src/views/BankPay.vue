<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>{{payName}}</h1>
    </header>
    <section>
      <ul v-if="pay.Type==3">
        <li>
          <label>收款人</label>
          <input type="text" readonly="true" :value="pay.AccountName" ref="dom1">
          <a @click="show(1)">复制</a>
        </li>
        <li>
          <label>收款账号</label>
          <input type="text" readonly="true" :value="pay.Account" ref="dom2">
          <a @click="show(2)">复制</a>
        </li>
        <li>
          <label>附加码(必填)</label>
          <input type="text" readonly="true" :value="pay.ScriptSpan" ref="dom3">
          <a @click="show(3)">复制</a>
        </li>
        <li>
          <label>充值金额</label>
          <input type="text" readonly :value="amount">
        </li>
        <li style="height: 16rem;flex-direction: column;justify-content: space-around;">
          <p style="color: #d91d37;">或者使用云闪付APP扫码转账</p>
          <img :src="pay.FilePath" style="width:30%" alt>
        </li>
      </ul>
      <ul v-else>
        <li>
          <label>发卡银行</label>
          <input type="text" readonly :value="pay.Name">
        </li>
        <li>
          <label>收款人</label>
          <input type="text" readonly="true" :value="pay.AccountName" ref="dom1">
          <a @click="show(1)">复制</a>
        </li>
        <li>
          <label>银行账号</label>
          <input type="text" readonly="true" :value="pay.Account" ref="dom2">
          <a @click="show(2)">复制</a>
        </li>
        <li>
          <label>附加码(必填)</label>
          <input type="text" readonly="true" :value="pay.ScriptSpan" ref="dom3">
          <a @click="show(3)">复制</a>
        </li>
        <li>
          <label>优惠方式</label>
          <input type="text" readonly value="暂无">
        </li>
        <li>
          <label>充值金额</label>
          <input type="text" readonly :value="amount">
        </li>
      </ul>
      <p style="text-align: center;line-height:3rem;">
        温馨提示:输入支付金额时,
        <span style="color: #d91d37;">备注填写附加码</span>
      </p>
    </section>
    <div class="tips">复制成功!</div>
    <a class="sub-btn" @click="sub()">完成</a>
  </div>
</template>
<script>
import axios from "../http";
import sha256 from "crypto-js/sha256";
import api from "../api.js";
export default {
  data() {
    return {
      amount: this.$route.params.amount,
      pay: this.$route.params.pay,
      constData: {
        username: this.$getCookie("username"),
        url: api.payApi,
        apikey: "EAED40601BEE463AABCF13CAA36AC1AF",
        comid: this.$getCookie("comid"),
        clientip: "47.91.252.160",
        version: "1.0"
      }
    };
  },
  computed: {
    payName() {
      switch (this.pay.Type) {
        case 1:
          return "网银转账";
        case 2:
          return "支付宝/微信转账";
        case 3:
          return "云闪付转账";
      }
    }
  },
  methods: {
    // 复制
    show(i) {
      switch (i) {
        case 1:
          this.$refs.dom1.select();
          break;
        case 2:
          this.$refs.dom2.select();
          break;
        case 3:
          this.$refs.dom3.select();
          break;
      }
      try {
        document.execCommand("copy");
      } catch (err) {
        alert("您的浏览器不支持复制.");
      }
    },
    // 提交
    sub() {
      const time = new Date()
        .getTime()
        .toString()
        .substr(0, 10);
      const sign = sha256(
        "amount=" +
          this.amount +
          "&apikey=" +
          this.constData.apikey +
          "&clientip=" +
          this.constData.clientip +
          "&companyid=" +
          this.constData.comid +
          "&loginname=" +
          this.constData.username +
          "&payid=" +
          this.pay["ID"] +
          "&paysource=H5" +
          "&receiptspostscript=" +
          this.pay["ScriptSpan"] +
          "&timestamp=" +
          time +
          "&type=" +
          this.pay["Type"] +
          "&version=" +
          this.constData.version
      ).toString();
      const body = {
        Amount: this.amount,
        ApiKey: this.constData.apikey,
        ClientIp: this.constData.clientip,
        CompanyID: this.constData.comid,
        LoginName: this.constData.username,
        PayID: this.pay["ID"],
        PaySource: "H5",
        ReceiptsPostScript: this.pay["ScriptSpan"],
        TimeStamp: time,
        type: this.pay["Type"],
        Version: this.constData.version,
        SignData: sign
      };
      this.$loading.show("提交中");
      axios.post(this.constData.url + "/PaymentTransfer", body,{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          if (res["IsSuccess"] === true) {
            this.$loading.hide();
            alert("提交订单成功!");
            this.$router.go(-1);
          } else {
            this.$loading.hide();
            alert(res["Message"]);
          }
        },
        e => {
          this.$loading.hide();
        }
      );
    }
  }
};
</script>
<style scoped>
ul {
  padding-top: 10px;
}

ul li {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding: 0 15px;
  position: relative;
}

ul li:last-child {
  margin-top: 3rem;
  border-top: 1px solid #eee;
}

ul li label {
  display: block;
  width: 30%;
}

ul li input {
  width: 70%;
}

ul li a {
  position: absolute;
  right: 15px;
}

.sub-btn {
  position: fixed;
  bottom: 10px;
  left: 5%;
  display: block;
  width: 90%;
  height: 3rem;
  line-height: 3rem;
  background-color: #d91d37;
  color: #fff;
  text-align: center;
  border-radius: 4px;
}
</style>

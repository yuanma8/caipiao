<template>
  <div>
    <div class="withdrawal_mask" v-if="withdrawal">
      <div class="withdrawal">
        <h2>提示</h2>
        <p>为了您的账户资金安全,请定期修改取款密码!</p>
        <aside>
          <span @click="withdrawal = false">暂不修改</span>
          <router-link tag="span" to="changepwd/2">马上修改</router-link>
        </aside>
      </div>
    </div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1 v-if="status===0">提现</h1>
      <h1 v-if="status===1">绑定银行卡</h1>
      <h1 v-if="status===2">设置提款密码</h1>
      <a @click="status=1;getBankList()" v-if="status===0" class="tochange">修改银行卡</a>
    </header>
    <section>
      <div v-if="status===0">
        <ul>
          <li>
            <label>可提金额:</label>
            <p>{{balance}}</p>
          </li>
          <li>
            <label>持卡人:</label>
            <p>{{bankInfo.bankUserName}}</p>
          </li>
          <li>
            <label>银行卡:</label>
            <p>{{bankInfo.bankName}}</p>
          </li>
          <li>
            <label>卡号:</label>
            <p>{{bankInfo.bankAccount}}</p>
          </li>
          <li>
            <label>提款金额:</label>
            <input type="number" placeholder="请输入您要提款的金额(元)" v-model="withdrawBankInfo.money">
          </li>
          <li>
            <label>提款密码:</label>
            <input type="number" placeholder="请输入提款密码" v-model="withdrawBankInfo.paypwd">
          </li>
        </ul>
        <a class="sub-btn" @click="withdraw()">提交申请</a>
      </div>
      <div v-if="status===1">
        <p class="warning">请绑定账户本人的银行卡</p>
        <ul>
          <li>
            <label>发卡银行:</label>
            <select v-model="bankInfo.bankName">
              <option
                v-for="item in bankList"
                :value="item.bankName"
                :key="item.bankCode"
              >{{item.bankName}}</option>
            </select>
          </li>
          <li>
            <label>持卡姓名:</label>
            <span>{{bankInfo.bankUserName}}</span>
          </li>
          <li>
            <label>银行卡号:</label>
            <input type="tel" v-model="bankInfo.bankAccount" placeholder="输入银行卡号">
          </li>
          <li>
            <label>发卡网点:</label>
            <input type="text" v-model="bankInfo.branchName" placeholder="输入分行信息">
          </li>
        </ul>
        <a class="sub-btn" @click="updateBank()">确认</a>
      </div>
      <div v-if="status===2">
        <ul>
          <li>
            <label>设置提款密码:</label>
            <input type="number" min="0" pattern="[0-9]*" v-model="payPwd" placeholder="需4位数字">
          </li>
          <li>
            <label>确认提款密码:</label>
            <input
              type="number"
              min="0"
              pattern="[0-9]*"
              v-model="repeatPaypwd"
              placeholder="需4位数字"
            >
          </li>
        </ul>
        <a class="sub-btn" @click="updatePayPwd()">确认</a>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      withdrawal: false,
      setpwd: this.$getCookie("setpwd"),
      bankInfo: {
        id: "",
        bankAccount: "",
        bankCode: "",
        bankId: "",
        bankName: "",
        branchName: "",
        bankUserName: this.$getCookie("realname")
      },
      balance: 0,
      status: 0,
      payPwd: "",
      repeatPaypwd: "",
      bankList: [],
      withdrawBankInfo: {
        money: "",
        paypwd: "",
        bankid: ""
      }
    };
  },
  created() {
    this.getBalance();
    if (this.setpwd === "0") {
      // 未设置支付密码
      this.status = 2;
    } else {
      this.getBankInfo();
      if (this.$getCookie('isUpdatePayPwdFlag') == 1){
      this.withdrawal = true
      }
    }
  },
  methods: {
    // 获取余额
    getBalance() {
      const body = {
        lotteryId: this.lotteryId
      };
      this.$http.post("/user/balance", body,{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          this.balance = res["accountBalanceStr"];
        },
        err => {}
      );
    },
    // 获取银行卡信息
    getBankInfo() {
      this.$http.get("/user/bank/info",{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          if (res.bankAccount === null) {
            this.status = 1;
            this.getBankList();
          } else {
            this.bankInfo = res;
            this.status = 0;
          }
        },
        e => {}
      );
    },
    // 新建支付密码
    updatePayPwd() {
      if (this.payPwd.length !== 4) {
        alert("请输入4位数字!");
      } else if (this.payPwd !== this.repeatPaypwd) {
        alert("两次输入密码不一致!");
      } else {
        this.$loading.show("提交中");
        this.$http.post("/user/update", { payPwd: this.payPwd }).then(
          res => {
            this.$loading.hide();
            alert("设置成功!");
            this.$setCookie("setpwd", 1);
            this.status = 1;
            this.getBankList();
          },
          e => {
            this.$loading.hide();
          }
        );
      }
    },
    // 获取银行卡列表
    getBankList() {
      this.$http.get("system/bank/list").then(
        res => {
          this.bankList = res;
        },
        e => {}
      );
    },
    //更新&新增银行卡
    updateBank() {
      if (this.bankInfo.bankAccount === "" || this.bankInfo.branchName === "") {
        alert("银行卡号和开户支行不能为空!");
        return;
      }
      this.$loading.show("提交中");
      this.$http.post("/user/bindBank", this.bankInfo,{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          this.$loading.hide();
          alert("绑定银行卡成功!");
          this.bankInfo = res;
          if (this.setpwd === "0") {
            // 未设置支付密码
            this.status = 2;
          } else {
            this.getBankInfo();
          }
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    // 申请提款
    withdraw() {
      if (
        this.withdrawBankInfo.money < 1 ||
        this.withdrawBankInfo.money > 1000000
      ) {
        alert("提款最小金额为1元!");
        return;
      }
      // 提款小数限制
      if (this.withdrawBankInfo.money % 1 !== 0) {
        alert("提款金额必须为整数!");
        return;
      }
      this.withdrawBankInfo.bankid = this.bankInfo.id;
      this.$loading.show("提交中");
      this.$http.post("/withdraw/submit", this.withdrawBankInfo,{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          this.$loading.hide();
         
					alert("提示："+res["msg"]);
        },
        e => {
          this.$loading.hide();
        }
      );
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.withdrawal_mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
.withdrawal {
  background-color: #fff;
  border-radius: 10px;
  width: 60%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  h2 {
    width: 100%;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    background: linear-gradient(90deg, #ff4b3e, #fb2351);
  }
  p {
    font-size: 14px;
    line-height: 28px;
    padding: 10px;
    color: #202020;
  }
  aside {
    color: rgb(43, 151, 227);
    width: 100%;
    line-height: 35px;
    background-color: #eee;
    padding-top: 1px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 15px;
      background-color: #fff;
      width: 49.8%;
      text-align: center;
      &:active {
        background-color: rgb(243, 243, 243);
      }
    }
  }
}
}
.tochange {
  position: absolute;
  right: 5px;
  top: 10px;
  color: #fff;
}
.warning {
  height: 4rem;
  line-height: 4rem;
  padding: 0 1rem;
  background-color: #ddd;
  color: #000;
  font-size: 16px;
}
ul li {
  display: flex;
  height: 4rem;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 0 1rem;
  label {
    margin-right: 2rem;
    display: inline-block;
    width: 20%;
    text-align: justify;
    text-align-last: justify;
  }
  input {
    background-color: transparent;
  }
}
.sub-btn {
  display: block;
  width: 90%;
  height: 3rem;
  line-height: 3rem;
  background-color: #d91d37;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  margin: 3rem auto;
  font-size: 16px;
}
</style>

<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>代理注册</h1>
    </header>
    <div class="regContent">
      <ul>
        <li>
          <label class="require">代理账号：</label>
          <input  autocomplete="off" type="text" v-model.trim="regBody.userName" placeholder="账号必须为6-15位数字与字母的组合">
        </li>
        <li>
          <label class="require">返佣模式：</label>
          <select v-model="regBody.planType">
            <option value="2">按负盈利返佣</option>
            <option value="1">按打码量返佣</option>
          </select>
        </li>
        <li>
          <label class="require">登录密码：</label>
          <input autocomplete="off" type="password" v-model.trim="regBody.password" placeholder="6-20位数字字母组合">
        </li>
        <li>
          <label class="require">确认密码：</label>
          <input type="password" v-model.trim="password" placeholder="请确认密码">
        </li>
        <li>
          <label class="require">真实姓名：</label>
          <input type="text" v-model.trim="regBody.realName" placeholder="须与银行户名相同，否则不能出款">
        </li>
        <li>
          <label class="require">手机号码：</label>
          <input type="tel" v-model.trim="regBody.phoneNum" placeholder="请输入手机号码">
        </li>
        <li>
          <label class="require">取款密码：</label>
          <input type="tel" v-model.trim="regBody.payPwd" placeholder="只能输入4位数字">
        </li>
      </ul>
      <a class="reg-btn" @click="register">确认注册</a>
      <router-link to="/regular" class="regular">注册即表示我同意《{{name}}投注规则》</router-link>
    </div>
  </div>
</template>

<script>
import api from "../api.js"
export default {
  data() {
    return {
      name: api.name,
      imgUrl: "",
      password: "",
      regBody: {
        userName: "",
        planType: 2,
        password: "",
        realName: "",
        phoneNum: "",
        payPwd: ""
        // validateCode: ''
      }
    };
  },
  methods: {
    register() {
      // 用户名正则验证
      const reg1 = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$");
      // 真实姓名正则验证
      const reg2 = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      // 手机号码正则验证
      const reg3 = /^((1[3-9][0-9])+\d{8})$/;
      // 支付密码正则验证
      const reg4 = /^\d{4}$/;
      if (!reg1.test(this.regBody.userName)) {
        alert("用户名必须是6-15位数字和字母组合!");
        return;
      }
      if (this.regBody.password.length < 6) {
        alert("密码长度过短!");
        return;
      }
      if (this.regBody.password !== this.password) {
        alert("两次输入密码不一致!");
        return;
      }
      if (this.regBody.realName === "") {
        alert("真实姓名不能为空!");
        return;
      }
      if (this.regBody.phoneNum === "") {
        alert("手机号码不能为空!");
        return;
      }
      if (!reg2.test(this.regBody.realName)) {
        alert("真实姓名必须为中文!");
        return;
      }
      if (!reg3.test(this.regBody.phoneNum)) {
        alert("手机号码格式不正确!");
        return;
      }
      if (!reg4.test(this.regBody.payPwd)) {
        alert("取款密码格式不正确!");
        return;
      }
      this.$loading.show("提交中");
      this.$http.post("/user/agentRegister", this.regBody).then(
        res => {
          this.$loading.hide();
          alert("注册成功!您的独家代理地址" + res);
          // this.$setCookie(
          //   "username",
          //   res["userName"],
          //   1000 * 60 * 60 * 24 * 30
          // );
          // this.$setCookie(
          //   "realname",
          //   res["realName"],
          //   1000 * 60 * 60 * 24 * 30
          // );
          // this.$setCookie("token", res["token"], 1000 * 60 * 60 * 24 * 30);
          // this.$setCookie(
          //   "comid",
          //   res["companyPlatformID"],
          //   1000 * 60 * 60 * 24 * 30
          // );
          // this.$setCookie(
          //   "headphoto",
          //   res["headPhoto"],
          //   1000 * 60 * 60 * 24 * 30
          // );
          // this.$setCookie(
          //   "setpwd",
          //   res["isSetPayPwd"],
          //   1000 * 60 * 60 * 24 * 30
          // );
          // this.$setCookie("userid", res["id"], 1000 * 60 * 60 * 24 * 30);
          // this.$setCookie("phone", res["phone"], 1000 * 60 * 60 * 24 * 30);
          // this.$setCookie('isGuest', false, 1000 * 60 * 60 * 24 * 30);
          // 一个月
          this.$router.push("/login");
        },
        e => {
          this.$loading.hide();
        }
      );
    }
  },
  created() {
    // this.getImg();
  }
};
</script>

<style scoped>
.back {
  width: 4.4rem;
  height: 4.4rem;
  display: block;
  position: absolute;
  left: 0;
  top: 1rem;
  color: #fff;
}

.back i {
  font-size: 2rem;
}

.logo {
  padding-top: 1rem;
}

.logo img {
  display: block;
  width: 8.3rem;
  height: 8.3rem;
  border-radius: 50%;
  margin: 0 auto;
}

.logo h1 {
  color: #fff;
  font-size: 18px;
  font-weight: normal;
  line-height: normal;
}

.logo h2 {
  color: #fff;
  font-size: 16px;
  font-weight: normal;
}

.regContent {
  padding: 4rem 1rem;
}

ul {
  padding-bottom: 1rem;
}

ul li {
  border: 1px solid #cdcdcd;
  border-radius: 0.4rem;
  height: 3.5rem;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  background-color: #fff;
}

ul li label {
  display: inline-block;
  width: 8rem;
  text-align: justify;
  text-align-last: justify;
  padding-right: 2rem;
  font-size: 13px;
  position: relative;
}

ul li .require:after {
  width: 1rem;
  height: 1rem;
  content: "";
  background: url(../assets/sign_need.png) no-repeat;
  background-size: 100%;
  position: absolute;
  right: 0.5rem;
  top: 0.2rem;
}

ul li input {
  display: block;
  flex-grow: 1;
  height: 2rem;
  font-size: 12px;
}

.reg-btn {
  display: block;
  border-radius: 0.4rem;
  color: #fff;
  height: 4rem;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  font-size: 16px;
  text-align: center;
  line-height: 4rem;
}

.regular {
  display: block;
  text-align: center;
  font-size: 1.1rem;
  margin: 2rem 0;
}
</style>

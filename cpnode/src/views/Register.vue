<template>
  <div>
    <div class="header">
      <router-link to="/login" class="back">
        <i class="iconfont icon-return"></i>
      </router-link>
      <div class="logo">
        <img src="../assets/logo.png">
        <h1>{{name}}</h1>
      </div>
    </div>
    <div class="regContent">
      <ul>
        <li>
          <label class="require">用户名</label>
          <input type="text" v-model.trim="regBody.UserName" placeholder="6-16位数字和字母组合">
        </li>
        <li>
          <label class="require">创建密码</label>
          <input type="password" v-model.trim="regBody.PassWord" placeholder="6-20位字母和数字或符号组合">
        </li>
        <li>
          <label class="require">确认密码</label>
          <input type="password" v-model.trim="password" placeholder="请确认密码">
        </li>
        <li>
          <label class="require">真实姓名</label>
          <input type="text" v-model.trim="regBody.RealName" placeholder="请与银行户名相同,否则不能提款">
        </li>
        <li>
          <label class="require">手机号</label>
          <input type="tel" v-model.trim="regBody.Phone" placeholder="请输入手机号码">
        </li>
        <li>
          <label class="require">取款密码</label>
          <input type="tel" v-model.trim="regBody.PayPwd" placeholder="只能输入4位数字">
        </li>
        <li>
          <label>邮箱</label>
          <input type="email" v-model.trim="regBody.Email" placeholder="请输入邮箱(选填)">
        </li>
        <li>
          <label>邀请人</label>
          <input type="text" placeholder="请输入邀请人(选填)">
        </li>
        <!--<li style="position: relative;">-->
        <!--<label>验证码</label>-->
        <!--<input type="text" v-model="regBody.Code" placeholder="请输入验证码"/>-->
        <!--<img :src="imgUrl" style="position: absolute;height: 3rem;width: 6rem;right: 10px;" @click="getImg()"/>-->
        <!--</li>-->
      </ul>
      <a class="reg-btn" @click="register">注 册</a>
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
        UserName: "",
        PassWord: "",
        RealName: "",
        Phone: "",
        Email: "",
        PayPwd: "",
        agentid: this.$getCookie("agentid") || "",
        Code: ""
        // validateCode: ''
      }
    };
  },
  methods: {
    // getImg() {
    //   axios.post('/common/GetValidImage', '')
    //     .then(
    //       res => {
    //         this.imgUrl = res['img'];
    //         this.regBody.validateCode = res['validateCode']
    //       },
    //       e => {
    //       }
    //     )
    // },
    register() {
      // 用户名正则验证
      const reg1 = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$");
      // 真实姓名正则验证
      const reg2 = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      // 手机号码正则验证
      const reg3 = /^((1[3-9][0-9])+\d{8})$/;
      // 支付密码正则验证
      const reg4 = /^\d{4}$/;
      if (!reg1.test(this.regBody.UserName)) {
        alert("用户名必须是6-15位数字和字母组合!");
        return;
      }
      if (this.regBody.PassWord.length < 6) {
        alert("密码长度过短!");
        return;
      }
      if (this.regBody.PassWord !== this.password) {
        alert("两次输入密码不一致!");
        return;
      }
      if (this.regBody.RealName === "") {
        alert("真实姓名不能为空!");
        return;
      }
      if (this.regBody.Phone === "") {
        alert("手机号码不能为空!");
        return;
      }
      if (!reg2.test(this.regBody.RealName)) {
        alert("真实姓名必须为中文!");
        return;
      }
      if (!reg3.test(this.regBody.Phone)) {
        alert("手机号码格式不正确!");
        return;
      }
      if (!reg4.test(this.regBody.PayPwd)) {
        alert("取款密码格式不正确!");
        return;
      }
      this.$loading.show("提交中");
      this.$http.post("/user/register", this.regBody,{
						withCredentials: true //打开cookie
					}).then(
        res => {
          this.$loading.hide();
          alert("注册成功!现在开始登录.");
          this.$setCookie(
            "username",
            res["userName"],
            1000 * 60 * 60 * 24 * 30
          );
          this.$setCookie(
            "realname",
            res["realName"],
            1000 * 60 * 60 * 24 * 30
          );
          this.$setCookie("token", res["token"], 1000 * 60 * 60 * 24 * 30);
          this.$setCookie(
            "comid",
            res["companyPlatformID"],
            1000 * 60 * 60 * 24 * 30
          );
          this.$setCookie(
            "headphoto",
            res["headPhoto"],
            1000 * 60 * 60 * 24 * 30
          );
          this.$setCookie(
            "setpwd",
            res["isSetPayPwd"],
            1000 * 60 * 60 * 24 * 30
          );
          this.$setCookie("userid", res["id"], 1000 * 60 * 60 * 24 * 30);
          this.$setCookie("phone", res["phone"], 1000 * 60 * 60 * 24 * 30);
          // 一个月
          this.$router.push("/index");
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
.header {
  height: 12rem;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  text-align: center;
  position: relative;
}

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
  padding: 2rem 1rem;
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
  width: 5rem;
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

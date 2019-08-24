<template>
  <div>
    <header>
      <router-link to="/setting" class="return">
        <i class="iconfont icon-return"></i>
      </router-link>
      <h1 v-if="status==='1'">修改登录密码</h1>
      <h1 v-if="status==='2'">修改取款密码</h1>
      <h1 v-if="status==='3'">设置取款密码</h1>
    </header>
    <section>
      <ul class="common-list card" v-if="status==='1'">
        <li>
          <label>原登录密码:</label>
          <input type="password" v-model="oldpwd" placeholder="请输入原密码">
        </li>
        <li>
          <label>新登录密码:</label>
          <input type="password" v-model="newpwd" placeholder="密码需要6-15位，建议使用字母和数字或符号">
        </li>
        <li>
          <label>确认新密码:</label>
          <input type="password" v-model="repeat" placeholder="请确认新登录密码">
        </li>
      </ul>
      <ul class="common-list card" v-if="status==='2'">
        <li>
          <label>原取款密码:</label>
          <input type="number" min="0" pattern="[0-9]*" v-model="oldpaypwd" placeholder="请输入原密码">
        </li>
        <li>
          <label>新取款密码:</label>
          <input type="number" min="0" pattern="[0-9]*" v-model="newpaypwd" placeholder="密码为4位数字">
        </li>
        <li>
          <label>确认新密码:</label>
          <input type="number" min="0" pattern="[0-9]*" v-model="repeat" placeholder="请确认新取款密码">
        </li>
      </ul>
      <ul class="common-list card" v-if="status==='3'">
        <li>
          <label>取款密码:</label>
          <input type="number" min="0" pattern="[0-9]*" v-model="newpaypwd" placeholder="密码为4位数字">
        </li>
        <li>
          <label>确认密码:</label>
          <input type="number" min="0" pattern="[0-9]*" v-model="repeat" placeholder="请确认新取款密码">
        </li>
      </ul>
      <a @click="submitChange()" class="common-button">确认修改</a>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: "",
      oldpwd: "",
      newpwd: "",
      repeat: "",
      oldpaypwd: "",
      newpaypwd: ""
    };
  },
  created() {
    this.status = this.$route.params.status;
    if (this.status === "2" && this.$getCookie("setpwd") === "0") {
      this.status = "3";
    }
  },
  methods: {
    submitChange() {
      if (this.status === "1") {
        this.changePwd();
      } else if (this.status === "2") {
        this.changePayPwd();
      } else {
        this.addPayPwd();
      }
    },
    changePwd() {
      if (this.newpwd.length < 6) {
        alert("密码长度太短!");
        return;
      }
      if (this.newpwd !== this.repeat) {
        alert("两次输入密码不一致!");
        return;
      }
      const body = {
        oldPwd: this.oldpwd,
        newPwd: this.newpwd
      };
      this.$loading.show("提交中");
      this.$http.post("/user/updatePwd", body).then(
        res => {
          this.$loading.hide();
          alert("修改成功!");
          this.$router.go(-1);
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    changePayPwd() {
      if (this.newpaypwd.length !== 4) {
        alert("请输入4位数字!");
        return;
      }
      if (this.newpaypwd !== this.repeat) {
        alert("两次输入密码不一致!");
        return;
      }
      const body = {
        oldPayPwd: this.oldpaypwd,
        newPayPwd: this.newpaypwd
      };
      this.$loading.show("提交中");
      this.$http.post("/user/updatePayPwd", body).then(
        res => {
          this.$loading.hide();
          this.$setCookie('isUpdatePayPwdFlag','0');
          alert("修改成功!");
          this.$router.go(-1);
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    // 新增取款密码
    addPayPwd() {
      if (this.newpaypwd.length !== 4) {
        alert("请输入4位数字!");
        return;
      }
      if (this.newpaypwd !== this.repeat) {
        alert("两次输入密码不一致!");
        return;
      }
      const body = {
        PayPwd: this.newPwd
      };
      this.$http.post("/user/update", body).then(
        res => {
          this.$loading.hide();
          this.$setCookie("setpwd", "1");
          alert("更新成功!");
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
<style scoped>
section {
  padding-right: 5px;
  padding-left: 5px;
}
ul {
  margin: 1rem 0;
  overflow: hidden;
}
ul > li {
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid #e3e3e3;
  font-size: 1.4rem;
  color: #48484c;
}
ul > li label {
  display: inline-block;
  width: 30%;
  font-size: 14px;
}
ul > li input {
  flex: 1;
  background-color: transparent;
  font-size: 14px;
}
p {
  font-size: 1rem;
  line-height: 2rem;
  text-align: right;
  padding-right: 1rem;
}
</style>

<template>
  <div>
    <div class="dialog-wrap" v-if="showDialog&&notices.length">
      <div class="dialog" v-if="amend">
        <div class="item">
          <h2>平台公告<span class="closedia" @click="closedialog()"></span></h2>
          <div class="content">
            <p>温馨提醒：</p>
            <p>{{notices[idx].noticeContent}}</p>
          </div>
          <div class="buttons">
            <a @click="getItem(false)" :class="{colorred:idx!==0}">上一条</a>
            <a @click="getItem(true)" class="colorred">下一条</a>
          </div>
        </div>
      </div>
      <div class="amend_box" v-if="!amend">
        <h2>提示</h2>
        <p>为了您的账户资金安全,请定期修改登录密码!</p>
        <aside>
          <span @click="closedia()">暂不修改</span>
          <router-link tag="span" to="changepwd/1">马上修改</router-link>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notices"],
  data() {
    return {
      amend: true,
      idx: 0,
      // notices: [],
      showDialog: !this.$getCookie("showDialog")
    };
  },
  // created() {
  //   this.getNotice();
  // },
  methods: {
    // 获取公告
    getNotice() {
      this.$http.post("/notice/find", { size: 4 }).then(
        res => {
          this.notices = res;
        },
        e => {}
      );
    },
    // 获取公告详情
    getItem(b) {
      if (b) {
        if (this.idx === this.notices.length - 1) {
          this.closedialog()
        } else {
          this.idx++;
        }
      } else {
        if (this.idx === 0) {
          return;
        } else {
          this.idx--;
        }
      }
    },
    closedia() {
      this.showDialog = false;
      this.$setCookie("showDialog", "fals", 1000 * 60 * 60 * 24);
    },
    closedialog() {
      if (this.$getCookie('isUpdatePwdFlag') === 1) {
        this.amend = false
      } else {
        this.closedia()
      }
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.dialog {
  width: 70%;
  height: 50%;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  .item {
    width: 100%;
    height: 100%;
    z-index: 11;
    top: 25%;
    left: 15%;
  }
  h2 {
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    background: linear-gradient(90deg, #ff4b3e, #fb2351);
    .closedia {
      width: 2rem;
      height: 2rem;
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 7px;
      background: url("../../assets/icons/close.svg");
      background-size: 100%;
    }
  }
  .content {
    padding: 1rem;
    height: 72%;
    overflow: scroll;
    p {
      font-size: 14px;
      line-height: 28px;
    }
  }
  .buttons {
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    border-top: 1px solid #f2f2f2;
    a {
      width: 49%;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #ccc;
      &:first-child {
        border-right: 1px solid #f4f4f4;
      }
      &.colorred {
        color: red;
      }
    }
  }
}
.amend_box {
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
</style>

<template>
  <div>
    <header>
      <a @click="$router.go(-1)"  class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>微信客服</h1>
    </header>
    <section>
      <div class="wx-card">
        <div class="header">长按二维码保存到相册</div>
        <div class="body">
          <img :src="url" alt="微信客服">
        </div>
        <div class="footer">
          <i></i>微信客服二维码
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  created() {
    this.geturl();
  },
  methods: {
    geturl() {
      this.url = this.$route.query.url;
    }
  }
};
</script>


<style scoped>
section {
  padding: 10rem 3rem 0 3rem;
}

.wx-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.header {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  margin: 0 10px;
  border-bottom: 1px solid #eee;
}

.body img {
  display: block;
  width: 70%;
  margin: 3rem auto;
}

.footer {
  height: 50px;
  line-height: 50px;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  color: #fff;
  font-size: 16px;
}

.footer i {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url("../assets/icons/wx.svg") no-repeat center;
  background-size: 100% auto;
  vertical-align: middle;
  margin-right: 1rem;
}
</style>

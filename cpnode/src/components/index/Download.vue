<template>
  <div class="download-wrap" v-if="showDl">
    <a class="close" @click="closeDl()">×</a>
    <div class="info">
      <div class="logo"></div>
      <div>
        <h3>{{name}}</h3>
        <p>下载手机APP,多重好礼等你来拿!</p>
      </div>
    </div>
    <a class="download" :href="downurl">立即下载</a>
  </div>
</template>

<script>
import api from '../../api.js'
export default {
  data() {
    return {
      name: api.name,
      downurl: api.downloadUrl,
      showDl: !this.$getCookie("showdl")
    };
  },
  methods: {
    // 关闭下载提示
    closeDl() {
      this.showDl = false;
      this.$setCookie("showdl", "fals", 1000 * 60 * 60 * 24);
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.download-wrap {
  position: fixed;
  bottom: 4.5rem;
  height: 5rem;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  color: #efefef;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 2rem;

  a {
    display: block;
  }

  .close {
    font-size: 2rem;
    color: #999;
    border: 1px solid #999;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    top: -10px;
  }

  .info {
    display: flex;

    .logo {
      width: 3rem;
      height: 3rem;
      background: url("../../assets/logo.png") no-repeat center;
      background-size: 100%;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .download {
    width: 6rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    color: #fff;
    background-color: #d91d37;
    border-radius: 5px;
  }
}
</style>

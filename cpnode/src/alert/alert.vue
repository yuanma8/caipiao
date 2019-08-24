<template>
  <div class="alert-mask" v-if="alert">
    <div class="alert_box">
      <div>{{msg}}</div>
      <p @click="hide()">确定</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alert: false,
      msg: ""
    };
  },
  methods: {
    show(msg) {
      this.alert = true;
      this.msg = msg;
    },
    hide() {
      this.alert = false;
    }
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
.alert-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert_box {
    text-align: center;
    width: 60%;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    div {
      padding: 2rem;;
      width: 100%;
      color: #4e4e4e;
      font-size: 1.2rem;
    }
    p {
      width: 100%;
      border-top: 1px solid #eee;
      line-height: 3rem;
      color: #2b97e3;
      font-size: 1.2rem;
    }
  }
}
</style>
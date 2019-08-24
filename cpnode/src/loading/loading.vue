<template>
    <div class="loading-wrap" v-if="loading">
      <div class="dots-loading-container">
        <div class="dot dot-a"></div>
        <div class="dot dot-b"></div>
        <div class="dot dot-c"></div>
        <div class="dot dot-d"></div>
        <div class="text">{{msg}}...</div>
      </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        loading: false,
        msg:''
      }
    },
    methods: {
      show(msg) {
        this.loading = true;
        this.msg = msg;
      },
      hide(){
        this.loading = false;
      }
    }
  }
</script>

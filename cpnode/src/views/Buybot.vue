<template>
  <div>
    <header>
      <a class="return" @click="$router.go(-1)"><i class="iconfont icon-return"></i></a>
      <h1>购买外挂辅助</h1>
    </header>
    <section>
     请联系QQ:{{qq}}！<br/><br/>
     。<br/><br/>

    </section>
  </div>
</template>
<script>
import api from "../api.js"
export default {
  data(){
    return{
     qq:api.botQQ
    }
  }
}
</script>
<style scoped>
  section {
    padding-left: 1rem;
    padding-right: 1rem;
    line-height: 2rem;
    font-size: 12px;
    background-color: #fff;
  }
</style>

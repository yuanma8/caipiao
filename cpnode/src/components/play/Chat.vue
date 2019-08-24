<template>
  <div style="position: absolute;top: 12rem;bottom:0;left:0;width:100%">
    <iframe :src="this.chaturl+'/?t='+userid" height="100%" width="100%" frameborder="0"></iframe>
    <!--  抢红包 -->
    <RobRedbag></RobRedbag>
  </div>
</template>

<script>
import RobRedbag from "../../components/index/robRedbag.vue";
export default {
  props: ["chaturl", "userid"],
  data(){
    return {
      info:{}
    }
  },
  created() {
    console.log(this.chaturl);
    this.getCompany()
  },
  methods: {
    //聊天室链接
    getCompany() {
      this.$http.post("/user/GetCompanyInfo", "").then(
        res => {
          this.info = res;
          console.log(this.info);
          this.$setCookie("chatUrl", res["chatUrl"], 1000 * 60 * 60 * 24 * 30);
          this.$setCookie(
            "agentUrl",
            res["agentUrl"],
            1000 * 60 * 60 * 24 * 30
          );
        },
        e => {
          console.log(e);
        }
      );
    }
  },
  components: {
    RobRedbag
  }
};
</script>

<style scoped>
</style>

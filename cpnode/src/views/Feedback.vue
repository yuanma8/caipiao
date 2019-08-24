<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>意见反馈</h1>
    </header>
    <ul>
      <li>
        <h3 @click="goView('/Advice/1')">
          <div>
            <i class="icon1"></i>
            <span>建议</span>
          </div>
          <i class="iconfont icon-jiantou"></i>
        </h3>
        <p>如果您对游戏或者平台有好的建议可以进行提交,官方客服会在48小时内进行回复,我们会参考您的反馈断优化我们的产品和服务。</p>
      </li>
      <li>
        <h3 @click="goView('/Advice/2')">
          <div>
            <i class="icon2"></i>
            <span>投诉</span>
          </div>
          <i class="iconfont icon-jiantou"></i>
        </h3>
        <p>为了让平台所有会员获得最好的服务,维护会员权益,我们会为会员提供监督服务,如出现服务、出款、入款.部门问题可投诉，我们会尽快为您解决。</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGuest: !!this.$getCookie("isGuest")
    };
  },
  created() {},
  methods: {
    // 页面跳转
    goView(v) {
      if (this.isGuest) {
        if (confirm("游客账号无权访问,去注册?")) {
          this.$router.push("/register");
        }
      } else {
        this.$router.push(v);
      }
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
ul {
  padding-top: 40px;
  li {
    background-color: #fff;
    margin-bottom: 10px;
    h3 {
      display: flex;
      justify-content: space-between;
      line-height: 4rem;
      border-bottom: 1px solid rgb(171, 171, 171);
      padding: 0 15px;
      font-size: 16px;
      div {
        display: flex;
        align-items: center;
        color: rgb(246, 103, 61);
        i {
          width: 2rem;
          height: 2rem;
          margin-right: 15px;
        }
      }
      .iconfont,
      .icon-jiantou {
        color: rgb(159, 159, 159);
      }
      .icon1 {
        background: url("../assets/icons/advice.svg") no-repeat center;
      }
      .icon2 {
        background: url("../assets/icons/complaints.svg") no-repeat center;
      }
    }
    p {
      padding: 10px;
      color: rgb(159, 159, 159);
      line-height: 20px;
    }
  }
}
</style>

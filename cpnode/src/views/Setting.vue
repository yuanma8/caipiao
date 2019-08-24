<template>
  <div>
    <header>
      <a @click="$router.go(-1)"  class="return"><i class="iconfont icon-return"></i></a>
      <h1>设置</h1>
    </header>
    <section class="padding">
      <ul class="common-list card">
        <router-link to="changepwd/1" tag="li" v-if="!isGuest"><i
                class="iconfont icon-mima"></i><span
                class="content">修改密码</span><em></em></router-link>
        <router-link to="changepwd/2" tag="li" v-if="!isGuest"><i
                class="iconfont icon-gold"></i><span class="content">修改取款密码</span><em></em>
        </router-link>
        <router-link to="aboutus" tag="li"><i class="iconfont icon-guanyu"></i><span
                class="content">关于我们</span><em></em></router-link>
      </ul>
      <a @click="logout()" class="common-button">退出当前账号</a>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      isGuest: !!this.$getCookie('isGuest')
    }
  },
  methods: {
    logout() {
      if (confirm('确定退出?')) {
        this.$router.push('/login');
      } else {
        return
      }
    }
  }
}
</script>

<style scoped>
  ul {
    margin: 1.3rem 0;
  }

  ul li i {
    font-size: 1.6rem;
    margin-right: 1rem;
  }
</style>

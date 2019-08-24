<template>
  <div class="bgc">
    <header>
      <a  @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>申请列表</h1>
    </header>
    <ul>
        <li v-for="item in auditList">
            <div><h5>{{item.title}}</h5> <button>{{item.status === 0 ? '待审核' : item.status === 1 ? '申请失败' : '申请成功' }}</button> </div>
            <div>{{item.createTime.replace(/T/,' ').substring(0,19)}} <span>{{item.content}}</span> </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
        auditList:[],
    };
  },
  created() {
      this.getAudit()
  },
  methods: {
    getAudit() {
      this.$http.post("/activityRecord/getList", {page:1,size:20}).then(
        res => {
          this.auditList = res.items;
        },
        e => {
          this.$loading.hide();
        }
      );
  }
}
}
</script>

<style scoped>
header {
    box-shadow: 0 4px 8px rgb(192, 192, 192);
}

.bgc{
    background-color: #fff;
    padding: 3.3rem 0;
}

ul li {
    padding: 1rem;
    border-top: 15px solid rgb(247, 246, 251);
}

li div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #707070;
    line-height: 30px;
}

button {
    width: 80px;
    height: 25px;
    border-radius: 20px;
    color: #fff;
    background-color: #fb2351;
}

</style>
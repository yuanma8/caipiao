<template>
  <div id="order">
    <header>
      <a class="return" @click="$router.go(-1)">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>当期注单</h1>
    </header>
    <section>
      <div style="height: 100%;" :class="{'blank':orderList.length===0}">
        <ul class="order-list">
          <li v-for="(item,index) in orderList" :key="index">
            <div :class="'pic pic'+item.lotteryID"></div>
            <p>{{item.betTime}}</p>
            <p>
              {{item.betOzd}}
              <span>{{item.detail}}</span>
              @{{item.betOdds}}×{{item.betMoney}}
            </p>
            <p>{{item.lotteryName}} 第{{item.periods}}期</p>
            <a class="cancel" @click="cancelBet(item.id,item.lotteryID)">撤单</a>
          </li>
        </ul>
      </div>
    </section>
    <!-- <div class="nolist" v-show="!orderList.length">
      <p>暂无数据</p>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: JSON.parse(this.$route.params.order)
    };
  },
  methods: {
    cancelBet(id, lotteryID) {
      this.$http.get("/order/cancelBet/" + id).then(
        res => {
          this.getOpen(lotteryID);
          alert("撤单成功!");
        },
        err => {}
      );
    },
    getOpen(id) {
      this.$http.post("/lottery/info/" + id, "",{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          this.orderList = res.orderList;
        },
        err => {}
      );
    }
  }
};
</script>
<style scoped="scoped">
section {
  min-height: 100vh;
  background: #fff;
}
.blank {
  background: url("../assets/nowallet@2x.png") no-repeat center;
  background-size: 50%;
}
.order-list {
  padding-bottom: 60px;
}
.order-list li {
  padding: 1rem 1rem 1rem 6rem;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  font-size: 12px;
  color: #666;
  line-height: 1.5rem;
  position: relative;
}

.order-list .pic {
  position: absolute;
  left: 1rem;
}
.nolist {
  position: absolute;
  top: 50%;
  left: 0;
  height: 14px;
  width: 100%;
  line-height: 14px;
  color: #999;
  text-align: center;
}
.cancel {
  display: block;
  width: 5rem;
  height: 2rem;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  position: absolute;
  right: 1rem;
  top: 2rem;
  text-align: center;
  line-height: 2rem;
  color: #fff;
  border-radius: 4px;
}
</style>


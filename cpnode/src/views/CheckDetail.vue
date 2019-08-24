<template>
  <div id="checkout">
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>实时稽核</h1>
    </header>
    <section>
      <ul v-show="detailList.length">
        <li v-for="(item,index) in detailList" :key="index" @click="seemore(item)">
          <div class="icon">
            <span class="icon-checkout"></span>
          </div>
          <div class="info">
            <span class>
              充值金额:
              <b style="color:#FB2351;">{{item.payMoney}}元</b>
            </span>
            <span class="timeinfo">{{item.beginTime.split('T').toString()}}</span>
          </div>
          <div class="goto">
            <i class="iconfont icon-jiantou"></i>
          </div>
        </li>
      </ul>
    </section>
    <div class="nolist" v-show="!detailList.length">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout",
  data() {
    return {
      detailList: [],
      obj: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/checkDetail/getList").then(res => {
        this.detailList = res;
      });
    },
    seemore(item) {
      this.$router.push({ name: "detailpage", params: { list: item } });
    }
  }
};
</script>

<style scoped="scoped">
section {
  background: #fff;
}

ul {
  width: 100%;
  height: 100%;
}

ul li {
  height: 6rem;
  padding: 1rem;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
}

ul li div {
  display: inline-block;
  vertical-align: top;
}

.icon-checkout {
  display: inline-block;
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
  background: url("../assets/icons/money.svg") no-repeat center;
  background-size: 100%;
  line-height: 6rem;
}

.info span,
.goto span {
  display: block;
  line-height: 2rem;
  font-size: 14px;
  color: #999;
  font-weight: 600;
}

ul li div.info {
  flex: 4;
}

ul li div.goto {
  color: #999;
  text-align: right;
  margin-right: 1rem;
  display: flex;
  align-items: center;
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

ul li div.info .timeinfo {
  font-size: 12px;
  font-weight: normal;
}
</style>

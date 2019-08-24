<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>等级查询</h1>
    </header>
    <section>
      <ul>
        <li>
          <span>当前等级</span>
          <span style="color:red">{{vipInfo.levelName}}</span>
        </li>
        <li>
          <span>累计有效投注</span>
          <span>{{vipInfo.totalBetCode}}</span>
        </li>
        <li>
          <span>最新晋级金额</span>
          <span>{{vipInfo.lastAddCash}}</span>
        </li>
        <li>
          <span>累计晋级彩金</span>
          <span>{{vipInfo.totalAddCash}}</span>
        </li>
        <li>
          <span>周俸禄</span>
          <span>{{vipInfo.curWeekMoney}}</span>
        </li>
        <li>
          <span>月俸禄</span>
          <span style="color:red">{{vipInfo.curMonthMoney}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>距离晋级有效投注</span>
          <span>{{vipInfo.distanceMoney}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vipInfo: {
        curMonthMoney: 0,
        curWeekMoney: 0,
        currentScore: 0,
        distanceMoney: 0,
        lastAddCash: 0,
        level: 0,
        levelName: "",
        levelType: 1,
        totalAddCash: 0,
        totalBetCode: 0
      }
    };
  },
  created() {
    this.getVipInfo();
  },
  methods: {
    getVipInfo() {
      this.$loading.show("加载中");
      this.$http.get("/user/GetVipInfo", { size: 10 }).then(
        res => {
          this.vipInfo = res;
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    }
  }
};
</script>
<style scoped>
ul {
  margin: 0.5rem 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding-left: 1rem;
}

ul > li {
  display: flex;
  justify-content: space-between;
  height: 4rem;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 0 1rem;
}

ul > li:first-child {
  border-bottom: 1px solid #ddd;
}
</style>



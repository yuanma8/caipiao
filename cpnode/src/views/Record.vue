<template>
  <div>
    <header>
      <a @click="$router.go(-1)"  class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>投注记录</h1>
      <div class="filter">
        <span>{{getType()}}</span>
        <select v-model="lotteryId" @change="getTotal();getList()">
          <option value="0">全部彩种</option>
          <option value="50">北京PK10</option>
          <option value="55">幸运飞艇</option>
          <option value="80">急速赛车</option>
          <option value="88">德国赛车</option>
          <option value="89">德国飞艇</option>
          <option value="81">急速飞艇</option>
          <option value="82">1分彩</option>
          <option value="83">3分彩</option>
          <option value="84">5分彩</option>
          <option value="1">重庆时时彩</option>
          <option value="4">新疆时时彩</option>
          <option value="5">天津时时彩</option>
          <option value="66">PC蛋蛋</option>
          <option value="10">江苏快3</option>
          <option value="11">北京快3</option>
          <option value="12">广西快3</option>
          <option value="13">上海快3</option>
          <option value="14">湖北快3</option>
          <option value="15">河北快3</option>
          <option value="65">北京快乐8</option>
          <option value="70">香港六合彩</option>
          <option value="85">急速六合彩</option>
          <option value="86">急速11选5</option>
          <option value="90">福彩3D</option>
        </select>
      </div>
    </header>
    <div class="top-fixed">
      <div class="statistic">
        <div>
          中奖(元)
          <p>{{total.totalWinMoney}}</p>
        </div>
        <div>
          投注(元)
          <p>{{total.totalBetMoney}}</p>
        </div>
        <div>
          盈利(元)
          <p>{{total.totalProfit}}</p>
        </div>
      </div>
      <div class="search">
        <div>
          起始时间
          <p>
            <span>{{startDate}}</span>
            <input type="date" v-model="startDate">
          </p>
        </div>
        <div>
          截止时间
          <p>
            <span>{{endDate}}</span>
            <input type="date" v-model="endDate">
          </p>
        </div>
        <div class="search-btn">
          <a @click="getTotal();getList()">查询</a>
          <a @click="getAll()">全部</a>
        </div>
      </div>
      <div class="tabs">
        <a @click="change('null')" :class="{active: state==='null'}">
          <span>全部</span>
        </a>
        <a @click="change('1')" :class="{active: state==='1'}">
          <span>已中奖</span>
        </a>
        <a @click="change('2')" :class="{active: state==='2'}">
          <span>未中奖</span>
        </a>
        <a @click="change('0')" :class="{active: state==='0'}">
          <span>待开奖</span>
        </a>
        <a @click="change('3')" :class="{active: state==='3'}">
          <span>撤销</span>
        </a>
      </div>
    </div>
    <section :class="{'blank':betList.length===0}">
      <div class="content">
        <ul>
          <li @click="goDetail(item)" v-for="item in betList" :key="item.id">
            <div :class="'pic pic'+item.lotteryID"></div>
            <div class="info">
              <p>{{item.lotteryName}} 第{{item.periods}}期</p>
              <span>{{item.betMoney}}元</span>
              <p>{{item.betTime.replace(/T/, ' ')}}</p>
            </div>
            <div class="state">{{getStatus(item.status)}}</div>
            <i class="iconfont icon-jiantou"></i>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lotteryId: "0",
      state: "null",
      startDate: "",
      endDate: "",
      total: {
        totalBetMoney: 0,
        totalProfit: 0,
        totalWinMoney: 0
      },
      betList: []
    };
  },
  created() {
    this.state = this.$route.params["state"];
    const today = new Date();
    const startDay = new Date(today.getTime() - 3 * 24 * 3600000);
    this.startDate = startDay
      .toLocaleDateString()
      .split("/")
      .join("-");
    this.endDate = today
      .toLocaleDateString()
      .split("/")
      .join("-");
    this.getTotal();
    this.getList();
  },
  methods: {
    change(id) {
      this.state = id;
      this.getList();
    },
    // 获取类型
    getType() {
      switch (this.lotteryId) {
        case "0":
          return "全部彩种";
        case "50":
          return "北京PK10";
        case "55":
          return "幸运飞艇";
        case "80":
          return "急速赛车";
        case "81":
          return "急速飞艇";
        case "65":
          return "北京快乐8";
        case "1":
          return "重庆时时彩";
        case "4":
          return "新疆时时彩";
        case "5":
          return "天津时时彩";
        case "82":
          return "1分彩";
        case "83":
          return "3分彩";
        case "84":
          return "5分彩";
        case "66":
          return "PC蛋蛋";
        case "70":
          return "六合彩";
        case "85":
          return "急速六合彩";
        case "86":
          return "急速11选5";
        case "87":
          return "急速PC28";
        case "88":
          return "德国赛车";
        case "89":
          return "德国飞艇";
      }
    },
    // 获取状态
    getStatus(i) {
      switch (i) {
        case 0:
          return "待开奖";
        case 1:
          return "已中奖";
        case 2:
          return "未中奖";
        case 3:
          return "撤销";
      }
    },
    // 获取总投注
    getTotal() {
      const body = {
        startDate: this.startDate,
        endDate: this.endDate + " 23:59:59",
        ids: []
      };
      body.ids.push(parseInt(this.lotteryId));
      this.$loading.show("加载中");
      this.$http.post("/order/curUser/betMoney", body,{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          this.total = res;
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    getList() {
      const body = {
        page: 1,
        startDate: this.startDate,
        endDate: this.endDate + " 23:59:59",
        ids: [],
        Status: this.state
      };
      body.ids.push(parseInt(this.lotteryId));
      this.$loading.show("加载中");
      this.$http.post("/order/find", body,{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          this.betList = res.items;
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    getAll() {
      this.startDate = "";
      this.endDate = "";
      this.getTotal();
      this.getList();
    },
    //前往详情
    goDetail(item) {
      // item.status = this.getStatus(item.status);
      this.$router.push(
        `/orderdetail/${item.status}/${JSON.stringify(item)}`
      );
    }
  }
};
</script>
<style scoped>
.filter {
  font-size: 1.2rem;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  line-height: 40px;
  padding-right: 1rem;
  min-width: 4rem;
  text-align: center;
  color: #fff;
}
.filter select {
  position: absolute;
  z-index: 1;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.top-fixed {
  position: fixed;
  top: 40px;
  z-index: 99;
  width: 100%;
  height: 14.6rem;
}
.statistic {
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  min-height: 4rem;
  padding: 0.5rem 0;
  display: flex;
}
.statistic div {
  width: 33.33%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  line-height: 2rem;
}
.statistic p {
  font-size: 14px;
}
.search {
  display: flex;
  min-height: 3.5rem;
  padding: 0.5rem 0;
  background: #f4f4f4;
}
.search div {
  width: 33.33%;
  padding: 0 0.2rem;
  line-height: 2rem;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.search div p {
  position: relative;
}
.search div input {
  position: absolute;
  opacity: 0;
  left: 0;
  z-index: 1;
}
.search .search-btn a {
  display: inline-block;
  width: 6rem;
  height: 1.8rem;
  margin-bottom: 0.2rem;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  color: #fff;
  font-size: 12px;
  border-radius: 0.4rem;
}
.tabs {
  height: 4.3rem;
  border-bottom: 0.1rem solid #e3e3e3;
  background: #fff;
  display: flex;
}
.tabs a {
  display: block;
  width: 20%;
  line-height: 4.1rem;
  text-align: center;
  color: #909090;
}
.tabs a.active span {
  color: #d91d37;
  border-bottom: 0.2rem solid #d91d37;
  display: inline-block;
}
section {
  padding-top: 14rem;
}
section.blank {
  background: url("../assets/nowallet@2x.png") no-repeat center;
  background-size: 50%;
}
.content {
  background-color: #fff;
}
.content li {
  padding: 1rem 1.7rem;
  border-bottom: 0.1rem solid #e3e3e3;
  position: relative;
  display: flex;
  align-items: center;
}
.pic img {
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1.7rem;
}
.info {
  flex: 1;
}
.info p {
  line-height: 2rem;
  color: #909090;
  font-size: 1.1rem;
}
.info span {
  font-size: 1.5rem;
  color: #48484c;
}
.state {
  color: #909090;
}
.icon-jiantou {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ccc;
}
</style>

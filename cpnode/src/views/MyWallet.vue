<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>我的钱包</h1>
      <div class="type">
        <span>{{getStatus()}}</span>
        <select v-model="status" @change="getMyWallet()">
          <option value="-1">全部</option>
          <option value="10">充值</option>
          <option value="11">提款</option>
          <option value="12">投注</option>
          <option value="13">中奖</option>
          <option value="14">人工存入</option>
          <option value="15">人工提出</option>
          <option value="16">活动</option>
        </select>
      </div>
    </header>
    <div class="top-fixed">
      <div class="total">
        <div>可用余额(元)
          <p>{{mywallet.moneyUsable}}</p>
        </div>
        <div>未结金额(元)
          <p>{{mywallet.moneyFreeze}}</p>
        </div>
        <div>账户总额(元)
          <p>{{mywallet.money}}</p>
        </div>
      </div>
      <div class="search">
        <div>起始时间
          <p>
            <span>{{startDate}}</span>
            <input type="date" v-model="startDate">
          </p>
        </div>
        <div>截止时间
          <p>
            <span>{{endDate}}</span>
            <input type="date" v-model="endDate">
          </p>
        </div>
        <div class="search-btn">
          <a @click="getMyWallet()">查询</a>
          <a @click="findToday()">今日</a>
        </div>
      </div>
    </div>
    <section :class="{'blank':mywallet.walletList.length===0}">
      <ul>
        <li v-for="item in mywallet.walletList" :key="item.id">
          <div class="left">
            <h3>{{item.type}}</h3>
            <span>{{item.description}}</span>
          </div>
          <div class="right">
            <p>{{item.createdTime}}</p>
            <span>{{item.moneyStr}}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      status: "-1",
      mywallet: {
        moneyUsable: 0,
        moneyFreeze: 0,
        money: 0,
        walletList: []
      }
    };
  },
  created() {
    const today = new Date();
    const startDay = new Date(today.getTime() - 15 * 24 * 3600000);
    this.startDate =
      startDay.getFullYear().toString() +
      "-" +
      ((startDay.getMonth() + 1).toString().length === 2
        ? (startDay.getMonth() + 1).toString()
        : "0" + (startDay.getMonth() + 1).toString()) +
      "-" +
      (startDay.getDate().toString().length === 2
        ? startDay.getDate().toString()
        : "0" + startDay.getDate().toString());
    this.endDate =
      today.getFullYear().toString() +
      "-" +
      ((today.getMonth() + 1).toString().length === 2
        ? (today.getMonth() + 1).toString()
        : "0" + (today.getMonth() + 1).toString()) +
      "-" +
      ((today.getDate()+1).toString().length === 2
        ? (today.getDate()+1).toString()
        : "0" + (today.getDate()+1).toString());
    this.getMyWallet();
  },
  methods: {
    getStatus() {
      switch (this.status) {
        case "-1":
          return "全部";
        case "10":
          return "充值";
        case "11":
          return "提款";
        case "12":
          return "投注";
        case "13":
          return "中奖";
        case "14":
          return "人工存入";
        case "15":
          return "人工提取";
        case "16":
          return "活动";
      }
    },
    findToday() {
      // TODO: 今日bug
      this.startDate = this.endDate;
      this.getMyWallet();
    },
    getMyWallet() {
      const body = {
        page: 1,
        startDate: this.startDate,
        endDate: this.endDate,
        type: this.status
      };
      this.$loading.show("加载中");
      this.$http.post("/moneyDetail/find/1", body,{ 
        withCredentials: true  //打开cookie
      }).then(
        res => {
          this.mywallet = res;
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
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.type {
  color: #fff;
  font-size: 1.2rem;
  line-height: 40px;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  padding-right: 1rem;
  min-width: 4rem;
  text-align: center;
}
.type select {
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
  width: 100%;
  height: 10.5rem;
  z-index: 99;
}
.total {
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  min-height: 4rem;
  padding: 0.5rem 0;
  display: flex;
}
.total div {
  width: 33.33%;
  text-align: center;
  color: #fff;
  line-height: 2rem;
}
.total p {
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
  border-radius: 0.4rem;
}
.all {
  padding: 1rem;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
section {
  padding-top: 10rem;
  ul {
    background-color: #fff;
    li {
      border-bottom: 0.1rem solid #e3e3e3;
      height: 6.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      .left {
        h3 {
          font-size: 1.5rem;
          color: #2a2a2a;
          line-height: 2.5rem;
        }
        span {
          font-size: 1.1rem;
          color: #777;
        }
      }
      .right {
        text-align: right;
        p {
          font-size: 1.1rem;
          color: #777;
          line-height: 2.5rem;
        }
        span {
          color: #d91d37;
          font-size: 1.5rem;
        }
      }
    }
  }
  &.blank {
    background: url("../assets/nowallet@2x.png") no-repeat center;
    background-size: 50%;
  }
}
</style>

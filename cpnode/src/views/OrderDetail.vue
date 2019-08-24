<template>
  <div>
    <header>
      <a class="return" @click="$router.go(-1)">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>订单详情</h1>
    </header>
    <section>
      <ul class="common-list">
        <li>
          <p>当前彩种</p>
          <p>{{betDetail.lotteryName}}</p>
        </li>
        <li>
          <p>当前期数</p>
          <p>{{betDetail.periods}}期</p>
        </li>
        <li style="border:0;">
          <p>开奖状态</p>
          <p style="color:red;">{{getStatus(betDetail.status)}}</p>
        </li>
      </ul>
      <ul class="common-list">
        <li style="line-height:1.6rem;" v-if="status != 0">开奖结果</li>
        <li style="line-height:1.6rem;" v-if="status != 0" class="sty">
          <span v-for="item in openNum" :class="'num_'+ item">{{item}}</span>
        </li>
        <li style="line-height:1.6rem;">投注详情</li>
        <li>
          <p>订单号</p>
          <p>{{betDetail.orderNumber}}</p>
        </li>
        <li>
          <p>投注内容</p>
          <p style="line-height:1.6rem;">
            <span>{{betDetail.betOzd}}{{betDetail.detail}}@{{betDetail.betOdds}}×{{betDetail.betMoney}}元</span>
            <br>
            <span>共计¥{{betDetail.betMoney}}/{{betDetail.multiple}}注</span>
          </p>
        </li>
        <li>
          <p>中奖金额</p>
          <p style="color:red;">{{betDetail.rewardRebate}}元</p>
        </li>
        <li style="border:0;">
          <p>投注时间</p>
          <p>{{betDetail.betTime}}</p>
        </li>
      </ul>
      <p class="tips">
        <span class="bet-title">温馨提示</span>
        如中奖万元以上奖金专人通知,万元以下奖金直接打入账户
      </p>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      betDetail: {},
      status: 0,
      openNum: []
    };
  },
  created() {
    this.betDetail = JSON.parse(this.$route.params.data);
    this.status = this.$route.params.status;
    // console.log(status);
    if (this.status != 0) {
      this.getNum();
    }
  },
  methods: {
    getNum() {
      this.$http
        .get(
          "/lottery/res/" +
            this.betDetail.lotteryID +
            "/" +
            this.betDetail.periods
        )
        .then(
          res => {
            this.openNum = res.openCode.split(",");
            console.log(this.openNum);
          },
          err => {}
        );
    },
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
    }
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
ul.common-list {
  margin-top: 15px;
  background-color: #fff;
  padding: 0 1rem;
}

ul.common-list li {
  line-height: 3rem;
  border-bottom: 1px solid #ddd;
  color: #666;
  display: flex;
  justify-content: space-between;
}

.tips {
  line-height: 2rem;
  padding: 1rem;
}

.tips {
  font-size: 12px;
  color: #666;
}

.bet-title {
  font-weight: bold;
  font-size: 14px;
}

li.sty {
  span {
    display: inline-block;
    height: 2rem;
    line-height: 2rem;
    width: 2rem;
    text-align: center;
    background-color: #2c91d9;
    color: #fff;
    font-weight: bold;
    border-radius: 50%;
    margin-right: 0.1rem;
  }

  .num_1,
  .num_01 {
    border-radius: 4px;
    background-color: #e8c800;
  }
  .num_2,
  .num_02 {
    border-radius: 4px;
    background-color: #0691dd;
  }
  .num_3,
  .num_03 {
    border-radius: 4px;
    background-color: #4b4b4b;
  }
  .num_4,
  .num_04 {
    border-radius: 4px;
    background-color: #ff7700;
  }
  .num_5,
  .num_05 {
    border-radius: 4px;
    background-color: #00c9e6;
  }
  .num_6,
  .num_06 {
    border-radius: 4px;
    background-color: #5234ff;
  }
  .num_7,
  .num_07 {
    border-radius: 4px;
    background-color: #b4b4b4;
  }
  .num_8,
  .num_08 {
    border-radius: 4px;
    background-color: #ff0000;
  }
  .num_9,
  .num_09 {
    border-radius: 4px;
    background-color: #780c00;
  }
  .num_10 {
    border-radius: 4px;
    background-color: #04bf00;
  }
  .color0 {
    background-color: #d91d37;
  }
  .color2 {
    background-color: #0094f3;
  }
  .color1 {
    background-color: #429f31;
  }
}
</style>

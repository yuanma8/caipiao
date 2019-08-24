<template>
  <div class="open-wrap">
    <div class="left">
      <div>第{{lotteryMain['openResult']['openPeriod']}}期</div>
      <!--PK10-->
      <div
        class="open-code"
        v-if="lotteryId==='50'||lotteryId==='81'||lotteryId==='80'||lotteryId==='55'||lotteryId==='88'||lotteryId==='89'||lotteryId==='92'||lotteryId==='93'"
      >
        <span
          v-for="(item, index) in lotteryMain['openNum']"
          :class="'num num'+item"
          :key="index"
        >{{item}}</span>
      </div>
      <!--快乐8-->
      <div class="open-code" v-if="lotteryId==='65'" style="flex-wrap:wrap">
        <span
          v-for="(item, index) in lotteryMain['openNum']"
          class="ball ball-small"
          :key="index"
        >{{item}}</span>
      </div>
      <!--时时彩-->
      <div
        class="open-code"
        v-if="lotteryId==='1'||lotteryId==='4'||lotteryId==='5'||lotteryId==='66'
        ||lotteryId==='82'||lotteryId==='83'||lotteryId==='84'||lotteryId === '86'||lotteryId === '87'||lotteryId === '94'"
      >
        <span v-for="(item, index) in lotteryMain['openNum']" class="ball" :key="index">{{item}}</span>
      </div>
      <!--欢乐生肖-->
      <div class="open-code" v-if="lotteryId === '95'">
        <span v-for="(item, index) in lotteryMain['openNum']" :class="'happy happy'+item" :key="index"></span>
      </div>
      <!--六合彩-->
      <div
        class="open-code"
        v-if="(lotteryId==='70'||lotteryId==='85')
      &&lotteryMain['openResult']['resultColor']"
      >
        <span
          v-for="(item,index) in lotteryMain['openNum']"
          :class="'color color'+lotteryMain['openResult']['resultColor'].split(',')[index]"
          :key="index"
        >{{item&lt;10?('0'+item):item}}</span>
      </div>
      <!--快3-->
      <div
        class="open-code"
        v-if="lotteryId==='10'||lotteryId==='11'||lotteryId==='12'||lotteryId==='13'||lotteryId==='14'||lotteryId==='15'"
      >
        <span
          class="diceNum"
          v-for="(item, index) in lotteryMain['openNum']"
          :class="'dice'+item"
          :key="index"
        ></span>
      </div>
      <!--福彩3D-->
      <div class="open-code" v-if="lotteryId==='90'||lotteryId==='91'">
        <span v-for="(item, index) in lotteryMain['openNum']" class="ball" :key="index">{{item}}</span>
      </div>
      <div
        class="open-result"
        v-if="(lotteryId==='70'||lotteryId==='85')&&lotteryMain['openResult']['zodiac']"
      >
        <span
          v-for="(item, index) in lotteryMain['openResult']['zodiac'].split(',')"
          :key="index"
        >{{item}}</span>
      </div>
      <!--pk10龙虎和-->
      <div
        class="open-result"
        v-if="lotteryId==='50'||lotteryId==='81'||lotteryId==='80'||lotteryId==='55'||lotteryId==='88'||lotteryId==='89'||lotteryId==='92'||lotteryId==='93'"
      >
        <span>{{lotteryMain.total}}</span>
        <span>{{lotteryMain.total%2===0?'双':'单'}}</span>
        <span>{{lotteryMain.total>11?'大':'小'}}</span>
        <span>{{lotteryMain.openNum[0]>lotteryMain.openNum[9]?'龙':'虎'}}</span>
        <span>{{lotteryMain.openNum[1]>lotteryMain.openNum[8]?'龙':'虎'}}</span>
        <span>{{lotteryMain.openNum[2]>lotteryMain.openNum[7]?'龙':'虎'}}</span>
        <span>{{lotteryMain.openNum[3]>lotteryMain.openNum[6]?'龙':'虎'}}</span>
        <span>{{lotteryMain.openNum[4]>lotteryMain.openNum[5]?'龙':'虎'}}</span>
      </div>
      <!-- 快三和 -->
      <div
        class="open-result"
        v-if="lotteryId==='10'||lotteryId==='11'||lotteryId==='12'||lotteryId==='13'||lotteryId==='14'||lotteryId==='15'"
      >
        <span>{{lotteryMain.total}}</span>
        <span>{{lotteryMain.total>=11?'大':'小'}}</span>
        <span>{{lotteryMain.total%2===0?'双':'单'}}</span>
      </div>
      <!--时时彩和顺子-->
      <div
        class="open-result"
        v-if="lotteryId === '5'||lotteryId === '4'||lotteryId === '1'||
           lotteryId === '82'||lotteryId === '83'||lotteryId === '84'||lotteryId === '94'||lotteryId === '95'"
      >
        <span>{{lotteryMain.total}}</span>
        <span>{{lotteryMain.total>=23?'大':'小'}}</span>
        <span>{{lotteryMain.total%2===0?'双':'单'}}</span>
        <span>{{lotteryMain.one}}</span>
        <span>{{lotteryMain.two}}</span>
        <span>{{lotteryMain.three}}</span>
      </div>
      <!-- 11选5 -->
      <div class="open-result" v-if="lotteryId === '86'">
        <span>{{lotteryMain.total}}</span>
        <span>{{lotteryMain.total%2===0?'双':'单'}}</span>
        <span>{{lotteryMain.total>30?'大':'小'}}</span>
        <span>{{lotteryMain.total%10>4?'尾大':'尾小'}}</span>
        <span>{{lotteryMain.openNum[0]>lotteryMain.openNum[4]?'龙':'虎'}}</span>
      </div>
      <!-- 福彩3D -->
      <div class="open-result" v-if="lotteryId === '90'||lotteryId==='91'">
        <span>{{lotteryMain.total}}</span>
        <span>{{lotteryMain.total>=11?'大':'小'}}</span>
        <span>{{lotteryMain.total%2?'双':'单'}}</span>
      </div>
    </div>
    <div class="right">
      <p
        v-if="lotteryId==='50'||lotteryId==='70'||lotteryId==='65'||lotteryId==='66'||lotteryId==='11'||lotteryId==='90'||lotteryId==='91'"
      >
        第
        <span class="curperiod">{{lotteryMain.curPeriodNum}}</span>期
        <br>截止
      </p>
      <p v-else>
        第
        <span class="curperiod">{{lotteryMain.curPeriodNum.toString().substr(8,4)}}</span>期
        <br>截止
      </p>
      <span class="count-down">{{lotteryMain.timeLeft>0?lotteryMain.timeString:'已封盘'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lotteryId", "lotteryMain"]
};
</script>

<style lang="scss" type="text/scss" scoped>
.open-wrap {
  text-align: center;
  display: flex;
  height: 8rem;
  border-bottom: 1px solid #d7d7d7;
  color: #898989;
  background-color: #fff;
  > .left {
    width: 75%;
    border-right: 1px solid #bdbdbd;
    display: flex;
    flex-direction: column;
    > div {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > .open-code > span {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      font-weight: bolder;
      color: #fff;
      margin: 0 2px;
      &.num {
        border-radius: 4px;
        font-size: 18px;
      }
      &.num01,
      &.num1 {
        background-color: #e8df00;
      }
      &.num02,
      &.num2 {
        background-color: #0691dd;
      }
      &.num03,
      &.num3 {
        background-color: #4b4b4b;
      }
      &.num04,
      &.num4 {
        background-color: #ff7700;
      }
      &.num05,
      &.num5 {
        background-color: #1ce3e6;
      }
      &.num06,
      &.num6 {
        background-color: #5234ff;
      }
      &.num07,
      &.num7 {
        background-color: #c0c0c0;
      }
      &.num08,
      &.num8 {
        background-color: #ff0000;
      }
      &.num09,
      &.num9 {
        background-color: #780c00;
      }
      &.num10 {
        background-color: #04bf00;
      }
      &.happy {
        width: 36px;
        height: 36px;
        background-image: url('../../assets/hlsx.png');
        background-size: 100% auto;
      }
      &.happy0 {
        background-position: 0 0px;
      }
      &.happy1 {
        background-position: 0 -36px;
      }
      &.happy2 {
        background-position: 0 -72px;
      }
      &.happy3 {
        background-position: 0 -108px;
      }
      &.happy4 {
        background-position: 0 -144px;
      }
      &.happy5 {
        background-position: 0 -180px;
      }
      &.happy6 {
        background-position: 0 -216px;
      }
      &.happy7 {
        background-position: 0 -252px;
      }
      &.happy8 {
        background-position: 0 -288px;
      }
      &.happy9 {
        background-position: 0 -324px;
      }
      &.ball {
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        font-size: 16px;
        background: url("../../assets/icons/ball.png") no-repeat center;
        background-size: cover;
        color: #d91d37;
      }
      &.ball-small {
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        font-size: 13px;
      }
      &.color {
        width: 2.3rem;
        height: 2.3rem;
        line-height: 2.3rem;
        font-size: 16px;
        border-radius: 50%;
      }
      &.color0 {
        background-color: #ffc6c6;
        color: #d91d36;
        border: 1px solid #d91d36;
      }
      &.color1 {
        background-color: #c6ffdb;
        color: #429f31;
        border: 1px solid #429f31;
      }
      &.color2 {
        background-color: #c6eeff;
        color: #0094f3;
        border: 1px solid #0094f3;
      }
    }
    > .open-result > span {
      display: inline-block;
      padding: 0 3px;
      height: 1.5rem;
      line-height: 1.5rem;
      text-align: center;
      border: 1px solid #818181;
      color: #818181;
      border-radius: 4px;
      margin: 0 3px;
    }
  }
  > .right {
    padding-top: 1rem;
    width: 25%;
    line-height: 2rem;
    .curperiod {
      color: #d91d37;
    }
    .count-down {
      font-size: 16px;
      color: #d91d37;
      display: block;
    }
  }
}
</style>

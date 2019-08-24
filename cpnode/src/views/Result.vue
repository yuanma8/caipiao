<template>
  <div>
    <header>
      <a @click="$router.go(-1)" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <div class="title">
        <a @click="changeState('0')" :class="{active: state==='0'}">开奖结果</a>
        <a @click="changeState('1')" :class="{active: state==='1'}">基本走势</a>
        <a @click="changeState('2')" :class="{active: state==='2'}">玩法说明</a>
      </div>
      <div class="date" v-if="state!=='2'">
        <input type="date" v-model="startDate" @change="changeState(state)">
        <span>{{startDate}}</span>
      </div>
    </header>
    <section style="padding:5px;background:#fff">
      <div v-if="state==='0'">
        <ul class="history-list">
          <li v-for="obj in openHistory" :key="obj.id">
            <p>
              <span>第{{obj.turnNum}}期</span>
              <span>{{obj.openTime}}</span>
            </p>
            <div
              class="open-code"
              v-if="lotteryId==='50'||lotteryId==='81'||lotteryId==='80'||lotteryId==='55'||lotteryId==='88'||lotteryId==='89'||lotteryId==='92'||lotteryId==='93'"
            >
              <span
                v-for="(item,index) in obj.openNumbers"
                :key="index"
                :class="'num num'+item"
              >{{item}}</span>
            </div>
            <div class="open-code" v-if="lotteryId==='65'||lotteryId==='87'" style="flex-wrap:wrap">
              <span
                v-for="(item,index) in obj.openNumbers"
                :key="index"
                class="ball ball-small"
              >{{item}}</span>
            </div>
            <div
              class="open-code"
              v-if="lotteryId==='1'||lotteryId==='4'||lotteryId==='5'||lotteryId==='66'||
              lotteryId==='82'||lotteryId==='83'||lotteryId==='84'||lotteryId === '86'||lotteryId === '90'||lotteryId === '91'||lotteryId === '94'"
            >
              <span v-for="(item,index) in obj.openNumbers" :key="index" class="ball">{{item}}</span>
            </div>
            <div class="open-code" v-if="lotteryId === '95'">
              <span v-for="(item,index) in obj.openNumbers" :key="index" :class="'happy happy'+item">{{item}}</span>
            </div>
            <div class="open-code" v-if="lotteryId==='70'||lotteryId==='85'">
              <span
                v-for="(item,index) in obj.openNumbers"
                :key="index"
                :class="{'redBall':redColor.indexOf(item)!==-1,'greenBall':greenColor.indexOf(item)!==-1,'blueBall':blueColor.indexOf(item)!==-1}"
              >{{item&lt;10?'0'+item:item}}</span>
            </div>

            <div
              class="open-code"
              v-if="lotteryId==='10'||lotteryId==='11'||lotteryId==='12'||lotteryId==='13'||lotteryId==='14'||lotteryId==='15'"
            >
              <span
                class="diceNum"
                v-for="(item,index) in obj.openNumbers"
                :class="'dice'+item"
                :key="index"
              ></span>
            </div>
            <!-- <div
              class="open-code"
              v-if="lotteryId==='90'"
            >
              <span v-for="(item,index) in obj.openNumbers" :key="index" class="ball">{{item}}</span>
            </div>-->

            <div
              class="open-result"
              v-if="lotteryId==='50'||lotteryId==='81'||lotteryId==='80'||lotteryId==='55'||lotteryId==='92'||lotteryId==='93'"
            >
              <span>{{obj.total}}</span>
              <span>{{obj.total%2===0?'双':'单'}}</span>
              <span>{{obj.total>11?'大':'小'}}</span>
              <span>{{obj.openNumbers[0]>obj.openNumbers[9]?'龙':'虎'}}</span>
              <span>{{obj.openNumbers[1]>obj.openNumbers[8]?'龙':'虎'}}</span>
              <span>{{obj.openNumbers[2]>obj.openNumbers[7]?'龙':'虎'}}</span>
              <span>{{obj.openNumbers[3]>obj.openNumbers[6]?'龙':'虎'}}</span>
              <span>{{obj.openNumbers[4]>obj.openNumbers[5]?'龙':'虎'}}</span>
            </div>
            <!-- 快三 -->
            <div
              class="open-result"
              v-if="lotteryId==='10'||lotteryId==='11'||lotteryId==='12'||lotteryId==='13'||lotteryId==='14'||lotteryId==='15'"
            >
              <span>{{obj.total}}</span>
              <span>{{obj.total>=11?'大':'小'}}</span>
              <span>{{obj.total %2===0?'双':'单'}}</span>
            </div>
            <!--时时彩-->
            <div
              class="open-result"
              v-if="lotteryId === '5'||lotteryId === '4'||lotteryId === '1'||
                 lotteryId === '82'||lotteryId === '83'||lotteryId === '84'||lotteryId === '94'||lotteryId === '95'"
            >
              <span>{{obj.total}}</span>
              <span>{{obj.total>=23?'大':'小'}}</span>
              <span>{{obj.total%2===0?'双':'单'}}</span>
              <span style="width:2.5rem">{{obj.one}}</span>
              <span style="width:2.5rem">{{obj.two}}</span>
              <span style="width:2.5rem">{{obj.three}}</span>
            </div>
            <!-- 11选5 -->
            <div class="open-result" v-if="lotteryId === '86'">
              <span>{{obj.total}}</span>
              <span>{{obj.total%2===0?'双':'单'}}</span>
              <span>{{obj.total>30?'大':'小'}}</span>
              <span style="width:2.5rem">{{obj.total%10>4?'尾大':'尾小'}}</span>
              <span>{{obj.openNum[0]>obj.openNum[4]?'龙':'虎'}}</span>
            </div>
            <!-- 福彩3D -->
            <div class="open-result" v-if="lotteryId === '90'||lotteryId === '91'">
              <span>{{obj.total}}</span>
              <span>{{obj.total>13?'大':'小'}}</span>
              <span>{{obj.total%2?'双':'单'}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="state==='1'">
        <table>
          <tr>
            <th v-for="item in trendList.title" :key="item.id">{{item}}</th>
          </tr>
          <tr v-for="item in trendList.infos" :key="item.id">
            <td v-for="(i,index) in item" :key="index">{{i}}</td>
          </tr>
        </table>
      </div>
      <div v-if="state==='2'" class="howtoplay">
        <div v-html="HowToPlay"></div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      state: this.$route.params["state"],
      lotteryId: this.$route.params["id"],
      startDate: "",
      openHistory: [],
      trendList: [],
      redColor: [
        1,
        2,
        7,
        8,
        12,
        13,
        18,
        19,
        23,
        24,
        29,
        30,
        34,
        35,
        40,
        45,
        46
      ],
      blueColor: [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48],
      greenColor: [
        5,
        6,
        11,
        16,
        17,
        21,
        22,
        27,
        28,
        32,
        33,
        38,
        39,
        43,
        44,
        49
      ],
      HowToPlay: ""
    };
  },
  created() {
    const today = new Date();
    this.startDate  =
      today.getFullYear().toString() +
      "-" +
      ((today.getMonth() + 1).toString().length === 2
        ? (today.getMonth() + 1).toString()
        : "0" + (today.getMonth() + 1).toString()) +
      "-" +
      (today.getDate().toString().length === 2
        ? today.getDate().toString()
        : "0" + today.getDate().toString());
    this.changeState(this.state);
  },
  methods: {
    changeState(i) {
      this.state = i;
      switch (i) {
        case "0":
          this.getHistotyList();
          break;
        case "1":
          this.getTrendList();
          break;
        case "2":
          this.getHowToPlay();
          break;
      }
    },
    // 历史开奖
    getHistotyList() {
      this.$loading.show("加载中");
      const body = {
        LotteryId: this.lotteryId,
        StartDate: this.startDate
      };
      this.$http.post("/lottery/getHistoryByWeb", body).then(
        res => {
          this.openHistory = res;
          this.openHistory.forEach(item => {
            item.openNumbers = item.openNum.split(/[,+]/).map(Number);
            // pk10
            if (
              this.lotteryId === "50" ||
              this.lotteryId === "81" ||
              this.lotteryId === "80" ||
              this.lotteryId === "55" ||
              this.lotteryId === "92" ||
              this.lotteryId === "93"
            ) {
              item.total = item.openNumbers[0] + item.openNumbers[1];
            } else {
              item.total = item.openNumbers.reduce((prev, next) => {
                return prev + next;
              }, 0);
            }
            // 时时彩
            if (
              this.lotteryId === "5" ||
              this.lotteryId === "4" ||
              this.lotteryId === "1" ||
              this.lotteryId === "82" ||
              this.lotteryId === "83" ||
              this.lotteryId === "84" ||
              this.lotteryId === "94" ||
              this.lotteryId === "95"
            ) {
              item.one = this.getResult([
                item.openNumbers[0],
                item.openNumbers[1],
                item.openNumbers[2]
              ]);
              item.two = this.getResult([
                item.openNumbers[1],
                item.openNumbers[2],
                item.openNumbers[3]
              ]);
              item.three = this.getResult([
                item.openNumbers[2],
                item.openNumbers[3],
                item.openNumbers[4]
              ]);
            }
          });
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    // 基本走势
    getTrendList() {
      const body = {
        page: 1,
        startDate: this.startDate
      };
      this.$loading.show("加载中");
      this.$http.post("/lottery/trend/" + this.lotteryId, body).then(
        res => {
          this.trendList = res;
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    // 结果处理
    getResult(arr) {
      arr = arr.sort();
      let one = arr[0],
        two = arr[1],
        three = arr[2];
      if (one === two && one === three) {
        return "豹子";
      } else if (
        (one + 1 === two && one + 2 === three) ||
        arr.toString() === "0,8,9" ||
        arr.toString() === "0,1,9"
      ) {
        return "顺子";
      } else if (one === two || two === three || one === three) {
        return "对子";
      } else if (
        one + 1 === two ||
        two + 1 === three ||
        (one === 0 && three === 9)
      ) {
        return "半顺";
      } else {
        return "杂六";
      }
    },
    // 获取玩法
    getHowToPlay() {
      this.$loading.show("加载中");
      this.$http.get("/lottery/find/howToPlay/" + this.lotteryId).then(
        res => {              
					this.HowToPlay = res;
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
header .title {
  border: 0.1rem solid #fff;
  height: 2.6rem;
  border-radius: 0.4rem;
  overflow: hidden;
  display: flex;
  width: 50%;
  position: absolute;
  left: 25%;
  top: 5px;
}

header .title a {
  display: block;
  width: 6.5rem;
  flex: 1;
  text-align: center;
  color: #fff;
  line-height: 2.4rem;
  border-right: 1px solid #fff;
}

header .title a:last-child {
  border-color: transparent;
}

header .title a.active {
  background: #fff;
  color: #d91d37;
}

header .date {
  position: absolute;
  right: 5px;
  top: 1rem;
  color: #fff;
}

header .date input {
  opacity: 0;
  position: absolute;
  z-index: 1;
}

.howtoplay {
  background: #fff;
}

table {
  width: 100%;
  background-color: #fff;
  border-collapse: collapse;
}

table th {
  height: 25px;
  border: 1px solid #ccc;
}

table td {
  border: 1px solid #ddd;
  text-align: center;
  height: 25px;
}

.history-list {
  background-color: #fff;
  padding: 0 1rem 3rem;
}

.history-list li {
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
}

.history-list li p {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.open-code {
  margin-top: 1rem;
}

.open-result {
  margin-top: 1rem;
}

.open-code span {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  font-weight: bolder;
  color: #fff;
  margin: 0 2px;
}

.open-code .num {
  border-radius: 4px;
  font-size: 18px;
}

.open-code .num01,
.open-code .num1 {
  background-color: #e8df00;
}

.open-code .num02,
.open-code .num2 {
  background-color: #0691dd;
}

.open-code .num03,
.open-code .num3 {
  background-color: #4b4b4b;
}

.open-code .num04,
.open-code .num4 {
  background-color: #ff7700;
}

.open-code .num05,
.open-code .num5 {
  background-color: #1ce3e6;
}

.open-code .num06,
.open-code .num6 {
  background-color: #5234ff;
}

.open-code .num07,
.open-code .num7 {
  background-color: #c0c0c0;
}

.open-code .num08,
.open-code .num8 {
  background-color: #ff0000;
}

.open-code .num09,
.open-code .num9 {
  background-color: #780c00;
}

.open-code .num10 {
  background-color: #04bf00;
}

.open-code .ball {
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 16px;
  background: url("../assets/icons/ball.png") no-repeat center;
  background-size: cover;
  color: #d91d37;
}
.open-code .happy {
  width: 36px;
  height: 36px;
  background-image: url("../assets/hlsx.png");
  background-size: 100% auto;
}
.open-code .happy0 {
  background-position: 0 0px;
}
.open-code .happy1 {
  background-position: 0 -36px;
}
.open-code .happy2 {
  background-position: 0 -72px;
}
.open-code .happy3 {
  background-position: 0 -108px;
}
.open-code .happy4 {
  background-position: 0 -144px;
}
.open-code .happy5 {
  background-position: 0 -180px;
}
.open-code .happy6 {
  background-position: 0 -216px;
}
.open-code .happy7 {
  background-position: 0 -252px;
}
.open-code .happy8 {
  background-position: 0 -288px;
}
.open-code .happy9 {
  background-position: 0 -324px;
}

.open-code .ball-small {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 13px;
  margin: 0;
}

.open-code .redBall {
  width: 2.3rem;
  height: 2.3rem;
  line-height: 2.3rem;
  font-size: 16px;
  background-color: #ffc6c6;
  color: #d91d36;
  border: 1px solid #d91d36;
  border-radius: 50%;
}

.open-code .blueBall {
  width: 2.3rem;
  height: 2.3rem;
  line-height: 2.3rem;
  font-size: 16px;
  background-color: #c6eeff;
  color: #0094f3;
  border: 1px solid #0094f3;
  border-radius: 50%;
}

.open-code .greenBall {
  width: 2.3rem;
  height: 2.3rem;
  line-height: 2.3rem;
  font-size: 16px;
  background-color: #c6ffdb;
  color: #429f31;
  border: 1px solid #429f31;
  border-radius: 50%;
}

.open-result span {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  border: 1px solid #818181;
  color: #818181;
  border-radius: 4px;
  margin: 0 3px;
}

.open-result span.diceNum {
  border: none;
  width: 25px;
  height: 25px;
  background-size: 100%;
  justify-content: center;
}
</style>

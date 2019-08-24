<template>
  <div class="play-wrap">
    <div style="display: flex;flex: 1;">
      <!--左侧列表-->
      <div class="left">
        <div
          v-for="item in menuList"
          @click="getPlayList(item,false)"
          :class="{active:gameName===item.menuName}"
          :key="item.menuName"
        >{{item.menuName}}</div>
      </div>
      <!--右侧-->
      <div class="right" :class="{show:showForm}">
        <!--二级菜单-->
        <div class="rightTop" v-if="secondList.length!==0">
          <ul style="display:flex;flex-wrap:nowrap;overflow:scroll;width:100%;">
            <li
              v-for="(item, index) in secondList"
              @click="getPlayList(item,true)"
              :class="{active:secondName===item.menuName}"
              style="min-width:8rem;flex:1"
              :key="index"
            >{{item.menuName}}</li>
          </ul>
        </div>
        <!--投注-->
        <div class="play-list" v-for="(item, idx) in playList" :key="item.name">
          <p class="playname">
            {{item.name}}
            <span
              v-if="gameName==='自选不中'||gameName==='组选三'||gameName==='组选六'"
            >(赔率:{{odds}})</span>
          </p>
          <!--六合彩-->
          <!--特码正码等样式-->
          <ul v-if="gameName==='特码'||gameName==='正码'||gameName==='正特'">
            <li
              v-for="i in item.datas"
              @click="addBet(i)"
              :class="{active:checkList(i.playId)>=0}"
              style="width:33%;"
              :key="i.name"
            >
              <div class="name">
                <span :class="i.isNumber===1?'ball color'+i.color:''">{{i.name}}</span>
              </div>
              <div class="odds">{{i.odds}}</div>
            </li>
          </ul>
          <!--连码自选不中-->
          <!-- 福彩3D组选三 -->
          <ul v-else-if="gameName==='连码'||gameName==='自选不中'||gameName==='组选三'||gameName==='组选六'">
            <li
              v-for="i in item.datas"
              @click="addBet(i)"
              :class="{active:nameList.indexOf(i.name)>=0}"
              style="width:33%;"
              :key="i.name"
            >
              <div class="name">
                <span :class="i.isNumber===1?'ball color'+i.color:''">{{i.name}}</span>
              </div>
              <div
                class="odds"
                v-if="gameName!=='自选不中'&&gameName!=='组选三'&&gameName!=='组选六'"
              >{{i.odds}}</div>
            </li>
          </ul>
          <!-- 11选5 直选 -->
          <!-- 福彩3D二字定位 -->
          <ul v-else-if="gameName==='直选'||gameName==='二字定位'||gameName==='三字定位'">
            <li
              v-for="i in item.datas"
              @click="xuan5List(i, idx)"
              :class="{active:numberList[idx].indexOf(i.name)>=0}"
              style="width:33%;"
              :key="i.name"
            >
              <div class="name">
                <span :class="i.isNumber===1?'ball color'+i.color:''">{{i.name}}</span>
              </div>
              <div class="odds">{{i.odds}}</div>
            </li>
          </ul>
          <!--生肖头尾等样式-->
          <ul
            v-else-if="gameName==='一肖'||gameName==='特肖'||gameName==='尾数'||gameName==='特码头尾'||gameName==='连肖'||gameName==='连尾'"
          >
            <li
              v-for="i in item.datas"
              @click="addBet(i)"
              :class="{active:checkList(i.playId)>=0}"
              style="width: 100%;height: auto;padding: .5rem 0;"
              :key="i.name"
            >
              <div class="name">
                <span>{{i.name}}</span>
              </div>
              <div class="odds">{{i.odds}}</div>
              <div style="flex: 3;display:flex;flex-wrap:wrap" v-if="i.belongNumbers&&i.color">
                <span
                  v-for="(n,index) in i.belongNumbers.split(',')"
                  :class="'ball color'+i.color.split(',')[index]"
                  :key="index"
                >{{n}}</span>
              </div>
            </li>
          </ul>
          <!--其他彩种默认样式-->
          <ul v-else>
            <li
              v-for="(i,index) in item.datas"
              @click="addBet(i)"
              :class="{active:checkList(i.playId)>=0}"
              :key="index"
            >
              <!--pk10-->
              <div class="name">
                <span
                  v-if="item.name==='冠军'||item.name==='亚军'||item.name==='第三名'||item.name==='第四名'||item.name==='第五名'||item.name==='第六名'||item.name==='第七名'||item.name==='第八名'||item.name==='第九名'||item.name==='第十名'"
                  :class="i.isNumber===1?'number number'+i.number:''"
                >{{i.name}}</span>
                <!--k3-->
                <span
                  v-else-if="(item.name==='三连号'||item.name==='三同号'||item.name==='二同号'||item.name==='不出号码'||item.name==='必出号码')&&i.isNumber"
                  v-for="(n,index) in i.name.split('')"
                  :class="'dice dice'+n"
                  :key="index"
                ></span>
                <!--欢乐生肖-->
                <span v-else-if="item.name==='第一球'||item.name==='第二球'||item.name==='第三球'||item.name==='第四球'||item.name==='第五球'" :class="i.isNumber?'happy  happy'+i.number:''">{{i.name}}</span>
                <!--时时彩其他-->
                <span v-else :class="i.isNumber===1?'ball':''">{{i.name}}</span>
              </div>
              <!--赔率-->
              <div class="odds">{{i.odds}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <BetInput
      :balance="balance"
      :bet-list="betList"
      :lottery-main="lotteryMain"
      :second-name="secondName"
    ></BetInput>
  </div>
</template>

<script>
import BetInput from "./BetInput.vue";

export default {
  props: ["menuList", "lotteryId", "balance", "lotteryMain"],
  data() {
    return {
      playList: [],
      secondList: [],
      gameName: "",
      secondName: "",
      // 投注表
      betList: [],
      // 连码自选不中列表
      nameList: [],
      // 自选不中赔率
      odds: "--",
      // 11选5列表
      numberList: [[], [], []]
    };
  },
  created() {
    this.getPlayList(this.menuList[0], false);
  },
  watch: {
    lotteryId: function(val, oldVal) {
      this.getPlayList(this.menuList[0], false);
    }
  },
  methods: {
    // 获取详情
    getPlayList(item, b) {
      this.betList = [];
      this.nameList = [];
      this.numberList = [[], [], []];
      this.showForm = false;
      // 是否点击主菜单
      if (!b) {
        this.gameName = item.menuName;
        // 不含二级菜单
        if (item.menuDetails === null) {
          this.secondList = [];
          this.secondName = this.gameName;
          this.getItem(item.id);
          //  含有二级菜单显示
        } else {
          this.secondList = item.menuDetails;
          this.secondName = item.menuDetails[0].menuName;
          this.getItem(item.menuDetails[0].id);
        }
        //  点击二级菜单
      } else {
        this.secondName = item.menuName;
        this.getItem(item.id);
      }
    },
    // 获取玩法赔率内容
    getItem(id) {
      this.$loading.show("加载中");
      if (this.isLocalStorageSupported() && !!sessionStorage.getItem(id)) {
        this.playList = JSON.parse(sessionStorage.getItem(id));
        this.$loading.hide();
      } else {
        this.$http.get("/lottery/find/play/" + this.lotteryId + "/" + id).then(
          res => {
            this.$loading.hide();
            this.playList = res;
            if (this.isLocalStorageSupported()) {
              sessionStorage.setItem(id, JSON.stringify(this.playList));
            }
          },
          e => {
            this.$loading.hide();
            this.playList = [];
          }
        );
      }
    },
    // 是否支持本地缓存
    isLocalStorageSupported() {
      const storage = window.sessionStorage;
      try {
        storage.setItem("test", "testValue");
        storage.removeItem("test");
        return true;
      } catch (error) {
        return false;
      }
    },
    // 添加投注
    addBet(item) {
      // 六合彩
      // 三中二
      switch (this.secondName) {
        case "三中二":
          this.sixBet(3, 7, item);
          break;
        case "三全中":
          this.sixBet(3, 10, item);
          break;
        case "二全中":
        case "二中特":
        case "特串":
          this.sixBet(2, 7, item);
          break;
        case "四全中":
          this.sixBet(4, 4, item);
          break;
        case "二连尾":
        case "二连肖":
          this.sixBet(2, 13, item);
          break;
        case "三连尾":
        case "三连肖":
          this.sixBet(3, 13, item);
          break;
        case "四连尾":
        case "四连肖":
          this.sixBet(4, 13, item);
          break;
        case "五连尾":
        case "五连肖":
          this.sixBet(5, 13, item);
          break;
        case "自选不中":
          this.sixBet(5, 12, item);
          break;
        case "二中二":
          this.sixBet(2, 2, item);
          break;
        case "三中三":
          this.sixBet(3, 3, item);
          break;
        case "四中四":
          this.sixBet(4, 4, item);
          break;
        case "五中五":
          this.sixBet(5, 5, item);
          break;
        case "六中五":
          this.sixBet(6, 6, item);
          break;
        case "七中五":
          this.sixBet(7, 7, item);
          break;
        case "八中五":
          this.sixBet(8, 8, item);
          break;
        case "前二组选":
          this.sixBet(2, 5, item);
          break;
        case "前三组选":
          this.sixBet(3, 5, item);
          break;
        case "组选三":
          this.sixBet(5, 10, item);
          break;
        case "组选六":
          this.sixBet(4, 8, item);
          break;
        default:
          this.setBetList(item);
          break;
      }
    },
    // 六合彩特定玩法投注
    sixBet(min, max, item) {
      // 连码,自选不中
      if (
        this.gameName === "自选不中" ||
        this.gameName === "组选三" ||
        this.gameName === "组选六"
      ) {
        const idx = this.nameList.indexOf(item.name);
        if (idx < 0) {
          if (this.nameList.length < max) {
            this.nameList.push(item.name);
          }
        } else {
          this.nameList.splice(idx, 1);
        }
        if (this.gameName === "自选不中") {
          switch (this.nameList.length) {
            case 5:
              this.odds = "2.12";
              break;
            case 6:
              this.odds = "2.63";
              break;
            case 7:
              this.odds = "3.18";
              break;
            case 8:
              this.odds = "3.72";
              break;
            case 9:
              this.odds = "4.5";
              break;
            case 10:
              this.odds = "5.58";
              break;
            case 11:
              this.odds = "6.8";
              break;
            case 12:
              this.odds = "8.5";
              break;
            default:
              this.odds = "--";
              break;
          }
        }
        if (this.gameName === "组选三") {
          switch (this.nameList.length) {
            case 5:
              this.odds = "12.95";
              break;
            case 6:
              this.odds = "8.61";
              break;
            case 7:
              this.odds = "6.15";
              break;
            case 8:
              this.odds = "4.61";
              break;
            case 9:
              this.odds = "3.6";
              break;
            case 10:
              this.odds = "2.87";
              break;
            default:
              this.odds = "--";
              break;
          }
        }
        if (this.gameName === "组选六") {
          switch (this.nameList.length) {
            case 4:
              this.odds = "32.5";
              break;
            case 5:
              this.odds = "13";
              break;
            case 6:
              this.odds = "6.5";
              break;
            case 7:
              this.odds = "3.7";
              break;
            case 8:
              this.odds = "2.35";
              break;
            default:
              this.odds = "--";
              break;
          }
        }
        this.setSixBetList(item);
      } else if (this.gameName === "连码") {
        const idx = this.nameList.indexOf(item.name);
        if (idx < 0) {
          if (this.nameList.length < max) {
            this.nameList.push(item.name);
          }
        } else {
          this.nameList.splice(idx, 1);
        }
        this.setSixBetList(item);
      } else {
        // 判断长度大小限制
        if (this.betList.length < max) {
          this.setBetList(item);
        }
      }
    },
    // 11选5特定玩法投注
    xuan5List(item, index) {
      if (this.gameName === "直选") {
        switch (index) {
          case 0:
            if (
              this.secondName === "前二直选" &&
              this.numberList[1].indexOf(item.name) >= 0
            ) {
              break;
            } else if (
              this.numberList[1].indexOf(item.name) >= 0 ||
              this.numberList[2].indexOf(item.name) >= 0
            ) {
              break;
            } else {
              const idx1 = this.numberList[0].indexOf(item.name);
              if (idx1 < 0) {
                this.numberList[0].push(item.name);
              } else {
                this.numberList[0].splice(idx1, 1);
              }
              break;
            }
          case 1:
            if (
              this.secondName === "前二直选" &&
              this.numberList[0].indexOf(item.name) >= 0
            ) {
              break;
            } else if (
              this.numberList[0].indexOf(item.name) >= 0 ||
              this.numberList[2].indexOf(item.name) >= 0
            ) {
              break;
            } else {
              const idx2 = this.numberList[1].indexOf(item.name);
              if (idx2 < 0) {
                this.numberList[1].push(item.name);
              } else {
                this.numberList[1].splice(idx2, 1);
              }
              break;
            }
          case 2:
            if (
              this.numberList[0].indexOf(item.name) >= 0 ||
              this.numberList[1].indexOf(item.name) >= 0
            ) {
              break;
            } else {
              const idx3 = this.numberList[2].indexOf(item.name);
              if (idx3 < 0) {
                this.numberList[2].push(item.name);
              } else {
                this.numberList[2].splice(idx3, 2);
              }
              break;
            }
        }
      }
      if (this.gameName === "二字定位" || this.gameName === "三字定位") {
        switch (index) {
          case 0:
            const idx1 = this.numberList[0].indexOf(item.name);
            if (idx1 < 0) {
              this.numberList[0].push(item.name);
            } else {
              this.numberList[0].splice(idx1, 1);
            }
            break;
          case 1:
            const idx2 = this.numberList[1].indexOf(item.name);
            if (idx2 < 0) {
              this.numberList[1].push(item.name);
            } else {
              this.numberList[1].splice(idx2, 1);
            }
            break;
          case 2:
            const idx3 = this.numberList[2].indexOf(item.name);
            if (idx3 < 0) {
              this.numberList[2].push(item.name);
            } else {
              this.numberList[2].splice(idx3, 2);
            }
        }
      }
      this.betList = [];
      if (this.secondName === "前二直选" || this.gameName === "二字定位") {
        for (const i of this.numberList[0]) {
          for (const j of this.numberList[1]) {
            this.betList.push({
              remark: item.remark,
              odds: item.odds,
              playId: item.playId,
              betinfo: [i, j].toString()
            });
          }
        }
      } else {
        for (const i of this.numberList[0]) {
          for (const j of this.numberList[1]) {
            for (const k of this.numberList[2]) {
              this.betList.push({
                remark: item.remark,
                odds: item.odds,
                playId: item.playId,
                betinfo: [i, j, k].toString()
              });
            }
          }
        }
      }
    },
    // 判断是否存在
    checkList(i) {
      return this.betList
        .map(item => {
          return item.playId;
        })
        .indexOf(i);
    },
    // 插入投注表
    setBetList(item) {
      const id = this.checkList(item.playId);
      if (id < 0) {
        this.betList.push(item);
      } else {
        this.betList.splice(id, 1);
      }
    },
    // 六合彩特殊玩法插入投注表*一注数据
    setSixBetList(item) {
      this.betList = [];
      if (this.nameList.length > 0) {
        item.betinfo = this.nameList.toString();
        if (
          this.gameName === "自选不中" ||
          this.gameName === "组选三" ||
          this.gameName === "组选六"
        ) {
          item.odds = this.odds;
        }
        this.betList.push(item);
      }
    }
  },
  components: {
    BetInput
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.play-wrap {
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .left {
    width: 8rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #efefef;
    border-right: 1px solid #ececec;
    > div {
      color: #4a4a4a;
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      border-bottom: 1px solid #d1d1d1;
      font-size: 14px;
      position: relative;
      &.active {
        background-color: #fff;
        &:before {
          content: "";
          display: block;
          width: 5px;
          height: 2rem;
          background-color: #d91d37;
          position: absolute;
          left: 0;
          top: 1rem;
        }
      }
    }
  }
  .right {
    flex: 1;
    overflow-y: scroll;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    > .rightTop {
      height: 4rem;
      overflow-x: scroll;
      > ul {
        background: #fff;
        height: 4rem;
        > li {
          color: #4a4a4a;
          line-height: 4rem;
          text-align: center;
          font-size: 14px;
          &.active {
            border-bottom: 2px solid #fc3548;
          }
        }
      }
    }
    > .play-list {
      > .playname {
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-weight: bold;
        color: #f45541;
        background-image: linear-gradient(#f2721b, #f3301a);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 16px;
        border-bottom: 1px solid #ececec;
      }
      > ul {
        display: flex;
        flex-wrap: wrap;
        > li {
          width: 50%;
          display: flex;
          align-items: center;
          height: 4rem;
          justify-content: flex-end;
          border-bottom: 1px solid #ececec;
          border-right: 1px solid #ececec;
          &.active {
            background-color: #ff9eac;
          }
          > .name {
            font-size: 15px;
            font-weight: bold;
            color: #535353;
            text-align: center;
            flex: 1;
          }
          > .odds {
            color: #d91d37;
            font-size: 12px;
            text-align: center;
            flex: 1;
          }
          span {
            display: inline-block;
            text-align: center;
            &.happy {
              width: 36px;
              height: 36px;
              background-image: url("../../assets/hlsx.png");
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
            &.number {
              width: 2rem;
              height: 2rem;
              border-radius: 4px;
              line-height: 2rem;
              color: #fff;
              font-size: 18px;
              -webkit-text-stroke: 1px #000;
              margin-right: 5px;
            }
            &.number1,
            &.number11 {
              background-color: #e8c800;
            }
            &.number2,
            &.number12 {
              background-color: #0691dd;
            }
            &.number3,
            &.number13 {
              background-color: #4b4b4b;
            }
            &.number4,
            &.number14 {
              background-color: #ff7700;
            }
            &.number5,
            &.number15 {
              background-color: #00c9e6;
            }
            &.number6,
            &.number16 {
              background-color: #5234ff;
            }
            &.number7,
            &.number17 {
              background-color: #b4b4b4;
            }
            &.number8,
            &.number18 {
              background-color: #ff0000;
            }
            &.number9,
            &.number19 {
              background-color: #780c00;
            }
            &.number9,
            &.number10 {
              background-color: #04bf00;
            }
            &.ball {
              width: 2.5rem;
              height: 2.5rem;
              line-height: 2.5rem;
              font-weight: bold;
              font-size: 16px;
              background: url("../../assets/icons/ball.png") no-repeat center;
              background-size: cover;
              color: #d91d37;
            }
            &.dice {
              width: 20px;
              height: 20px;
              background-size: 100%;
            }
            &.color0 {
              color: #d91d37;
              font-size: 14px;
              margin: 0 auto;
            }
            &.color1 {
              color: #429f31;
              font-size: 14px;
              margin: 0 auto;
            }
            &.color2 {
              color: #0094f3;
              font-size: 14px;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(10rem);
}
</style>

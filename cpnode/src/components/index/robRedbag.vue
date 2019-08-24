<template>
  <div class="robredbag" v-if="isLogin">
    <div
      class="smallred"
      style=" left:0; top:500px;"
      :class="{'animete':(remainTime <= 0)&&(notredbag == true)}"
      @click="showBigred = true"
      v-touch:start="startHandler"
      v-touch:moving="movingHandler"
      v-touch:end="endHandler"
    >
      <span v-if="notredbag">{{details}}</span>
    </div>
    <transition>
      <div class="bigred_mask" v-if="showBigred" @click="showBigred = false">
        <div class="bigred" @click="$event.stopPropagation()">
          <img src="../../assets/home_title_icon.png" alt>
          <aside>
            <p>拼手气红包</p>
            <p v-if="(remainTime > 0)&&(!showRedBag)">红包倒计时:{{details}}</p>
            <P v-if="(remainTime <= 0)&&(!showRedBag)">开抢倒计时:{{details}}</P>
            <p v-if="showRedBag">哇!恭喜您抢到红包~</p>
          </aside>
          <div class="img" v-if="!showRedBag">
            <img
              src="../../assets/red_pack_open.png"
              v-if="(remainTime <= 0)&&(!showmoney)"
              @click="getMoney()"
            >
            <img src="../../assets/red_pack_garyopen.png" v-if="(remainTime > 0)&&(!showmoney)">
            <img class="money" src="../../assets/copper_01.png" v-if="showmoney">
          </div>
          <p v-if="showRedBag" class="salary">¥{{redbag}}元</p>
          <aside v-if="other" style="margin-top: -20px;">
            <p>"{{title}}"</p>
            <p>
              额外奖励"
              <span style="font-weight:700; font-size: 18px">{{money}}</span>"元
            </p>
          </aside>
          <i @click="showBigred = false">×</i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      packId: "",
      remainTime: 0, // 剩余时间
      keepTime: 0, //红包持续时间
      details: "", //倒计时
      other: false, //是否显示额外红包
      showBigred: false, //显示弹窗
      showmoney: false, //请求中动画
      timer: 0,
      showRedBag: false,
      redbag: "",
      notredbag: true,
      title: "",
      money: "",
      //悬浮球定义变量
      _x_start: 0,
      _y_start: 0,
      left_start: 0,
      top_start: 0,
      _x_move: 0,
      _y_move: 0,
      bodyW: 0,
      bodyH: 0,
      _x_end: 0,
      _y_end: 0,
      divH: 0,
      divW: 0,
      isLogin: !!this.$getCookie("username")
    };
  },
  created() {
    this.getTime();
    // this.isLogin  &&  this.getTime();
    // if(this.isLogin){
    //   this.getTime();
    // }
  },
  methods: {
    getTime() {
      this.$http.post("/redPack/findList", "").then(
        res => {
          if (res.length == 0) {
            this.notredbag = false;
            this.details = "00:00:00";
            this.remainTime = 1;
          } else {
            this.details = "";
          }
          this.remainTime = res[0].remainTime;
          this.keepTime = res[0].keepTime;
          this.packId = res[0].packId;
          // 判断是否可以抢红包
          if (this.remainTime <= 0) {
            // this.remainTime = 0;
            this.timer = setInterval(() => {
              if (this.keepTime <= 0) {
                clearInterval(this.timer);
                this.getTime();
              }
              this.remainTime ++;
              this.details = this.$countdown(-this.remainTime);
            }, 1000);
          } else {
            // 持续倒计时,还不能开抢
            this.timer = setInterval(() => {
              if (this.remainTime == 0) {
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                  if (this.keepTime == 0) {
                    clearInterval(this.timer);
                    this.getTime();
                  }
                  this.keepTime--;
                  this.details = this.$countdown(this.keepTime);
                }, 1000);
              } else {
                this.remainTime--;
                this.details = this.$countdown(this.remainTime);
              }
            }, 1000);
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    //点击红包
    getMoney() {
      this.showmoney = true;
      this.$http.post("/redPack/get/" + this.packId).then(
        res => {
          this.redbag = res.money;
          if (res.activityRedPack !== null) {
            this.other = true;
            this.title = res.activityRedPack.title;
            this.money = res.activityRedPack.money;
          } else {
            this.other = false;
          }
          this.getTime();
          this.showRedBag = true;
          this.showmoney = false;
        },
        e => {
          this.showmoney = false;
        }
      );
    },
    stopPropagation(event) {
      e.stopPropagation();
    },
    // 点击开始
    startHandler(e) {
      e.target.style.transition = "all 0s ease";
      this._x_start = e.touches[0].pageX; //起始点击位置
      this._y_start = e.touches[0].pageY; //起始点击位置
      this.left_start = parseInt(e.target.style.left); //元素左边距
      this.top_start = parseInt(e.target.style.top); //元素上边距
    },
    movingHandler(e) {
      // e.preventDefault(); //取消事件的默认动作。
      this._x_move = e.touches[0].pageX; //当前屏幕上所有触摸点的集合列表
      this._y_move = e.touches[0].pageY; //当前屏幕上所有触摸点的集合列表
      //左边距=当前触摸点-鼠标起始点击位置+起始左边距
      e.target.style.left =
        parseFloat(this._x_move) -
        parseFloat(this._x_start) +
        parseFloat(this.left_start) +
        "px";
      //上边距=当前触摸点-鼠标起始点击位置+起始上边距
      e.target.style.top =
        parseFloat(this._y_move) -
        parseFloat(this._y_start) +
        parseFloat(this.top_start) +
        "px";
    },
    endHandler(e) {
      e.target.style.transition = "all .5s ease";
      this.bodyW = document.documentElement.offsetWidth / 2; //屏幕宽的一半
      this.bodyH = document.documentElement.clientHeight; //屏幕高
      this._x_end = e.changedTouches[0].pageX; //松开位置
      this._y_end = e.changedTouches[0].pageY; //松开位置
      this.divH = e.target.offsetHeight; //元素高
      this.divW = e.target.offsetWidth; //元素宽
      //当最终位置在屏幕左半部分
      if (this._x_end < this.bodyW) {
        e.target.style.left = 0 + "px";
      } else if (this._x_end >= this.bodyW) {
        //当最终位置在屏幕右半部分
        e.target.style.left =
          document.documentElement.offsetWidth - parseFloat(this.divW) + "px";
      }
      //当元素顶部在屏幕外时
      if (parseFloat(e.target.style.top) < 40) {
        //置于顶部
        e.target.style.top = 40 + "px"; //置于顶部
      }
      //当元素底部在屏幕外时
      if (this.bodyH - this._y_end < parseFloat(this.divH) / 2 + 60) {
        //置于底部
        e.target.style.top = this.bodyH - parseFloat(this.divH) - 60 + "px";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.robredbag {
  .smallred {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border-radius: 3px;
    overflow: hidden;
    width: 40px;
    height: 50px;
    background: url("../../assets/red_packets_icon.jpg") no-repeat center;
    background-size: contain;
    span {
      transform: scale(0.75);
      color: yellow;
    }
  }
  .animete {
    box-shadow: 0 0 6px rgb(255, 208, 0);
    animation: change 0.5s infinite;
  }
  .bigred_mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    .bigred {
      padding-bottom: 40px;
      width: 15rem;
      height: 250px;
      background: url("../../assets/redpack_bg.png") no-repeat center;
      background-size: contain;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      position: relative;
      aside {
        text-align: center;
        line-height: 20px;
        color: rgb(254, 204, 158);
      }
      img:first-child {
        width: 60%;
      }
      .img {
        text-align: center;
      }
      .img img {
        width: 30%;
        margin-top: -10px;
      }
      img.money {
        animation: change2 0.5s infinite;
      }
      i {
        font-size: 40px;
        line-height: 30px;
        position: absolute;
        top: 0;
        left: 0;
        color: rgb(163, 77, 55);
      }
      .salary {
        margin-bottom: 23px;
        text-align: center;
        font-size: 18px;
        color: rgb(255, 208, 0);
      }
    }
  }
}
@keyframes change {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
@keyframes change2 {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-360deg);
  }
}
</style>
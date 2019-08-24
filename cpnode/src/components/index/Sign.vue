<template>
  <div class="sign_box" v-if="(isLogin)&&((MemberDays.length !== 0)||jiajiang)">
    <div
      class="present"
      style="left:0; top:300px;"
      @click="showBox()"
      v-touch:start="startHandler"
      v-touch:moving="movingHandler"
      v-touch:end="endHandler"
    ></div>
    <transition>
      <div class="sign_mask" v-if="showSignMask" @click="showSignMask = false">
        <div class="sign_big" @click="$event.stopPropagation()" v-if="(!showSignSuccess)&&(!showJiajiang)">
          <i @click="showSignMask = false">×</i>
          <nav>回归7天乐</nav>
          <aside>
            <p>迷路的赌神们,欢迎回家,</p>
            <p>携手平台共同续写我们的传奇!</p>
          </aside>
          <ul>
            <li
              v-for="(item,id) in MemberDays"
              :key="id"
              :class="{'click_li_get':item.status == 2,'click_li_nor':item.status == 1}"
            >
              {{item.day}}
              <em>天</em>
            </li>
          </ul>
          <span>已累计签到{{Newstatus.length}}天</span>
          <div class="btn" @click="getAgin()">今日签到</div>
        </div>
        <div class="sign_success" v-if="showSignSuccess" @click="$event.stopPropagation()">
          <i @click="close()">×</i>
          <img src="../../assets/success.png">
          <h3>
            恭喜获得&nbsp;
            <b>{{money.signMoney}}</b>&nbsp;元回归礼金
          </h3>
          <p>继续打码{{money.needBetMoney}}元还可获得{{money.awardMoney}}元嘉奖</p>
          <div class="btn" @click="close()">前去投注</div>
        </div>
        <div class="sign_success" v-if="jiajiang" @click="$event.stopPropagation()">
          <i @click="close()">×</i>
          <img src="../../assets/jiajiang.png">
          <h3>
            恭喜获得&nbsp;
            <b>{{jiajiangmoney.awardMoney}}</b>&nbsp;元嘉奖礼金
          </h3>
          <div class="btn" @click="close()">前去投注</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jiajiang: false,
      jiajiangmoney: 0,
      money: [],
      showSignMask: false,
      showSignSuccess: false,
      // 是否显示嘉奖成功
      showJiajiang:false,
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
      isLogin: !!this.$getCookie("username"),
      MemberDays: JSON.parse(this.$getCookie("returnMemberDays")),
      Newstatus: [],
      pending: false
    };
  },
  created() {
    // this.getMoney(),
    this.getReturnMoney(),
    this.Newstatus = this.MemberDays.filter(item => {
      return item.status == 2;
    });
  },
  destroyed(){
    clearInterval(this.timer)
  },
  methods: {
    showBox(){
      this.showSignMask = true
      if(this.MemberDays.length !== 0){
        this.showJiajiang = false        
      }else{
        this.getMoney()
        this.showJiajiang = true
      }
    },
    // 轮询是否可领取
    getReturnMoney() {
        this.timer = window.setInterval(() => {
            this.$http.get('/user/getReturnMoneyFlag').then(
                (res) => {
                    if ((res) === '1'){
                      this.jiajiang = true
                    }
                },
                (err) => {

                });
        }, 20000);
    },
    getMoney(){
            this.$http.get('/user/getReturnMoney').then(res => {
              this.jiajiangmoney = res;
            })
    },
    close() {
      this.showSignMask = false;
      this.MemberDays = [];
      this.jiajiang = false
      this.$setCookie(
        "returnMemberDays",
        JSON.stringify([]),
        1000 * 60 * 60 * 24 * 30
      );
    },
    getAgin() {
      if (this.pending) {
        return;
      }
      this.penging = true;
      this.$http.get("/user/returnMember/sign").then(
        res => {
          this.penging = false;
          this.money = res;
          this.showSignSuccess = true;
          this.$setCookie(
            "returnMemberDays",
            JSON.stringify([]),
            1000 * 60 * 60 * 24 * 30
          );
        },
        err => {
          console.log(err);
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

.sign_box {
  .present {
    position: fixed;
    width: 60px;
    height: 60px;
    background: url("../../assets/present.png") no-repeat center;
    background-size: contain;
    animation: change 0.4s infinite;
  }
  .sign_mask {
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
    .sign_big {
      width: 25rem;
      border-radius: 8px;
      overflow: hidden;
      background-color: #fff;
      position: relative;
      i {
        color: #fff;
        font-size: 15px;
        font-family: "宋体";
        font-style: normal;
        position: absolute;
        top: 10px;
        right: 10px;
      }
      nav {
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        width: 100%;
        height: 127px;
        background: #4892ff url("../../assets/time.png") no-repeat center 25px;
        background-size: contain;
      }
      aside {
        color: #464646;
        padding: 10px 0;
        font-size: 13px;
        text-align: center;
        line-height: 20px;
      }
      ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 0 5px;
        margin-bottom: 20px;
        li {
          display: flex;
          align-items: baseline;
          justify-content: center;
          width: 33px;
          height: 33px;
          line-height: 35px;
          font-size: 20px;
          border-radius: 50%;
          border: 1px solid #4892ff;
          color: #4892ff;
          text-align: center;
          em {
            font-size: 12px;
            font-style: normal;
            transform: scale(0.8);
          }
        }
        .click_li_get {
          background-color: #fb4f4f;
          border: 0;
          color: #fff;
        }
        .click_li_nor {
          background-color: #fff;
          border: 1px solid #777;
          color: #777;
        }
      }
      span {
        display: block;
        text-align: center;
        color: #979797;
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
    .btn {
      width: 80%;
      background-color: #4892ff;
      margin: 0 auto;
      color: #fff;
      line-height: 35px;
      text-align: center;
      border-radius: 35px;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .sign_success {
      width: 25rem;
      border-radius: 8px;
      background-color: #fff;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 15px;
        font-family: "宋体";
        font-style: normal;
        position: absolute;
        top: 10px;
        right: 10px;
      }
      img {
        width: 60%;
        margin: -75px 0 20px 0;
      }
      h3 {
        color: #464646;
        font-size: 18px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        font-weight: 550;
        b {
          display: block;
          font-size: 35px;
          color: red;
          font-weight: 500;
        }
      }
      p {
        color: #979797;
        font-size: 12px;
        margin-bottom: 10px;
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
</style>
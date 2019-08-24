<template>
  <div :class="{'bgc':showcon}">
    <header :class="{'blur':!showactivity}">
      <a @click="goBack()" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1 v-if="state == 0">优惠大厅</h1>
      <h1 v-if="state == 1">可领取活动</h1>
      <router-link
        to="/Audit"
        style="position:absolute; right:5px; top:0; color:#fff; font-size:15px; line-height:40px;"
        v-if="(!userdata.isGuest)&&(!showcon)&&(userdata.isLogin)"
      >申请列表</router-link>
      <span
        @click="getPlan()"
        v-if="(!userdata.isGuest)&&(showcon)&&(userdata.isLogin)"
        style="position:absolute; right:5px; top:0; color:#fff; font-size:15px; line-height:40px;"
      >进度查询</span>
    </header>
    <!-- 弹窗 -->
    <div class="hint_mask" v-if="!showhint">
      <div class="hint">
        <p>提示</p>
        <p>{{hint}}</p>
        <p>
          <span @click="hidHint()">取消</span>
          <router-link to="pay" tag="span">去充值</router-link>
        </p>
      </div>
    </div>
    <!-- 活动规则弹窗 -->
    <transition>
      <div class="activity_mask" v-if="!showactivity">
        <div class="activity_box">
          <p>请勾选活动规则</p>
          <p>
            <input type="checkbox" id="hdgz" v-model="check" style="margin: 0 5px 3.5px 0">
            <label for="hdgz">
              <span>我已阅读并同意《活动规则》</span>
            </label>
          </p>
          <p>
            <span @click="hidActivity()">取消</span>
            <span @click="apply()">确定</span>
          </p>
        </div>
      </div>
    </transition>
    <!-- 活动详情 -->
    <div v-if="!showcon">
      <section>
        <img :src="bannerUrl" class="banner">
        <ul v-if="state == 0">
          <li v-for="item in content" :key="item.title">
            <i
              :class="{'hot' : item.isHot == 1,'new' : item.isNew == 1,'klq' : item.canApply == 1}"
            ></i>
            <div class="title">{{item.tiTle}}</div>
            <div class="detail">
              <span>{{item.summary}}</span>
              <a @click="showCon(item)">查看详情</a>
            </div>
          </li>
        </ul>
        <ul v-if="state == 1">
          <li v-for="item in content2" :key="item.title">
            <i
              :class="{'hot' : item.isHot == 1,'new' : item.isNew == 1,'klq' : item.canApply == 1}"
            ></i>
            <div class="title">{{item.tiTle}}</div>
            <div class="detail">
              <span>{{item.summary}}</span>
              <a @click="showCon(item)">查看详情</a>
            </div>
          </li>
        </ul>
        <div class="tips">
          <hr>
          <span class="t1">更多活动敬请期待</span>
        </div>
      </section>
    </div>
    <div v-if="showcon">
      <section class="details" :class="{'blur':!showactivity}">
        <div class="activity" :class="{'bot':num.type==2}">
          <div class="title">{{num.summary}}</div>
          <div class="tent activity_content" v-html="num.content"></div>
        </div>
        <aside>
          <input
            type="text"
            v-if="(num.type==2)&&(!userdata.isGuest)&&(userdata.isLogin)"
            placeholder="请输入申请域名"
            v-model="domain"
          >
          <div class="btn" @click="showActivity()" v-if="(num.openApply==1)&&(userdata.isLogin)">
            <i></i> 活动申请
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 0,
      bannerUrl: "",
      content: [],
      content2: [],
      showcon: false,
      showhint: true,
      showactivity: true,
      check: false,
      num: {},
      hint: "",
      domain: "",
      userdata: {
        isGuest: !!this.$getCookie("isGuest"),
        isLogin: !!this.$getCookie("username")
      }
    };
  },
  created() {
    this.state = this.$route.params["id"];
    this.getContent();
    this.bannerUrl = this.$route.query.url;
  },
  methods: {
    showCon(item) {
      this.showcon = true;
      this.num = item;
    },
    hidHint() {
      this.showhint = true;
    },
    hidActivity() {
      this.showactivity = true;
    },
    showActivity() {
      this.check = false;
      this.showactivity = !true;
    },
    getContent() {
      this.$loading.show();
      this.$http.post("/activity/getList", "").then(
        res => {
          this.content = res;
          this.content2 = this.content.filter(item => {
            return item.canApply == 1;
          });
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    getPlan() {
      this.$http
        .post("/activityRecord/get", { activityId: this.num.activityId })
        .then(
          res => {
            alert(res);
          },
          e => {}
        );
    },
    apply() {
      if (this.check === true) {
        this.hidActivity();
        this.$loading.show();
        this.$http
          .post("/activity/apply", {
            activityId: this.num.activityId,
            domain: this.domain
          })
          .then(
            res => {
              this.$loading.hide();
              if (res.redirectToPay == 1) {
                this.hint = res.msg;
                this.showhint = !true;
              } else {
                alert(res.msg);
              }
            },
            e => {
              this.$loading.hide();
            }
          );
      }
    },
    goBack() {
      if (this.showcon) {
        this.showcon = false;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.blur {
  filter: blur(4px);
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

section {
  padding-left: 12px;
  padding-right: 12px;
}

li {
  position: relative;
}

.new {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0;
  right: 0;
  background: url("../assets/icons/new.svg") no-repeat center;
  background-size: 100%;
}

.hot {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0;
  right: 0;
  background: url("../assets/icons/hot.svg") no-repeat center;
  background-size: 100%;
}

.klq {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0;
  right: 0;
  background: url("../assets/icons/Subtraction.svg") no-repeat center;
  background-size: 100%;
}

.banner {
  display: block;
  width: 100%;
  margin: 12px 0;
  border-radius: 10px;
}

ul > li {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 12px;
  padding: 14px;
}

.title {
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  font-weight: 800;
  color: #5d5d5d;
}

.detail {
  display: flex;
  align-items: center;
}

.detail span {
  color: #707070;
  padding-right: 15px;
  font-size: 12px;
  display: block;
  height: 40px;
  line-height: 20px;
  flex: 1;
  overflow: hidden;
}

.detail a {
  display: block;
  padding: 5px 10px;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  color: #fff;
  border-radius: 25px;
  width: 70px;
  text-align: center;
  height: 18px;
  line-height: 19px;
  font-size: 14px;
  margin-top: 22px;
}

.activity {
  background-color: #fff;
  padding: 0 1rem 6rem 1rem;
}

.activity.bot {
  padding: 0 1rem 9rem 1rem;
}
.activity .title {
  padding-bottom: 12px;
  font-size: 16px;
  font-weight: 900;
  border-bottom: 1px solid #e3e3e3;
  line-height: 26px;
  padding-top: 12px;
  color: #fb2351;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 1rem 0;
}
table td {
  border: 1px solid #9a9a9a;
  text-align: center;
  height: 32px;
  font-size: 14px;
  color: #707070;
}
.tent {
  line-height: 25px;
  font-size: 14px;
  color: #707070;
}

.tips {
  padding-bottom: 15px;
}
.tips .t1 {
  height: 16px;
  font-size: 12px;
  text-align: center;
  display: block;
  margin: 0 auto;
  margin-top: -16px;
  background: #f0eff5;
  width: 120px;
  line-height: 18px;
  color: #707070;
}
.tips hr {
  margin-top: 26px;
  width: 60%;
  color: #707070;
}

.bgc {
  background-color: #fff;
  height: 100vh;
}

.details {
  padding: 0;
}

.btn {
  width: 100%;
  line-height: 55px;
  color: #fff;
  font-size: 15px;
  letter-spacing: 3px;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn i {
  display: block;
  width: 40px;
  height: 40px;
  background: url("../assets/icons/hdsq.svg") no-repeat center;
}
aside {
  padding-top: 15px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
}

aside input {
  width: 97%;
  line-height: 30px;
  padding: 0 2rem;
  margin: 0 0 5px 5px;
  font-size: 14px;
  border: 1px solid #e0e6ec;
  border-radius: 5px;
}

.hint_mask,
.activity_mask {
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.1); */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hint,
.activity_box {
  border-radius: 10px;
  width: 70%;
  height: 13rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  overflow: hidden;
}

.hint p,
.activity_box p {
  color: #525151;
  font-size: 1.3rem;
}

.hint p:first-child {
  padding-top: 15px;
}

.activity_box p:first-child {
  line-height: 3rem;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  color: #fff;
}

.hint p:last-child,
.activity_box p:last-child {
  color: rgb(43, 151, 227);
  line-height: 35px;
  background-color: #eee;
  padding-top: 1px;
  display: flex;
  justify-content: space-between;
}

p:last-child span {
  background-color: #fff;
  width: 49.8%;
}

p:last-child span:active {
  background-color: rgb(243, 243, 243);
}
</style>

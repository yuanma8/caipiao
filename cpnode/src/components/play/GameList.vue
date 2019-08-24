<template>
  <div class="slidebox">
    <div class="slideTop">
      <img class="userIcon" :src="imgUrl">
      <p class="username">{{isGuest?'游客':username}}</p>
      <p class="userban">账户余额:{{balance}}</p>
    </div>
    <div class="slideContainer">
      <div class="title title1">我的关注</div>
      <ul>
        <li v-for="item in favList" @click="goPlay(item)" :key="item.lotteryId">{{item.lotteryName}}</li>
      </ul>
      <div class="title title2">热门彩种</div>
      <ul>
        <li v-for="item in hotList" @click="goPlay(item)" :key="item.lotteryId">{{item.lotteryName}}</li>
      </ul>
    </div>
    <div class="slideFooter">
      <div class="title title3" @click.stop="$router.push('/')">返回主页</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["balance"],
  data() {
    return {
      isGuest: !!this.$getCookie("isGuest"),
      imgUrl: this.$getCookie("headphoto"),
      username: this.$getCookie("username"),
      hotList: [],
      favArr: JSON.parse(this.$getCookie("favArr")) || [],
      favList: []
    };
  },
  created() {
    this.getAllList();
  },
  methods: {
    getAllList() {
      this.$http.post("lottery/info/all/1", "").then(res => {
        this.hotList = res.filter(item => item.isHot === 1);
        this.favList = res.filter(
          item => this.favArr.indexOf(item.lotteryId) >= 0
        );
      });
    },
    goPlay(item) {
      this.$router.push(
        `/play/${item.lotteryId}/${item.lotteryName}/${JSON.stringify(
          item.menuDetails
        )}`
      );
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.slidebox {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  z-index: 101;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transform: translateX(0%);
  > .slideTop {
    padding-top: 2rem;
    text-align: center;
    height: 12rem;
    background: linear-gradient(90deg, #ff4b3e, #fb2351);
    > .userIcon {
      display: block;
      margin: 0 auto;
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      border-radius: 2.5rem;
      overflow: hidden;
      border: 5px solid #fff;
    }
    > .username {
      margin-top: 1rem;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
    }
    > .userban {
      color: #fff;
      font-size: 14px;
    }
  }
  > .slideContainer {
    flex: 1;
    overflow-y: scroll;
    padding-left: 1rem;
    > ul > li {
      height: 4rem;
      line-height: 4rem;
      color: #999;
      text-align: center;
      font-size: 14px;
    }
  }
  > .slideFooter {
    padding-left: 1rem;
    height: 4rem;
  }
  .title {
    height: 40px;
    line-height: 40px;
    color: #fb2351;
    font-size: 14px;
    font-weight: 600;
    padding-left: 30px;
    &.title1 {
      background: url("../../assets/icons/myAtt.png") no-repeat left center;
      background-size: 1.8rem 1.8rem;
    }
    &.title2 {
      background: url("../../assets/icons/hotGame.png") no-repeat left center;
      background-size: 1.8rem 1.8rem;
    }
    &.title3 {
      background: url("../../assets/icons/backHome.png") no-repeat left center;
      background-size: 1.8rem 1.8rem;
    }
  }
}
</style>

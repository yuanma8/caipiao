<template>
  <div>
    <div class="listType">
      <a @click="listActive = 1" :class="{listActive:listActive===1}">热门彩种</a>
      <a @click="listActive = 2" :class="{listActive:listActive===2}">所有彩种</a>
      <a @click="listActive = 3" :class="{listActive:listActive===3}">我的关注</a>
    </div>

    <div class="indexList">
      <ul>
        <li
          class="lottery-item"
          v-for="item in filterList(listActive)"
          :key="item.lotteryId"
          @click="goPlay(item)"
        >
          <div :class="'pic pic'+item.lotteryId"></div>
          <div class="info">
            <h2>{{item.lotteryName}}</h2>
            <p>距离封盘：</p>
            <span>{{item.timeLeft>0?item.timeString:'已封盘'}}</span>
            <span
              class="fav"
              :class="{fav1:favArr.indexOf(item.lotteryId)>=0}"
              @click.stop="addFav(item.lotteryId)"
            ></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lotteryList"],
  data() {
    return {
      listActive: 2,
      favArr: JSON.parse(this.$getCookie("favArr")) || []
    };
  },
  methods: {
    // filter
    filterList(idx) {
      switch (idx) {
        case 1:
          return this.lotteryList.filter(item => item.isHot === 1);
        case 2:
          return this.lotteryList;
        case 3:
          return this.lotteryList.filter(
            item => this.favArr.indexOf(item.lotteryId) >= 0
          );
      }
    },
    addFav(id) {
      const idx = this.favArr.indexOf(id);
      if (idx >= 0) {
        this.favArr.splice(idx, 1);
      } else {
        this.favArr.push(id);
      }
      this.$setCookie(
        "favArr",
        JSON.stringify(this.favArr),
        1000 * 60 * 60 * 24 * 30
      );
    },
    // 跳转投注页
    goPlay(item) {
      this.$router.push({
        path: `/play/${item.lotteryId}/${item.lotteryName}/${JSON.stringify(
          item.menuDetails
        )}`
      });
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.listType {
  padding: 0;
  width: 100%;
  height: 4.5rem;
  display: flex;
  margin-right: -1.8rem;
}

.indexWarp .indexContent .listType a {
  font-size: 16px;
  line-height: 5.5rem;
  text-align: center;
  color: #999;
  flex: 1;
  border-bottom: 1px solid #f2f2f2;
}

.listActive {
  color: red !important;
  font-weight: 900;
  border-bottom: 5px solid red !important;
}

.indexList .fav {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  position: absolute;
  right: 2rem;
  bottom: 1.5rem;
  z-index: 10;
  background: url("../../assets/icons/fav2.svg");
  background-size: 100%;
  &.fav1 {
    background: url("../../assets/icons/fav1.svg");
  }
}

.indexList {
  background: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    border-bottom: 0.1rem solid #f2f2f2;
    width: 50%;
    position: relative;
    height: 7rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    &:nth-child(odd):after {
      position: absolute;
      right: 0;
      content: "";
      width: 0.1rem;
      height: 6.5rem;
      background: rgb(237, 240, 244);
    }
    &:nth-child(4n),
    &:nth-child(4n-1) {
      background: rgb(248, 249, 254);
    }
  }
  .pic {
    width: 30%;
    max-width: 5.4rem;
    height: 5.4rem;
    margin-right: 0.8rem;
    background-size: 100%;
  }
  .info {
    h2 {
      font-weight: normal;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 12px;
      color: #909090;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      color: red;
      font-size: 12px;
    }
  }
}
</style>

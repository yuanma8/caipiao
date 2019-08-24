<template>
  <div class="dialog-wrap">
    <div class="chips-wrap">
      <div class="chips-head">筹码设定</div>
      <div class="chips-body">
        <span
          v-for="(item,index) in allChips"
          :key="index"
          :class="{'active':clongTable.indexOf(item)>=0}"
          @click="addChip(item)"
        >
          {{item===10000?'1W':(item===50000?'5W':item)}}
          <i class="iconfont icon-yihaochouma"></i>
        </span>
      </div>
      <div class="chips-foot">
        <a @click="$parent.$data.showchips = false">取消</a>
        <a @click="changeChips()">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["chipsTable"],
  data() {
    return {
      // 筹码设定
      showchips: false,
      allChips: [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000],
      // 弹出筹码表
      clongTable: this.chipsTable.concat()
    };
  },
  methods: {
    addChip(i) {
      if (this.clongTable.indexOf(i) === -1) {
        this.clongTable.push(i);
        this.clongTable.shift();
      }
    },
    changeChips() {
      this.$parent.$data.chipsTable = this.clongTable.concat();
      this.$parent.$data.chipsTable.sort((a, b) => {
        return a - b;
      });
      this.$parent.$data.showchips = false;
    }
  }
};
</script>

<style lang='scss' type="text/scss" scoped>
.chips-wrap {
  width: 90%;
  > .chips-head {
    height: 3rem;
    background-color: #d91d37;
    color: #fff;
    line-height: 3rem;
    text-align: center;
  }
  > .chips-body {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 1rem;
    > span {
      display: block;
      width: 4rem;
      height: 4rem;
      margin: 0.5rem;
      position: relative;
      text-align: center;
      line-height: 4rem;
      color: #75797d;
      font-size: 2rem;
      font-weight: bold;
      > i {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 4rem;
        color: inherit;
      }
      &:nth-child(3),
      &:nth-child(4) {
        font-size: 1.8rem;
      }
      &:nth-child(5),
      &:nth-child(6),
      &:nth-child(9),
      &:nth-child(10) {
        font-size: 1.6rem;
      }
      &:nth-child(7),
      &:nth-child(8) {
        font-size: 1.2rem;
      }
      &:nth-child(1).active {
        color: #919800;
      }
      &:nth-child(2).active {
        color: #52b322;
      }
      &:nth-child(3).active {
        color: #e20073;
      }
      &:nth-child(4).active {
        color: #3dbaf0;
      }
      &:nth-child(5).active {
        color: #e03f39;
      }
      &:nth-child(6).active {
        color: #3dbaf0;
      }
      &:nth-child(7).active {
        color: #235cc7;
      }
      &:nth-child(8).active {
        color: #8b43aa;
      }
      &:nth-child(9).active {
        color: #74a507;
      }
      &:nth-child(10).active {
        color: #ae8420;
      }
    }
  }
  > .chips-foot {
    height: 4rem;
    padding: 0.5rem;
    display: flex;
    background-color: #eee;
    > a {
      display: block;
      flex-grow: 1;
      text-align: center;
      line-height: 3rem;
      font-size: 16px;
      color: #1d83d9;
      &:first-child {
        border-right: 1px solid #aaa;
      }
    }
  }
}
</style>

<template>
  <div id="detailpage">

    <header>
      <a @click="$router.go(-1)" class="return"><i class="iconfont icon-return"></i></a>
      <h1>实时稽核详情</h1>
    </header>
    <section>

      <ul>
        <li>
          <span>充值金额</span>
          <span style="color:#FB2351">{{obj.payMoney}}元</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>起始时间</span>
          <span>{{obj.beginTime}}</span>
        </li>
        <li>
          <span>结束时间</span>
          <span>{{obj.endTime||'至今'}}</span>
        </li>
        <li>
          <span>优惠金额</span>
          <span>{{obj.discountedMoney}}</span>
        </li>
        <li>
          <span>实际有效投注</span>
          <span>{{obj.betMoney}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>综合打码量</span>
          <span>{{obj.betMinMoney}}</span>
        </li>
        <li>
          <span>是否通过</span>
          <span>{{obj.discounStatus}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>常态打码量</span>
          <span>{{obj.regularBetMoney}}</span>
        </li>
        <li>
          <span>是否通过</span>
          <span>{{obj.regularStatus}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>是否扣除费用</span>
          <span style="color:#FB2351">{{obj.deFee}}</span>
        </li>
      </ul>
    </section>

  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      obj: ''
    };
  },
  mounted() {
    this.obj = this.$route.params.list;
    if (this.obj.regularStatus === 0) {
      this.obj.regularStatus = '否';
    } else {
      this.obj.regularStatus = '是';
    }
    if (this.obj.discounStatus === 0) {
      this.obj.discounStatus = '否';
    } else {
      this.obj.discounStatus = '是';
    }
  }
};
</script>

<style scoped="scoped">
  section {
    min-height: 100vh;
    background: #fff;
  }

  ul {
    margin: 1rem;
    background-color: #fff;
    padding-left: 1rem;
    border-bottom: 1px solid #ddd;
  }

  ul > li {
    display: flex;
    padding: 1rem 1rem 1rem 0;
    justify-content: space-between;
    align-items: center;
    position: relative;
    font-size: 12px;
    color: #666;
    font-weight: 600;

    /* border-bottom:1px solid #ddd; */
  }
</style>


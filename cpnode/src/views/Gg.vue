<template>
  <div>
    <header>
      <a @click="goBack()" class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>公告</h1>
    </header>
    <section>
      <ul class="common-list" v-if="!showDetail">
        <li v-for="item in notices" @click="show(item)" :key="item.title">
          <i class="notice"></i>
          <div class="content">
            <div class="tit">
              {{item.title}}
              <span>{{item.releaseTime.replace(/T/,' ').substring(0,19)}}</span>
            </div>
            <p>{{item.noticeContent}}</p>
          </div>
          <em></em>
        </li>
      </ul>
      <div class="detail" v-if="showDetail">
        <h2>{{detail.title}}</h2>
        <p>{{detail.noticeContent}}</p>
        <div class="detail-footer">
          <p>{{detail.releaseTime.replace(/T/, ' ').substring(0,19)}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      notices: [],
      showDetail: false,
      detail: {}
    };
  },
  created() {
    this.getNotices();
  },
  methods: {
    getNotices() {
      this.$loading.show("加载中");
      this.$http.post("/notice/find", { size: 10 }).then(
        res => {
          this.notices = res;
          this.$loading.hide();
        },
        e => {
          this.$loading.hide();
        }
      );
    },
    show(item) {
      this.showDetail = true;
      this.detail = item;
    },
    goBack() {
      if (this.showDetail) {
        this.showDetail = false;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
ul.common-list {
  background-color: #fff;
  padding: 0 1rem;
}
.content {
  height: 3.6rem;
  overflow: hidden;
}
.content div {
  position: relative;
  height: 2rem;
}
div.tit {
  line-height: 2rem;
}
.content div span {
  font-size: 12px;
  color: #666;
  position: absolute;
  right: 0;
}
.content p {
  font-size: 13px;
  color: #666;
  height: 1.6rem;
  line-height: 1.6rem;
}
.detail {
  padding: 1rem;
  background-color: #fff;
}
.detail h2 {
  line-height: 4rem;
}
.detail-footer {
  padding-top: 2rem;
  text-align: right;
}

</style>
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import axios from "axios";
import api from "./api.js";
export default {
  created() {
    let i = 0;
    for (const item of api.cdnList) {
      this.$http.get(item + "/system/testSpeed").then(
        res => {
          i += 1;
          if (i === 1) {
            axios.defaults.baseURL = item;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style lang="scss" type="text/scss">
/*ali图标*/
@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_531621_t75k6qvqv1.ttf") format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-return:before {
  content: "\e604";
}

.icon-shuaxin:before {
  content: "\e7d3";
}

.icon-jilu01:before {
  content: "\e630";
}

.icon-liaotian1:before {
  content: "\e7e3";
}

.icon-jiantou:before {
  content: "\e60f";
}

.icon-qingchu:before {
  content: "\e67d";
}

.icon-biyan:before {
  content: "\e617";
}

.icon-youxiang:before {
  content: "\e645";
}

.icon-unionpay:before {
  content: "\e60c";
}

.icon-quanping:before {
  content: "\e622";
}

.icon-shangxin:before {
  content: "\e640";
}

.icon-jilu:before {
  content: "\e671";
}

.icon-jiantou1:before {
  content: "\e608";
}

.icon-chilun:before {
  content: "\e658";
}

.icon-liaotian:before {
  content: "\e626";
}

.icon-zoushi:before {
  content: "\e62b";
}

.icon-chongzhi:before {
  content: "\e600";
}

.icon-scanpay:before {
  content: "\e633";
}

.icon-xiaoxi:before {
  content: "\e627";
}

.icon-X:before {
  content: "\e66e";
}

.icon-mima:before {
  content: "\e618";
}

.icon-zhengyan:before {
  content: "\e665";
}

.icon-guanyu:before {
  content: "\e601";
}

.icon-gold:before {
  content: "\e714";
}

.icon-dengdai:before {
  content: "\e634";
}

.icon-chongzhi1:before {
  content: "\e605";
}

.icon-zhongjiang:before {
  content: "\e635";
}

.icon-003:before {
  content: "\e724";
}

.icon-alipay:before {
  content: "\e60a";
}

.icon-shouji:before {
  content: "\e67b";
}

.icon-wenti:before {
  content: "\e6b0";
}

.icon-onlinepay:before {
  content: "\e606";
}

.icon-weibiaoti-:before {
  content: "\e611";
}

.icon-gonggao:before {
  content: "\e673";
}

.icon-tixian:before {
  content: "\e625";
}

.icon-qianbao:before {
  content: "\e602";
}

.icon-yihaochouma:before {
  content: "\e607";
}

.icon-rule:before {
  content: "\e621";
}

.icon-shuoming:before {
  content: "\e707";
}

.icon-jieguo:before {
  content: "\e641";
}

.icon-tixian1:before {
  content: "\e61b";
}

.icon-trend:before {
  content: "\e603";
}

.icon-mf-dingdanbeizhu:before {
  content: "\e610";
}

.icon-yunshanfu:before {
  content: "\e628";
}

.icon-zhuanzhang:before {
  content: "\e612";
}

body,
div,
ol,
dl,
dt,
dd,
ul,
li,
table,
tr,
td,
h1,
h2,
h3,
h4,
h5,
h6,
p,
form,
input,
button,
img,
strong,
em,
section {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
}

li,
dd,
dt {
  list-style-type: none;
}

ol,
ul,
dl {
  list-style: none;
}

a {
  color: #231f20;
  text-decoration: none;
  outline: 0;
}

::-webkit-input-placeholder {
  color: #ccc;
}

input,
select,
option,
button,
textarea {
  font-size: 100%;
  vertical-align: middle;
  outline: 0 none;
  border: none;
}

html {
  font-size: 12px;
}

@media (max-width: 360px) {
  html {
    font-size: 10px;
  }
}

body {
  background-color: #f0eff5;
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

/*头部统一样式*/
header {
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  text-align: center;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
}

header > h1 {
  line-height: 40px;
  font-size: 15px;
  font-weight: normal;
  color: #fff;
  text-align: center;
}

header > .return {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

header > .return > i {
  color: #fff;
  font-size: 2rem;
}

section {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

section.has-bottom {
  padding-bottom: 4rem;
}
/*banner*/
.swiper-container {
  border-radius: 5px;
}
.swiper-pagination-bullet-active {
  background-color: #dc1651;
}
/*列表统一样式*/
.common-list li {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  color: #48484c;
  font-size: 1.4rem;
  border-bottom: 1px solid #e3e3e3;
  background-color: #fff;
}

.common-list li:last-child {
  border: 0;
}

.common-list li .content {
  display: block;
  flex: 1;
  font-size: 14px;
}

.common-list li .icon-jiantou {
  font-size: 15px;
  color: #ccc;
}

.padding {
  padding-left: 5px;
  padding-right: 5px;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  padding: 0 20px;
  background-color: #fff;
}

.common-button {
  display: block;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  color: #fff;
  font-size: 15px;
}
/*轮播组件*/
.banner img {
  vertical-align: top;
  width: 100%;
}

.my-swipe .mint-swipe-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.my-swipe .mint-swipe-indicator {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: 0.2;
  margin: 0 3px;
}

.my-swipe .mint-swipe-indicator.is-active {
  background: #dc1651;
  opacity: 0.86;
}
/*弹出层样式*/
.dialog-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dice {
  border-radius: 0 !important;
  background-color: transparent !important;
}

.dice1 {
  background: url("./assets/dice/dice1@2x.png");
  background-size: 100%;
}

.dice2 {
  background: url("./assets/dice/dice2@2x.png");
  background-size: 100%;
}

.dice3 {
  background: url("./assets/dice/dice3@2x.png");
  background-size: 100%;
}

.dice4 {
  background: url("./assets/dice/dice4@2x.png");
  background-size: 100%;
}

.dice5 {
  background: url("./assets/dice/dice5@2x.png");
  background-size: 100%;
}

.dice6 {
  background: url("./assets/dice/dice6@2x.png");
  background-size: 100%;
}

/*彩种logo*/
.pic {
  width: 4.4rem;
  height: 4.4rem;
  margin-right: 1rem;
  background: url("./assets/default_icon@2x.png") no-repeat center;
  background-size: 100%;
}

.pic50 {
  background-image: url("./assets/czImg/logo_50.png");
}

.pic55 {
  background-image: url("./assets/czImg/logo_55.png");
}

.pic66 {
  background-image: url("./assets/czImg/logo_66.png");
}

.pic1 {
  background-image: url("./assets/czImg/logo_1.png");
}

.pic4 {
  background-image: url("./assets/czImg/logo_4.png");
}

.pic5 {
  background-image: url("./assets/czImg/logo_5.png");
}

.pic65 {
  background-image: url("./assets/czImg/logo_65.png");
}

.pic10 {
  background-image: url("./assets/czImg/logo_10.png");
}

.pic11 {
  background-image: url("./assets/czImg/logo_11.png");
}

.pic12 {
  background-image: url("./assets/czImg/logo_12.png");
}

.pic13 {
  background-image: url("./assets/czImg/logo_13.png");
}

.pic14 {
  background-image: url("./assets/czImg/logo_14.png");
}

.pic15 {
  background-image: url("./assets/czImg/logo_15.png");
}

.pic70 {
  background-image: url("./assets/czImg/logo_70.png");
}

.pic80 {
  background-image: url("./assets/czImg/logo_80.png");
}

.pic81 {
  background-image: url("./assets/czImg/logo_81.png");
}

.pic82 {
  background-image: url("./assets/czImg/logo_82.png");
}

.pic83 {
  background-image: url("./assets/czImg/logo_83.png");
}

.pic84 {
  background-image: url("./assets/czImg/logo_84.png");
}

.pic85 {
  background-image: url("./assets/czImg/logo_85.png");
}
.pic86 {
  background-image: url("./assets/czImg/logo_86.png");
}
.pic87 {
  background-image: url("./assets/czImg/logo_87.png");
}
.pic88 {
  background-image: url("./assets/czImg/logo_88.png");
}
.pic89 {
  background-image: url("./assets/czImg/logo_89.png");
}
.pic90 {
  background-image: url("./assets/czImg/logo_90.png");
}
.pic91 {
  background-image: url("./assets/czImg/logo_91.png");
}
.pic92 {
  background-image: url("./assets/czImg/logo_92.png");
}
.pic93 {
  background-image: url("./assets/czImg/logo_93.png");
}
.pic94 {
  background-image: url("./assets/czImg/logo_94.png");
}
.pic95 {
  background-image: url("./assets/czImg/logo_95.png");
}

.activity_content table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 1rem 0;
}
.activity_content table td {
  border: 1px solid #9a9a9a;
  text-align: center;
  height: 32px;
  font-size: 14px;
  color: #707070;
}
.activity_content a {
  color: #ff4b3e;
}

.activity_content img {
  max-width: 100%;
}
</style>

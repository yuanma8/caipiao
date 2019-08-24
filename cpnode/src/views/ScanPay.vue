<template>
  <div>
    <header>
      <a @click="$router.go(-1)"  class="return">
        <i class="iconfont icon-return"></i>
      </a>
      <h1>扫码支付</h1>
    </header>
    <section>
      <div class="wx-card">
        <div class="header">长按二维码保存到相册</div>
        <div class="body">
          <img :src="url" alt="正在加载二维码">
        </div>
        <div class="footer">
          <i></i>扫码支付二维码
        </div>
      </div>
    </section>
  </div>
</template>
<script>
	import axios from "../http";
	import api from "../api.js";
export default {
  data() {
    return {
      url: "",
    amount: this.$route.params.amount,
		pay:this.$route.params.pay,
		constData: {
		  username: this.$getCookie("username"),
		  url: api.payApi,
		  apikey: "EAED40601BEE463AABCF13CAA36AC1AF",
		  comid: this.$getCookie("comid"),
		  clientip: "47.91.252.160",
		  version: "1.0"
		}
		};
  },
  created() {
  this.subpay();
		this.geturl();		
  },
  methods: {
    geturl() {
    //  this.url = this.$route.query.url;		
		axios.post(this.constData.url + "/getqrcode",{ 
		  withCredentials: true  //打开cookie
		}).then(
		  res => {
		    if (res["IsSuccess"] === true) {
		    this.url=res["Data"];
		    } 
			  if (!!this.url){
						window.clearInterval(this.timer);
					
				}else{
					this.timer = setInterval(() => {				
							window.clearInterval(this.timer);
							this.geturl();							
					}, 2000);	
				}
			
		  },
		  e => {
		    this.$loading.hide();
		  }
		);
    },
		subpay(){
			 const time = new Date()
			  .getTime()
			  .toString()
			  .substr(0, 10);
			const body = {
			  Amount: this.amount,
			  ApiKey: this.constData.apikey,
			  ClientIp: this.constData.clientip,
			  CompanyID: this.constData.comid,
			  LoginName: this.constData.username,
			  PayID: this.pay["ID"],
			  ReceiptsPostScript: this.pay["ScriptSpan"],
			  TimeStamp: time,
			  type: this.pay["Type"]
			};
			this.$loading.show("提交中");
			axios.post(this.constData.url + "/PaymentScanPay", body,{ 
			  withCredentials: true  //打开cookie
			}).then(
			  res => {
			    if (res["IsSuccess"] === true) {
			      this.$loading.hide();
			   //   this.$alert.show('提交订单成功!');
			    //  this.$router.go(-1);
			    } else {
			      this.$loading.hide();
			      this.$alert.show(res["Message"]);
			    }
			  },
			  e => {
			    this.$loading.hide();
			  }
			);
		}
  }
};
</script>


<style scoped>
section {
  padding: 10rem 3rem 0 3rem;
}

.wx-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.header {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  margin: 0 10px;
  border-bottom: 1px solid #eee;
}

.body img {
  display: block;
  width: 70%;
  margin: 3rem auto;
}

.footer {
  height: 50px;
  line-height: 50px;
  background: linear-gradient(90deg, #ff4b3e, #fb2351);
  color: #fff;
  font-size: 16px;
}

.footer i {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url("../assets/icons/wx.svg") no-repeat center;
  background-size: 100% auto;
  vertical-align: middle;
  margin-right: 1rem;
}
</style>

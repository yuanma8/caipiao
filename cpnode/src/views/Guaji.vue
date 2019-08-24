<template>
	<div>
		<header>
			<h1>{{lotteryName}}</h1>
		</header>
		<section>
			<OpenInfo :lottery-id="lotteryId" :lottery-main="lotteryMain"></OpenInfo>
			<div class="top">
				<div class="balance">
					<div>
						<p> <span>挂机用户：</span>{{username}}</p>
					</div>
					<div>
						<p> <span>
								余额刷新<i class="refresh" @click="getBalance()"></i>
							</span>{{balance}} </p>
					</div>
				</div>
			</div>

			<div class="personalinfo">
				<a @click="botstart('/pay')">
					激活状态：
					<span>{{botinfo.activeshow}}</span>
				</a>
				<a @click="logout('/withdraw')">
					<span>退出</span>
				</a>
			</div>
			<div class="botinfo">
				<div>
					<p>请选择挂机档位：</p>
					<div v-show="danshow">
						<select class="select" name="public-choice" v-model="danSelected" @change="getdanSelected">
							<option :value="dan.name" v-for="dan in danList">{{dan.name}}</option>
						</select>
					</div>
				</div>
			</div>
			<div class="botinfo">
				<div>
					<div v-show="danshow2">
						<p>挂机档位： <span>{{botinfo.danwei}}</span></p>
					</div>
					<p>今日盈亏： <span>{{botinfo.yingkui}}</span></p>
					<p>最大连中： <span>{{botinfo.lianzhong}}</span></p>
					<p>最大连挂： <span>{{botinfo.liangua}}</span></p>
					<p>等待开奖： <span>{{botinfo.kaijiang}}</span></p>
					<p>当前挂机状态：<span>{{botinfo.start}}</span></p>
				</div>
			</div>
			<a class="start-btn" @click="botstart()">{{startbtn}}</a>

			<div class="botinfo">
				<div>
					<p>方案一：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.one}}</span></p>
					<p>方案二：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.two}}</span></p>
					<p>方案三：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.three}}</span></p>
					<p>方案四：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.four}}</span></p>
					<p>方案五：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.five}}</span></p>
					<p>方案六：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.six}}</span></p>
					<p>方案七：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.seven}}</span></p>
					<p>方案八：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.eight}}</span></p>
					<p>方案九：<span>期号：[{{lotteryMain.curPeriodNum}}]</span> <span>{{strategy.nine}}</span></p>
					<p>方案十：<span>期号：[{{lotteryMain.curPeriodNum}}] </span> <span>{{strategy.ten}}</span></p>
				</div>
			</div>
		</section>



	</div>
</template>
<script>
	import OpenInfo from "../components/play/OpenInfo.vue";
export default {
  data() {
		return {
    danList:[{name: '100档(试用)'},{name: '500档'},{name: '1000档'},{name: '2000档'},{name: '5000档'},{name: '10000档'},{name: '50000档'},{name: '100000档'}],
	moneyList:[{money: 100},{money: 500},{money: 1000},{money: 2000},{money: 5000},{money: 10000},{money: 50000},{money: 100000}],
	danshow:true,
	danshow2:false,
	botactive:0,
    lotteryName: "北京赛车pk10辅助投注",
    lotteryId: "50",
    startbtn:"开始挂机",
    username: this.$getCookie("botname"),
    strategy: {one:"",two:"",	three:"",	four:"",five:"",six:"",	seven:"",	eight:"",	nine:"",ten:""},
    balance: "",
	nextbet:0,
    date1:"",
	casting:0,
	lotteryMain: {
        lotteryName: "北京赛车pk10",
        curPeriodNum: 100,
        openNum: [0, 0, 0, 0, 0],
        openResult: {
          openPeriod: "",
          zodiac: "",
          resultColor: ""
        }
    },
	botinfo: {
		danindex:0,
		activeshow:"未知",
		danwei:"",
		yingkui: "-",
		lianzhong: "-",
	    liangua: "-",
		kaijiang:"-",
		start:"未挂机",
		percentage:"10"
	},
      orderList: []
    };
  },
  created() {
   	  this.geturl();
	this.botreg();
    this.getBalance(); 
	this.danSelected = this.danList[0].name;
    this.getList(this.lotteryId);

  },
  beforeDestroy() {
    window.clearTimeout(this.timer1);
    window.clearInterval(this.timer);
  },

methods: {
 geturl() {
     if (!!this.$route.query.username){
	  this.username = this.$route.query.username;
	  }
    },
	bet() {
		if (parseInt(this.balance) <= 0) {
			this.$alert.show("余额不足,没办法下注!");
			return;
		}

		let i = 0;
		//console.log("openResult.openPeriod:"+this.lotteryMain.openNum[i]);
		let n1;
		if (i == 10) {
			n1 = "20";
		} else {
			n1 = "1" + (i + 1).toString();
		}
		this.strategy= {one:"",two:"",	three:"",	four:"",five:"",six:"",	seven:"",	eight:"",	nine:"",ten:""};
		open = this.lotteryMain.openNum[i];
		
		if (open > 5) {
			this.casting = this.shu(1);
			this.strategy.one = "大";
			this.cast(n1, this.casting);
		} else {
			this.casting = this.shu(2);
			this.strategy.one = "小";
			this.cast(n1, this.casting);
		}
		if (open % 2 != 0) {
			this.casting = this.shu(3);
			this.strategy.one = this.strategy.one + "单";
		//	this.cast(n1, this.casting);
		} else {
			this.casting = this.shu(4);
			this.strategy.one = this.strategy.one + "双";
		//	this.cast(n1, this.casting);
		}
		if (i < 5) {
			if (this.lotteryMain.openNum[i] > this.lotteryMain.openNum[9 - i]) {
				this.casting = this.shu(5);
				this.strategy.one = this.strategy.one + "龙";
		//		this.cast(n1, this.casting);
			} else {
				this.casting = this.shu(6);
				this.strategy.one = this.strategy.one + "虎";
		//		this.cast(n1, this.casting);
			}
		}
		var betm=this.moneyList[this.botinfo.danindex].money*0.1;
		//this.strategy.one = Math.floor(Math.random() * 10);
		this.strategy.two =1+ Math.floor(Math.random() * betm);
		this.strategy.three =1+ Math.floor(Math.random() * betm);
		this.strategy.four = 1+Math.floor(Math.random() * betm);
		this.strategy.five =1+ Math.floor(Math.random() * betm);
		this.strategy.six =1+ Math.floor(Math.random() * betm);
		this.strategy.seven =1+ Math.floor(Math.random() * betm);
		this.strategy.eight =1+ Math.floor(Math.random() * betm);
		this.strategy.nine =1+ Math.floor(Math.random() * betm);
		this.strategy.ten =1+ Math.floor(Math.random() * betm);

	},
	shu(s){
	
	switch(this.nextbet) {
     case 2: //lost
       if ((s % 2)==0) {
		 s=s-1;		
		 }else{
		 s=s+1;		
	    };
	 
        break;
     case 1: //win
    
        break;
     case 0: //random
		 s=1+Math.floor(Math.random()*6);
		 break;
     //default:
       // 默认代码块
     } 
	return "0"+s.toString();  
	},
	cast(n1,casting) {
		const body = {
			PeriodNumber: this.lotteryMain.openResult.openPeriod,
			data: []
		};
		let playId = "50"+n1+casting;

		body.data.push({
			money: this.moneyList[this.botinfo.danindex].money*0.01,
			playId: playId,
			betInfo: "投注",
			username:this.username
		});
		body.data = JSON.stringify(body.data);
		this.$loading.show("提交中");
		this.$http.post("/order/yingkui/", body, {
			withCredentials: true //打开cookie
		}).then(
			res => {
	           // var percentage = parseFloat(res["percentage"]);						
				this.botinfo.yingkui = res["yingkui"];
				this.botinfo.lianzhong = res["lianzhong"];
				this.botinfo.liangua = res["liangua"];
				this.botinfo.kaijiang = res["kaijiang"];
				var percentage=Math.round((this.botinfo.yingkui/this.moneyList[this.botinfo.danindex].money) * 10000) / 100.00;
				if (percentage>this.botinfo.percentage ){
						this.nextbet=2;		//lost	
								}else  if (percentage<8){
					this.nextbet=1;	         //win
				} else{
				this.nextbet=0;		//random
				}
				this.$loading.hide();
				this.$loading.show("投注成功!");
			},
			e => {
				this.$loading.hide();
			}
		);
	},
	botonline() {		

	this.$http.post("/user/botonline",{
			username: this.username
		}, {
			withCredentials: true //打开cookie
		}).then(
			res => {
	           // var percentage = parseFloat(res["percentage"]);						
				var botonline = res["botonline"];
	           if (botonline==0){
				this.$loading.hide();
				this.$router.push('/botin');
			this.$alert.show("您已下线，请确定您是否已授权，或联系外挂开发商!");	   
		
			   }
			
			},
			e => {
				this.$loading.hide();
			}
		);
	},
	// 开奖	
	getList(id) {
		this.$http.post("/lottery/info/" + id, "", {
			withCredentials: true //打开cookie
		}).then(
			res => {
				window.clearTimeout(this.timer1);
				window.clearInterval(this.timer);
				if (
					(res["lotteryInfo"]["curPeriodNum"] - 1).toString() !==
					res["lotteryInfo"]["openResult"]["openPeriod"]
				) {
					this.timer1 = setTimeout(() => {
						this.getList(id);
					}, 4053);
				}
				this.lotteryMain = res.lotteryInfo;
				this.orderList = res.orderList;
				// 处理开奖号码
				this.lotteryMain.openNum = this.lotteryMain["openResult"]["opencode"]
					.split(/[+,]/)
					.map(Number);
				//计算和值
				if (
					this.lotteryId === "50" ||
					this.lotteryId === "81" ||
					this.lotteryId === "80" ||
					this.lotteryId === "55" ||
					this.lotteryId === "88" ||
					this.lotteryId === "89" ||
					this.lotteryId === "92" ||
					this.lotteryId === "93"
				) {
					this.lotteryMain.total =
						this.lotteryMain.openNum[0] + this.lotteryMain.openNum[1];
				} else {
					this.lotteryMain.total = this.lotteryMain.openNum.reduce(
						(prev, next) => prev + next
					);
				}

				//倒计时
				const timeLeft =
					this.lotteryMain.remainTime -
					this.lotteryMain.sysTime -
					this.lotteryMain.blockTime;
				this.$set(this.lotteryMain, "timeLeft", timeLeft);
				this.$set(this.lotteryMain, "timeString", this.$countdown(timeLeft));
				this.timer = setInterval(() => {
					this.lotteryMain.timeLeft--;
					this.lotteryMain.timeString = this.$countdown(
						this.lotteryMain.timeLeft
					);
					if (
						this.lotteryMain.remainTime > 0 &&
						this.lotteryMain.timeLeft < -this.lotteryMain.blockTime
					) {
						window.clearInterval(this.timer);
						this.getList(id);
						if (this.botinfo.start == "已挂机") {
							this.bet();
							this.botonline();
						}
					}
				}, 1000);
			},
			err => {
				console.log(err);
			}
		);
	},
	botreg() {
			var date1=new Date();			
			this.date1=date1.getTime();
		this.$http.post("/user/botinfo", {
			username: this.username
		}, {
			withCredentials: true //打开cookie
		}).then(
			res => {
				let botactive = res["botactive"];
				if (botactive > 0) {
					this.botactive =parseInt(botactive);				
				this.botinfo.activeshow=this.danList[this.botactive].name;
				}
				this.botinfo.percentage = res["percentage"];
			},
			err => {}
		);
	},
	// 获取余额
	getBalance() {

		this.$http.post("/user/yuer", {
			username: this.username
		}, {
			withCredentials: true //打开cookie
		}).then(
			res => {
				this.balance = res["accountBalanceStr"];
			},
			err => {}
		);
	},
	botstart() {
	 this.botonline();
		if (this.startbtn == "开始挂机") {
			this.danshow = false;
			this.danshow2 = true;
			//var date1=new Date("2019-07-06 17:40:00");
			var date1=new Date();			
			this.date1=date1.getTime();
			this.botinfo.danwei=this.danList[this.botinfo.danindex].name;			
			this.botinfo.start = "已挂机";
			this.startbtn = "停止挂机";
	   this.bet();
		} else {
			this.danshow = true;
			this.danshow2 = false;
			this.botinfo.start = "未挂机";
			this.startbtn = "开始挂机";
		}

	},
	logout() {
		if (confirm('确定退出?')) {
			this.$router.push('/botin');
		} else {
			return
		}
	},
	getdanSelected() {
		this.botinfo.danwei = this.danSelected;
		for (var i=0;i<this.danList.length;i++){
			if (this.botinfo.danwei==this.danList[i].name){
					this.botinfo.danindex=i;					
			}
	
		}
		console.log("chose:"+this.botinfo.danindex);
		if (this.botinfo.danindex>this.botactive){
			this.botinfo.danwei=this.danList[this.botactive].name;
			this.botinfo.danindex=this.botactive;
				this.$alert.show('您暂时还没有激活这个档位！');
		}
	}
},
  components: {
    OpenInfo,
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
	.shadow {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
header {
  
}

section {
//  display: flex;
 // flex-direction: column;
 //flex-wrap: wrap;
	// height: 100vh;
}
.top {
//  display: flex;
  height: 4rem;
  border-bottom: 1px solid #fbfdea;
  background-color: #f1f1f1;
   a {
    display: block;
    flex-grow: 1;
    text-align: center;
    line-height: 4rem;
    color: #616161;
    font-size: 14px;
    border-right: 1px solid #fbfdea;
    &.active {
      color: #d91d37;
      font-weight: 900;
      border-bottom: 2px solid #d91d37;
    }
  }
}
.botinfo {
    padding: 1rem 0;
    display: flex;
    position: relative;
    border-bottom: 1px solid #e3e3e3;
    div {
      flex: 1;
      text-align: left;
      p {
        font-size: 14px;
        color: #222299;
        height: 1.8rem;
        font-weight: bold;
      }
      span {
        color: #ee1450;
        font-size: 14px;
      }
 
    }
 
 }
.select{
 display: block;
	border: solid 0px #fff;
	background-color: #222266;
	margin-right: 30px;
	color:#aaffaa;
	font-size: 18px;
	width: 100%;
}

.personalinfo {
    position: relative;
    background: #fff;
    display: flex;
    &:before {
      width: 0.1rem;
      height: 60%;
      content: "";
      background: #e3e3e3;
      position: absolute;
      left: 50%;
      top: 20%;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 11;
      height: 4.3rem;
      line-height: 4.3rem;
      text-align:left;
      font-size: 14px;
      font-weight: bold;   
			color: #220000;
     span {
       color: #ff0000;
       font-size: 14px;
     }
    }
  }
	.start-btn {
	  display: block;
	  width: 60%;
	  height: 3rem;
	  line-height: 3rem;
	  background-color: #22aa22;
	  border-radius: 4px;
	  text-align: center;
	  color: #ffffff;
	  margin: 3rem auto;
	  font-size: 16px;
	}
	 .balance {
	  padding: 1rem 0;
	  display: flex;
	  position: relative;
	  border-bottom: 1px solid #e3e3e3;
	  div {
	    flex: 1;
	    text-align: center;
	    p {
	      font-size: 14px;
	      color: #ff0000;
	      height: 1.8rem;
	      font-weight: bold;
	    }
	    span {
	      color: #48484c;
	      font-size: 12px;
	    }
	    .refresh {
	      display: inline-block;
	      width: 10px;
	      height: 10px;
	      background: url("../assets/icons/refresh.svg") no-repeat center;
	      background-size: cover;
	    }
	  }
	  &:before {
	    display: block;
	    width: 0.1rem;
	    height: 2.3rem;
	    content: "";
	    background: #e3e3e3;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-top: -0.8rem;
	  }
	}
</style>

const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'qwadmin'
});


module.exports = () => {
	const route = express.Router();
	route.get('/home', (req, res) => {
		//getHomeDatas(getHomeStr, res);
	});

	function showkeys(obj) {
		Object.keys(obj).forEach(function(key) {
			console.log(key, obj[key]);
		});
	}
	route.post('/activity/avaCount', function(req, res) {
		//两种都可以
		res.json({
			"IsSuccess": true,
			"StatusCode": 0,
			"unReadMsgCount": 1,
			"avaActivityCount": 1
		});

	});
	route.post('/moneyDetail/find/:id', function(req, res) {
		//两种都可以
		let username = req.session.username;
		var id = req.params.id;
		findlist = req.body;
		var startDate = findlist.startDate;
		var endDate = findlist.endDate;
		var page = findlist.page;
		var type=parseInt(findlist.type);
		console.log(type);
		if (type == -1) {
			var dsql =
				`SELECT * FROM cp_moneydetails where username='${username}'  and createdTime>'${startDate}' and createdTime<='${endDate}' order by createdTime desc limit 0,20 `;
		} else
			var dsql =
				`SELECT * FROM cp_moneydetails where username='${username}' and type="${type}" and createdTime>'${startDate}' and createdTime<='${endDate}' order by createdTime desc limit 0,20`;
		console.log(dsql);

		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				var djson = [];
				var walletList = [];
				for (i = 0; i < data.length; i++) {
					walletList[i] = {

						"type": data[i].type,
						"description": data[i].description,
						"createdTime": data[i].createdTime,
						"moneyStr": data[i].moneyStr
					};
				}
				djson = {
					"money": "0.00",
					"moneyFreeze": "0.00",
					"moneyUsable": "0.00",
					"walletList": walletList
				}
				res.json({
					"code": 200,
					"data": djson
				});
				//res.send(dataw).end();					
			}

		});


	});
	route.post('/notice/find', function(req, res) {
		var djson = [{
			"companyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"createBy": "DDfeiyu",
			"createTime": "2019-06-23T14:26:29.403",
			"id": "a0cfff593b02479c9fc4f5a842d80c25",
			"noticeContent": "                   APP维护完成↵尊敬的好运会员：为了给会员更好的游戏体验，我们好运网投【苹果】APP于今日进行短暂的维护升级，现在已经维护完成，请各位会员卸载后重新安装，相信大家会有一个更流畅和简便的操作体验！！！（安装之后，点击 设置---通用----设备管理----信任，即可开始游戏）↵↵                                                            www.abc.com",
			"noticeStatus": 2,
			"noticeType": 1,
			"releaseBy": "DDfeiyu",
			"releaseTime": "2019-06-23T14:34:17.147",
			"remark": null,
			"title": "苹果APP升级完成"
		}, {
			"companyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"createBy": "admin",
			"createTime": "2019-06-23T14:26:29.403",
			"id": "a0cfff593b02479c9fc4f5a842d80c25",
			"noticeContent": " ※温馨提示※↵↵，请勿保存支付。存款前首先请您刷新网页核对网页现有财务账号、收款二维码，以页面显示最新的存款账号、二维码为准，公司账号是不定时更换的，请勿保存旧的财务账号以及收款二维码导致存款失误，避免您的财产损失，感谢您的配合与支持 谢谢！！↵                                                              ↵",
			"noticeStatus": 2,
			"noticeType": 1,
			"releaseBy": "admin",
			"releaseTime": "2019-06-23T14:34:17.147",
			"remark": null,
			"title": "财务公告"
		}];

		res.json({
			"code": 200,
			"data": djson
		});

	});
	route.get('/adver/find/1', function(req, res) {
		var imagelist = [{
			"imageUrl": "https://images.budiaodanle.com/Pic/190612/13/315f52be49a54b7aaabb.jpg",
			"jumpUrl": null,
			"remark": "※⑥月大顺 ⑥到飞起※",
			"sort": 1
		}, {
			"imageUrl": "https://images.budiaodanle.com/Pic/190612/13/d349eec1b92547c58181.jpg",
			"jumpUrl": null,
			"remark": "※星耀大地行※",
			"sort": 2
		}];
		var djson = {
			"imageList": imagelist,
			"personNum": "156134"
		};
		res.json({
			"code": 200,
			"data": djson
		});

	});
	route.get('/system/testSpeed', function(req, res) {
		var djson = {
			"personNum": "156134"
		};
		res.json({
			"code": 200,
			"data": djson
		});

	});

	route.get('/system/bank/list', function(req, res) {
		var djson = [{
				bankName: "北京农村商业银行",
				bankCode: "BRCB",
				icon: null,
				sort: 5650
			},
			{
				bankName: "北京银行",
				bankCode: "BOB",
				icon: "image/bank/bob.png",
				sort: 6
			},
			{
				bankName: "成都农商银行",
				bankCode: "CDNS",
				icon: null,
				sort: 5680
			},
			{
				bankName: "成都银行",
				bankCode: "CDYH",
				icon: null,
				sort: 5690
			},
			{
				bankName: "大连银行",
				bankCode: "BOD",
				icon: null,
				sort: 5620
			},
			{
				bankName: "福建农商银行",
				bankCode: "FJNS",
				icon: null,
				sort: 5670
			},
			{
				bankName: "赣州银行",
				bankCode: "GZYH",
				icon: null,
				sort: 5780
			},
			{
				bankName: "工商银行",
				bankCode: "ICBC",
				icon: null,
				sort: 5410
			},
			{
				bankName: "光大银行",
				bankCode: "CEB",
				icon: "image/bank/ceb.png",
				sort: 6
			},
			{
				bankName: "广发银行",
				bankCode: "GDB",
				icon: null,
				sort: 5530
			},
			{
				bankName: "桂林银行",
				bankCode: "GLYH",
				icon: null,
				sort: 5820
			},
			{
				bankName: "哈尔滨银行",
				bankCode: "HBB",
				icon: null,
				sort: 5640
			},
			{
				bankName: "河北银行",
				bankCode: "HBYH",
				icon: null,
				sort: 5850
			},
			{
				bankName: "葫芦岛银行",
				bankCode: "BOH",
				icon: null,
				sort: 5630
			},
			{
				bankName: "华夏银行",
				bankCode: "HXB",
				icon: "image/bank/hxb.png",
				sort: 6
			},
			{
				bankName: "吉林银行",
				bankCode: "LTD",
				icon: null,
				sort: 5610
			},
			{
				bankName: "建设银行",
				bankCode: "CCB",
				icon: null,
				sort: 5430
			},
			{
				bankName: "江苏银行",
				bankCode: "JSYH",
				icon: null,
				sort: 5860
			},
			{
				bankName: "江西银行",
				bankCode: "JXYH",
				icon: null,
				sort: 5870
			},
			{
				bankName: "交通银行",
				bankCode: "BCM",
				icon: null,
				sort: 5440
			},
			{
				bankName: "锦州银行",
				bankCode: "BOJ",
				icon: null,
				sort: 5580
			},
			{
				bankName: "兰州银行",
				bankCode: "LZYH",
				icon: null,
				sort: 5740
			},
			{
				bankName: "廊坊银行",
				bankCode: "LFYH",
				icon: null,
				sort: 5750
			},
			{
				bankName: "辽宁农村信用社",
				bankCode: "LCC",
				icon: null,
				sort: 5600
			},
			{
				bankName: "临商银行",
				bankCode: "LSYH",
				icon: null,
				sort: 5810
			},
			{
				bankName: "民生银行",
				bankCode: "CMBC",
				icon: null,
				sort: 5470
			},
			{
				bankName: "农村信用社",
				bankCode: "RCC",
				icon: "image/bank/rcc.png",
				sort: 7
			},
			{
				bankName: "农业银行",
				bankCode: "ABC",
				icon: "image/bank/abc.png",
				sort: 2
			},
			{
				bankName: "平安银行",
				bankCode: "PAB",
				icon: "image/bank/pab.png",
				sort: 6
			},
			{
				bankName: "浦发银行",
				bankCode: "SPDB",
				icon: "image/bank/spdb.png",
				sort: 6
			},
			{
				bankName: "齐商银行",
				bankCode: "QSYH",
				icon: null,
				sort: 5800
			},
			{
				bankName: "日照银行",
				bankCode: "RZYH",
				icon: null,
				sort: 5790
			},
			{
				bankName: "上海农商银行",
				bankCode: "SRCB",
				icon: null,
				sort: 5660
			},
			{
				bankName: "上海银行",
				bankCode: "SHB",
				icon: "image/bank/shb.png",
				sort: 6
			},
			{
				bankName: "深圳发展银行",
				bankCode: "SDB",
				icon: "image/bank/sdb.png",
				sort: 6
			},
			{
				bankName: "盛京银行",
				bankCode: "SJB",
				icon: null,
				sort: 5590
			},
			{
				bankName: "天津银行",
				bankCode: "TJYH",
				icon: null,
				sort: 5840
			},
			{
				bankName: "西安银行",
				bankCode: "XAYH",
				icon: null,
				sort: 5730
			},
			{
				bankName: "新乡银行",
				bankCode: "957E",
				icon: null,
				sort: 1740
			},
			{
				bankName: "兴业银行",
				bankCode: "CIB",
				icon: null,
				sort: 5480
			},
			{
				bankName: "邮政银行",
				bankCode: "PSBC",
				icon: null,
				sort: 5540
			},
			{
				bankName: "招商银行",
				bankCode: "CMB",
				icon: null,
				sort: 5460
			},
			{
				bankName: "浙江农商",
				bankCode: "RCB",
				icon: null,
				sort: 5560
			},
			{
				bankName: "浙商银行",
				bankCode: "CZB",
				icon: null,
				sort: 5570
			},
			{
				bankName: "中国银行",
				bankCode: "BOC",
				icon: "image/bank/boc.png",
				sort: 6
			},
			{
				bankName: "中信银行",
				bankCode: "ZXB",
				icon: "image/bank/zxb.png",
				sort: 6
			},
			{
				bankName: "重庆银行",
				bankCode: "CQYH",
				icon: "image/bank/zxb.png",
				sort: 6
			}
		];
		res.json({
			"code": 200,
			"data": djson
		});

	});

	route.post('/withdraw/submit', function(req, res) {
		let username = req.session.username;
		var mobj = req.body;
		let money = parseInt(mobj.money);
		let payPwd = mobj.paypwd;
		let bankid = mobj.bankid;
		date = new Date()
		var withDrawTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() +
				1)) +
			"-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
			" " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' +
				date
				.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		console.log(money);
		var dsql = `select * from cp_user WHERE username = '${username}' and PayPwd='${payPwd}'`
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				if (data.length == 0) {
					console.log("withdraw/submit查询数据出错！");
					var djson = {
						"msg": "提现不成功，可能是密码错误！"
					};
					res.json({
						"code": 200,
						"data": djson
					});
				} else {
					let userinfo = data[0];
					//console.log("betmoney is:" + betMoney);
					let totalMoney = userinfo.totalMoney - money;
					var dsql = `UPDATE cp_user SET totalMoney = '${totalMoney}' WHERE username = '${username}'`
					//console.log(dsql);
					db.query(dsql, (err, data) => {
						if (err) {
							console.log(err);
							res.send({
								'msg': '服务器出错',
								'status': 0
							}).end();
						} else {
							if (data.length == 0) {
								console.log("查询数据出错！");
							} else {
								//option value="-1">全部</option>
								//<option value="10">充值</option>
								//<option value="11">提款</option>
								//<option value="12">投注</option>
								//<option value="13">中奖</option>
								//<option value="14">人工存入</option>
								//<option value="15">人工提出</option>
								//<option value="16">活动</option>
								let description = "提现";
								var dsql =
									`insert into  cp_moneydetails(username , type,description,createdTime,moneyStr ) 
									values( '${username}',11, '${description}','${withDrawTime}','${money}')`

								console.log(dsql);
								db.query(dsql, (err, data) => {
									if (err) {
										console.log(err);
										res.send({
											'msg': '服务器出错',
											'status': 0
										}).end();
									} else {
										var djson = {
											"msg": "提交成功"
										};
										res.json({
											"code": 200,
											"data": djson
										});
									}
								});

							}
						}
					});
				}
			}
		});
	});


	route.post('/rewardrebate', function(req, res) {


		const dsql = `SELECT * FROM cp_order where status=0`;
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				if (data.length == 0) {
					var djson = {
						"msg": "请求参数不完整或不正确！",
					};
					res.json({
						"code": 200,
						"data": djson

					});
				} else {

					for (i = 0; i < data.length; i++) {

						jiang(data, i);
					}

				}
			}
		});


	});

	function jiang(order, i) {
		let playId = order[i].playId;
		var lotteryId = playId.toString().substring(0, 2);
		var openPeriod = order[i].PeriodNumber;
		var username = order[i].username;
		//var betTime = order[i].betTime.toLocaleString({  hour24: true });

		date = order[i].betTime;
		var betTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() +
				1)) +
			"-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
			" " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' +
				date
				.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		var betMoney = order[i].money;
		const dsql = `SELECT * FROM cp_openhistory where lotteryId='${lotteryId}' and openPeriod='${openPeriod}'`;
		//console.log(dsql);
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				if (data.length == 0) {
					var djson = {
						"msg": "请求参数不完整或不正确！",
					};

				} else {

					openNum = data[0].opencode.split(/[+,]/)
						.map(Number);
					if (lotteryId === '50' || lotteryId === '81' || lotteryId === '80' || lotteryId === '55' || lotteryId ===
						'88' ||
						lotteryId === '89' || lotteryId === '92' || lotteryId === '93') {

						var castingNum = parseInt(playId.toString().substring(3, 4)); //下注的数字						
						if (castingNum == 0) {
							castingNum = 10
						}
						var castingtype = parseInt(playId.toString().substring(4, 6)); //下注的玩法
						let open = openNum[castingNum - 1];

						console.log("user:" + username + "下注：" + castingNum + "开奖:" + open);
						let rebate = 0;
						switch (castingtype) {
							case 1: //大
								if (open > 5) {
									rebate = 1;
								}
								break;
							case 2: //小
								if (open < 6) {
									rebate = 1;
								}
								break;
							case 3: //双
								if (open % 2 != 0) {
									rebate = 1;
								}
								break;
							case 4: //双
								if (open % 2 == 0) {
									rebate = 1;
								}
								break;
							case 5: //龙
								if (openNum[castingNum - 1] > openNum[10 - castingNum]) {
									rebate = 1;
								}
								break;
							case 6: //虎
								if (openNum[castingNum - 1] < openNum[10 - castingNum]) {
									rebate = 1;
								}
								break;
							case 7: //数字
								if (openNum[castingNum - 1] == 1) {
									rebate = 1;
								}
								break;
							case 8: //数字
								if (openNum[castingNum - 1] == 2) {
									rebate = 1;
								}
								break;
							case 9: //数字
								if (openNum[castingNum - 1] == 3) {
									rebate = 1;
								}
								break;
							case 10: //数字
								if (openNum[castingNum - 1] == 4) {
									rebate = 1;
								}
								break;
							case 11: //数字
								if (openNum[castingNum - 1] == 5) {
									rebate = 1;
								}
								break;
							case 12: //数字
								if (openNum[castingNum - 1] == 6) {
									rebate = 1;
								}
								break;
							case 13: //数字
								if (openNum[castingNum - 1] == 7) {
									rebate = 1;
								}
								break;
							case 14: //数字
								if (openNum[castingNum - 1] == 8) {
									rebate = 1;
								}
								break;
							case 15: //数字
								if (openNum[castingNum - 1] == 9) {
									rebate = 1;
								}
								break;
							case 16: //数字
								if (openNum[castingNum - 1] == 10) {
									rebate = 1;
								}
								break;
						}
						if (rebate == 1) {
							const dsql = `SELECT * FROM cp_dmodel where lotteryId='${lotteryId}' and playId='${playId}'`;
							db.query(dsql, (err, data) => {
								if (err) {
									console.log(err);

								} else {
									if (data.length == 0) {
										var djson = {
											"msg": "请求参数不完整或不正确！",
										};

									} else {
										let reward = (data[0].odds * betMoney).toFixed(2);
										console.log("reward:" + reward);
										updateorderstatus(reward, 1, playId, username, betTime);
										insertmoneydetais(reward, username);
									}
								}
							});
						} else {
							updateorderstatus(0, 2, playId, username, betTime);
						}
						guanya = openNum[0] + openNum[1];
						console.log(rebate);
					}

				}
			}

		});
	}

	function insertmoneydetais(reward, username) {
		date = new Date()
		var createdTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() +
				1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
			" " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' +
				date
				.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		let description = "中奖金额转入！";
		//option value="-1">全部</option>
		//<option value="10">充值</option>
		//<option value="11">提款</option>
		//<option value="12">投注</option>
		//<option value="13">中奖</option>
		//<option value="14">人工存入</option>
		//<option value="15">人工提出</option>
		//<option value="16">活动</option>
		var dsql =
			`insert into  cp_moneydetails(username , type,description,createdTime,moneyStr ) 
			values( '${username}',13, '${description}','${createdTime}','${reward}')`
		console.log("insert to moneydetails!" + dsql);
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);

			} else {
				if (data.length == 0) {
					var djson = {
						"msg": "请求参数不完整或不正确！",
					};

				} else {


				}
			}
		});
	}

	function updateorderstatus(reward, status, playId, username, betTime) {
		var dsql =
			`UPDATE cp_order SET rewardRebate = '${reward}',status= '${status}' WHERE username = '${username}' and playId = '${playId}' and betTime='${betTime}'`
		console.log("update order" + dsql);
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);

			} else {
				if (data.length == 0) {
					var djson = {
						"msg": "请求参数不完整或不正确！",
					};

				} else {

					updateuserinfo(reward, username);
					console.log("update order ok");
				}
			}
		});
	}

	function updateuserinfo(reward, username) {
		var dsql = `SELECT * FROM  cp_user  WHERE username = '${username}'`
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);

			} else {
				if (data.length == 0) {
					var djson = {
						"msg": "请求参数不完整或不正确！",
					};

				} else {

					totalMoney = parseInt(reward) + parseInt(data[0].totalMoney);
					console.log(totalMoney + "open rebate:" + data[0].totalMoney);
					var dsql = `update cp_user set totalMoney='${totalMoney}' where username = '${username}'`;
					db.query(dsql, (err, data) => {
						if (err) {
							console.log(err);

						} else {
							if (data.length == 0) {
								var djson = {
									"msg": "请求参数不完整或不正确！",
								};

							} else {

							}
						}
					});

					console.log("update user ok")
				}
			}
		});

	}
	route.post('/open', function(req, res) {
		var lotteryList = req.body;
		let blockTime;
		let curPeriodNum;
		let isHot;
		let lotteryId;
		let lotteryName;
		let nextTime;
		let openResult;
		let remainTime;
		let sysTime;
		if (lotteryList != null) {
			for (let item of lotteryList) {

				curPeriodNum = item.curPeriodNum;
				isHot = item.isHot;
				lotteryId = item.lotteryId;
				lotteryName = item.lotteryName;
				nextTime = item.nextTime;
				openResult = item.openResult;
				openPeriod = openResult.openPeriod;
				opencode = openResult.opencode;
				opentime = openResult.opentime;
				remainTime = item.remainTime;
				sysTime = item.sysTime;
				var dsql =
					`UPDATE cp_open SET 
			curPeriodNum = '${curPeriodNum}',nextTime = '${nextTime}', openPeriod = '${openPeriod}' ,opencode = '${opencode}' ,opentime = '${opentime}',
			 remainTime = '${remainTime}' ,sysTime = '${sysTime}' 	WHERE lotteryId = '${lotteryId}'`;
				db.query(dsql, (err, data) => {
					if (err) {
						console.log(err);
						//两种都可以

					} else {
						if (data.length == 0) {
							console.log("查询数据出错！");
						} else {

						}
					}
				});
				openhistory(item);
			}
			//两种都可以
			res.json({
				"code": 200,
				"data": "ok"
			});
		}
	});

	function openhistory(item) {
		let blockTime = item.blockTime;
		let curPeriodNum = item.curPeriodNum;
		let isHot = item.isHot;
		let lotteryId = item.lotteryId;
		let lotteryName = item.lotteryName;
		let nextTime = item.nextTime;
		let openResult = item.openResult;
		let openPeriod = openResult.openPeriod;
		let opencode = openResult.opencode;
		let opentime = openResult.opentime;
		let remainTime = item.remainTime;
		let sysTime = item.sysTime;

		const dsql1 = `SELECT * FROM cp_openhistory where lotteryId = '${lotteryId}' and openPeriod='${openPeriod}'`;
		//console.log(dsql1);
		db.query(dsql1, (err, data) => {
			if (err) {
				console.log(err);

			} else {

				if (data.length == 0) {
					const inshistory =
						`INSERT INTO cp_openhistory(blockTime,curPeriodNum,isHot,lotteryId,lotteryName,nextTime,openPeriod,opencode,opentime ,remainTime,sysTime)
					 VALUES('${blockTime}','${curPeriodNum}','${isHot}','${lotteryId}','${lotteryName}','${nextTime}','${openPeriod}','${opencode}','${opentime}','${remainTime}','${sysTime}')`;
					db.query(inshistory, (err, data) => {
						if (err) {
							console.log(err);

						} else {

						}
					});
				} else {


				}
			}
		});
	}

	return route;
}

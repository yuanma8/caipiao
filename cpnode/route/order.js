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

	function showkeys(obj) {
		Object.keys(obj).forEach(function(key) {
			console.log(key, obj[key]);
		});
	}
	route.post('/bet/:id', function(req, res) {
		var id = req.params.id;
		var mobj = req.body;
		let PeriodNumber = mobj.PeriodNumber;
		let money = 0;
		var playId = "";
		let username = req.session.username;
		var betMoney = 0;
		//var bets=[];
		bets = JSON.parse(mobj.data);
		//showkeys(bets);

		for (i = 0; i < bets.length; i++) {
			money = parseInt(bets[i].money);
			betMoney = betMoney + money;
			//console.log("data length:" + bets[i].money);
		}

		for (i = 0; i < bets.length; i++) {
			money = parseInt(bets[i].money);
			playId = bets[i].playId;
			generateorder(username, PeriodNumber, money, playId);

		}
		var dsql = `select * from cp_user WHERE username = '${username}'`
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
					let userinfo = data[0];
					//console.log("betmoney is:" + betMoney);
					let totalMoney = userinfo.totalMoney - betMoney;
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
								res.json({
									"code": 200,
									"data": ""
								});
							}
						}
					});
				}
			}
		});


	});

	/*
	 *return data model of playing instrution
	 */
	function generateorder(username, PeriodNumber, money, playId) {
		date = new Date()
		var betTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) +
			"-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
			" " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date
				.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

		//let betTime = new Date().getTime();
		const dsql =
			`INSERT INTO cp_order(username,PeriodNumber,money, playId,status,betTime) 
			VALUES('${username}','${PeriodNumber}','${money}','${playId}',0,'${betTime}')`;
		mydata = db.query(dsql, (err, data) => {
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

				}
			}
		});

	}
	route.post('/find', function(req, res) {
		let username = req.session.username;
		//let username = "cool44";
		findlist = req.body;
		status = findlist.Status;
		betTime = findlist.startDate;

		const dsql = `SELECT * FROM cp_order where username='${username}' and status='${status}' and betTime>'${betTime}'`;
		console.log(dsql);

		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				let djson = [];
				for (i = 0; i < data.length; i++) {

					djson[i] = {
						"id": i,
						"username": data[i].username,
						"lotteryName": "北京pk10",
						"periods": data[i].PeriodNumber,
						"lotteryID": (data[i].playId).toString().substring(0, 2),
						"status": data[i].status,
						"rewardRebate": data[i].rewardRebate,
						"betTime": data[i].betTime.toLocaleString(),
						"betMoney": data[i].money
					}
					console.log("period:" + (data[i].playId).toString().substring(0, 2));
				}


				res.json({
					"code": 200,
					"data": {
						"items": djson
					}
				});
				//res.send(dataw).end();					
			}

		});
	});

	route.post('/curUser/betMoney', function(req, res) {
		//let username = "cool44";
		let username = req.session.username;
		const dsql = `SELECT * FROM cp_order where username='${username}'`;
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

					let dataw = data[0];
					var djson = {
						"totalWinMoney": 0,
						"totalBetMoney": 0,
						"totalProfit": 0,
					};

					res.json({
						"code": 200,
						"data": djson
					});
					//res.send(dataw).end();					
				}
			}
		});
	});
	route.post("/botonline", function(req, res) {
		var username;
		var mobj = req.body;
		if (!!mobj.username) {
			req.session.username = mobj.username;
			username = mobj.username;
			console.log('restore username from  url: ' + mobj.username + ".");
			console.log('restore username from  cookie: ' + req.session.username + ".");
		} else {
			if (!!req.session.username) {
				username = req.session.username;
				console.log('balance username: ' + req.session.username + ".");
			}
		}
		var dsql = `SELECT * FROM  cp_user  WHERE username = '${username}'`
		console.log(dsql);
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);

			} else {
				if (data.length == 0) {
					var djson = {
						"msg": "请求参数不完整或不正确！",
					};

				} else {
					console.log("online" + data[0]["botonline"]);
					res.json({
						"code": 200,
						"data": {
							"botonline": data[0]["botonline"]
						}
					});
				}
			}
		});

	});
	route.post('/yingkui', function(req, res) {
		var id = req.params.id;
		var mobj = req.body;
		let PeriodNumber = mobj.PeriodNumber;
		let money = 0;
		var playId = "";

		var betMoney = 0;
		var rewardRebate = 0;
		var bets = JSON.parse(mobj.data);
		var username;

		username = req.session.username;

		for (i = 0; i < bets.length; i++) {
			money = parseFloat(bets[i].money);
			//	rewardRebate = rewardRebate + money;
			//console.log("data length:" + bets[i].money);
		}
		//betMoney = (rewardRebate / 1.95).toFixed(2);
		betMoney = money;
		playId = bets[0].playId;
		var ying = 0;
		var kui = 0;
		date = new Date()
		var betTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() +
				1)) +
			"-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
			" " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' +
				date
				.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		//let betTime = new Date().getTime();
		var dsql =
			`INSERT INTO cp_order(username,money,PeriodNumber,rewardRebate, playId,status,betTime) 
			VALUES('${username}','${betMoney}','${PeriodNumber}','${rewardRebate}','${playId}',0,'${betTime}')`;
		console.log(dsql);
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
						"code": 400,
						"data": djson,
						"msg": "请求参数不完整或不正确！",
						"error": false,
						"status": "error"
					});
				} else {
					reduceusertable(username, betMoney);
					sumIncome(username, res);
				}
			}
		});
		//res.send(dataw).end();	
	});

	function reduceusertable(username, betMoney) {
		var dsql = `select * from cp_user WHERE username = '${username}'`
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
					let userinfo = data[0];
					//console.log("betmoney is:" + betMoney);
					let totalMoney = userinfo.totalMoney - betMoney;
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
							console.log("reduce betmoney from usertable");
						}
					});
				}
			}
		});
	}

	function sumIncome(username, res) {
		//let username = "cool44";
		//let username = req.session.username;
		var ying = 0;
		var kui = 0;
		var ycount;
		var kcount;
		date = new Date()
		var betTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() +
				1)) +
			"-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + "00:00:01";
		var dsql = `select * FROM cp_order where username='${username}' and status=1 and betTime>'${betTime}'`;
		console.log(dsql);
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {

				for (i = 0; i < data.length; i++) {
					ying = ying + (data[i]["rewardRebate"] - data[i]["money"]);
				}
				ycount = data.length;
				dsql = `select * FROM cp_order where username='${username}' and status=2 and betTime>'${betTime}'`;
				db.query(dsql, (err, data) => {
					if (err) {
						console.log(err);
						res.send({
							'msg': '服务器出错',
							'status': 0
						}).end();
					} else {
						kcount = data.length;
						for (i = 0; i < data.length; i++) {
							kui = kui + data[i]["money"]
						}

						let percentage = Math.round(ying / (ying + kui) * 10000) / 100.00 - 100;
						let yingkui = (ying - kui).toFixed(2);
						console.log("ying" + ying + "kui" + kui);
						var djson = {
							"percentage": percentage,
							"yingkui": yingkui,
							"lianzhong": Math.floor(ycount),
							"liangua": Math.floor(kcount),
							"kaijiang": Math.floor(Math.random() * 10)
						};
						res.json({
							"code": 200,
							"data": djson
						});
					}
				});

			}
		});
		//res.send(dataw).end();	
	};
	return route;
}

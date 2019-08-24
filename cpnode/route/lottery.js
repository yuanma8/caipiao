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
	route.post('/info/all/1', function(req, res) {
		var menuDetails = [{
			"gamePlays": null,
			"id": "49D343E11B3A4D8E820964ED1710D414",
			"isHot": null,
			"lotteryId": 50,
			"menuDetails": null,
			"menuName": "双面玩法",
			"sort": 1
		}, {
			"gamePlays": null,
			"id": "B469CEDC14CB4A079667B9787A20F03D",
			"isHot": null,
			"lotteryId": 50,
			"menuDetails": null,
			"menuName": "数字",
			"sort": 2
		}/*, {
			"gamePlays": null,
			"id": "89E7681103FA4DD2B571D9A929D48597",
			"isHot": null,
			"lotteryId": 50,
			"menuDetails": null,
			"menuName": "冠亚和",
			"sort": 3
		}, {
			"gamePlays": null,
			"id": "89E7681103FA4DD2B571D9A929D48597",
			"isHot": null,
			"lotteryId": 50,
			"menuDetails": null,
			"menuName": "冠亚组合",
			"sort": 4
		} */];
	
		var openResult = {
			"openPeriod": "735252",
			"opencode": "3,1,10,2,6,4,5,8,9,7",
			"opentime": "2019-06-24T13:51:16",
			"opentimestamp": null,
			"resultColor": null,
			"zodiac": null
		}
		var lotteryList = [  {
			"blockTime": 120,
			"curPeriodNum": 6230674,
			"isHot": 1,
			"lotteryId": 50,
			"lotteryName": "北京pk10",
			"menuDetails": menuDetails,
			"nextTime": "2019-06-24T14:51:16",
			"openResult": openResult,
			"remainTime": 1561352900,
			"sysTime": 1561352700
		}, 
		 {
			"blockTime": 120,
			"curPeriodNum": 201907030321,
			"isHot": 1,
			"lotteryId": 80,
			"lotteryName": "急速赛车",
			"menuDetails": menuDetails,
			"nextTime": "2019-06-24T14:51:16",
			"openResult": openResult,
			"remainTime":1562134200,
			"sysTime": 1562134181
		},{
			"blockTime": 20,
			"curPeriodNum": 201906230674,
			"isHot": 1,
			"lotteryId": 81,
			"lotteryName": "急速飞艇",
			"menuDetails": menuDetails,
			"nextTime": "0001-01-01T00:00:00",
			"openResult": openResult,
			"remainTime":1562134245,
			"sysTime": 1562134181
		},  {
			"blockTime": 120,
			"curPeriodNum": 6230674,
			"isHot": 1,
			"lotteryId": 55,
			"lotteryName": "幸运飞艇",
			"menuDetails": menuDetails,
			"nextTime": "2019-06-24T14:51:16",
			"openResult": openResult,
			"remainTime": 1561352900,
			"sysTime": 1561352700
		}, {
			"blockTime": 120,
			"curPeriodNum": 6230674,
			"isHot": 1,
			"lotteryId": 88,
			"lotteryName": "德国赛车",
			"menuDetails": menuDetails,
			"nextTime": "2019-06-24T14:51:16",
			"openResult": openResult,
			"remainTime": 1561352900,
			"sysTime": 1561352700
		}, {
			"blockTime": 120,
			"curPeriodNum": 6230674,
			"isHot": 1,
			"lotteryId": 89,
			"lotteryName": "德国飞艇",
			"menuDetails": menuDetails,
			"nextTime": "2019-06-24T14:51:16",
			"openResult": openResult,
			"remainTime": 1561352900,
			"sysTime": 1561352700
		}, {
			"blockTime": 120,
			"curPeriodNum": 6230674,
			"isHot": 1,
			"lotteryId": 92,
			"lotteryName": "MC赛车",
			"menuDetails": menuDetails,
			"nextTime": "2019-06-24T14:51:16",
			"openResult": openResult,
			"remainTime": 1561352900,
			"sysTime": 1561352700
		}, {
			"blockTime": 120,
			"curPeriodNum": 6230674,
			"isHot": 1,
			"lotteryId": 93,
			"lotteryName": "MC飞艇",
			"menuDetails": menuDetails,
			"nextTime": "2019-06-24T14:51:16",
			"openResult": openResult,
			"remainTime": 1561352900,
			"sysTime": 1561352700
		},  {
			"blockTime": 120,
			"curPeriodNum": 6230674,
			"isHot": 1,
			"lotteryId": 84,
			"lotteryName": "5分彩",
			"menuDetails": menuDetails,
			"nextTime": "0001-01-01T00:00:00",
			"openResult": openResult,
			"remainTime": "",
			"sysTime": 1561352700
		}, {
			"blockTime": 120,
			"curPeriodNum": 6230674,
			"isHot": 1,
			"lotteryId": 94,
			"lotteryName": "欢乐彩",
			"menuDetails": menuDetails,
			"nextTime": "0001-01-01T00:00:00",
			"openResult": openResult,
			"remainTime": 1561352900,
			"sysTime": 1561352700
		}, {
			"blockTime": 120,
			"curPeriodNum": 20190703031,
			"isHot": 1,
			"lotteryId": 95,
			"lotteryName": "欢乐生肖",
			"menuDetails": menuDetails,
			"nextTime": "0001-01-01T00:00:00",
			"openResult": openResult,
			"remainTime": "",
			"sysTime": 1561352700
		}];
	
		res.json({
			"code": 200,
			"data": lotteryList
		});
	});
	route.post('/info/:id', function(req, res) {
		let username = req.session.username;
		id = req.params.id;
		const dsql = `SELECT * FROM cp_open where lotteryId='${id}'`;
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
						"data": djson,
					});
				} else {
					var openResult = {
						"openPeriod": data[0].openPeriod,
						"opencode": data[0].opencode,
						"opentime": data[0].opentime,
						"opentimestamp": null,
						"resultColor": null,
						"zodiac": null
					}
					var lotteryInfo = {
						"blockTime": data[0].blockTime,
						"curPeriodNum": data[0].curPeriodNum,
						"isHot": data[0].isHot,
						"lotteryId": id,
						"lotteryName": data[0].lotteryName,
						"menuDetails": null,
						"nextTime": data[0].nextTime,
						"openResult": openResult,
						"remainTime": data[0].remainTime,
						"sysTime": data[0].sysTime
					};
					const dsql = `SELECT * FROM cp_order where username='${username}' order by betTime desc limit 10`;
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
										"betTime": data[i].betTime.toLocaleString(),
										"betMoney": data[i].money
									}
									//console.log("period:" + (data[i].playId).toString().substring(0, 2));
								}
								res.json({
									"code": 200,
									"data": {
										"lotteryInfo": lotteryInfo,
										"orderList": djson
									}
								});
	
							
						}
					});
				}
			}
		});
	
	});
	
	route.get("/find/play/:lotteryid/:id", function(req, res) {
		lotteryid = req.params.lotteryid;
		if (lotteryid!=50){
			lotteryid=50;
		}
		id = req.params.id;
		var dlength, datag;
		var datas = [];
		var myqueue = 0;
	
		function d(j, arrjson) {
			datas[j] = arrjson;
	
			myqueue = myqueue + 1;
			if (myqueue == dlength) {
				var djson = [];
				for (i = 0; i < datag.length; i++) {
	
					djson[i] = {
						"belongNumbers": datag[i].belongNumbers,
						"color": datag[i].color,
						"datas": datas[i],
						"isNumber": datag[i].isNumber,
						"isSelected": datag[i].isSelected,
						"lotteryId": lotteryid,
						"name": datag[i].name,
						"number": datag[i].number,
						"odds": datag[i].odds,
						"playId": datag[i].playId,
						"playSort": datag[i].playSort,
						"rebate": datag[i].rebate,
						"remark": datag[i].remark
					};
	
				};
				res.json({
					"code": 200,
					"data": djson
				});
			}
		}
	
		const dsql = `SELECT * FROM cp_dmodel where lotteryId='${lotteryid}' and playSort<=10 and isNumber=0`;
	
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
	
	
					dlength = data.length;
					datag = data;
					for (i = 0; i < data.length; i++) {
						data6(d, id, lotteryid, i);
					};
	
	
				}
			}
		});
	
	});
	/*
	 *return data model of playing instrution
	 */
	function data6(callback, id, lotteryid, j) {
		let playid = null;
		if (j == 9) {
			playid = lotteryid + '20' + '%';
		} else
			playid = lotteryid + '1' + (j + 1).toString() + '%';
		//console.log("id:" + id);
		let dsql;
	
		if (id =="49D343E11B3A4D8E820964ED1710D414") {
			dsql = `SELECT * FROM cp_dmodel where lotteryId='${lotteryid}' and playId like '${playid}'  and isNumber=0`;
		} else {if (id == "B469CEDC14CB4A079667B9787A20F03D") {
			 dsql = `SELECT * FROM cp_dmodel where lotteryId='${lotteryid}' and playId like '${playid}' and isNumber=1`;
		}}
		//console.log(dsql);
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				
			} else {
				
					var arrjson = [];
					for (i = 0; i < data.length; i++) {
						//console.log("ok1" + data[i].remark);
						arrjson[i] = {
							"belongNumbers": data[i].belongNumbers,
							"color": data[i].color,
							"datas": null,
							"isNumber": data[i].isNumber,
							"isSelected": data[i].isSelected,
							"lotteryId": lotteryid,
							"name": data[i].name,
							"number": data[i].number,
							"odds": data[i].odds,
							"playId": data[i].playId,
							"playSort": data[i].playSort,
							"rebate": data[i].rebate,
							"remark": data[i].remark
						};
	
					};
					callback(j, arrjson)
	
				
			}
		});
	}
	route.get('/find/howToPlay/:lotteryId', function(req, res) {
		var mobj = req.body;
		let lotteryId = req.params.lotteryId;
		const dsql1 =
			`SELECT * FROM cp_howtoplay where lotteryId = '${lotteryId}'`;
	
		db.query(dsql1, (err, data) => {
			if (err) {
				console.log(err);
				res.json({
					"code": 200,
					"data": "操作数据库出错！"
				});
			} else {
				//console.log("aa"+data[0].tutorial);
				if (data.length == 0) {
					res.json({
						"code": 200,
						"data": "数据长度为0！"
					});
				} else {
					res.json({
						"code": 200,
						"data": data[0].tutorial
					});
	
				}
			}
		});
	});
	route.post('/getHistoryByWeb', function(req, res) {
		var mobj = req.body;
	
		let StartDate = (mobj.StartDate + " " + "07:00:00");
		let betEndTime = (mobj.StartDate + " " + "23:59:59");
		let lotteryId = parseInt(mobj.LotteryId);
		console.log(lotteryId + ":" + StartDate);
		const dsql1 =
			`SELECT * FROM cp_openhistory where lotteryId = '${lotteryId}' and  opentime BETWEEN '${StartDate}' AND '${betEndTime}' order by opentime desc`;
		//console.log(dsql1);
		db.query(dsql1, (err, data) => {
			if (err) {
				console.log(err);
				res.json({
					"code": 200,
					"data": "操作数据库出错！"
				});
			} else {
				if (data.length == 0) {
					res.json({
						"code": 200,
						"data": "数据长度为0！"
					});
				} else {
					let djson = [];
					for (i = 0; i < data.length; i++) {
						djson[i] = {
							"betEndTime": betEndTime,
							"gameId": lotteryId,
							"id": data[i].id,
							"n1": 6,
							"n2": 4,
							"n3": 2,
							"n4": 10,
							"n5": 9,
							"n6": 7,
							"n7": 3,
							"n8": 5,
							"n9": 1,
							"n10": 8,
							"n11": null,
							"n12": null,
							"n13": null,
							"n14": null,
							"n15": null,
							"n16": null,
							"n17": null,
							"n18": null,
							"n19": null,
							"n20": null,
							"openNum": data[i].opencode,
							"openNumStr": data[i].opencode,
							"openTime": data[i].opentime.toLocaleString(),
							"remark": null,
							"statDate": "2019-06-30 07:00:00",
							"status": 2,
							"turnNum": data[i].openPeriod,
						};
					}
					res.json({
						"code": 200,
						"data": djson
					});
				}
			}
		});
	});
	return route;
}

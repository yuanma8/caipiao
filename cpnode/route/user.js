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
	route.get('/bank/info', function(req, res) {
		var mobj = req.body;
		//const session = req.session;
		//if (req.session.username) {
		console.log('bank username: ' + req.session.username + ".");
		//}
		let username = req.session.username;
		var dsql = `SELECT * FROM cp_user where username='${username}'`;
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				if (data.length == 0) {

					res.json({
						"code": 400,
						"data": "djson",
						"msg": "请求参数不完整或不正确！",
						"error": false,
						"status": "error"
					});
				} else {
					let djson = {
						"bankAccount": data[0].bankaccount,
						"bankName": data[0].bankName,
						"bankUserName": data[0].bankUserName
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
	route.post('/bindBank', function(req, res) {
		var mobj = req.body;
		let bankName = mobj.bankName;
		let bankAccount = mobj.bankAccount;
		let branchName = mobj.branchName;
		//if (req.session.username) {
		console.log('bindcard username: ' + req.session.username + ".");
		//}
		let username = req.session.username;
		var dsql =
			`UPDATE cp_user SET bankaccount = '${bankAccount}' ,bankName='${bankName}', branchname = '${branchName}' WHERE username='${username}' `;
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				if (data.length == 0) {

					res.json({
						"code": 200,
						"data": "更新银行卡成功！"
					});
					//res.send(dataw).end();				
				}
			}
		});

	});
	route.post('/balance', function(req, res) {
		var mobj = req.body;
		let username;
		if (!!req.session.username) {
			username = req.session.username;
			console.log('balance username: ' + req.session.username + ".");
		} else {
			req.session.username = mobj.username;
			username = mobj.username;
			console.log('restore username from  cookie: ' + req.session.username + ".");
		}

		const selectUser = `SELECT * FROM cp_user where username='${username}'`;
		db.query(selectUser, (err, data) => {
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
					let dataw = data[0];
					//showkeys(dataw);
					//login sucess					
					dataw.msg = "查询余额成功";
					dataw.status = 1;
					dataw.IsSuccess = true;
					dataw.StatusCode = 0;
					//两种都可以
					res.json({
						"IsSuccess": true,
						"StatusCode": 0,
						"userName": dataw.username,
						"accountBalanceStr": dataw.totalMoney,
						"lockBalanceStr": dataw.freezeMoney
					});
					//res.send(dataw).end();						
				}
			}
		});

	});
	route.post('/yuer', function(req, res) {
		var mobj = req.body;
		var username;
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
		const selectUser = `SELECT * FROM cp_user where username='${username}'`;
		db.query(selectUser, (err, data) => {
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
					let dataw = data[0];
					//showkeys(dataw);
					//login sucess					
					dataw.msg = "查询余额成功";
					dataw.status = 1;
					dataw.IsSuccess = true;
					dataw.StatusCode = 0;
					//两种都可以
					res.json({
						"IsSuccess": true,
						"StatusCode": 0,
						"userName": dataw.username,
						"accountBalanceStr": dataw.totalMoney,
						"lockBalanceStr": dataw.withdrawMoney
					});
					//res.send(dataw).end();						
				}
			}
		});

	});
	route.post('/botinfo', function(req, res) {
		var mobj = req.body;
		var username;
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
		const selectUser = `SELECT * FROM cp_user where username='${username}'`;
		db.query(selectUser, (err, data) => {
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
					let dataw = data[0];
					//showkeys(dataw);
					//login sucess					
					dataw.msg = "查询余额成功";
					dataw.status = 1;
					dataw.IsSuccess = true;
					dataw.StatusCode = 0;
					//两种都可以
					res.json({
						"IsSuccess": true,
						"StatusCode": 0,
						"userName": dataw.username,
						"botactive": dataw.botactive,
						"percentage": dataw.percentage
					});
					//res.send(dataw).end();						
				}
			}
		});

	});
	route.post('/botin', function(req, res) {
		var mobj = req.body;
		let username = mobj.username;
		console.log("botin" + username);
		let password1 = mobj.password;
		password = common.md5('Q' + password1 + 'W');
		const selectUser = `SELECT * FROM cp_user where username='${username}'`;
		db.query(selectUser, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				if (data.length == 0) {
					res.send({
						'msg': '登录的用户不存在',
						'status': -1
					}).end();
				} else {
					let dataw = data[0];
					//showkeys(dataw);
					//login sucess
					if (dataw.botpwd === password) {
						//save the session 

						req.session.username = dataw.username;
						req.session.save();
						console.log("user session for user:" + req.session.username);
						dataw.msg = "登录成功";
						dataw.status = 1;
						dataw.IsSuccess = true;
						dataw.StatusCode = 0;
						//两种都可以

						var djson = {
							"accountBalance": 0,
							"agentId": 10006,
							"bankAccount": null,
							"bankCode": null,
							"bankId": null,
							"bankName": null,
							"bankUserName": dataw.bankUserName,
							"betMoney": 0,
							"branchName": dataw.branchname,
							"chatLevelTypeName": "普通彩民",
							"companyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
							"currentScore": null,
							"email": "",
							"headPhoto": "https://images.budiaodanle.com//Content/images/defaultheadimg.jpg",
							"id": "bf57222bd34940c085b92236f72dd3e3",
							"isSetPayPwd": 1,
							"isUpdatePayPwdFlag": 0,
							"isUpdatePwdFlag": 0,
							"lastLoginTime": "2019-06-25T16:39:35.32",
							"level": 0,
							"levelName": "0级",
							"nickName": null,
							"phone": "13333223453",
							"qq": null,
							"realName": dataw.bankUserName,
							"returnMemberDays": [{}],
							"testFlag": 0,
							"token": "40c61738f6624ea8918f921faee7254b",
							"totalMoney": dataw.totalMoney,
							"userLevel": 1,
							"userName": dataw.username,
							"withdrawMoney": dataw.withdrawMoney
						};
						res.json({
							"code": 200,
							"data": djson
						});
						//res.send(dataw).end();
					} else {
						res.send({
							'msg': '密码不正确',
							'status': -2
						}).end();
					}
				}
			}
		});
	});
	route.post('/login', function(req, res) {
		var mobj = req.body;
		let username = mobj.username;
		let password1 = mobj.password;
		password = common.md5('Q' + password1 + 'W');
		const selectUser = `SELECT * FROM cp_user where username='${username}'`;
		db.query(selectUser, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				if (data.length == 0) {
					res.send({
						'msg': '登录的用户不存在',
						'status': -1
					}).end();
				} else {
					let dataw = data[0];
					//showkeys(dataw);
					//login sucess
					if (dataw.password === password) {
						//save the session 

						req.session.username = dataw.username;
						req.session.save();
						console.log("user session for user:" + req.session.username);
						dataw.msg = "登录成功";
						dataw.status = 1;
						dataw.IsSuccess = true;
						dataw.StatusCode = 0;
						//两种都可以

						var djson = {
							"accountBalance": 0,
							"agentId": 10006,
							"bankAccount": null,
							"bankCode": null,
							"bankId": null,
							"bankName": null,
							"bankUserName": dataw.bankUserName,
							"betMoney": 0,
							"branchName": dataw.branchname,
							"chatLevelTypeName": "普通彩民",
							"companyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
							"currentScore": null,
							"email": "",
							"headPhoto": "https://images.budiaodanle.com//Content/images/defaultheadimg.jpg",
							"id": "bf57222bd34940c085b92236f72dd3e3",
							"isSetPayPwd": 1,
							"isUpdatePayPwdFlag": 0,
							"isUpdatePwdFlag": 0,
							"lastLoginTime": "2019-06-25T16:39:35.32",
							"level": 0,
							"levelName": "0级",
							"nickName": null,
							"phone": "13333223453",
							"qq": null,
							"realName": dataw.bankUserName,
							"returnMemberDays": [{}],
							"testFlag": 0,
							"token": "40c61738f6624ea8918f921faee7254b",
							"totalMoney": dataw.totalMoney,
							"userLevel": 1,
							"userName": dataw.username,
							"withdrawMoney": dataw.withdrawMoney
						};
						res.json({
							"code": 200,
							"data": djson
						});
						//res.send(dataw).end();
					} else {
						res.send({
							'msg': '密码不正确',
							'status': -2
						}).end();
					}
				}
			}
		});
	});

	/*
	 *user reg func
	 */
	route.post('/register', (req, res) => {
		var mobj = req.body;
		let username = mobj.UserName;
		let password1 = mobj.PassWord;
		let phone = mobj.Phone;
		let bankUserName = mobj.RealName;
		let PayPwd = mobj.PayPwd;
		var password = common.md5('Q' + password1 + 'W');
		//console.log("reg:"+ mobj.password);
		const checkUserInfo =
			`SELECT * FROM cp_user where username='${username}'`;
		db.query(checkUserInfo, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				if (data.length == 0) {
					//						'msg': '该用户不存在',
					console.log("该用户不存在，可以注册");
					const insUserInfo =
						`INSERT INTO cp_user(username,bankUserName,phone,password,PayPwd,totalMoney,freezeMoney,percentage) VALUES('${username}','${bankUserName}','${phone}','${password}','${PayPwd}',0,0,12)`;
					delReg(insUserInfo, res);
					req.session.username = username;
					req.session.save();
					console.log("session for user:" + req.session.username);
					res.json({
						"IsSuccess": true,
						"StatusCode": 0,
						"userName": username
					});
				} else {
					let dataw = data[0];
					//showkeys(dataw);
					//login sucess
					if (dataw.password === password) {

						//  console.log(dataw.user_id);
						dataw.msg = "用户已存在";
						dataw.status = -1;
						res.send(dataw).end();
						return;
					} else {
						res.send({
							'msg': '用户已存在，密码不正确',
							'status': -2
						}).end();
					}
				}
			}
		});

	});

	/*
	 *deal user register
	 */
	function delReg(insUserInfo, res) {
		db.query(insUserInfo, (err) => {
			if (err) {
				console.error(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				//res.send({
				//	'msg': '注册成功',
				//	'status': 1
				//	}).end();
			}
		})
	};

	route.post('/GetCompanyInfo', function(req, res) {

		res.json({
			"code": 200,
			"data": {
				"agentQQ": "121991234",
				"agentUrl": "https://ag.netjet.info",
				"chatUrl": "https://chatya9av8qa8cfca.ddkaixin.com/chat/room/",
				"discountUrl": "https://images.budiaodanle.com/common/190612/13/54815006a39241dd8a54.jpg",
				"isChineseIP": 1,
				"kaiJiangWangUrl": "https://www.06kj6.com",
				"loginCaptchaState": 0,
				"onlineClientServerUrl": "https://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=982687&configID=75869&jid=1599788475&s=1",
				"phoneNumber": "+869121677777",
				"playVersion": "1",
				"serviceQQ": "250980124",
				"touSuQQ": "1958591234",
				"webChatQRCodeUrl": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=446853653,990487943&fm=27&gp=0.jpg",
				"chatUrl": "https://chatya9av8qa8cfca.ddkaixin.com/chat/room/",
			}
		});
	});
	route.get('/getReturnMoney', function(req, res) {

		var djson = {
			"imageList": "",
			"personNum": "156134"
		};
		res.json({
			"code": 200,
			"data": djson
		});

	});
	route.get('/getReturnMoneyFlag', function(req, res) {
		res.json({
			"code": 200,
			"data": 0
		});
	});

	return route;
}

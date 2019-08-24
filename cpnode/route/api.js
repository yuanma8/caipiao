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
	route.get('/Test/Get', function(req, res) {
		var djson = {
			"personNum": "156134"
		};
		res.json({
			"code": 200,
			"data": djson
		});

	});
		route.post('/Payment/getqrcode', function(req, res) {
		let username = req.session.username;
		const dsql = `SELECT * FROM cp_payment`;
		
		db.query(dsql, (err, data) => {
			if (err) {
				console.log(err);
				res.send({
					'msg': '服务器出错',
					'status': 0
				}).end();
			} else {
				var dobj=data[0];
				var QrCodepic=data[0].qrcodepic;
				console.log("QrCodepic:"+QrCodepic);
				res.json({
					"StatusCode": 0,
					"Data": QrCodepic,
					ErrorCode: "00",
					"IsQrcode": false,
					"IsSuccess": true,
					"IsUrl": false,
					"Location": "",
					"Message": "",
					"QrCode": null
				});
			}
		});
	
	});
	route.post('/Payment/GetPayScan', function(req, res) {
		var PayScanList = [{
			"CompanyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"CreateDate": "/Date(1545619301877)/",
			"CurMoney": null,
			"FilePath": null,
			"ID": "133e69ade1f94b76b935b76f0f438c48",
			"IsAuto": false,
			"LoginAccount": null,
			"LoginPwd": null,
			"MaxMoney": 2000,
			"MerchantType": null,
			"MinMoney": 1,
			"Name": "线下扫码微信充值",
			"PayLevel": ",0,1,2,3,4,5,6,7,",
			"PayeeAccount": "8888888",
			"PayeeName": "线下扫码提交通道",
			"QrCode": null,
			"Remark": null,
			"Script": null,
			"ScriptSpan": "36934",
			"Status": 1,
			"TotalMoney": null,
			"Type": 1
		},{
			"CompanyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"CreateDate": "/Date(1545619301877)/",
			"CurMoney": null,
			"FilePath": null,
			"ID": "133e69ade1f94b76b935b76f0f438c48",
			"IsAuto": false,
			"LoginAccount": null,
			"LoginPwd": null,
			"MaxMoney": 2000,
			"MerchantType": null,
			"MinMoney": 1,
			"Name": "线下扫码支付宝充值",
			"PayLevel": ",0,1,2,3,4,5,6,7,",
			"PayeeAccount": "8888888",
			"PayeeName": "线下扫码提交通道",
			"QrCode": null,
			"Remark": null,
			"Script": null,
			"ScriptSpan": "36934",
			"Status": 1,
			"TotalMoney": null,
			"Type": 3
		}];
		//两种都可以
		res.json({
			"StatusCode": 0,
			"Data": {
				"PayScanList": PayScanList,
				"Version": null
			},
			ErrorCode: "00",
			"IsQrcode": false,
			"IsSuccess": true,
			"IsUrl": false,
			"Location": "",
			"Message": "",
			"QrCode": null
		});
	});
	route.post('/Payment/GetPayTransferList', function(req, res) {
		var BankCardPayList = [{
			"Account": "41060318010078338",
			"AccountName": "广商贸有限公司",
			"Address": "请勿保存，随时更换",
			"BankCode": "BCM",
			"Branch": "随时更换，请勿保存",
			"CompanyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"CreateDate": "/Date(1562569175800)/",
			"FilePath": null,
			"ID": "5306764977ba4ae5b4f315a7d1b91bcc",
			"MaxMoney": 500000,
			"MinMoney": 1,
			"Name": "交通银行",
			"PayLevel": ",0,1,4,6,8,10,",
			"Remark": null,
			"Script": null,
			"ScriptSpan": "45369",
			"Status": 1,
			"Type": 1,
		}];
		//两种都可以
		res.json({
			"StatusCode": 0,
			"Data": {
				"BankCardPayList": BankCardPayList,
				"Version": null
			},
			ErrorCode: "00",
			"IsQrcode": false,
			"IsSuccess": true,
			"IsUrl": false,
			"Location": "",
			"Message": "",
			"QrCode": null
		});
	});
	route.post('/Payment/PaymentTransfer', function(req, res) {
	let username = req.session.username;
	var mobj = req.body;
	let Amount = parseInt(mobj.Amount);
	let type = mobj.type;
	let LoginName = mobj.LoginName;
	date = new Date()
	var withDrawTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() +
			1)) +
		"-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
		" " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' +
			date
			.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	var DepositTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() +
			1)) +
		"-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
		" " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' +
			date
			.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	//console.log(type+"received:"+Amount);
		//option value="-1">全部</option>
		//<option value="10">充值</option>
		//<option value="11">提款</option>
		//<option value="12">投注</option>
		//<option value="13">中奖</option>
		//<option value="14">人工存入</option>
		//<option value="15">人工提出</option>
		//<option value="16">活动</option>
		
		var  description = "银行卡充值";
		var dsql =
			`insert into  cp_moneydetails(username , type,description,createdTime,moneyStr ) 
			values( '${username}',10, '${description}','${DepositTime}','${Amount}')`
		
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
					"StatusCode": 0,
					"Data": djson,
					ErrorCode: "00",
					"IsQrcode": false,
					"IsSuccess": true,
					"IsUrl": false,
					"Location": "",
					"Message": "",
					"QrCode": null
				});
			}
		});
	});
	route.post('/Payment/PaymentScanPay', function(req, res) {
	let username = req.session.username;
	var mobj = req.body;
	let Amount = parseInt(mobj.Amount);
	let type = mobj.type;
	let LoginName = mobj.LoginName;
	date = new Date()
	var DepositTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() +
			1)) +
		"-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
		" " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' +
			date
			.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	//console.log(type+"received:"+Amount);
		//option value="-1">全部</option>
		//<option value="10">充值</option>
		//<option value="11">提款</option>
		//<option value="12">投注</option>
		//<option value="13">中奖</option>
		//<option value="14">人工存入</option>
		//<option value="15">人工提出</option>
		//<option value="16">活动</option>
		if (type==1){
		var  description = "微信充值";	
		}
		var  description = "支付宝充值";
		var dsql =
			`insert into  cp_moneydetails(username , type,description,createdTime,moneyStr ) 
			values( '${username}',10, '${description}','${DepositTime}','${Amount}')`
		
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
					"StatusCode": 0,
					"Data": djson,
					ErrorCode: "00",
					"IsQrcode": false,
					"IsSuccess": true,
					"IsUrl": false,
					"Location": "",
					"Message": "",
					"QrCode": null
				});
			}
		});
		
	});
	return route;
}

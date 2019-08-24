package controllers

import (
	"cpgo/models"
	"encoding/json"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"time"
)

type PaymentController struct {
	beego.Controller
}

func (self *PaymentController) Testget() {
	//var jmap make(map[string]interface{})
	jmap := make(map[string]interface{})
	jmap["personNum"] = 1
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *PaymentController) Getqrcode() {
	o := orm.NewOrm()
	username:=""
	v := self.GetSession("username")
	if v == nil || v=="" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	var payments []orm.Params
	dsql := "SELECT * FROM " + models.TableName("payment")
	eff, err := o.Raw(dsql).Values(&payments)
	if err == nil && eff > 0 {
		QrCodepic:=payments[0]["qrcodepic"].(string)
		out := make(map[string]interface{})
		out["StatusCode"] = 0
		out["IsQrcode"] = false
		out["IsSuccess"] = true
		out["IsUrl"] = false
		out["Location"] = ""
		out["Message"] = ""
		out["QrCode"] = nil
		out["Data"] = QrCodepic
		self.Data["json"] = out
		self.ServeJSON()
	}

}
func (self *PaymentController) GetPayScan() {


	var PayScanList = `[{
			"CompanyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"CreateDate": "/Date(1545619301877)/",
			"CurMoney": "",
			"FilePath": "",
			"ID": "133e69ade1f94b76b935b76f0f438c48",
			"IsAuto": false,
			"LoginAccount": "",
			"LoginPwd": "",
			"MaxMoney": 2000,
			"MerchantType": "",
			"MinMoney": 1,
			"Name": "线下扫码微信充值",
			"PayLevel": ",0,1,2,3,4,5,6,7,",
			"PayeeAccount": "8888888",
			"PayeeName": "线下扫码提交通道",
			"QrCode": "",
			"Remark": "",
			"Script": "",
			"ScriptSpan": "36934",
			"Status": 1,
			"TotalMoney": "",
			"Type": 1
		},{
			"CompanyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"CreateDate": "/Date(1545619301877)/",
			"CurMoney": "",
			"FilePath": "",
			"ID": "133e69ade1f94b76b935b76f0f438c48",
			"IsAuto": false,
			"LoginAccount": "",
			"LoginPwd": "",
			"MaxMoney": 2000,
			"MerchantType": "",
			"MinMoney": 1,
			"Name": "线下扫码支付宝充值",
			"PayLevel": ",0,1,2,3,4,5,6,7,",
			"PayeeAccount": "8888888",
			"PayeeName": "线下扫码提交通道",
			"QrCode": "",
			"Remark": "",
			"Script": "",
			"ScriptSpan": "36934",
			"Status": 1,
			"TotalMoney": "",
			"Type": 3
		}]`
	//json str 转map
	var jmap []map[string]interface{}
	if err := json.Unmarshal([]byte(PayScanList), &jmap); err == nil {
		println("banklist to map convert ok")
	}

	res := make(map[string]interface{})
	res["Version"] = nil
	res["PayScanList"] = jmap
	out := make(map[string]interface{})
	out["StatusCode"] = 0
	out["IsQrcode"] = false
	out["IsSuccess"] = true
	out["IsUrl"] = false
	out["Location"] = ""
	out["Message"] = ""
	out["QrCode"] = nil
	out["Data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *PaymentController) PaymentScanPay() {
	var flist map[string]interface{}
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &flist); err == nil {
		println("json to map convert ok")
	}
	Amount:=flist["Amount"]
	ptype:=flist["type"]
	o := orm.NewOrm()
	username:=""
	v := self.GetSession("username")
	if v == nil || v=="" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	DepositTime := time.Now().Format("2006-01-02 15:04:05")
	description := "支付宝充值"
	if ptype=="1"{
		  description = "微信充值"
	}
	//option value="-1">全部</option>
	//<option value="10">充值</option>
	//<option value="11">提款</option>
	//<option value="12">投注</option>
	//<option value="13">中奖</option>
	//<option value="14">人工存入</option>
	//<option value="15">人工提出</option>
	//<option value="16">活动</option>
	sql := "INSERT INTO " + models.TableName("moneydetails") +
		"(username , type,description,createdTime,moneyStr) " +
		"VALUES (?,10,?,?,?)"
	ret, err := o.Raw(sql, username, description, DepositTime, Amount).Exec()
	if err == nil {
		num, _ := ret.RowsAffected()
		println("scanpay insertmoneydetails %d", num)
	}
	res := make(map[string]interface{})
	res["msg"] = "提交成功"
	out := make(map[string]interface{})
	out["StatusCode"] = 0
	out["IsQrcode"] = false
	out["IsSuccess"] = true
	out["IsUrl"] = false
	out["Location"] = ""
	out["Message"] = ""
	out["QrCode"] = nil
	out["Data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}

func (self *PaymentController) GetPayTransferList() {


	var BankCardPayList = `[{
		"Account": "41060318010078338",
		"AccountName": "广商贸有限公司",
		"Address": "请勿保存，随时更换",
		"BankCode": "BCM",
		"Branch": "随时更换，请勿保存",
		"CompanyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
		"CreateDate": "/Date(1562569175800)/",
		"FilePath": "",
		"ID": "5306764977ba4ae5b4f315a7d1b91bcc",
		"MaxMoney": 500000,
		"MinMoney": 1,
		"Name": "交通银行",
		"PayLevel": ",0,1,4,6,8,10,",
		"Remark": "",
		"Script": "",
		"ScriptSpan": "45369",
		"Status": 1,
		"Type": 1
	}]`
	//json str 转map
	var jmap []map[string]interface{}
	if err := json.Unmarshal([]byte(BankCardPayList), &jmap); err == nil {
		println("banklist to map convert ok")
	}

	res := make(map[string]interface{})

	res["Version"] = nil
	res["BankCardPayList"] = jmap
	out := make(map[string]interface{})
	out["StatusCode"] = 0
	out["IsQrcode"] = false
	out["IsSuccess"] = true
	out["IsUrl"] = false
	out["Location"] = ""
	out["Message"] = ""
	out["QrCode"] = nil
	out["Data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *PaymentController) PaymentTransfer() {
	var flist map[string]interface{}
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &flist); err == nil {
		println("json to map convert ok")
	}
	Amount:=flist["Amount"]
	o := orm.NewOrm()
	username:=""
	v := self.GetSession("username")
	if v == nil || v=="" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	DepositTime := time.Now().Format("2006-01-02 15:04:05")
	description := "银行卡充值！"
	//option value="-1">全部</option>
	//<option value="10">充值</option>
	//<option value="11">提款</option>
	//<option value="12">投注</option>
	//<option value="13">中奖</option>
	//<option value="14">人工存入</option>
	//<option value="15">人工提出</option>
	//<option value="16">活动</option>
	sql := "INSERT INTO " + models.TableName("moneydetails") +
		"(username , type,description,createdTime,moneyStr) " +
		"VALUES (?,10,?,?,?)"
	ret, err := o.Raw(sql, username, description, DepositTime, Amount).Exec()
	if err == nil {
		num, _ := ret.RowsAffected()
		println("insertmoneydetails %d", num)
	}
	res := make(map[string]interface{})
	res["msg"] = "提交成功"
	out := make(map[string]interface{})
	out["StatusCode"] = 0
	out["IsQrcode"] = false
	out["IsSuccess"] = true
	out["IsUrl"] = false
	out["Location"] = ""
	out["Message"] = ""
	out["QrCode"] = nil
	out["Data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}

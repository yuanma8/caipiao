package controllers

import (
	"cpgo/models"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"time"
)

type UserController struct {
	beego.Controller
}

func (self *UserController) Walletdetail() {

	var flist map[string]interface{}
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &flist); err == nil {
		println("json to map convert ok")
	}
	startDate := flist["startDate"]
	endDate := flist["endDate"]
	//page:=flist["page"]
	mtype := flist["type"]
	o := orm.NewOrm()
	username := ""
	v := self.GetSession("username")
	if v == nil || v == "" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	oo := make(map[string]interface{})
	oout := make(map[int]interface{})
	var mdetails []orm.Params
	dsql := ""
	if mtype == "-1" {
		dsql = "SELECT * FROM " + models.TableName("moneydetails") + " where username=?  and createdTime>? and createdTime<=? order by createdTime desc limit 0,20 "
		eff, err := o.Raw(dsql, username, startDate, endDate).Values(&mdetails)
		if err == nil && eff > 0 {
			for i := 0; i < len(mdetails); i++ {
				oo["type"] = mdetails[i]["type"]
				oo["description"] = mdetails[i]["description"]
				oo["createdTime"] = mdetails[i]["createdTime"]
				oo["moneyStr"] = mdetails[i]["moneyStr"]
				oout[i] = oo
			}

		}
	} else {
		dsql = "SELECT * FROM " + models.TableName("moneydetails") + " where username=?  and type=? and createdTime>? and createdTime<=? order by createdTime desc limit 0,20"
		eff, err := o.Raw(dsql, username, mtype, startDate, endDate).Values(&mdetails)
		if err == nil && eff > 0 {
			for i := 0; i < len(mdetails); i++ {
				oo["type"] = mdetails[i]["type"]
				oo["description"] = mdetails[i]["description"]
				oo["createdTime"] = mdetails[i]["createdTime"]
				oo["moneyStr"] = mdetails[i]["moneyStr"]
				oout[i] = oo
			}

		}
	}

	res := make(map[string]interface{})
	res["money"] = "0.00"
	res["moneyFreeze"] = "0.00"
	res["moneyUsable"] = "0.00"
	res["walletList"] = oout
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *UserController) Botin() {
	var user models.User
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &user); err == nil {
		println("json to map convert ok")
	}
	var password = user.Password
	password = md5V("Q" + password + "W")
	username := user.Username
	u, _ := models.UserGetByName(username)
	res := make(map[string]interface{})
	out := make(map[string]interface{})
	if u != nil {
		v := self.GetSession("username")
		if v == nil || v == "" {
			self.SetSession("username", username)

		}
		if password == u.Botpwd {
			res["username"] = u.Username
			res["realname"] = u.Bankusername
			res["phone"] = u.Phone
			res["headphoto"] = u.Headphoto
			out["code"] = 200
			out["data"] = res

		} else {
			out["msg"] = "用户名或密码不正确"
			out["status"] = -2
		}
	}
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *UserController) Login() {
	var user models.User
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &user); err == nil {
		println("json to map convert ok")
	}
	var password = user.Password
	password = md5V("Q" + password + "W")
	username := user.Username
	u, _ := models.UserGetByName(username)
	res := make(map[string]interface{})
	out := make(map[string]interface{})
	if u != nil {
		v := self.GetSession("username")
		if v == nil || v == "" {
			self.SetSession("username", username)

		}
		if password == u.Password {
			res["username"] = u.Username
			res["realname"] = u.Bankusername
			res["phone"] = u.Phone
			res["headphoto"] = u.Headphoto
			out["code"] = 200
			out["data"] = res

		} else {
			out["msg"] = "用户名或密码不正确"
			out["status"] = -2
		}
	}
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *UserController) Register() {
	var user = make(map[string]interface{})
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &user); err == nil {
		println("json to map convert ok")
	}
	var password = user["PassWord"].(string)
	password = md5V("Q" + password + "W")
	username := user["UserName"].(string)
	u, _ := models.UserGetByName(username)
	res := make(map[string]interface{})
	if u != nil {
		out := make(map[string]interface{})
		out["msg"] = "用户已存在"
		out["status"] = -2
		self.Data["json"] = out

	} else {
		v := self.GetSession("username")
		if v == nil {
			self.SetSession("username", username)

		}
		o := orm.NewOrm()
		regtime := time.Now().Format("2006-01-02 15:04:05")
		sql := "INSERT INTO " + models.TableName("user") + "(username,bankusername,phone,password,paypwd,regtime,totalmoney,freezemoney,percentage) " +
			"VALUES (?,?,?,?,?,?,0,0,12)"
		ret, err := o.Raw(sql, username, user["RealName"].(string), user["Phone"].(string), password, user["PayPwd"].(string), regtime).Exec()
		if err == nil {
			num, _ := ret.RowsAffected()
			fmt.Println("mysql row affected nums: ", num)
		}
		res["userName"] = username
		res["phone"] = user["Phone"].(string)
		out := make(map[string]interface{})
		out["code"] = 200
		out["data"] = res
		self.Data["json"] = out

	}
	self.ServeJSON()
}
func (self *UserController) Bindbank() {

	var bankinfo map[string]interface{}
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &bankinfo); err == nil {
		println("json to map convert ok")
	}
	bankaccount := bankinfo["bankAccount"]
	bankname := bankinfo["bankName"]
	branchname := bankinfo["branchName"]
	o := orm.NewOrm()
	username := ""
	v := self.GetSession("username")
	if v == nil || v == "" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	sql := "UPDATE " + models.TableName("user") +
		" SET bankaccount = ?,bankname=?,branchname = ?	WHERE username = ?"
	ret, err := o.Raw(sql, bankaccount, bankname, branchname, username).Exec()
	if err == nil {
		num, _ := ret.RowsAffected()
		fmt.Println("bindbank row affected nums: ", num)
	}
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = "更新银行卡成功"
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *UserController) Balance() {
	var user models.User
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &user); err == nil {
		println("balance json to map convert ok"+user.Username)
	}
	username := user.Username
	v := self.GetSession("username")
	if v == nil || v == "" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	println("v:"+ v.(string))
	u, _ := models.UserGetByName(username)
	//var data1= map[string]string{"username":user1.Username,"realname":"data"}
	res := make(map[string]interface{})
	if u != nil {
		res["username"] = u.Username
		res["realname"] = u.Bankusername
		res["phone"] = u.Phone
		res["headphoto"] = u.Headphoto
		res["accountBalanceStr"] = u.Totalmoney
		res["lockBalanceStr"] = u.Freezemoney
		res["bankAccount"] = u.Bankaccount
		res["bankName"] = u.Bankname
		res["bankUserName"] = u.Bankusername
	}
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *UserController) Botinfo() {
	var user models.User
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &user); err == nil {
		println("json to map convert ok")
	}
	username := user.Username
	v := self.GetSession("username")
	if v == nil || v == "" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	u, _ := models.UserGetByName(username)
	//var data1= map[string]string{"username":user1.Username,"realname":"data"}
	res := make(map[string]interface{})
	if u != nil {
		res["username"] = u.Username
		res["botactive"] = u.Botactive
		res["botonline"] = u.Botonline
		res["percentage"] = u.Percentage
		res["accountBalanceStr"] = u.Totalmoney
		res["lockBalanceStr"] = u.Freezemoney
	}
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *UserController) GetReturnMoneyFlag() {
	var jmap = make(map[string]interface{})
	jmap["unReadMsgCount"] = 1
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *UserController) GetCompanyInfo() {
	companyinfo := `{
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
				"chatUrl": "https://chatya9av8qa8cfca.ddkaixin.com/chat/room/"
			}`
	var jmap = make(map[string]interface{})
	if err := json.Unmarshal([]byte(companyinfo), &jmap); err == nil {
		println("json to map convert ok")
	}

	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}

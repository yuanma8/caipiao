package controllers

import (
	"cpgo/models"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/bitly/go-simplejson"
	"math"
	"math/rand"

	//"reflect"
	"strconv"
	"strings"
	"time"
)

type OrderController struct {
	beego.Controller
}

func (self *OrderController) Yingkui() {
	username := ""
	v := self.GetSession("username")
	if v == nil || v == "" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}

	jmap, err := simplejson.NewJson([]byte(self.Ctx.Input.RequestBody))
	if err != nil {
		fmt.Printf("%v\n", err)
		return
	}
	var data []map[string]interface{}
	dtemp, _ := jmap.Get("data").String()
	if err := json.Unmarshal([]byte(dtemp), &data); err == nil {
		println("ying kui json to map convert ok")
	}
	money := data[0]["money"].(float64)
	playId := data[0]["playId"].(string)
	PeriodNumber, _ := jmap.Get("PeriodNumber").String()
	println(PeriodNumber)
	o := orm.NewOrm()

	bettime := time.Now().Format("2006-01-02 15:04:05")
	sql := "INSERT INTO " + models.TableName("order") + "(username,PeriodNumber,money, playId,status,betTime) " +
		"VALUES (?,?,?,?,0,?)"
	res, err := o.Raw(sql, username, PeriodNumber, money, playId, bettime).Exec()
	if err == nil {
		num, _ := res.RowsAffected()
		fmt.Println("yingkui row affected nums: ", num)
		reduceusertable(username, money)
		ying, kui, ycount, kcount := sumincome(username)
		percentage := math.Trunc(ying/(ying+kui)*1e2+0.5) * 1e-2
		yingkui := math.Trunc((ying-kui)*1e2+0.5) * 1e-2

		ret := make(map[string]interface{})

		ret["percentage"] = percentage
		ret["yingkui"] = yingkui
		ret["lianzhong"] = ycount
		ret["liangua"] = kcount
		ret["kaijiang"] = rand.Intn(10)

		out := make(map[string]interface{})
		out["code"] = 200
		out["data"] = ret
		self.Data["json"] = out
		self.ServeJSON()
	}

}
func sumincome(username string) (float64, float64, int64, int64) {
	var ying = 0.00
	var kui = 0.00
	o := orm.NewOrm()
	betTime := time.Now().Format("2006-01-02") + " " + "00:00:01"
	sql := "select * FROM " + models.TableName("order") +
		"  WHERE username = ? and status =? and betTime>?"
	var s1 []orm.Params
	ret, err := o.Raw(sql, username, 1, betTime).Values(&s1)
	if err == nil && ret > 0 {
		for i := 0; i < len(s1); i++ {
			tmoney1, _ := strconv.ParseFloat(s1[i]["rewardRebate"].(string), 32)
			m1 := math.Trunc(tmoney1*1e2+0.5) * 1e-2
			money, _ := strconv.ParseFloat(s1[i]["money"].(string), 32)
			m2 := math.Trunc(money*1e2+0.5) * 1e-2
			ying = ying + m1 - m2
		}

	}
	var s2 []orm.Params
	sql = "select * FROM " + models.TableName("order") +
		"  WHERE username = ? and status =? and betTime>?"
	eff, err := o.Raw(sql, username, 2, betTime).Values(&s2)
	if err == nil && eff > 0 {
		for i := 0; i < len(s2); i++ {
			tmoney1, _ := strconv.ParseFloat(s2[i]["rewardRebate"].(string), 32)
			m1 := math.Trunc(tmoney1*1e2+0.5) * 1e-2
			money, _ := strconv.ParseFloat(s2[i]["money"].(string), 32)
			m2 := math.Trunc(money*1e2+0.5) * 1e-2
			kui = kui + m1+ m2
		}
	}
	return ying, kui, ret, eff
}
func reduceusertable(username string, money float64) {
	o := orm.NewOrm()

	var user []orm.Params
	dsql := "SELECT * FROM " + models.TableName("user") + " where username=? "
	eff, err := o.Raw(dsql, username).Values(&user)
	if err == nil && eff > 0 {
		tmoney := user[0]["totalmoney"].(string)
		tmoney1, _ := strconv.ParseFloat(tmoney, 32)
		totalMoney := math.Trunc(tmoney1*1e2+0.5) * 1e-2
		totalMoney = totalMoney - money
		sql := "UPDATE " + models.TableName("user") +
			" SET totalmoney = ? WHERE username = ? "
		ret, err := o.Raw(sql, totalMoney, username).Exec()
		if err == nil {
			num, _ := ret.RowsAffected()
			fmt.Println("update reduceusertable nums: ", num)
		}

	}
}

func (self *OrderController) Rewardrebate() {
	o := orm.NewOrm()
	sql := "SELECT * FROM " + models.TableName("order") + " where status = ? "
	var maps []orm.Params
	num1, err := o.Raw(sql, 0).Values(&maps)
	if err == nil && num1 > 0 {
		for i := 0; i < len(maps); i++ {
			order := maps[i]
			playId := order["playId"].(string)
			var lotteryId = playId[0:2]
			var openPeriod = order["PeriodNumber"]
			var username = order["username"].(string)
			betTime := order["betTime"].(string)

			var mstring = order["money"].(string)
			betMoney, _ := strconv.ParseFloat(mstring, 32)
			var openh []orm.Params
			dsql := "SELECT * FROM " + models.TableName("openhistory") + " where lotteryId=? and openPeriod=?"
			num1, err := o.Raw(dsql, lotteryId, openPeriod).Values(&openh)
			if err == nil && num1 > 0 {
				var castingNum, _ = strconv.ParseInt(playId[3:4], 10, 32) //下注的数字
				if castingNum == 0 {
					castingNum = 10
				}
				var castingtype, _ = strconv.ParseInt(playId[4:6], 10, 32) //下注的玩法
				openNum := strings.Split(openh[0]["opencode"].(string), ",")
				if lotteryId == "50" || lotteryId == "81" || lotteryId == "80" || lotteryId == "55" || lotteryId ==
					"88" || lotteryId == "89" || lotteryId == "92" || lotteryId == "93" {
					open, _ := strconv.ParseInt(openNum[castingNum-1], 10, 32)
					open1, _ := strconv.ParseInt(openNum[10-castingNum], 10, 32)
					//println(open)
					var rebate = 0
					switch castingtype {
					case 1: //大
						if open > 5 {
							rebate = 1
						}
						break
					case 2: //小
						if open < 6 {
							rebate = 1
						}
						break
					case 3: //双
						if open%2 != 0 {
							rebate = 1
						}
						break
					case 4: //双
						if open%2 == 0 {
							rebate = 1
						}
						break
					case 5: //龙
						if open > open1 {
							rebate = 1
						}
						break
					case 6: //虎
						if open < open1 {
							rebate = 1
						}
						break
					case 7: //数字
						if open == 1 {
							rebate = 1
						}
						break
					case 8: //数字
						if open == 2 {
							rebate = 1
						}
						break
					case 9: //数字
						if open == 3 {
							rebate = 1
						}
						break
					case 10: //数字
						if open == 4 {
							rebate = 1
						}
						break
					case 11: //数字
						if open == 5 {
							rebate = 1
						}
						break
					case 12: //数字
						if open == 6 {
							rebate = 1
						}
						break
					case 13: //数字
						if open == 7 {
							rebate = 1
						}
						break
					case 14: //数字
						if open == 8 {
							rebate = 1
						}
						break
					case 15: //数字
						if open == 9 {
							rebate = 1
						}
						break
					case 16: //数字
						if open == 10 {
							rebate = 1
						}
						break
					}
					if rebate == 1 {
						var odd []orm.Params
						dsql = "SELECT * FROM " + models.TableName("dmodel") + " where lotteryId=? and playId=?"
						num1, err := o.Raw(dsql, lotteryId, playId).Values(&odd)
						if err == nil && num1 > 0 {
							oddtemp := odd[0]["odds"].(string)
							odds, _ := strconv.ParseFloat(oddtemp, 32)
							reward := math.Trunc(odds*betMoney*1e2+0.5) * 1e-2

							updateorderstatus(reward, 1, playId, username, betTime)
							insertmoneydetais(reward, username)
						}
					} else {
						updateorderstatus(0, 2, playId, username, betTime)
					}
				}

			}

		}
	}
	res := make(map[string]interface{})
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
func insertmoneydetais(reward float64, username string) {
	o := orm.NewOrm()
	createdTime := time.Now().Format("2006-01-02 15:04:05")
	description := "中奖金额转入！"
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
		"VALUES (?,13,?,?,?)"
	res, err := o.Raw(sql, username, description, createdTime, reward).Exec()
	if err == nil {
		num, _ := res.RowsAffected()
		println("insertmoneydetails %d", num)
	}
}

func updateorderstatus(reward float64, status int, playId string, username string, betTime string) {
	o := orm.NewOrm()
	sql := "UPDATE " + models.TableName("order") +
		" SET rewardRebate = ?,status=? WHERE username = ? and playId =? and betTime=?"
	ret, err := o.Raw(sql, reward, status, username, playId, betTime).Exec()
	if err == nil {
		num, _ := ret.RowsAffected()
		fmt.Println("update orderstatus nums: ", num)
		var user []orm.Params
		dsql := "SELECT * FROM " + models.TableName("user") + " where username=? "
		eff, err := o.Raw(dsql, username).Values(&user)
		if err == nil && eff > 0 {
			tmoney := user[0]["totalmoney"].(string)
			tmoney1, _ := strconv.ParseFloat(tmoney, 32)
			totalMoney := math.Trunc(tmoney1*1e2+0.5) * 1e-2
			totalMoney = reward + tmoney1
			sql := "UPDATE " + models.TableName("user") +
				" SET totalmoney = ? WHERE username = ? "
			ret, err := o.Raw(sql, totalMoney, username).Exec()
			if err == nil {
				num, _ := ret.RowsAffected()
				fmt.Println("update orderstatus nums: ", num)
			}
		}
	}
}
func (self *OrderController) Bet() {
	//var id = self.Ctx.Input.Param(":id")
	var bets = make(map[string]interface{})
	mobj := self.Ctx.Input.RequestBody
	json.Unmarshal(mobj, &bets)
	var betdata []map[string]interface{}
	var temp1 = bets["data"].(string)
	var temp = []byte(temp1)
	json.Unmarshal(temp, &betdata)
	PeriodNumber := bets["PeriodNumber"].(string)
	username := ""
	v := self.GetSession("username")
	if v == nil {
		self.SetSession("username", "")
	} else {
		username = v.(string)
	}

	var betMoney = 0.00
	var money = 0.00
	for i := 0; i < len(betdata); i++ {
		mtemp := betdata[i]["money"]
		money = mtemp.(float64)
		betMoney = betMoney + money

	}
	o := orm.NewOrm()
	for i := 0; i < len(betdata); i++ {
		mtemp := betdata[i]["money"]
		money = mtemp.(float64)
		playId := betdata[i]["playId"]
		bettime := time.Now().Format("2006-01-02 15:04:05")
		sql := "INSERT INTO " + models.TableName("order") + "(username,PeriodNumber,money, playId,status,betTime) " +
			"VALUES (?,?,?,?,0,?)"
		res, err := o.Raw(sql, username, PeriodNumber, money, playId, bettime).Exec()
		if err == nil {
			num, _ := res.RowsAffected()
			fmt.Println("mysql row affected nums: ", num)
		}

	}

	sql := "SELECT * FROM " + models.TableName("user") + " where username='" + username + "'"
	var userinfo []orm.Params
	num, err := o.Raw(sql).Values(&userinfo)

	if err == nil && num > 0 {

		tempmoney := userinfo[0]["totalmoney"]
		totalMoney, err := strconv.ParseFloat(tempmoney.(string), 64)
		if err == nil {
		}
		totalMoney = totalMoney - betMoney

		res, err := o.Raw("UPDATE cp_user SET totalMoney  = ? WHERE username =?", totalMoney, username).Exec()
		if err == nil {
			num, _ := res.RowsAffected()
			fmt.Println("mysql row affected nums: ", num)
		}

	}
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = ""
	self.Data["json"] = out
	self.ServeJSON()

}

func (self *OrderController) Withdrawsubmit() {
	var user = make(map[string]interface{})
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &user); err == nil {
		println("Withdrawsubmit json to map convert ok")
	}

	v := self.GetSession("username")
	username := v.(string)

	wtemp := user["money"].(string)
	money, err := strconv.ParseFloat(wtemp, 64)

	paypwd := user["paypwd"]
	//	bankid := user["bankid"]

	sql := "SELECT * FROM " + models.TableName("user") + " where username=? and paypwd=?"
	out := make(map[string]interface{})

	o := orm.NewOrm()
	var userinfo []orm.Params
	num, err := o.Raw(sql, username, paypwd).Values(&userinfo)
	if err == nil && num > 0 {

		tempmoney := userinfo[0]["totalmoney"]
		totalMoney, err := strconv.ParseFloat(tempmoney.(string), 64)
		if err == nil {
		}
		totalMoney = totalMoney - money
		sql := "UPDATE " + models.TableName("user") +
			" SET totalmoney = ? WHERE username = ? "
		ret, err := o.Raw(sql, totalMoney, username).Exec()
		if err == nil {
			num, _ := ret.RowsAffected()
			fmt.Println("update withdraw nums: ", num)
		}
		insertwithdrawdetais(money, username)
		res := make(map[string]interface{})
		res["msg"] = "提交成功"
		out["code"] = 200
		out["data"] = res
	} else {
		out["msg"] = "提现不成功，可能是密码错误！"
		out["status"] = -2
	}
	self.Data["json"] = out
	self.ServeJSON()

}
func insertwithdrawdetais(reward float64, username string) {
	o := orm.NewOrm()
	var withDrawTime = time.Now().Format("2006-01-02 15:04:05")
	description := "提现！"
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
		"VALUES (?,11,?,?,?)"
	res, err := o.Raw(sql, username, description, withDrawTime, reward).Exec()
	if err == nil {
		num, _ := res.RowsAffected()
		println("insertmoneydetails %d", num)
	}
}
func (self *OrderController) Curuserbetmoney() {
	var user models.User
	if err:=json.Unmarshal(self.Ctx.Input.RequestBody, &user); err == nil {
		println("json to map convert ok")
	}
	username := user.Username
	v := self.GetSession("username")
	if v == nil || v=="" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	u, _ := models.UserGetByName(username)
	//var data1= map[string]string{"username":user1.Username,"realname":"data"}
	res := make(map[string]interface{})
	if u != nil {
		res["totalWinMoney"] = 0
		res["totalBetMoney"] = 0
		res["totalProfit"] =0

	}
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *OrderController) Orderfind() {

	var flist map[string]interface{}
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &flist); err == nil {
		println("json to map convert ok")
	}
	status:=flist["Status"]
	bettime:=flist["startDate"]
	o := orm.NewOrm()
	username:=""
	v := self.GetSession("username")
	if v == nil || v=="" {
		self.SetSession("username", username)
	} else {
		username = v.(string)
	}
	 oo:= make(map[string]interface{})
	oout:= make(map[int]interface{})
	var orders []orm.Params
	dsql := "SELECT * FROM " + models.TableName("order") + " where username=?  and status=? and betTime>?"
	eff, err := o.Raw(dsql, username,status,bettime).Values(&orders)
	if err == nil && eff > 0 {
		for i:=0;i<len(orders);i++{
			oo["id"]=i
			oo["username"] = orders[i]["username"]
			oo["lotteryName"]= "北京pk10"
				oo["periods"]= orders[i]["PeriodNumber"]
				oo["lotteryID"]=orders[i]["playId"].(string)[0:2]
				oo["status"]=orders[i]["status"]
				oo["rewardRebate"]=orders[i]["rewardRebate"]
				oo["betTime"]=orders[i]["betTime"]
				oo["betMoney"]=orders[i]["money"]
         oout[i]=oo
		}

	}
	res:= make(map[string]interface{})
	res["items"]=oout
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
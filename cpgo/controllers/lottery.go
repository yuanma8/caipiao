package controllers

import (
	"cpgo/models"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
)

type LotteryController struct {
	beego.Controller
}
func (self *LotteryController) Playlist() {
	var lotteryid = self.Ctx.Input.Param(":lotteryid")
	var id = self.Ctx.Input.Param(":id")
	//var orderList []map[string]interface{}
		dlists, _ := models.Dmodellist(lotteryid ,id )

	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = dlists
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *LotteryController) Infoid() {
	var id = self.Ctx.Input.Param(":id")
	var user models.User
	json.Unmarshal(self.Ctx.Input.RequestBody, &user)
	username := user.Username
	v := self.GetSession("username")
	if v == nil {
		self.SetSession("username", username)
	}else{
		username=v.(string)
	}
	openResult := make(map[string]interface{})
	ret, _ := models.OpenLotteryId(id)
	openResult["openPeriod"] = ret.Openperiod
	openResult["opencode"] = ret.Opencode
	openResult["opentime"] = ret.Opentime
	openResult["opentimestamp"] = ""
	openResult["resultColor"] = ""
	openResult["zodiac"] = ""
	lotteryInfo := make(map[string]interface{})
	lotteryInfo["blockTime"] = ret.Blocktime
	lotteryInfo["curPeriodNum"] = ret.Curperiodnum
	lotteryInfo["isHot"] = ret.Ishot
	lotteryInfo["lotteryId"] = ret.Lotteryid
	lotteryInfo["lotteryName"] = ret.Lotteryname
	lotteryInfo["menuDetails"] = ""
	lotteryInfo["nextTime"] = ret.Nexttime
	lotteryInfo["openResult"] = openResult
	lotteryInfo["remainTime"] = ret.Remaintime
	lotteryInfo["sysTime"] = ret.Systime
	//var orderList []map[string]interface{}
	olist, _ := models.OrderList(username)

	jmap := make(map[string]interface{})
	jmap["lotteryInfo"] = lotteryInfo
	jmap["orderList"] = olist
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *LotteryController) All() {
	//var user models.User
	var menuDetails = `[{"gamePlays": "","id": "49D343E11B3A4D8E820964ED1710D414",
		"isHot": "","lotteryId": 50,"menuDetails": "","menuName": "双面玩法",
		"sort": 1},
        {"gamePlays": "","id": "B469CEDC14CB4A079667B9787A20F03D",
        "isHot": "","lotteryId": 50,"menuDetails": "","menuName": "数字",
		"sort": 2}]`
	/*, {
		"gamePlays": nil,
		"id": "89E7681103FA4DD2B571D9A929D48597",
		"isHot": nil,
		"lotteryId": 50,
		"menuDetails": nil,
		"menuName": "冠亚和",
		"sort": 3
	}, {
		"gamePlays": nil,
		"id": "89E7681103FA4DD2B571D9A929D48597",
		"isHot": nil,
		"lotteryId": 50,
		"menuDetails": nil,
		"menuName": "冠亚组合",
		"sort": 4
	} */

	var openResult = `{
	"openPeriod": "735252",
	"opencode": "3,1,10,2,6,4,5,8,9,7",
	"opentime": "2019-06-24T13:51:16",
	"opentimestamp": "",
	"resultColor": "",
	"zodiac": ""
	}`
	var lotteryList = `[{
	"blockTime": 120,
	"curPeriodNum": 6230674,
	"isHot": 1,
	"lotteryId": 50,
	"lotteryName": "北京pk10",
	"menuDetails": ` + menuDetails + `, 
	"nextTime": "2019-06-24T14:51:16",
	"openResult":  ` + openResult + `,
	"remainTime": 1561352900,
	"sysTime": 1561352700
	},
	{
	"blockTime": 120,
	"curPeriodNum": 201907030321,
	"isHot": 1,
	"lotteryId": 80,
	"lotteryName": "急速赛车",
	"menuDetails": ` + menuDetails + `, 
	"nextTime": "2019-06-24T14:51:16",
	"openResult":  ` + openResult + `,
	"remainTime":1562134200,
	"sysTime": 1562134181
	},{
	"blockTime": 20,
	"curPeriodNum": 201906230674,
	"isHot": 1,
	"lotteryId": 81,
	"lotteryName": "急速飞艇",
	"menuDetails": ` + menuDetails + `, 
	"nextTime": "0001-01-01T00:00:00",
	"openResult":  ` + openResult + `,
	"remainTime":1562134245,
	"sysTime": 1562134181
	},  {
	"blockTime": 120,
	"curPeriodNum": 6230674,
	"isHot": 1,
	"lotteryId": 55,
	"lotteryName": "幸运飞艇",
	"menuDetails": ` + menuDetails + `, 
	"nextTime": "2019-06-24T14:51:16",
	"openResult":  ` + openResult + `,
	"remainTime": 1561352900,
	"sysTime": 1561352700
	}, {
	"blockTime": 120,
	"curPeriodNum": 6230674,
	"isHot": 1,
	"lotteryId": 88,
	"lotteryName": "德国赛车",
	"menuDetails":` + menuDetails + `, 
	"nextTime": "2019-06-24T14:51:16",
	"openResult":  ` + openResult + `,
	"remainTime": 1561352900,
	"sysTime": 1561352700
	}, {
	"blockTime": 120,
	"curPeriodNum": 6230674,
	"isHot": 1,
	"lotteryId": 89,
	"lotteryName": "德国飞艇",
	"menuDetails":` + menuDetails + `, 
	"nextTime": "2019-06-24T14:51:16",
	"openResult": ` + openResult + `,
	"remainTime": 1561352900,
	"sysTime": 1561352700
	}, {
	"blockTime": 120,
	"curPeriodNum": 6230674,
	"isHot": 1,
	"lotteryId": 92,
	"lotteryName": "MC赛车",
	"menuDetails": ` + menuDetails + `, 
	"nextTime": "2019-06-24T14:51:16",
	"openResult": ` + openResult + `,
	"remainTime": 1561352900,
	"sysTime": 1561352700
	}, {
	"blockTime": 120,
	"curPeriodNum": 6230674,
	"isHot": 1,
	"lotteryId": 93,
	"lotteryName": "MC飞艇",
	"menuDetails": ` + menuDetails + `, 
	"nextTime": "2019-06-24T14:51:16",
	"openResult":  ` + openResult + `,
	"remainTime": 1561352900,
	"sysTime": 1561352700
	},  {
	"blockTime": 120,
	"curPeriodNum": 6230674,
	"isHot": 1,
	"lotteryId": 84,
	"lotteryName": "5分彩",
	"menuDetails":` + menuDetails + `, 
	"nextTime": "0001-01-01T00:00:00",
	"openResult":  ` + openResult + `,
	"remainTime": "",
	"sysTime": 1561352700
	}, {
	"blockTime": 120,
	"curPeriodNum": 6230674,
	"isHot": 1,
	"lotteryId": 94,
	"lotteryName": "欢乐彩",
	"menuDetails": ` + menuDetails + `, 
	"nextTime": "0001-01-01T00:00:00",
	"openResult":  ` + openResult + `,
	"remainTime": 1561352900,
	"sysTime": 1561352700
	}, {
	"blockTime": 120,
	"curPeriodNum": 20190703031,
	"isHot": 1,
	"lotteryId": 95,
	"lotteryName": "欢乐生肖",
	"menuDetails": ` + menuDetails + `, 
	"nextTime": "0001-01-01T00:00:00",
	"openResult":  ` + openResult + `,
	"remainTime": "",
	"sysTime": 1561352700
	}]`

	//json str 转map
	var jmap []map[string]interface{}
	if err := json.Unmarshal([]byte(lotteryList), &jmap); err == nil {
		fmt.Println("=lottery all()==json str 转map=========")
		fmt.Println(jmap)
	}

	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}

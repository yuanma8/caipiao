package controllers

import (
	"cpgo/models"
	"strconv"

	//"cpgo/models"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/cache"
	"github.com/astaxie/beego/orm"
	"time"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "index.tpl"
}

func (self *MainController) Open() {
	//var lotteryList []models.Open
	var lotteryList []map[string]interface{}
	if err := json.Unmarshal(self.Ctx.Input.RequestBody, &lotteryList); err == nil {
		println("json to map convert ok")
	}
	res := make(map[string]interface{})
	o := orm.NewOrm()
	for i := 0; i < len(lotteryList); i++ {
		item := lotteryList[i]
		ftemp := item["curPeriodNum"].(float64)
		curPeriodNum := strconv.Itoa(int(ftemp))
		blockTime := item["blockTime"]
		isHot := item["isHot"]
		lotteryId := item["lotteryId"]
		lotteryName := item["lotteryName"]
		nextTime := item["nextTime"]
		remainTime := item["remainTime"]
		sysTime := item["sysTime"]
		mjson, _ := json.Marshal(item["openResult"]) //map to json
		var openResult = make(map[string]interface{})
		if err := json.Unmarshal(mjson, &openResult); err == nil {
			println("json to map convert ok")
		}
		openPeriod := openResult["openPeriod"]
		opencode := openResult["opencode"]
		opentime := openResult["opentime"]
		sql := "UPDATE " + models.TableName("open") +
			" SET curPeriodNum = ?,lotteryName=?,nextTime = ?, openPeriod = ? ,opencode = ? ,opentime = ?," +
			"remainTime = ? ,sysTime = ? 	WHERE lotteryId = ?"
		ret, err := o.Raw(sql, curPeriodNum, lotteryName, nextTime, openPeriod, opencode, opentime, remainTime, sysTime, lotteryId).Exec()
		if err == nil {
			num, _ := ret.RowsAffected()
			fmt.Println("mysql row affected nums: ", num)
		}
		sql = "SELECT * FROM " + models.TableName("openhistory") + " where lotteryId = ? and openPeriod=? "
		var maps []orm.Params
		num1, err := o.Raw(sql, lotteryId, openPeriod).Values(&maps)
		if err == nil && num1 > 0 {
			fmt.Println(maps[0]["openPeriod"]) // slene
		} else {

			sql := "INSERT INTO " + models.TableName("openhistory") +
				"(blockTime,curPeriodNum,isHot,lotteryId,lotteryName,nextTime,openPeriod,opencode,opentime ,remainTime,sysTime) " +
				"VALUES (?,?,?,?,?,?,?,?,?,?,?)"
			ret, err := o.Raw(sql, blockTime, curPeriodNum, isHot, lotteryId, lotteryName, nextTime, openPeriod, opencode, opentime, remainTime, sysTime).Exec()
			if err == nil {
				num, _ := ret.RowsAffected()
				fmt.Println("mysql row affected nums: ", num)
			}

		}
	}
	//regtime := time.Now().Format("2006-01-02 15:04:05")

	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = res
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *MainController) Avacount() {
	//var jmap make(map[string]interface{})
	jmap := make(map[string]interface{})
	jmap["unReadMsgCount"] = 1
	jmap["avaActivityCount"] = 1
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *MainController) SystemtestSpeed() {
	//var jmap make(map[string]interface{})
	jmap := make(map[string]interface{})
	jmap["personNum"] = "156134"
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *MainController) Systembanklist() {

	var banklist = `[{
                "bankName": "北京农村商业银行",
                "bankCode"	: "BRCB",
                "icon": "",
				"sort": 5650		},	{
				"bankName": "北京银行",
				"bankCode": "BOB",
				"icon": "image/bank/bob.png",
				"sort": 6		},			{
				"bankName": "成都农商银行",
				"bankCode": "CDNS",
				"icon": "",
				"sort": 5680			},			{
				"bankName": "成都银行",
				"bankCode": "CDYH",
				"icon": "",
				"sort": 5690			},			{
				"bankName": "大连银行",
				"bankCode": "BOD",
				"icon": "",
				"sort": 5620			},			{
				"bankName": "福建农商银行",
				"bankCode": "FJNS",
				"icon": "",
				"sort": 5670			},			{
				"bankName": "赣州银行",
				"bankCode": "GZYH",
				"icon": "",
				"sort": 5780			},			{
				"bankName": "工商银行",
				"bankCode": "ICBC",
				"icon": "",
				"sort": 5410			},			{
				"bankName": "光大银行",
				"bankCode": "CEB",
				"icon": "image/bank/ceb.png",
				"sort": 6			},			{
				"bankName": "广发银行",
				"bankCode": "GDB",
				"icon": "",
				"sort": 5530			},			{
				"bankName": "桂林银行",
				"bankCode": "GLYH",
				"icon": "",
				"sort": 5820			},			{
				"bankName": "哈尔滨银行",
				"bankCode": "HBB",
				"icon": "",
				"sort": 5640			},			{
				"bankName": "河北银行",
				"bankCode": "HBYH",
				"icon": "",
				"sort": 5850			},			{
				"bankName": "葫芦岛银行",
				"bankCode": "BOH",
				"icon": "",
				"sort": 5630			},			{
				"bankName": "华夏银行",
				"bankCode": "HXB",
				"icon": "image/bank/hxb.png",
				"sort": 6			},			{
				"bankName": "吉林银行",
				"bankCode": "LTD",
				"icon": "",
				"sort": 5610			},			{
				"bankName": "建设银行",
				"bankCode": "CCB",
				"icon": "",
				"sort": 5430			},			{
				"bankName": "江苏银行",
				"bankCode": "JSYH",
				"icon": "",
				"sort": 5860			},			{
				"bankName": "江西银行",
				"bankCode": "JXYH",
				"icon": "",
				"sort": 5870			},			{
				"bankName": "交通银行",
				"bankCode": "BCM",
				"icon": "",
				"sort": 5440			},			{
				"bankName": "锦州银行",
				"bankCode": "BOJ",
				"icon": "",
				"sort": 5580			},			{
				"bankName": "兰州银行",
				"bankCode": "LZYH",
				"icon": "",
				"sort": 5740			},			{
				"bankName": "廊坊银行",
				"bankCode": "LFYH",
				"icon": "",
				"sort": 5750			},			{
				"bankName": "辽宁农村信用社",
				"bankCode": "LCC",
				"icon": "",
				"sort": 5600			},			{
				"bankName": "临商银行",
				"bankCode": "LSYH",
				"icon": "",
				"sort": 5810			},			{
				"bankName": "民生银行",
				"bankCode": "CMBC",
				"icon": "",
				"sort": 5470			},			{
				"bankName": "农村信用社",
				"bankCode": "RCC",
				"icon": "image/bank/rcc.png",
				"sort": 7			},			{
				"bankName": "农业银行",
				"bankCode": "ABC",
				"icon": "image/bank/abc.png",
				"sort": 2			},			{
				"bankName": "平安银行",
				"bankCode": "PAB",
				"icon": "image/bank/pab.png",
				"sort": 6			},			{
				"bankName": "浦发银行",
				"bankCode": "SPDB",
				"icon": "image/bank/spdb.png",
				"sort": 6			},			{
				"bankName": "齐商银行",
				"bankCode": "QSYH",
				"icon": "",
				"sort": 5800			},			{
				"bankName": "日照银行",
				"bankCode": "RZYH",
				"icon": "",
				"sort": 5790			},			{
				"bankName": "上海农商银行",
				"bankCode": "SRCB",
				"icon": "",
				"sort": 5660			},			{
				"bankName": "上海银行",
				"bankCode": "SHB",
				"icon": "image/bank/shb.png",
				"sort": 6			},			{
				"bankName": "深圳发展银行",
				"bankCode": "SDB",
				"icon": "image/bank/sdb.png",
				"sort": 6			},		{
				"bankName": "盛京银行",
				"bankCode": "SJB",
				"icon": "",
				"sort": 5590			},		{
				"bankName": "天津银行",
				"bankCode": "TJYH",
				"icon": "",
				"sort": 5840			},		{
				"bankName": "西安银行",
				"bankCode": "XAYH",
				"icon": "",
				"sort": 5730			},			{
				"bankName": "新乡银行",
				"bankCode": "957E",
				"icon": "",
				"sort": 1740			},			{
				"bankName": "兴业银行",
				"bankCode": "CIB",
				"icon": "",
				"sort": 5480			},			{
				"bankName": "邮政银行",
				"bankCode": "PSBC",
				"icon": "",
				"sort": 5540			},			{
				"bankName": "招商银行",
				"bankCode": "CMB",
				"icon": "",
				"sort": 5460			},			{
				"bankName": "浙江农商",
				"bankCode": "RCB",
				"icon": "",
				"sort": 5560			},			{
				"bankName": "浙商银行",
				"bankCode": "CZB",
				"icon": "",
				"sort": 5570			},			{
				"bankName": "中国银行",
				"bankCode": "BOC",
				"icon": "image/bank/boc.png",
				"sort": 6			},			{
				"bankName": "中信银行",
				"bankCode": "ZXB",
				"icon": "image/bank/zxb.png",
				"sort": 6			},	{
				"bankName": "重庆银行",
				"bankCode": "CQYH",
				"icon": "image/bank/zxb.png",
				"sort": 6			}]`
	//json str 转map
	var jmap []map[string]interface{}
	if err := json.Unmarshal([]byte(banklist), &jmap); err == nil {
		println("banklist to map convert ok")
	}

	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *MainController) Noticefind() {
	//var user models.User
	var notice = `[{"companyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"createBy": "DDfeiyu",
			"createTime": "2019-06-23T14:26:29.403",
			"id": "a0cfff593b02479c9fc4f5a842d80c25",
			"noticeContent": " APP维护完成↵尊敬的好运会员：为了给会员更好的游戏体验，我们好运网投【苹果】APP于今日进行短暂的维护升级，现在已经维护完成，请各位会员卸载后重新安装，相信大家会有一个更流畅和简便的操作体验！！！（安装之后，点击 设置---通用----设备管理----信任，即可开始游戏）↵↵                                                            www.abc.com",
			"noticeStatus": 2,
			"noticeType": 1,
			"releaseBy": "DDfeiyu",
			"releaseTime": "2019-06-23T14:34:17.147",
			"remark": "",
			"title": "苹果APP升级完成"},
        {"companyPlatformID": "08F22DF8F31643C78ADB8DC135E6DC92",
			"createBy": "admin",
			"createTime": "2019-06-23T14:26:29.403",
			"id": "a0cfff593b02479c9fc4f5a842d80c25",
			"noticeContent": " ※温馨提示※↵↵，请勿保存支付。存款前首先请您刷新网页核对网页现有财务账号、收款二维码，以页面显示最新的存款账号、二维码为准，公司账号是不定时更换的，请勿保存旧的财务账号以及收款二维码导致存款失误，避免您的财产损失，感谢您的配合与支持 谢谢！！↵                                                              ↵",
			"noticeStatus": 2,
			"noticeType": 1,
			"releaseBy": "admin",
			"releaseTime": "2019-06-23T14:34:17.147",
			"remark": "",
			"title": "财务公告"}]`

	//json str 转map
	var jmap []map[string]interface{}
	if err := json.Unmarshal([]byte(notice), &jmap); err == nil {
		println("notice json to map convert ok")
	}

	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = jmap
	self.Data["json"] = out
	self.ServeJSON()
}
func (self *MainController) Adverfind() {
	//var user models.User
	var notice = `[{"imageUrl": "https://images.budiaodanle.com/Pic/190612/13/315f52be49a54b7aaabb.jpg",
			"jumpUrl": "",
			"remark": "※⑥月大顺 ⑥到飞起※",
			"sort": 1},
        {"imageUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565338101545&di=cbdaa9174202cc4987a8fd68c8771e69&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180713%2F20180713_c6decb36ed8cf9841b243274a533f8ff_wmk.jpeg",
			"jumpUrl": "",
			"remark": "※星耀大地行※",
			"sort": 2}]`

	var jmap []map[string]interface{}
	if err := json.Unmarshal([]byte(notice), &jmap); err == nil {
		println("json to map convert ok")
	}
	var adv = make(map[string]interface{})
	adv["imageList"] = jmap
	adv["personNum"] = "dfas"
	out := make(map[string]interface{})
	out["code"] = 200
	out["data"] = adv
	self.Data["json"] = out
	self.ServeJSON()
}
func (c *MainController) redis() {
	mstr := map[string]string{}
	mstr["key"] = "chatengine"
	mstr["conn"] = ":6379"
	mstr["dbNum"] = "0"
	bytes, _ := json.Marshal(mstr)
	//从redis缓存中拿数据拿数据
	cache_conn, err := cache.NewCache("redis", string(bytes))
	if err != nil {
		fmt.Println(err)
	}
	timeoutDuration := 10000000 * time.Second
	err = cache_conn.Put("testkey", "中国", timeoutDuration)
	if err != nil {
		fmt.Println("数据读取出错，错误为：", err)
	} else {
		fmt.Println("redis 读取正常")
	}

	if areaData := cache_conn.Get("testkey"); areaData != nil {
		beego.Info("get data from cache===========")
		//resp["data"] = areaData
		fmt.Println("从redis中读取出的数据为：", areaData)
	} else {
		fmt.Println("需要读取MySQL")
	}

}

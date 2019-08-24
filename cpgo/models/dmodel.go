package models

import (

	"github.com/astaxie/beego/orm"
	"strconv"
)

func init() {
	//	UserList = make(map[string]*User)
	//	u := User{"user_11111", "astaxie", "11111", &Profile{"male", "astaxie@gmail.com", "Singapore","http://11.com/1.png" }}
	//	UserList["user_11111"] = &u
}

type Dmodel struct {
	Id            string `orm:"column(id);pk"` // 设置主键
	Belongnumbers string
	Color         string
	Datas         []Dmodel  `orm:"-"`
	Isnumber      int
	Isselected    int
	Lotteryid     int
	Name          string
	Number        int
	Odds          string
	Playid        int
	Playsort      int
	Rebate        int
	Remark        string
}

func (a *Dmodel) TableName() string {
	return TableName("dmodel")
}


func Dmodellist(lotteryid string,id string) ([]orm.Params, error) {
	//var plists []Dmodel
	//var dmodels []Dmodel

	o := orm.NewOrm()
	sql:="SELECT * FROM "+TableName("dmodel")+" where lotteryId='"+lotteryid+"' and playSort<=10 and isNumber=0"
	var maps []orm.Params
	_, err := o.Raw(sql).Values(&maps)
   for i:=0;i<len(maps);i++{
	   playid := ""
	   if i == 9 {
		   playid = lotteryid + "20"+"%"
	   } else {
		   playid = lotteryid + "1" + strconv.Itoa(i+1)+"%"
	   }

	   if id == "49D343E11B3A4D8E820964ED1710D414" {

		   sql="SELECT * FROM "+TableName("dmodel")+" where lotteryId='"+lotteryid+"' and playId like '"+playid +"' and isNumber=0"
	   } else if id == "B469CEDC14CB4A079667B9787A20F03D" {
		   sql="SELECT * FROM "+TableName("dmodel")+" where lotteryId='"+lotteryid+"' and playId like '"+playid +"' and isNumber=1"
	   }
	   var maps1 []orm.Params
	   _,err := o.Raw(sql).Values(&maps1)
	   if err!=nil{
	   	println(err)
	   }
	  maps[i]["datas"]=maps1
   }
	   return maps, err

}
func Dmodellist1(lotteryid string,id string) ([]Dmodel, error) {
	var plists []Dmodel
	var dmodels []Dmodel

	o := orm.NewOrm()
	_, err := o.QueryTable(TableName("dmodel")).Filter("lotteryId", lotteryid).Filter("playSort__lte", 10).Filter("isNumber", 0).All(&plists)
	for i:=0;i<len(plists);i++{
		playid := ""
		if i == 9 {
			playid = lotteryid + "20"
		} else {
			playid = lotteryid + "1" + strconv.Itoa(i+1)
		}

		isnumber := 0
		if id == "49D343E11B3A4D8E820964ED1710D414" {
			isnumber = 0
			//dsql = `SELECT * FROM cp_dmodel where lotteryId='${lotteryid}' and playId like '${playid}'  and isNumber=0`;
		} else if id == "B469CEDC14CB4A079667B9787A20F03D" {
			isnumber = 1
		}
		_, err := o.QueryTable(TableName("dmodel")).Filter("lotteryId", lotteryid).Filter("playId__startswith", playid).Filter("isNumber", isnumber).All(&dmodels)
		if err != nil {
			return nil, err
		}
		plists[i].Datas=dmodels
	}
	return plists, err

}

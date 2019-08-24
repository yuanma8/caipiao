package models

import (
	"github.com/astaxie/beego/orm"
)

func init() {
//	UserList = make(map[string]*User)
//	u := User{"user_11111", "astaxie", "11111", &Profile{"male", "astaxie@gmail.com", "Singapore","http://11.com/1.png" }}
//	UserList["user_11111"] = &u
}

type Open struct {
	Id       string `orm:"column(id);pk"` // 设置主键
	Blocktime int32
	Curperiodnum string
	Ishot int
	Lotteryid int
	Lotteryname string
	Nexttime string
	Openperiod string
	Opencode string
	Opentime string
	Opentimestamp int32
	Resultcolor int32
	Zodiac int32
	Remaintime int32
	Systime int32

}

func (a *Open) TableName() string {
	return TableName("open")
}


func OpenLotteryId(LotteryId string) (*Open, error) {
	out := new(Open)
	err := orm.NewOrm().QueryTable(TableName("open")).Filter("lotteryId",LotteryId).One(out)
	if err != nil {
		return nil, err
	}
	return out, nil
}

package models

import (
	"github.com/astaxie/beego/orm"
)

func init() {
	//	UserList = make(map[string]*User)
	//	u := User{"user_11111", "astaxie", "11111", &Profile{"male", "astaxie@gmail.com", "Singapore","http://11.com/1.png" }}
	//	UserList["user_11111"] = &u
}

type Order struct {
	Id           string `orm:"column(id);pk"` // 设置主键
	Username     string
	Money        int32
	Playid       int32
	Periodnumber string
	Status       int
	Rewardrebate float32
	Bettime      string
}

func (a *Order) TableName() string {
	return TableName("order")
}

func OrderList(username string) ([]Order, error) {
	//out1 := new(Order)
	var orders []Order
	o := orm.NewOrm()
	count, err := o.QueryTable(TableName("order")).Filter("username", username).All(&orders)
	println(count)
	if err != nil {
		return nil, err
	}
	return orders, nil
}

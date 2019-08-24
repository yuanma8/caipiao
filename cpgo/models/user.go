package models

import (
	"errors"
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
)

var (
	UserList map[string]*User
)

func init() {
//	UserList = make(map[string]*User)
//	u := User{"user_11111", "astaxie", "11111", &Profile{"male", "astaxie@gmail.com", "Singapore","http://11.com/1.png" }}
//	UserList["user_11111"] = &u
}

type User struct {
	Uid       string `orm:"column(uid);pk"` // 设置主键
	Username string  `json:"username"`
	Password string
	Phone  string
	Qq  string   // `orm:"column(uid);pk"` // 设置主键
	Email    string
	Birthday string
	Headphoto   string
	Paypwd string
	Totalmoney  float64
	Freezemoney float64
	Bankusername  string
	Bankaccount string `json:"bankaccount"`
	Bankname  string
	Branchname  string
	Botactive  int
	Percentage int
	Botpwd string
	Botonline int
	//	Profiles Profile      `orm:"-"`   //`orm:"rel(fk)"`
}
type Profile struct {
	Agentid  int
	Bankcode string
	Bankid  int
	BetMoney  string
	ChatLevelTypeName  string
	CompanyPlatformID  string
	CurrentScore  string
	Id  string
	IsSetPayPwd  string
	LastLoginTime  string
	Level  string
	LevelName  string
	NickName  string
	ReturnMemberDays  string
	TestFlag  string
	Token  string
	UserLevel  string
	WithdrawMoney  string
	IsUpdatePayPwdFlag  string
	IsUpdatePwdFlag  string
}
func (a *User) TableName() string {
	return TableName("user")
}
func AddUser(u User) string {
	u.Uid = "user_" + strconv.FormatInt(time.Now().UnixNano(), 10)
	UserList[u.Uid] = &u
	return u.Uid
}

func GetUser(uid string) (u *User, err error) {
	if u, ok := UserList[uid]; ok {
		return u, nil
	}
	return nil, errors.New("User not exists")
}

func GetAllUsers() map[string]*User {
	return UserList
}



func Login(username, password string) bool {
	for _, u := range UserList {
		if u.Username == username && u.Password == password {
			return true
		}
	}
	return false
}

func DeleteUser(uid string) {
	delete(UserList, uid)
}
func UserGetByName(username string) (*User, error) {
	a := new(User)
	err := orm.NewOrm().QueryTable(TableName("user")).Filter("username", username).One(a)
	if err != nil {
		return nil, err
	}
	return a, nil
}

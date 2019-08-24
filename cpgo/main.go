package main

import (
	"cpgo/models"
	_ "cpgo/routers"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"
	"github.com/astaxie/beego/session"

	//_ "github.com/astaxie/beego/cache/redis"
	_ "github.com/astaxie/beego/session/redis"
)
var globalSessions *session.Manager
func main() {
	println(beego.BConfig.RunMode)
	beego.BConfig.WebConfig.Session.SessionProvider = "redis"
	beego.BConfig.WebConfig.Session.SessionProviderConfig = "127.0.0.1:6379"
	sessionConfig := &session.ManagerConfig{
		CookieName:"gosessionid",
		EnableSetCookie: true,
		Gclifetime:3600,
		Maxlifetime: 3600,
		Secure: false,
		CookieLifeTime: 3600,
		ProviderConfig: "./tmp",
	}

	globalSessions,_ = session.NewManager("memory",sessionConfig)
	go globalSessions.GC()

	models.Init()
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "client-type", "Content-Length", "Authorization", "Accept", "X-Requested-With", "timestamp", "username", "token", "staffid", "nonce", "signature"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true}))
	beego.Run()
	defer fmt.Println("end main.....")
}

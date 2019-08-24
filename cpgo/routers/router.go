package routers

import (
	"cpgo/controllers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
)

func init() {
	beego.Router("/", &controllers.MainController{}) //注意对应首单词大写
	beego.Router("/activity/avaCount", &controllers.MainController{}, "get,post:Avacount")
	beego.Router("/notice/find", &controllers.MainController{}, "get,post:Noticefind")
	beego.Router("/adver/find/:id", &controllers.MainController{}, "get,post:Adverfind")
	beego.Router("/system/testSpeed", &controllers.MainController{}, "get,post:SystemtestSpeed")
	beego.Router("/system/bank/list", &controllers.MainController{}, "get:Systembanklist")
	beego.Router("/open", &controllers.MainController{}, "get,post:Open")

	beego.Router("/lottery/info/all/:id", &controllers.LotteryController{}, "get,post:All")
	beego.Router("/lottery/info/:id", &controllers.LotteryController{}, "get,post:Infoid")
	beego.Router("/lottery/find/play/:lotteryid/:id", &controllers.LotteryController{}, "get,post:Playlist")

	beego.Router("/user/register", &controllers.UserController{}, "get,post:Register")
	beego.Router("/user/balance", &controllers.UserController{}, "get,post:Balance")
	beego.Router("/moneyDetail/find/:id", &controllers.UserController{}, "get,post:Walletdetail")
	beego.Router("/user/getReturnMoneyFlag", &controllers.UserController{}, "get,post:GetReturnMoneyFlag")
	beego.Router("/user/GetCompanyInfo", &controllers.UserController{}, "get,post:GetCompanyInfo")
	beego.Router("/user/botin", &controllers.UserController{}, "post:Botin")
	beego.Router("/user/yuer", &controllers.UserController{}, "post:Balance")
	beego.Router("/user/botinfo", &controllers.UserController{}, "post:Botinfo")
	beego.Router("/user/botonline", &controllers.UserController{}, "post:Botinfo")
	beego.Router("/user/bindBank", &controllers.UserController{}, "post:Bindbank")
	beego.Router("/user/bank/info", &controllers.UserController{}, "get:Balance")

	beego.Router("/order/bet/:id", &controllers.OrderController{}, "get,post:Bet")
	beego.Router("/rewardrebate", &controllers.OrderController{}, "get,post:Rewardrebate")
	beego.Router("/withdraw/submit", &controllers.OrderController{}, "get,post:Withdrawsubmit")
	beego.Router("/order/yingkui", &controllers.OrderController{}, "post:Yingkui")
	beego.Router("/order/curUser/betMoney", &controllers.OrderController{}, "post:Curuserbetmoney")
	beego.Router("/order/find", &controllers.OrderController{}, "post:Orderfind")

	beego.Router("/api/Test/Get", &controllers.PaymentController{}, "get:Testget")
	beego.Router("/api/Payment/getqrcode", &controllers.PaymentController{}, "post:Getqrcode")
	beego.Router("/api/Payment/GetPayScan", &controllers.PaymentController{}, "post:GetPayScan")
	beego.Router("/api/Payment/GetPayTransferList", &controllers.PaymentController{}, "post:GetPayTransferList")
	beego.Router("/api/Payment/PaymentTransfer", &controllers.PaymentController{}, "post:PaymentTransfer")
	beego.Router("/api/Payment/PaymentScanPay", &controllers.PaymentController{}, "post:PaymentScanPay")

	//	beego.AutoRouter(&controllers.MainController{}) // 把需要的路由注册到自动路由中
	ns_2 := beego.NewNamespace("/user", //区分大小写
		beego.NSRouter("/login", &controllers.UserController{}, "*:Login"),
		//控制器内方法名首字母要大写，但前端html链接可以不区分大小写

		beego.NSNamespace("/shop",
			beego.NSGet("/:id", func(ctx *context.Context) {
				ctx.Output.Body([]byte("shopinfo"))
			}),
			beego.NSRouter("/:id", &controllers.UserController{}),
		),
	)
	beego.AddNamespace(ns_2)

}

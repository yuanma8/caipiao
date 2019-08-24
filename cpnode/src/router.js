import Vue from 'vue';
import Router from 'vue-router';
import Msg from './views/Msg.vue';
import Index from './views/Index.vue';
import Login from './views/Login.vue';
import Botin from './views/Botin.vue';
import Buybot from './views/Buybot.vue';
import Znx from './views/Znx.vue';
//import Gg from './views/Gg.vue';
import Register from './views/Register.vue';
//import Regular from './views/Regular.vue';
import Result from './views/Result.vue';
import Record from './views/Record.vue';
import Play from './views/Play.vue';
import Guaji from './views/Guaji.vue';
import Bet from './views/Bet.vue';
import MyWallet from './views/MyWallet.vue';
import Setting from './views/Setting.vue';
import AboutUs from './views/AboutUs.vue';
import ChangePwd from './views/ChangePwd.vue';
import Withdraw from './views/Withdraw.vue';
import Transition from './views/Transition.vue';
import Pay from './views/Pay.vue';
import BankPay from './views/BankPay.vue';
import ScanPay from './views/ScanPay.vue';
import OrderDetail from './views/OrderDetail.vue';
import UserInfo from './views/UserInfo.vue';
import Youhui from './views/Youhui.vue';
import Wx from './views/Wx.vue';
//import Chat from './views/Chat.vue';
import CheckDetail from './views/CheckDetail.vue';
import Details from './views/DetailPage.vue';
import Order from './views/Order.vue';
import Level from './views/Level.vue';
import Agent from './views/Agent.vue';
import AgentReg from './views/AgentReg.vue';
//import Salary from './views/Salary.vue';
//import Audit from './views/audit.vue';
import lottery from './components/index/Home.vue';
import chess from './components/index/Chess.vue';
import payment from './components/index/Payment.vue'
import my from './components/index/My.vue'
import ServiceHall from './components/index/ServiceHall.vue'
import Feedback from './views/Feedback.vue';
import Advice from './views/Advice.vue';


Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			component: Index,
			redirect: 'lottery',
			children: [{
				path: 'lottery',
				name: 'lottery',
				component: lottery,
			}, {
				path: 'chess',
				component: chess,
			}, {
				path: 'payment',
				component: payment,
			}, {
				path: 'ServiceHall',
				component: ServiceHall,
			}, {
				path: 'my',
				component: my,
			}],
		}, {
			path: '/login',
			component: Login,
		}, {
			path: '/botin',
			component: Botin,
		}, {
			path: '/Buybot',
			component: Buybot,
		}, {
			path: '/register',
			component: Register,
		}, {
			path: '/msg',
			component: Msg,
		}, {
			path: '/result/:id/:state',
			component: Result,
		}, {
			path: '/record/:state',
			component: Record,
		}, {
			path: '/play/:id/:name/:data',
			component: Play,
		}, {
			path: '/guaji',
			component: Guaji,
		}, {
			path: '/bet',
			name: 'bet',
			component: Bet,
		}, {
			path: '/mywallet',
			component: MyWallet,
		}, {
			path: '/setting',
			component: Setting,
		}, {
			path: '/aboutus',
			component: AboutUs,
		}, {
			path: '/changepwd/:status',
			component: ChangePwd,
		}, {
			path: '/withdraw',
			component: Withdraw,
		}, {
			path: '/Transition',
			component: Transition,
		}, {
			path: '/pay',
			component: Pay,
		}, {
			path: '/bankpay',
			name: 'bankpay',
			component: BankPay,
		}, {
			path: '/scanpay',
			name: 'scanpay',
			component: ScanPay,
		}, {
			path: '/orderdetail/:status/:data',
			name: 'orderdetail',
			component: OrderDetail,
		}, {
			path: '/userinfo',
			component: UserInfo,
		}, {
			path: '/youhui/:id',
			component: Youhui,
		}, {
			path: '/wx',
			component: Wx,
		}, //{
		//path: '/Chat',
		//name: 'chat',
		//component: chat,
		//},
		{
			path: '/checkdetail',
			name: 'CheckDetail',
			component: CheckDetail,
		}, {
			path: '/Details/:data',
			component: Details
		}, {
			path: '/Order',
			name: 'Order',
			component: Order,
		}, {
			path: '/level',
			name: 'Level',
			component: Level,
		}, {
			path: '/agent',
			component: Agent,
		}, {
			path: '/agentreg',
			component: AgentReg,
		}, {
			path: '/Feedback',
			component: Feedback,
		}, {
			path: '/Advice/:id',
			component: Advice,
		}, {
			path: '*',
			redirect: '/'
		}
	],
});

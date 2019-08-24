const axios = require("axios");



// 全部配置
axios.defaults.baseURL = "https://ddapi.interfacea.com";
// 请求拦截
axios.interceptors.request.use((config) => {
	// 处理请求之前的配置
	// let username;
	// let token;
	const obj = {
		username: '',
		token: ''
	};
	const reg1 = new RegExp('(^| )username=([^;]*)(;|$)');
	const reg2 = new RegExp('(^| )token=([^;]*)(;|$)');

	config.headers = {
		'staffid': "08F22DF8F31643C78ADB8DC135E6DC92",
		'timestamp': new Date().getTime().toString(),
		'username': obj.username,
		'token': obj.token,
		'nonce': '',
		'signature': '',
		'Client-Type': 'H5',
	};
	return config;
}, (error) => {
	// 请求失败的处理
	console.log(error);
});
// 响应拦截
axios.interceptors.response.use((res) => {

	if ((res.data.code && res.data.code === 200)) {
		//  console.log(res.data.data) ;
		return Promise.resolve(res.data.data);
	} else if (res.data.code && (res.data.code === 400 || res.data.code === 403)) {
		 router.push('/login');
		 return Promise.reject();
	} else if (res.data.IsSuccess === true || res.data.StatusCode === 0) {
		return res.data;
	} else {
		//   return Promise.reject(alert(res.data.msg || res.data.Message));
	}
}, (err) => {
	return Promise.reject(err);
});


let lotteryList = [];

function openpost(lotteryList) {
	axios.post("http://localhost:3333/open", lotteryList).then(
		res => {
			date = new Date()
			console.log("post ok:" + date);

		},
		err => {
			console.log(err);
		}
	);
};

function getList(lotteryList) {
	axios.post("https://ddapi.interfacea.com/lottery/info/all/1", lotteryList).then(
		res => {

			lotteryList = res;
			openpost(lotteryList);

		},
		err => {
			console.log('getlist err');
		}
	);
	timer = setTimeout(() => {
		getList();
	}, 20000);
}

function rebate(lotteryList) {
	console.log("rebate");
	axios.post("http://localhost:3333/rewardrebate", "").then(
		res => {

			lotteryList = res;
			//openpost(lotteryList);

		},
		err => {
			console.log(err);
			//console.log('rebate err');
		}
	);
	timer = setTimeout(() => {
		rebate();
	}, 15000);
}
getList(lotteryList);
rebate(lotteryList);

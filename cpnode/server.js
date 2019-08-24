const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
var session = require('express-session');
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));
//the cores config
server.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers',
		'Content-Type, client-type,Content-Length, Authorization, Accept, X-Requested-With ,timestamp,username,token, staffid,nonce,signature'
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	//console.log( req.body);
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
		/make the require of options turn back quickly/
	} else {
		next();
	}
});


//deal (cookie,session)
(() => {
	server.use(cookieParser());
	let keyArr = [];
	for (let i = 0; i < 100000; i++) {
		keyArr[i] = "xsa_" + Math.random() * 100 + i;
	}
	server.use(cookieSession({
		name: "hc",
		keys: keyArr,
		maxAge: 30*60 * 60 * 1000 //30 minutes change to 30 hours
	}))
	const sessionMiddleware = session({
		secret: "fasfas",
		resave: false,
		saveUninitialized: false,
		cookie: {
			path: '/',
			httpOnly: true,
			maxAge: 365 * 24 * 60 * 60 * 1000, // e.g. 1 year 
		}
	})
	server.use(sessionMiddleware);
})();

//deal router
server.use('/', require('./route/root.js')());
server.use('/user', require('./route/user.js')());
server.use('/order', require('./route/order.js')());
server.use('/lottery', require('./route/lottery.js')());
server.use('/api', require('./route/api.js')());
server.listen(3333, () => {
	console.log("正在监听3333端口");

});

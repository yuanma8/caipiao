<template>
	<div class="login">
		<a class="close" @click="goIndex()">×</a>
		<img src="../assets/botin.png" class="logo" />
		<div class="login-wrap">
			<ul>
				<li class="name"><label><i></i>账号 :</label><input type="text" v-model.trim="body.username" /></li>
				<li class="pwd"><label><i></i>密码 :</label><input :type="type" v-model.trim="body.password" />
					<span :class="{'eye-off': type==='password','eye-on': type==='text'}" @click="type = (type === 'password') ? 'text' : 'password'"></span></li>
				<li v-if="CaptchaState" style="position: relative; padding-right:0;" class="yanzhen"><label><i></i>验证码 :</label><input
					 v-model.trim="body.code" />
					<img :src="imgUrl" style="position: absolute;height: 48px;width: 80px;right: 45px;">
					<em @click="getImg()" class="refresh"></em>
				</li>
				<li><a class="login-btn" @click="login()">立即登录</a></li>
				<li class="reg">
					<router-link to="buybot" class="red">辅助外挂购买</router-link>
				</li>
				<li class="forget">
					<a @click="forget()">忘记密码?</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				imgUrl: "",
				validate: '',
				validateCode: '',
				type: 'password',
				CaptchaState: false,
				body: {
					username: this.$getCookie("botname"),
					password: this.$getCookie("botpwd"),
					validateCode: '',
					code: ''
				}
			}
		},
		created() {
			this.getCompany(),
			//	this.getImg();
			//sessionStorage.clear();
			//this.$clearCookie('username');
			this.$clearCookie('realname');
			this.$clearCookie('token');
			this.$clearCookie('comid');
			this.$clearCookie('headphoto');
			this.$clearCookie('setpwd');
			this.$clearCookie('userid');
			this.$clearCookie('phone');
			this.$clearCookie('isGuest');
			this.$clearCookie('chatUrl');
			this.$clearCookie('isUpdatePwdFlag');
			this.$clearCookie('isUpdatePayPwdFlag');
		},
		methods: {
			getCompany() {
				this.$http.post("/user/GetCompanyInfo", "").then(res => {
					this.CaptchaState = res.loginCaptchaState === 1
				})
			},
			getImg() {
				this.$http.post('/common/getValidImage', '')
					.then(
						res => {
							this.imgUrl = res['img'];
							this.body.validateCode = res['validateCode']
						},
						e => {}
					)
			},
			login() {
				if (this.body.username === '' || this.body.password === '') {
					alert('用户名或密码不能为空!');
					return;
				}
				//console.log(this.body);
				this.$loading.show('登录中');
				this.$http.post('/user/botin', this.body, {
						withCredentials: true //打开cookie
					})
					.then(res => {
						this.$loading.hide();
						this.$setCookie('botname', res['username'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('realname', res['realname'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('token', res['token'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('comid', res['companyPlatformID'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('headphoto', res['headphoto'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('setpwd', res['isSetPayPwd'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('botpwd', this.body.password, 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('userid', res['id'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('phone', res['phone'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('isUpdatePwdFlag', res['isUpdatePwdFlag'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('isUpdatePayPwdFlag', res['isUpdatePayPwdFlag'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('returnMemberDays', JSON.stringify(res['returnMemberDays']), 1000 * 60 * 60 * 24 * 30);
						// 一个月
						this.$router.push('/Guaji');
					}, e => {
						//console.log(res);
						this.$loading.hide();
					})
			},
			visitorLogin() {
				this.$loading.show('登录中');
				this.$http.post('user/login/temp', '')
					.then(res => {
						sessionStorage.clear();
						this.$loading.hide();
						this.$setCookie('username', res['userName'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('token', res['token'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('comid', res['companyPlatformID'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('headphoto', res['headPhoto'], 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('isGuest', true, 1000 * 60 * 60 * 24 * 30);
						this.$setCookie('userid', res['id'], 1000 * 60 * 60 * 24 * 30);
						this.$router.push('/index');
						localStorage.setItem('showdia', '2')
					}, e => {
						this.$loading.hide();
					})
			},
			goIndex() {
				this.$router.push('/index');
			},
			forget() {
				alert("请联系客服!")
			},
		}
	}
</script>
<style scoped>
	.login {
		padding: 3rem;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: url('../assets/login_bg.jpg') no-repeat;
		background-size: 100%;
	}

	.close {
		position: absolute;
		right: 1rem;
		top: 1rem;
		font-size: 3rem;
		color: #fff;
		font-weight: 100;
	}

	.logo {
		display: block;
		width: 10rem;
		height: 10rem;
		margin: 0 auto 3rem;
		border-radius: 50%;
	}

	.login-wrap li {
		margin-bottom: 1.5rem;
	}

	.name,
	.pwd,
	.yanzhen {
		height: 4rem;
		background: #ece9e6;
		border-radius: 5px;
		padding: 0 1rem;
		display: flex;
		align-items: center;
	}

	.name label,
	.pwd label,
	.yanzhen label {
		display: inline-flex;
		align-items: center;
		color: #9c9c9c;
	}

	.name i,
	.pwd i,
	.yanzhen i {
		width: 1.4rem;
		height: 1.9rem;
		display: inline-block;
		background: url(../assets/logn_account.png) no-repeat;
		background-size: 100%;
		margin-right: 1rem;
		vertical-align: middle;
	}

	.pwd i {
		background: url(../assets/logn_passport.png) no-repeat;
		background-size: 100%;
	}

	.yanzhen i {
		background: url("../assets/icons/dp.svg") no-repeat center;
		background-size: 100%;
	}

	.name input,
	.pwd input,
	.yanzhen input {
		background: transparent;
		border: 0;
		height: 2.3rem;
		width: calc(100% - 9rem);
		padding-left: 10px;
			font-size: 18px;
	}

	.eye-off,
	.eye-on {
		width: 2.2rem;
		height: 2.2rem;
		background: url(../assets/eye_off.png) no-repeat center;
		background-size: 100%;
		display: inline-block;
	}

	.eye-on {
		background: url(../assets/eye_on.png) no-repeat center;
		background-size: 100%;
	}

	.reg {
		display: flex;
		margin-bottom: 1.5rem;
		justify-content: space-between;
	}

	.reg .blue,
	.reg .red {
		display: block;
		width: 45%;
		height: 4rem;
		color: #fff;
		font-size: 1.5rem;
		background-color: #2f8cdb;
		text-align: center;
		line-height: 4rem;
		border-radius: 5px;
	}

	.reg .red {
		background-color: #D91D37;
	}

	.login-btn {
		display: block;
		border-radius: 5px;
		color: #fff;
		height: 4rem;
		line-height: 4rem;
		font-size: 1.5rem;
		text-align: center;
		background-color: #00d665;
	}

	.forget {
		display: flex;
		justify-content: flex-end;
	}

	.forget a {
		font-size: 1.2rem;
		color: #fff;
		text-decoration: underline;
	}

	em {
		position: absolute;
		right: 0px;
		width: 45px;
		height: 48px;
		background: rgb(47, 140, 218) url("../assets/icons/fx.svg") no-repeat center;
		background-size: 15px;
	}

	ul li {
		overflow: hidden;
	}
</style>

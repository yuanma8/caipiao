import axios from 'axios';
import router from '@/router';
import api from './api.js';

// 全部配置
axios.defaults.baseURL = api.cdnList[0];
// 请求拦截
axios.interceptors.request.use((config) => {
  // 处理请求之前的配置
  // let username;
  // let token;
  const obj = { username: '', token: '' };
  const reg1 = new RegExp('(^| )username=([^;]*)(;|$)');
  const reg2 = new RegExp('(^| )token=([^;]*)(;|$)');
  if (document.cookie.match(reg1) && document.cookie.match(reg1)[2]) {
    obj.username = document.cookie.match(reg1)[2];
  }
  if (document.cookie.match(reg2) && document.cookie.match(reg2)[2]) {
    obj.token = document.cookie.match(reg2)[2];
  }
  config.headers = {
    'staffid': api.comId,
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
    return Promise.resolve(res.data.data);
  } else if (res.data.code && (res.data.code === 400 || res.data.code === 403)) {
    router.push('/login');
    return Promise.reject();
  } else if (res.data.IsSuccess === true || res.data.StatusCode === 0) {
    return res.data;
  } else {
    return Promise.reject(alert(res.data.msg || res.data.Message));
  }
}, (err) => {
  return Promise.reject(err);
});
export default axios;

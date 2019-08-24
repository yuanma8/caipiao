export default {
  install(Vue) {
    // 处理倒计时
    Vue.prototype.$countdown = function (n) {
      let h = Math.floor(n / 3600);  // 小时
      let m = Math.floor(n % (3600) / 60);  // 分
      let s = Math.floor(n % 60); // 秒
      h = h.toString();
      m = m.toString();
      s = s.toString();
      h = h.length <= 1 ? '0' + h : h;
      m = m.length <= 1 ? '0' + m : m;
      s = s.length <= 1 ? '0' + s : s;
      return h + ':' + m + ':' + s;
    };
    // 存取用户数据cookie
    Vue.prototype.$setCookie = function (name, value, time) {
      const today = new Date();
      today.setTime(today.getTime() + time);
      document.cookie = name + '=' + value + ';expires=' + today.toGMTString() + ';path=/';
    };
    Vue.prototype.$getCookie = function (name) {
      const reg = new RegExp('(^| )'+name+'=([^;]*)(;|$)');
      if(document.cookie.match(reg)&&document.cookie.match(reg)[2]){
        return document.cookie.match(reg)[2]
      }else {
        return null;
      }
    };
    Vue.prototype.$clearCookie = function (name) {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      document.cookie = name + "=a; expires=" + date.toGMTString();
    }
    Vue.prototype.$clearAll = function () {
      const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (let i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    };

  }
}

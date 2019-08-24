import Vue from 'vue';
import App from './App.vue';
import router from './router';
import LoadingBox from './loading/loading';
import alertBox from './alert/alert';
import Plugin from './plugins/plugin';
import axios from './http';
import Vue2TouchEvents from 'vue2-touch-events';
//import Qs from "qs";

Vue.use(LoadingBox);
Vue.use(alertBox);
Vue.use(Plugin);
Vue.use(Vue2TouchEvents);
Vue.prototype.$http = axios;
//Vue.prototype.$qs=Qs;
Vue.config.productionTip = false;

new Vue({
  data(){
    return {
      info: {},
    }
  },
  router,
  render: h => h(App),
}).$mount('#app');
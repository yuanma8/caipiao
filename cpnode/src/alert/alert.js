import alertVue from './alert.vue';

//定义插件对象
let alertBox;
export default {
  install(Vue) {
    const alert = Vue.extend(alertVue);// 创建子实例
    alertBox = new alert({
      el: document.createElement('div') // 挂载实例在DOM
    });
    document.body.appendChild(alertBox.$el);
    Vue.prototype.$alert = {
      show(msg) {
        alertBox.show(msg)
      },
      hide() {
        alertBox.hide()
      }
    }
  }
}
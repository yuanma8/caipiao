import loadingVue from './loading.vue';

//定义插件对象
let LoadingBox;
export default {
  install(Vue) {
    const LoadingPlugin = Vue.extend(loadingVue);// 创建子实例
    LoadingBox = new LoadingPlugin({
      el: document.createElement('div') // 挂载实例在DOM
    });
    document.body.appendChild(LoadingBox.$el);
    Vue.prototype.$loading = {
      show(msg) {
        LoadingBox.show(msg)
      },
      hide() {
        LoadingBox.hide()
      }
    }
  }
}

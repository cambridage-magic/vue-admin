
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./router/premit";
/* 自定义全局插件 */
/* import globle from  './utils/global' */
/* Vue.use(globle) */
//自定义全局组件
import "./icons/index.js"
Vue.use(ElementUI);
Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

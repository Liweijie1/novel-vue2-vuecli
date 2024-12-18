import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from "vant";
import "vant/lib/index.css";
import { Lazyload, Toast, Skeleton } from 'vant';
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(Toast);
Vue.use(Skeleton);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

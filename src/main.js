import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './router/index.js';
import './style/index.css'
    
Vue.use(ElementUI);
    
const router = new VueRouter({
  routes: Routes,
});
    
Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
});
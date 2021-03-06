// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'viewerjs/dist/viewer.css'
import 'element-ui/lib/theme-default/index.css';
import store from './store';
import Mock from './mock';
import vSelect from 'vue-select'
import 'font-awesome/css/font-awesome.css'
import Validator from 'vue-validator'
import './permission' // 权限
import iView from 'iview';
import Viewer from 'v-viewer'
import 'iview/dist/styles/iview.css';
import VueLazyLoad from 'vue-lazyload'
if(process.env.NODE_ENV=="development"){
    Mock.bootstrap();
}
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(iView);
 Vue.use(Viewer)
 //,{
//   defaultOptions: {
//     zIndex: 9999,
//     navbar:1
// }
// })
Vue.use(VueLazyLoad)
Vue.use(VueResource);
Vue.component('v-select', vSelect);
Vue.use(Validator)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

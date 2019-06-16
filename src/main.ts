import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

import {
  Input,
  Button,
  Message,
  Loading
} from 'element-ui'

Vue.config.productionTip = false;

Vue.use(Loading.directive);

Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Message.name, Message)

Vue.prototype.$message = Message;
Vue.prototype.$isLoggedIn = store.getters.isLoggedIn;
Vue.prototype.$user = store.getters.user;

axios.interceptors.request.use(config => 
  {if ( store.getters.token !== null && store.getters.token !== undefined && store.getters.token !== '' ) {
    config.headers.Authorization = `Token ${store.getters.token}`;
  }
  return config;
  }, (err) =>  {
  return Promise.reject(err);
  })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

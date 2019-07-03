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
  Loading,
  Dialog,
  Tabs,
  TabPane
} from 'element-ui'

import { LMap, LTileLayer, LMarker , LPopup} from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import infiniteScroll from 'vue-infinite-scroll'
import VueImg from 'v-img';



Vue.use(infiniteScroll)
Vue.use(VueImg);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup)
// @ts-ignore
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


Vue.config.productionTip = false;

Vue.use(Loading.directive);

Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Message.name, Message)
Vue.component(Dialog.name, Dialog)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)


Vue.prototype.$message = Message;


axios.interceptors.request.use(config => 
  {
    if ( store.getters.token !== null && store.getters.token !== undefined && store.getters.token !== '' ) {
    config.headers.Authorization = `Token ${store.getters.token}`;
  }
  return config;
  }, (err) =>  {
  return Promise.reject(err);
  })

  Vue.mixin({
    methods: {
      isLoggedIn: () => {
        return store.getters.isLoggedIn;
      }
    }
  })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

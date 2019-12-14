import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Event from './views/Event.vue';
import Registration from './views/Register.vue';
import Login from './views/Login.vue';
import NotFound from './views/404.vue';
import BilloBoard from './views/BilloBoard.vue';

import ShredMap from './views/ShredMap.vue';
import Satzung from './views/Satzung.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/satzung',
      name: 'satzung',
      component: Satzung,
    },
    // {
    //   path: '/event/:id',
    //   name: 'event',
    //   component: Event,
    //   props: true,
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: Registration,
    // },
    // {
    //   path: '/login',
    //   name: 'loginr',
    //   component: Login,
    // },
    // {
    //   path: '/board',
    //   name: 'board',
    //   component: BilloBoard,
    // },
    // {
    //   path: '/map',
    //   name: 'map',
    //   component: ShredMap,
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    }
  ],
});

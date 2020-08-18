import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import payment from 'components/payment';
import orderList from 'components/order/list';
import orderDetail from 'components/order/detail';
import profile from 'components/profile/profile';
import comment from 'components/comments/comment';
import myCommentList from 'components/comments/myCommentList';
import myAddress from 'components/addresses/myAddress';
import addAddress from 'components/addresses/children/addAddress';
import searchAddress from 'components/addresses/children/children/searchAddress';
import balance from 'components/balance/balance';

import './assets/iconfont/all/iconfont.css';
import 'common/stylus/index.styl';
import {MessageBox, Toast} from 'mint-ui'
import {Swipe, SwipeItem} from 'mint-ui'
import 'mint-ui/lib/style.css'

import Icon from 'vue-svg-icon/Icon.vue'
Vue.component('icon', Icon)

import wcView from 'wc-view';
import 'wc-view/style.css';
Vue.use(wcView);

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)



Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.prototype.HOST='/sell'
const routes = [{
  path: '/',
  component: goods
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}, {
  path: '/payment',
  component: payment
}, {
  path: '/order',
  component: orderList
}, {
    path: '/order/:orderId',
    component: orderDetail
},{
    path: '/profile',
    component: profile
},{
    path: '/comments/:orderId',
    component: comment
},{
    path: '/comments',
    component: myCommentList
},{
    path: '/addresses',
    component: myAddress
},{
    path: '/addAddress',
    component: addAddress
},{
    path: '/addAddress/:addressId',
    component: addAddress
},{
    path: '/searchAddress',
    component: searchAddress
},{
    path: '/balance',
    component: balance
}];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
window.bvue = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

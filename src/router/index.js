import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


// 创建组件
import Home from "@/components/Home";
import About from "@/components/About";

import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Search from "@/components/Search.vue";
import Links from "@/components/Links.vue";
// import { NOTFOUND } from 'dns';
// 注册全局组件 
Vue.component("v-nav", Nav);
Vue.component("v-footer", Footer);
Vue.component("v-search", Search);
Vue.component("v-links", Links);

Vue.use(Router)


export default new Router({
  mode: "history",
  routes: [
    { path: '/', name: 'Home', component: Home},
    { path: '/about', name: 'About', component: About},
    // { path: '*', redirect: '/' },   /*默认跳转路由*/
  ]
})

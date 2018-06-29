import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/login'
import Error from '@/views/dashboard/error'

import i18n from '@/lang'

import ecmRouters from './ecm'

Vue.use(Router)

//定义控制中心 登录 404 页面路由
let routers = [
    {
    	path:'/login',
    	name:'login',
    	component:Login
    },
    {
    	path:'*',
    	redirect:'/error/404',
    },
    {
      path:'/error/:errorCode',
      name:'error',
      component:Error
    }
];
//添加云服务器路由
routers.push(ecmRouters)

export default new Router({
  //mode:'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
})

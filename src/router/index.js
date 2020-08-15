import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


//默认路由
 export  const defaultRouterMap = [
  {
    path: '/',
    redirect:'login',
    hidden:true,
    meta:{
    title:'主页',
    }
  },
  {
    path: '/login',
    name: 'Login',
    hidden:true,
    component:() =>import("../views/Login/index.vue"),
    meta:{
      title:'登录'
      }
  },
  {
    path:'/console',
    name:'Console',
    redirect:"index",
    meta:{
      title:'控制台',
      icon:"console"
      },
    component:()=>import("../views/Layout/index.vue"),
    children:[
      {
        path:'/index',
        name:'Index',
        meta:{
          title:'首页'
          },
        component:()=>import("../views/Console/index.vue"),
      }
    ]
  },
]
//动态路由
 export const asyncRouterMap =[
  {
    path: '/info',
    name: 'Info',
    meta:{
      role:[],
      system:'infoSystem',
      title:'信息管理',
      icon:"info"
      },
    component:() =>import("../views/Layout/index.vue"),
    children:[
      {
        path:'/infoIndex',
        name:'InfoIndex',
        meta:{
          role:['sale'],
          title:'信息列表'
          },
        component:()=>import("../views/Info/index.vue"),      
      },
      {
        path:'/infoCategory',
        name:'InfoCategory',
        meta:{
          role:['sale'],
          title:'信息分类'
          },
        component:()=>import("../views/Info/category.vue"),
      },
      {
        path:'/infoDetail', 
        name:'InfoDetail',
        hidden:true,
        meta:{
          role:['sale'],
          title:'信息详情'
          },
        component:()=>import("../views/Info/detail.vue"),
      }
    ]
   
   
  },
  {
    path: '/user',
    name: 'User',
    meta:{
      role:['sale'],
      system:'userSystem',
      title:'用户管理',
      icon:"user"
        },
    component:() =>import("../views/Layout/index.vue"),
    children:[
        {
          path:'/userIndex',
          name:'UserIndex',
          meta:{
            role:['sale'],
            title:'用户信息'
            },
          component:()=>import("../views/User/index.vue"),
        }
      ]
  },
]


export default new Router({
 routes:defaultRouterMap

});


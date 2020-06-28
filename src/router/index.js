import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
 routes:[
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
  {
    path: '/info',
    name: 'Info',
    meta:{
      title:'信息管理',
      icon:"info"
      },
    component:() =>import("../views/Layout/index.vue"),
    children:[
      {
        path:'/infoIndex',
        name:'InfoIndex',
        meta:{
          title:'信息列表'
          },
        component:()=>import("../views/Info/index.vue"),      
      },
      {
        path:'/infoCategory',
        name:'InfoCategory',
        meta:{
          title:'信息分类'
          },
        component:()=>import("../views/Info/category.vue"),
      }
    ]
   
   
  },
  {
    path: '/user',
    name: 'User',
    meta:{
      title:'用户管理',
      icon:"user"
        },
    component:() =>import("../views/Layout/index.vue"),
    children:[
        {
          path:'/userIndex',
          name:'UserIndex',
          meta:{
            title:'用户信息'
            },
          component:()=>import("../views/User/index.vue"),
        }
      ]
  },
 ]
 
});


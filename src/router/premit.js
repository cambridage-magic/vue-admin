import store from '../store/index';
import { getToKen,removeToken,removeUserName} from   '../utils/app'
import {getUserRole}  from  '../api/login'
import router from './index.js';
const whiteMenu =['/login']
   router.beforeEach((to,from,next)=>{
       if(getToKen()){
        
         if(to.path==='/login'){
            removeToken()
            removeUserName()
            store.commit("app/SET_TOKEN", {token:''});
            store.commit("app/SET_USER_NAME", {username:''});
            next()
           
         }else{
            //用户路由权限控制
            if(store.getters['app/roles'].length ===0){
              store.dispatch('promission/getRoles').then((data)=>{
                 let role = data
                 //存储角色
                 store.commit("app/SET_ROLES",role)
                 store.dispatch('promission/creatRouters',role).then((response)=>{
                 let addRouters = store.getters['promission/addRouters']
                 let allRouters = store.getters['promission/allRouters']
                 //路由更新
                 router.options.routes = allRouters;
                 //添加动态路由
                 router.addRoutes(addRouters)
                 next({...to,replace:true})
                 })
              })
            }else{
               next()
            }
            
         }
         
       }else if(whiteMenu.indexOf(to.path)!==-1){
       
           next()
       }else{
           next('/login')
           
       }
    })
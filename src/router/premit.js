import store from '../store/index';
import { getToKen,removeToken,removeUserName} from   '../utils/app'
import router from './index.js';
const whiteMenu =['/login']
   router.beforeEach((to,from,next)=>{
       if(getToKen()){
         console.log('正常')
         if(to.path==='/login'){
            removeToken()
            removeUserName()
            store.commit("app/SET_TOKEN", {token:''});
            store.commit("app/SET_USER_NAME", {username:''});
            next()
           
         }else{
            next()
         }
         
       }else if(whiteMenu.indexOf(to.path)!==-1){
        console.log('ab')
           next()
       }else{
           next('/login')
           console.log('ba')
       }
    })
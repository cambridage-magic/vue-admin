import { Login } from "../../api/login.js";
import {setToKen, setUserName,getUserName,removeToken,removeUserName} from   "../../utils/app"

  const  state ={
        roles:[],
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse'))|| false,
        token:'',
        username:getUserName() || ''
        
      }
  const  mutations = {
        SET_COllAPSE(state){
          state.isCollapse =!state.isCollapse
          sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
        },
        SET_TOKEN(state,{token}){
          
          state.token = token
        },
        SET_USER_NAME(state,{username}){
         
          state.username = username
        },
        //动态分配路由设置角色
        SET_ROLES(state,value){
          state.roles = value
          
      },
      
      }
   const getters = {
    roles: (state)=> state.roles,
   }   
   const  actions = {
     /* 登录 */
          login(context,data){
              return new Promise((reslove,reject)=>{
                Login(data).then((response)=>{
                   reslove(response)
                   const {token,username} = response.data
                   context.commit('SET_TOKEN',{token})
                   setToKen(token)
                   context.commit('SET_USER_NAME',{username})
                   setUserName(username)
                }).catch((error)=>{
                    reject(error)
                })
              })
             
          },
      /* 退出 */
          exit(context){
             return new Promise((resolve,reject)=>{
                removeToken()
                removeUserName()  
                context.commit('SET_TOKEN',{token:''})
                context.commit('SET_USER_NAME',{username:''})
                context.commit('SET_ROLES',[])
                resolve()
             }) 
          }
      }



export default {
   namespaced: true,
   state,
   mutations,
   actions,
   getters
   
}